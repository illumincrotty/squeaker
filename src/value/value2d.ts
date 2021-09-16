import { interpolate2d } from '../interpolation';
import type { noiseFunction2d } from '../noiseTypes';
import { consistentModulus, hash, pair2d, processOptions } from '../util';
import { _defaultValueNoiseOptions2d } from './valueConstants';
import type { valueNoiseOptions2d } from './valueTypes';

/**
 * _permGenerator
 *
 * generates permutations
 *
 * @private
 * @param rand - a random number generator
 * @returns a function which takes 2d coordinates and returns a pseduo-random value
 */
const _permGenerator = (
	rand: () => number
): ((x: number, y: number) => number) => {
	const rands = new Float32Array(0xff + 1).map(() => rand());

	return (x: number, y: number) => rands[hash(pair2d(x, y)) & 0xff];
};

/**
 * Generates a 2D value noise function
 *
 * @param options - The generation settings
 * @returns 2D value noise function
 */
export const valueNoise2dFactory = (
	options?: Partial<valueNoiseOptions2d>
): noiseFunction2d => {
	const _options = processOptions({
		..._defaultValueNoiseOptions2d,
		...options,
	});

	const _perms = _permGenerator(_options.random);

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

	return (x: number, y: number): number => {
		const _xFloor = Math.floor(x),
			_yFloor = Math.floor(y),
			_x0 = getX0(_xFloor),
			/** integer below input y */
			_y0 = getY0(_yFloor),
			/** integer above input x */
			_x1 = getX1(_x0),
			/** integer above input y */
			_y1 = getY1(_y0),
			/**  fractional x value with a fade function applied */
			_xFade = _options.blendFunction(x - _xFloor),
			/**  fractional y value with a fade function applied */
			_yFade = _options.blendFunction(y - _yFloor);

		return interpolate2d(
			_perms(_x0, _y0),
			_perms(_x0, _y1),
			_perms(_x1, _y0),
			_perms(_x1, _y1),
			_xFade,
			_yFade
		);
	};
};
