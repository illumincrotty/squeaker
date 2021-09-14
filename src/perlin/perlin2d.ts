import { interpolate2d } from '../interpolation';
import type { noiseFunction2d, vector2d } from '../noiseTypes';
import {
	consistentModulus,
	dotProduct2d,
	generatePermutationArray,
	getRandomLargePrime,
	largePrimes,
	pair2d,
	shuffle,
	_appendFirst,
} from '../util';
import {
	gradients2D,
	maxFix,
	processPerlinOptions,
	_defaultPerlinNoise2dOptions,
} from './perlinConstants';
import type { perlinNoiseOptions2d } from './perlinTypes';

// TODO remove old permutation functions
/* c8 ignore start */

/**
 * _lightPermutationsGenerator
 *
 * Generates a (comparatively) memory efficient set of permutations
 *
 * @private
 * @param x - valid x input (+1)
 * @param y - valid y input (+1)
 * @param random - a random number generating function
 * @returns function that takes numbers from the input ranges and returns a permuted gradient
 */
const _lightPermutationsGenerator = (
	x: number,
	y: number,
	random: () => number
): ((x: number, y: number) => vector2d) => {
	const _xperms = generatePermutationArray(x + 1, random);
	_xperms[_xperms.length - 1] = _xperms[0];

	// const _yperms = new Uint32Array(y + 1).map(
	// 	(_, _index) => altHash(_index * 31 + 0x1e_c1) & 0xf_ff_ff
	// );
	const _yperms = generatePermutationArray(y + 1, random);
	_yperms[_yperms.length - 1] = _yperms[0];

	return (x: number, y: number) =>
		gradients2D[
			// prettier-ignore
			// _hash(_xperms[x] + _yperms[y] + _zperms[z]) // works but is slow
			// _mix(_xperms[x], _yperms[y], _zperms[z]) // also works, also slow
			// Math.abs((_xperms[x]) ^ (_yperms[y]) ^ (_zperms[z] ) * 6967)
			// (_xperms[x] ^ _yperms[y] ^ _zperms[z]) // pretty fast but causes distinct visual artificts
			// ((_xperms[x] >> (y & 0xf)) ^ (_yperms[y] >> (z & 8)) ^ (_zperms[z] >> (x & 0xf)))  // doesn't loop but does work
			((_xperms[x] >> (_yperms[y] & 0x4)) ^
			(_yperms[y] >> (_xperms[x] & 0x4)) )
			% gradients2D.length
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
 * @param x - valid x input (+1)
 * @param y - valid y input (+1)
 * @param rand - a function to generate random numbers
 * @returns function that takes numbers from the input ranges and returns a permuted gradient
 */
const _heavyPermutationsGenerator = (
	x: number,
	y: number,
	rand: () => number
): ((x: number, y: number) => vector2d) => {
	const _special = _appendFirst(
		Array.from({ length: x }).map(() =>
			_appendFirst(
				Array.from({ length: y }).map(
					() => gradients2D[Math.trunc(rand() * gradients2D.length)]
				)
			)
		)
	);

	return (x: number, y: number) => _special[x][y];
};
/* c8 ignore stop*/

/**
 * _permutationGenerator
 *
 * generates permutations
 *
 * @private
 * @param rand - random number generator
 * @returns a function which converts coordinates into pseduo-random vectors
 */
const _permutationGenerator = (
	rand: () => number
): ((x: number, y: number) => vector2d) => {
	const _primeMultiplier = getRandomLargePrime(rand);
	const _scale = Math.SQRT1_2;
	const _size = 0xf_ff;
	const _primes: vector2d[] = shuffle(largePrimes, Math.random)
		.slice(0, _size + 1)
		.map((prime) => [
			Math.cos(prime % (Math.PI * 2)) * _scale,
			Math.sin(prime % (Math.PI * 2)) * _scale,
		]);

	return (x: number, y: number) => _primes[pair2d(x, y) % _size];
};

/**
 * Generates a 2D perlin noise function
 *
 * @param options - The generation settings
 * @returns 2D perlin noise function
 */
export const perlinNoise2dFactory = (
	options?: Partial<perlinNoiseOptions2d>
): noiseFunction2d => {
	// use input options first,
	// then fallback on default options,
	const _options = processPerlinOptions({
		..._defaultPerlinNoise2dOptions,
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

	const getY1 = _options.xSize
		? (_y0: number) => (_y0 + 1 >= _options.ySize ? 0 : _y0 + 1)
		: (_y0: number) => _y0 + 1;

	// actual perlin noise function
	return (x: number, y: number): number => {
		const _xFloor = Math.floor(x),
			_yFloor = Math.floor(y),
			/** integer below input x */
			_x0 = getX0(_xFloor),
			/** integer below input y */
			_y0 = getY0(_yFloor),
			/** integer above input x */
			_x1 = getX1(_x0),
			/** integer above input y */
			_y1 = getY1(_y0),
			/**  fractional x value */
			_xFrac = x - _xFloor,
			/**  fractional y value */
			_yFrac = y - _yFloor,
			/**  fractional x value with a fade function applied */
			_xFade = _options.blendFunction(_xFrac),
			/**  fractional y value with a fade function applied */
			_yFade = _options.blendFunction(_yFrac);

		const /**  gradient vector bottom left */
			_g00 = _perms(_x0, _y0),
			/**  gradient vector top left */
			_g01 = _perms(_x0, _y1),
			/**  gradient vector bottom right */
			_g10 = _perms(_x1, _y0),
			/**  gradient vector top right */
			_g11 = _perms(_x1, _y1);

		const /**  dot product of bottom left corner gradient and the vector to the input point from that corner */
			_n00 = dotProduct2d(_g00, [_xFrac, _yFrac]),
			/**  dot product of top left corner gradient and the vector to the input point from that corner */
			_n01 = dotProduct2d(_g01, [_xFrac, _yFrac - 1]),
			/**  dot product of bottom right corner gradient and the vector to the input point from that corner */
			_n10 = dotProduct2d(_g10, [_xFrac - 1, _yFrac]),
			/**  dot product of top right corner gradient and the vector to the input point from that corner */
			_n11 = dotProduct2d(_g11, [_xFrac - 1, _yFrac - 1]);

		const _nxy = interpolate2d(_n00, _n01, _n10, _n11, _xFade, _yFade);

		// shift up and limit the max so instead of going to 1, it only goes to extremely slightly below 1
		// without shift the output is [-.5, .5] and with shift and limit it's [0,1)
		return Math.min(_nxy + 0.5, maxFix);
	};
};
