import { interpolate } from '../interpolation';
import type { noiseFunction2d, vector2d } from '../noiseTypes';
import { aleaFactory } from '../random/randomIndex';
import { consistentModulus, dotProduct2d, rangeGenerator } from '../util';
import {
	gradients2D,
	maxFix,
	_defaultPerlinNoise2dOptions,
} from './perlinConstants';
import type { perlinNoiseOptions2d } from './perlinTypes';

/**
 * Generates a 2D perlin noise function
 *
 * @param options - The generation settings
 * @returns 2D perlin noise function
 */
export const perlinNoise2dFactory = (
	options?: perlinNoiseOptions2d
): noiseFunction2d => {
	// use input options first,
	// then fallback on default options,
	const _options = {
		..._defaultPerlinNoise2dOptions,
		...options,
	};

	if (options && options.seed) {
		_options.random = aleaFactory(options.seed.toString(10)).random;
	}

	/**
	 * A 2D array of size domain +1 X range +1 filled with pseudo-randomly assigned 2D vectors from the gradient table
	 *
	 * The last values of each row are the same as the first, and the last row is the same as the first. This means you can mod by domain or range and add 1 and still be in a valid spot
	 */
	const _perms = ((): vector2d[][] => {
		const _temporary = [
			...rangeGenerator({ start: 0, end: _options.xSize }),
		]
			.map(() =>
				[...rangeGenerator({ start: 0, end: _options.ySize })].map(
					() =>
						gradients2D[
							Math.trunc(_options.random() * gradients2D.length)
						]
				)
			)
			.map((row) => [...row, row[0]]);
		return [..._temporary, _temporary[0]];
	})();

	// actual perlin noise function
	return (x: number, y: number): number => {
		const _xFloor = Math.floor(x),
			_yFloor = Math.floor(y),
			/** integer below input x */
			_x0 = consistentModulus(_xFloor, _options.xSize),
			/** integer below input y */
			_y0 = consistentModulus(_yFloor, _options.ySize),
			/** integer above input x */
			_x1 = _x0 + 1,
			/** integer above input y */
			_y1 = _y0 + 1,
			/**  fractional x value */
			_u = x - _xFloor,
			/**  fractional y value */
			_v = y - _yFloor,
			/**  fractional x value with a fade function applied */
			_xFade = interpolate(0, 1, _u, _options.blendFunction),
			/**  fractional y value with a fade function applied */
			_yFade = interpolate(0, 1, _v, _options.blendFunction);

		const /**  gradient vector bottom left */
			_g00 = _perms[_x0][_y0],
			/**  gradient vector top left */
			_g01 = _perms[_x0][_y1],
			/**  gradient vector bottom right */
			_g10 = _perms[_x1][_y0],
			/**  gradient vector top right */
			_g11 = _perms[_x1][_y1];

		const /**  dot product of bottom left corner gradient and the vector to the input point from that corner */
			_n00 = dotProduct2d(_g00, {
				x: _u,
				y: _v,
			}),
			/**  dot product of top left corner gradient and the vector to the input point from that corner */
			_n01 = dotProduct2d(_g01, {
				x: _u,
				y: _v - 1,
			}),
			/**  dot product of bottom right corner gradient and the vector to the input point from that corner */
			_n10 = dotProduct2d(_g10, {
				x: _u - 1,
				y: _v,
			}),
			/**  dot product of top right corner gradient and the vector to the input point from that corner */
			_n11 = dotProduct2d(_g11, {
				x: _u - 1,
				y: _v - 1,
			});

		const /** interpolated value of bottom left dot product and bottom right dot product with respect to x */
			_nx0 = interpolate(_n00, _n10, _xFade),
			/** interpolated value of top middle value of top left dot product and top right dot product with respect to x */
			_nx1 = interpolate(_n01, _n11, _xFade),
			/** interpolated value of bottom interpolant and top interpolant with respect to y */
			_nxy = interpolate(_nx0, _nx1, _yFade);

		// shift up and limit the max so instead of going to 1, it only goes to extremely slightly below 1
		// without shift the output is [-.5, .5] and with shift and limit it's [0,1)
		return Math.min(_nxy + 0.5, maxFix);
	};
};

export const perlin2d = perlinNoise2dFactory();
