import { interpolate } from '../interpolation';
import type { noiseFunction3d, vector3d } from '../noiseTypes';
import {
	consistentModulus,
	dotProduct3d,
	generatePermutationArray,
	pair3d,
	_appendFirst,
} from '../util';
import {
	gradients3D,
	maxFix,
	processPerlinOptions,
	_defaultPerlinNoise3dOptions,
} from './perlinConstants';
import type { perlinNoiseOptions3d } from './perlinTypes';

/*@__PURE__*/
const _generateGradients = (rand: () => number): readonly vector3d[] => {
	const gradients: vector3d[] = [];
	const oneOverSqrtThree = 1 / Math.sqrt(3);
	for (let index = 0; index < 256; index++) {
		const phi = rand() * Math.PI * 2;
		const theta = Math.acos(rand() * 2 - 1);

		// const theta = Math.arccos(costheta);
		const x = oneOverSqrtThree * Math.sin(theta) * Math.cos(phi);
		const y = oneOverSqrtThree * Math.sin(theta) * Math.sin(phi);
		const z = oneOverSqrtThree * Math.cos(theta);
		gradients.push([x, y, z]);
	}

	return gradients as readonly vector3d[];
};

/**
 * _permutationGenerator
 *
 *
 * @private
 * @param rand - a random number generator
 * @returns a function which takes 3d coordinates and returns a pseudo-random 3d vector
 */
/*@__INLINE__*/
const _permutationGenerator = (
	rand: () => number
): ((x: number, y: number, z: number) => Readonly<vector3d>) => {
	const gradients: readonly vector3d[] = _generateGradients(rand);
	return (x: number, y: number, z: number) =>
		gradients[pair3d(x, y, z) & 0xff];
};

/* c8 ignore start */
/**
 * _lightPermutationsGenerator
 *
 * Generates a (comparatively) memory efficient set of permutations
 *
 * @deprecated
 * @private
 * @param x - valid x input (+1)
 * @param y - valid y input (+1)
 * @param z - valid z input (+1)
 * @param random - a random number generating function
 * @returns function that takes numbers from the input ranges and returns a permuted gradient
 */
const _lightPermutationsGenerator = (
	x: number,
	y: number,
	z: number,
	random: () => number
): ((x: number, y: number, z: number) => vector3d) => {
	// new Uint32Array(x + 1).map(
	// 	(_, _index) => altHash(_index * 17 + 0xeb_c9) & 0xf_ff_ff
	// );
	const _xperms = generatePermutationArray(x + 1, random);
	_xperms[_xperms.length - 1] = _xperms[0];

	// const _yperms = new Uint32Array(y + 1).map(
	// 	(_, _index) => altHash(_index * 31 + 0x1e_c1) & 0xf_ff_ff
	// );
	const _yperms = generatePermutationArray(y + 1, random);
	_yperms[_yperms.length - 1] = _yperms[0];

	// const _zperms = new Uint32Array(z + 1).map(
	// 	(_, _index) => altHash(_index * 571 + 0xaf_1c_ab_62) & 0xf_ff_ff
	// );
	const _zperms = generatePermutationArray(z + 1, random);
	_zperms[_zperms.length - 1] = _zperms[0];

	return (x: number, y: number, z: number): vector3d =>
		gradients3D[
			// _hash(_xperms[x] + _yperms[y] + _zperms[z]) // works but is slow
			// _mix(_xperms[x], _yperms[y], _zperms[z]) // also works, also slow
			// Math.abs((_xperms[x]) ^ (_yperms[y]) ^ (_zperms[z] ) * 6967)
			// (_xperms[x] ^ _yperms[y] ^ _zperms[z]) // pretty fast but causes distinct visual artificts
			// ((_xperms[x] >> (y & 0xf)) ^ (_yperms[y] >> (z & 8)) ^ (_zperms[z] >> (x & 0xf)))  // doesn't loop but does work
			// prettier-ignore
			((_xperms[x] >> (_yperms[y] & 0x4)) ^
			(_yperms[y] >> (_zperms[z] & 0x4)) ^
			(_zperms[z] >> (_xperms[x] & 0x4))) %
			gradients3D.length
		];
};
/* c8 ignore stop */

/* c8 ignore start */
/**
 * _heavyPermutationsGenerator
 *
 * Generates a memory inefficient but fast function to return permutations
 *
 * @private
 * @deprecated
 * @param x - valid x input (+1)
 * @param y - valid y input (+1)
 * @param z - valid z input (+1)
 * @param rand - a function to generate random numbers
 * @returns function that takes numbers from the input ranges and returns a permuted gradient
 */
