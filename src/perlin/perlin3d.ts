import { interpolate } from '../interpolation';
import type { noiseFunction3d, vectorArray3d } from '../noiseTypes';
import { aleaFactory } from '../random/alea';
import { altHash, consistentModulus, dotProduct3d } from '../util';
import {
	gradients3DArray,
	maxFix,
	_defaultPerlinNoise3dOptions,
} from './perlinConstants';
import type { perlinNoiseOptions3d } from './perlinTypes';

const _lightPermutationsGenerator = (
	x: number,
	y: number,
	z: number
): ((x: number, y: number, z: number) => vectorArray3d) => {
	const _xperms = new Uint32Array(x + 1).map(
		(_, _index) => altHash(_index * 17 + 0xeb_c9) & 0xf_ff_ff
	);
	_xperms[_xperms.length - 1] = _xperms[0];

	const _yperms = new Uint32Array(y + 1).map(
		(_, _index) => altHash(_index * 31 + 0x1e_c1) & 0xf_ff_ff
	);
	_yperms[_yperms.length - 1] = _yperms[0];

	const _zperms = new Uint32Array(z).map(
		(_, _index) => altHash(_index * 571 + 0xaf_1c_ab_62) & 0xf_ff_ff
	);
	_zperms[_zperms.length - 1] = _zperms[0];

	return (x: number, y: number, z: number) =>
		gradients3DArray[
			// hash(_xperms[x] + _yperms[y] + _zperms[z]) % // works but is slow
			// mix(_xperms[x], _yperms[y], _zperms[z]) % // also works, also slow
			// (_xperms[x] ^ _yperms[y] ^ _zperms[z]) % // pretty fast but causes distinct visual artificts
			// ((_xperms[x] >> (y & 0xf)) ^ (_yperms[y] >> (z & 8)) ^ (_zperms[z] >> (x & 0xf)))  // doesn't loop but does work

			// prettier-ignore
			((_xperms[x] >> (_yperms[y] & 0x8)) ^
			 (_yperms[y] >> (_zperms[z] & 0x8)) ^
			 (_zperms[z] >> (_xperms[x] & 0x8)))
			% gradients3DArray.length
		];
};

const _appendFirst = <Type>(input: Type[]): Type[] => [...input, input[0]];

const _heavyPermutationsGenerator = (
	x: number,
	y: number,
	z: number,
	rand: () => number
): ((x: number, y: number, z: number) => vectorArray3d) => {
	const _special = _appendFirst(
		Array.from({ length: x }).map(() =>
			_appendFirst(
				Array.from({ length: y }).map(() =>
					_appendFirst(
						Array.from({ length: z }).map(() => {
							// fill with gradients
							return gradients3DArray[
								Math.trunc(rand() * gradients3DArray.length)
							];
						})
					)
				)
			)
		)
	);

	return (x: number, y: number, z: number) => _special[x][y][z];
};

const _permGenerator = (
	x: number,
	y: number,
	z: number,
	rand: () => number,
	forceLow = false,
	forceHigh = false
) => {
	if (!forceHigh && (forceLow || x * y * z > 256 ** 3)) {
		// too big to pregenerate
		// faster startup (for the size) but slower runtime (about half as fast)
		// space needed is O(x+y+z)
		return _lightPermutationsGenerator(x, y, z);
	}
	// small enough to pregenerate
	// slower startup (for the same size) but much faster runtime (about twice as fast)
	// space needed is O(x*y*z)
	return _heavyPermutationsGenerator(x, y, z, rand);
};

