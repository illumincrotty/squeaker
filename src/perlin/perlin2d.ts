import { interpolate2d } from '../interpolation';
import type { noiseFunction2d, vector2d } from '../noiseTypes';
import {
	consistentModulus,
	dotProduct2d,
	getRandomLargePrime,
	largePrimes,
	pair2d,
	shuffle,
	_appendFirst,
} from '../util';
import {
	processPerlinOptions,
	_defaultPerlinNoise2dOptions,
} from './perlinConstants';
import type { perlinNoiseOptions2d } from './perlinTypes';

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
	const _primes: vector2d[] = shuffle(largePrimes, rand)
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
	// then fallback on default options
	const _options = processPerlinOptions({
		..._defaultPerlinNoise2dOptions,
		...options,
	});

	const _perms = _permutationGenerator(_options.random);

	const _getX0 = _options.xSize
		? (_xFloor: number) => consistentModulus(_xFloor, _options.xSize)
		: (_xFloor: number) => _xFloor;

	const _getX1 = _options.xSize
		? (_x0: number) => (_x0 + 1 >= _options.xSize ? 0 : _x0 + 1)
		: (_x0: number) => _x0 + 1;

	const _getY0 = _options.ySize
		? (_yFloor: number) => consistentModulus(_yFloor, _options.ySize)
		: (_yFloor: number) => _yFloor;

	const _getY1 = _options.ySize
		? (_y0: number) => (_y0 + 1 >= _options.ySize ? 0 : _y0 + 1)
		: (_y0: number) => _y0 + 1;

	// actual perlin noise function
	return (x: number, y: number): number => {
		const _xFloor = Math.floor(x),
			_yFloor = Math.floor(y),
			/**  fractional x value */
			_xFrac = x - _xFloor,
			/**  fractional y value */
			_yFrac = y - _yFloor,
			/**  fractional x value with a fade function applied */
			_xFade = _options.blendFunction(_xFrac),
			/**  fractional y value with a fade function applied */
			_yFade = _options.blendFunction(_yFrac),
			/** integer below input x */
			_x0 = _getX0(_xFloor),
			/** integer below input y */
			_y0 = _getY0(_yFloor),
			/** integer above input x */
			_x1 = _getX1(_x0),
			/** integer above input y */
			_y1 = _getY1(_y0);

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
		return _nxy + 0.5;
	};
};