const _heavyPermutationsGenerator = (
	x: number,
	y: number,
	z: number,
	rand: () => number
): ((x: number, y: number, z: number) => vector3d) => {
	const _special = _appendFirst(
		Array.from({ length: x }).map(() =>
			_appendFirst(
				Array.from({ length: y }).map(() =>
					_appendFirst(
						Array.from({ length: z }).map(() => {
							// fill with gradients
							return gradients3D[
								Math.trunc(rand() * gradients3D.length)
							];
						})
					)
				)
			)
		)
	);

	return (x: number, y: number, z: number) => _special[x][y][z];
};

/* c8 ignore stop*/

/* c8 ignore start */

/**
 * _permGenerator
 *
 * generates permutations
 *
 * @deprecated
 * @param x - value
 * @param y - value
 * @param z - value
 * @param rand - random number generator
 * @param forceLow - whether to force low memory mode
 * @param forceHigh - whether to force high memory mode
 * @returns a permutation generator
 */
const _permGenerator = (
	x: number,
	y: number,
	z: number,
	rand: () => number,
	forceLow = false,
	forceHigh = false
): ((x: number, y: number, z: number) => vector3d) => {
	return _permutationGenerator(rand);
	if (!forceHigh && (forceLow || x * y * z > 256 ** 3)) {
		// too big to pregenerate
		// faster startup (for the size) but slower runtime (about half as fast)
		// space needed is O(x+y+z)
		return _lightPermutationsGenerator(x, y, z, rand);
	}
	// small enough to pregenerate
	// slower startup (for the same size) but much faster runtime (about twice as fast)
	// space needed is O(x*y*z)
	return _heavyPermutationsGenerator(x, y, z, rand);
};
/* c8 ignore stop */

/**
 * Generates a 3D perlin noise function
 *
 * @param options - configuration
 * @returns 3D perlin noise function
 */
export const perlinNoise3dFactory = (
	options?: Partial<perlinNoiseOptions3d>
): noiseFunction3d => {
	const _options = processPerlinOptions({
		..._defaultPerlinNoise3dOptions,
		...options,
	});

	const _perms = _permutationGenerator(_options.random);

	const getX0 = _options.xSize
		? (_xFloor: number) => consistentModulus(_xFloor, _options.xSize)
		: (_xFloor: number) => _xFloor;

	const getX1 = _options.xSize
		? (_x0: number) => (_x0 + 1 >= _options.xSize ? 0 : _x0 + 1)
		: (_x0: number) => _x0 + 1;

	const getY0 = _options.ySize
		? (_yFloor: number) => consistentModulus(_yFloor, _options.ySize)
		: (_yFloor: number) => _yFloor;

	const getY1 = _options.ySize
		? (_y0: number) => (_y0 + 1 >= _options.ySize ? 0 : _y0 + 1)
		: (_y0: number) => _y0 + 1;

	const getZ0 = _options.zSize
		? (_zFloor: number) => consistentModulus(_zFloor, _options.zSize)
		: (_zFloor: number) => _zFloor;

	const getZ1 = _options.zSize
		? (_z0: number) => (_z0 + 1 >= _options.zSize ? 0 : _z0 + 1)
		: (_z0: number) => _z0 + 1;

	return (x: number, y: number, z: number): number => {
		const _xFloor = Math.floor(x),
			_yFloor = Math.floor(y),
			_zFloor = Math.floor(z),
			/** integer below input x */
			_x0 = getX0(_xFloor),
			/** integer below input y */
			_y0 = getY0(_yFloor),
			/** integer below input y */
			_z0 = getZ0(_zFloor),
			/** integer below input x */
			_x1 = getX1(_x0),
			/** integer below input y */
			_y1 = getY1(_y0),
			/** integer below input y */
			_z1 = getZ1(_z0),
			/**  fractional x value */
			_xFrac = x - _xFloor,
			/**  fractional y value */
			_yFrac = y - _yFloor,
			/**  fractional z value */
			_zFrac = z - _zFloor,
			/**  fractional x value with a fade function applied */
			_xFade = _options.blendFunction(_xFrac),
			/**  fractional y value with a fade function applied */
			_yFade = _options.blendFunction(_yFrac),
			/**  fractional z value with a fade function applied */
			_zFade = _options.blendFunction(_zFrac);

		const _g000 = _perms(_x0, _y0, _z0),
			_g001 = _perms(_x0, _y0, _z1),
			_g010 = _perms(_x0, _y1, _z0),
			_g011 = _perms(_x0, _y1, _z1),
			_g100 = _perms(_x1, _y0, _z0),
			_g101 = _perms(_x1, _y0, _z1),
			_g110 = _perms(_x1, _y1, _z0),
			_g111 = _perms(_x1, _y1, _z1);

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
