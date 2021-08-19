import type { interpolationFunction } from './interpolation';
import { interpolate, interpolationQuintic } from './interpolation';
import { aleaFactory } from './randomFunctions';
import type { vector2d } from './util';
import { consistentModulus, dotProduct, rangeGenerator } from './util';

interface noiseFunction1d {
	/**
	 * 1D Noise
	 *
	 * @param x - positive or negative
	 * @returns a number in range `[0,1)`
	 */
	(x: number): number;
}

interface noiseFunction2d {
	/**
	 * 2D Noise
	 *
	 * @param x - positive or negative
	 * @param y - positive or negative
	 * @returns a number in range `[0,1)`
	 */
	(x: number, y: number): number;
}

export interface noiseFunction3d {
	/**
	 * 3D Noise
	 *
	 * @param x - positive or negative
	 * @param y - positive or negative
	 * @param z - positive or negative
	 * @returns a number in range `[0,1)`
	 */
	(x: number, y: number, z: number): number;
}

export interface noiseFunction4d {
	/**
	 * 4D Noise
	 *
	 * @param x - positive or negative
	 * @param y - positive or negative
	 * @param z - positive or negative
	 * @param w - positive or negative
	 * @returns a number in range `[0,1)`
	 */
	(x: number, y: number, z: number, w: number): number;
}

const _twoBytes = 0xff;

// /**
//  * Smooth pseduo random noise generator creator
//  *
//  * @param dimensions - the number of dimensions of the perlin noise
//  * @param seed - the seed to use for the noise generations
//  * @returns smooth pseduo random noise generator
//  * @throws range error if invalid number of dimensions
//  */
// const PerlinNoiseFactory = (dimensions: 1 | 2 | 3 | 4) => {
// 	switch (dimensions) {
// 		case 1: {
// 			return perlinNoise1dFactory;
// 		}
// 		case 2: {
// 			return perlinNoise2dFactory;
// 		}
// 		case 3: {
// 			break;
// 		}
// 		case 4: {
// 			break;
// 		}
// 		default:
// 			throw new RangeError('invalid number of dimensions');
// 	}
// };

export type perlinNoiseOptions1d = {
	/** The seed used to generate the noise*/
	seed?: number;
	/** the x size before the noise starts to loop */
	domain?: number;
	/** the function used to smooth the noise, defaults to Quintic blending */
	blendFunction?: interpolationFunction;
};

const _defaultPerlinNoiseOptions = {
	domain: 256,
	blendFunction: interpolationQuintic,
};
/**
 * One dimensional perlin noise factory
 *
 * @param options - the settings for the noise
 * @returns one dimensional perlin noise function
 */
export const perlinNoise1dFactory = (
	options: perlinNoiseOptions1d = _defaultPerlinNoiseOptions
): noiseFunction1d => {
	const _options = {
		..._defaultPerlinNoiseOptions,
		...options,
	};

	const _random = aleaFactory(
		...(_options.seed ? [_options.seed.toString(10)] : [])
	).random;

	const _randomValues = new Uint8Array(_options.domain).map(
		(_, _index) => _random() * _twoBytes
	);

	// console.log(_randomValues);

	return (x: number): number => {
		const xModulus = x % _options.domain;
		const xFloor = Math.floor(xModulus);
		const xCeil = xFloor + 1;
		return (
			interpolate(
				_randomValues[xFloor],
				_randomValues[xCeil % _options.domain],
				xModulus - xFloor,
				_options.blendFunction
			) / _twoBytes
		);
	};
};

/** 2d perlin noise settings */
export type perlinNoiseOptions2d = perlinNoiseOptions1d & {
	range?: number;
};

/**
 * default 2d settings
 *
 * @private
 */
const _perlinNoise2dOptions = {
	..._defaultPerlinNoiseOptions,
	/** the y size before the noise starts to loop */
	range: _defaultPerlinNoiseOptions.domain,
};

/**
 * a set of 8 evenly spaced gradients from 0 to 2pi and normalized to a circle of size `1/sqrt(2)`
 *  this will cause the dot product with vectors of max length 1 to be
 *  between `[-.5, .5]` which is easily shifted to be `[0,1]`
 */
const _gradients: vector2d[] = [
	...rangeGenerator({
		start: 0,
		end: Math.PI * 2,
		step: (Math.PI * 2) / 8,
	}),
].map((value) => ({
	x: Math.cos(value) * Math.SQRT1_2,
	y: Math.sin(value) * Math.SQRT1_2,
}));

/** a number which is very nearly but not quite 1 */
const _maxFix = 1 - Number.EPSILON;

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
		..._perlinNoise2dOptions,
		...options,
	};

	/** random function with either the input seed or the alea generated seed */
	const _random = aleaFactory(
		...(_options.seed ? [_options.seed.toString(10)] : [])
	).random;

	/** A 2D array of size domain X range filled with pseudo-randomly assigned 2D vectors from the gradient table */
	const _perms = [...rangeGenerator({ start: 0, end: _options.domain })].map(
		() =>
			[...rangeGenerator({ start: 0, end: _options.range })].map(
				() => _gradients[Math.trunc(_random() * _gradients.length)]
			)
	);

	// actual perlin noise function
	return (x: number, y: number): number => {
		const /** integer below input x */ _x0 = consistentModulus(
				Math.floor(x),
				_options.domain
			),
			/** integer below input y */
			_y0 = consistentModulus(Math.floor(y), _options.range),
			/** integer above input x */
			_x1 = (_x0 + 1) % _options.domain,
			/** integer above input y */
			_y1 = (_y0 + 1) % _options.range,
			/**  fractional x value */
			_u = consistentModulus(x, _options.domain) - _x0,
			/**  fractional y value */
			_v = consistentModulus(y, _options.range) - _y0;

		const /**  gradient vector bottom left */
			_g00 = _perms[_x0][_y0],
			/**  gradient vector top left */
			_g01 = _perms[_x0][_y1],
			/**  gradient vector bottom right */
			_g10 = _perms[_x1][_y0],
			/**  gradient vector top right */
			_g11 = _perms[_x1][_y1];

		const /**  dot product of bottom left corner gradient and the vector to the input point from that corner */
			_n00 = dotProduct(_g00, {
				x: _u,
				y: _v,
			}),
			/**  dot product of top left corner gradient and the vector to the input point from that corner */
			_n01 = dotProduct(_g01, {
				x: _u,
				y: _v - 1,
			}),
			/**  dot product of bottom right corner gradient and the vector to the input point from that corner */
			_n10 = dotProduct(_g10, {
				x: _u - 1,
				y: _v,
			}),
			/**  dot product of top right corner gradient and the vector to the input point from that corner */
			_n11 = dotProduct(_g11, {
				x: _u - 1,
				y: _v - 1,
			});

		const /** interpolated value of bottom left dot product and bottom right dot product with respect to x */
			_nx0 = interpolate(_n00, _n10, _u, _options.blendFunction),
			/** interpolated value of top middle value of top left dot product and top right dot product with respect to x */
			_nx1 = interpolate(_n01, _n11, _u, _options.blendFunction),
			/** interpolated value of bottom interpolant and top interpolant with respect to y */
			_nxy = interpolate(_nx0, _nx1, _v, _options.blendFunction);

		// shift up and limit the max so instead of going to 1, it only goes to extremely slightly below 1
		// without shift the output is [-.5, .5] and with shift and limit it's [0,1)
		return Math.min(_nxy + 0.5, _maxFix);
	};
};
