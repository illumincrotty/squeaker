import { interpolate } from '../interpolation';
import type { noiseFunction3d, vectorArray3d } from '../noiseTypes';
import { aleaFactory } from '../random/alea';
import {
	altHash,
	consistentModulus,
	dotProduct3d,
	rangeGenerator,
} from '../util';
import {
	gradients3DArray,
	maxFix,
	_defaultPerlinNoise3dOptions,
} from './perlinConstants';
import type { perlinNoiseOptions3d } from './perlinTypes';

const permGenerator = (
	x: number,
	y: number,
	z: number,
	rand: () => number,
	forceLow = false,
	forceHigh = false
) => {
	if (!forceHigh && (forceLow || x * y * z > 256 ** 3)) {
		return (() => {
			// too big to pregenerate
			// faster startup (for the size) but slower runtime (about half as fast)
			// space needed is O(x+y+z)
			const _xperms = (() => {
				const _array = new Uint32Array(x + 1).map(
					(_, _index) => altHash(_index * 17 + 0xeb_c9) & 0xf_ff_ff
				);
				_array[x] = _array[0];

				return _array;
			})();

			const _yperms = (() => {
				const _array = new Uint32Array(y + 1).map(
					(_, _index) => altHash(_index * 31 + 0x1e_c1) & 0xf_ff_ff
				);
				_array[y] = _array[0];

				return _array;
			})();

			const _zperms = (() => {
				const _array = new Uint32Array(z + 1).map(
					(_, _index) =>
						altHash(_index * 31 + 0xaf_1c_ab_62) & 0xf_ff_ff
				);
				_array[z] = _array[0];

				return _array;
			})();

			return (x: number, y: number, z: number) =>
				gradients3DArray[
					// hash(_xperms[x] + _yperms[y] + _zperms[z]) % // works but is slow
					// mix(_xperms[x], _yperms[y], _zperms[z]) % // also works, also slow
					// (_xperms[x] ^ _yperms[y] ^ _zperms[z]) % // pretty fast but causes distinct visual artificts

					// prettier-ignore
					// ((_xperms[x] >> (y & 0xf)) ^ (_yperms[y] >> (z & 8)) ^ (_zperms[z] >> (x & 0xf)))  // doesn't loop but does work
					((_xperms[x] >> (_yperms[y] & 0x8)) +
					 (_yperms[y] >> (_zperms[z] & 0x8)) ^
					 (_zperms[z] >> (_xperms[x] & 0x8)))
					// (((_yperms[y] & 0xFFF) >> (_xperms[x] & 0x8)) ^ ((_xperms[x]& 0xFFF )>> (_yperms[y] & 0x8)))
					% gradients3DArray.length
				];
		})();
	}
	return (() => {
		// small enough to pregenerate
		// slower startup (for the same size) but much faster runtime (about twice as fast)
		// space needed is O(x*y*z)
		const _permutationArray: vectorArray3d[][][] = (() => {
			// create outer array of size x
			const _xArrays = [
				...rangeGenerator({
					start: 0,
					end: x,
				}),
			]
				.map(() => {
					// create 2nd dimension of array, size y
					return [
						...rangeGenerator({
							start: 0,
							end: y,
						}),
					]
						.map(() => {
							return [
								...rangeGenerator({
									// create 3rd dimension of array, size z
									start: 0,
									end: z,
								}),
							].map(() => {
								// fill with gradients
								return gradients3DArray[
									Math.trunc(rand() * gradients3DArray.length)
								];
							});
						})
						.map((zArrays) => [...zArrays, zArrays[0]]); // space for z overflow by 1
				})
				.map((yArray) => [...yArray, yArray[0]]); // space for y overflow by 1
			return [..._xArrays, _xArrays[0]]; //space for x overflow by 1
		})();

		return (x: number, y: number, z: number) => _permutationArray[x][y][z];
	})();
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

	const _perms = permGenerator(
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

export const perlin3d = perlinNoise3dFactory();

export const perlinNoise3dFactoryLight = (
	options?: perlinNoiseOptions3d
): noiseFunction3d =>
	perlinNoise3dFactory({ _forceLowMemoryMode: true, ...options });
export const perlinNoise3dFactoryHeavy = (
	options?: perlinNoiseOptions3d
): noiseFunction3d =>
	perlinNoise3dFactory({ _forceHighMemoryMode: true, ...options });