export const perlinNoise3dFactory = (
	options?: perlinNoiseOptions3d
): noiseFunction3d => {
	const _options = {
		..._defaultPerlinNoise3dOptions,
		...options,
	};

	if (options && options.seed && !options.random) {
		_options.random = aleaFactory(options.seed.toString()).random;
	}

	if (_options._forceHighMemoryMode && _options._forceLowMemoryMode) {
		throw new Error(
			'Invalid Options, can not force both low and high memory modes '
		);
	}

	const _perms = _permGenerator(
		_options.xSize,
		_options.ySize,
		_options.zSize,
		_options.random,
		_options._forceLowMemoryMode,
		_options._forceHighMemoryMode
	);

	return (x: number, y: number, z: number): number => {
		const _xFloor = Math.floor(x),
			_yFloor = Math.floor(y),
			_zFloor = Math.floor(z),
			/** integer below input x */
			x0 = consistentModulus(_xFloor, _options.xSize),
			/** integer below input y */
			y0 = consistentModulus(_yFloor, _options.ySize),
			/** integer below input y */
			z0 = consistentModulus(_zFloor, _options.zSize),
			/**  fractional x value */
			_xFrac = x - _xFloor,
			/**  fractional y value */
			_yFrac = y - _yFloor,
			/**  fractional z value */
			_zFrac = z - _zFloor,
			/**  fractional x value with a fade function applied */
			_xFade = interpolate(0, 1, _xFrac, _options.blendFunction),
			/**  fractional y value with a fade function applied */
			_yFade = interpolate(0, 1, _yFrac, _options.blendFunction),
			/**  fractional y value with a fade function applied */
			_zFade = interpolate(0, 1, _zFrac, _options.blendFunction);

		const _g000 = _perms(x0, y0, z0),
			_g001 = _perms(x0, y0, z0 + 1),
			_g010 = _perms(x0, y0 + 1, z0),
			_g011 = _perms(x0, y0 + 1, z0 + 1),
			_g100 = _perms(x0 + 1, y0, z0),
			_g101 = _perms(x0 + 1, y0, z0 + 1),
			_g110 = _perms(x0 + 1, y0 + 1, z0),
			_g111 = _perms(x0 + 1, y0 + 1, z0 + 1);

		const /**  dot product of bottom left corner gradient and the vector to the input point from that corner */
			_n000 = dotProduct3d(_g000, [_xFrac, _yFrac, _zFrac]),
			/**  dot product of bottom left corner gradient and the vector to the input point from that corner */
			_n001 = dotProduct3d(_g001, [_xFrac, _yFrac, _zFrac - 1]),
			/**  dot product of top left corner gradient and the vector to the input point from that corner */
			_n010 = dotProduct3d(_g010, [_xFrac, _yFrac - 1, _zFrac]),
			/**  dot product of top left corner gradient and the vector to the input point from that corner */
			_n011 = dotProduct3d(_g011, [_xFrac, _yFrac - 1, _zFrac - 1]),
			/**  dot product of bottom right corner gradient and the vector to the input point from that corner */
			_n100 = dotProduct3d(_g100, [_xFrac - 1, _yFrac, _zFrac]),
			/**  dot product of bottom right corner gradient and the vector to the input point from that corner */
			_n101 = dotProduct3d(_g101, [_xFrac - 1, _yFrac, _zFrac - 1]),
			/**  dot product of top right corner gradient and the vector to the input point from that corner */
			_n110 = dotProduct3d(_g110, [_xFrac - 1, _yFrac - 1, _zFrac]),
			/**  dot product of top right corner gradient and the vector to the input point from that corner */
			_n111 = dotProduct3d(_g111, [_xFrac - 1, _yFrac - 1, _zFrac - 1]);

		const _nx00 = interpolate(_n000, _n100, _xFade),
			_nx01 = interpolate(_n001, _n101, _xFade),
			_nx10 = interpolate(_n010, _n110, _xFade),
			_nx11 = interpolate(_n011, _n111, _xFade),
			_nxy0 = interpolate(_nx00, _nx10, _yFade),
			_nxy1 = interpolate(_nx01, _nx11, _yFade),
			_nxyz = interpolate(_nxy0, _nxy1, _zFade);

		// shift up and limit the max so instead of going to 1, it only goes to extremely slightly below 1
		// without shift the output is [z.5, .5] and with shift and limit it's [0,1)
		// return Math.min(_nxyz + 0.5, _maxFix);
		return Math.min(_nxyz + 0.5, maxFix);
	};
};

export const perlinNoise3dFactoryLight = (
	options?: perlinNoiseOptions3d
): noiseFunction3d =>
	perlinNoise3dFactory({ _forceLowMemoryMode: true, ...options });

export const perlinNoise3dFactoryHeavy = (
	options?: perlinNoiseOptions3d
): noiseFunction3d =>
	perlinNoise3dFactory({ _forceHighMemoryMode: true, ...options });
