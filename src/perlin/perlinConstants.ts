import { interpolationQuintic } from '../interpolation';
import type { vector2d, vector3d } from '../noiseTypes';
import { processOptions as baseOptionsProcess } from '../util';
import type {
	perlinNoiseOptions1d,
	perlinNoiseOptions2d,
	perlinNoiseOptions3d,
} from './perlinTypes';

export const _defaultPerlinNoiseOptions = {
	xSize: 0,
	blendFunction: interpolationQuintic,
	seed: 0x46_3d_1b_05,
};

/** a number which is very nearly but not quite 1 */
export const maxFix = 1 - Number.EPSILON;
/**
 * default 2d settings
 *
 * @private
 */
export const _defaultPerlinNoise2dOptions = {
	..._defaultPerlinNoiseOptions,
	ySize: _defaultPerlinNoiseOptions.xSize,
};

/**
 * default 3d settings
 *
 * @private
 */
export const _defaultPerlinNoise3dOptions = {
	..._defaultPerlinNoise2dOptions,
	zSize: _defaultPerlinNoise2dOptions.ySize,
};

/**
 * a set of 8 evenly spaced gradients from 0 to 2pi, normalized to a circle of size `1/sqrt(2)`
 *  this will cause the dot product with vectors of max length 1 to be
 *  between `[-.5, .5]` which is easily shifted to be `[0,1]`
 */
export const gradients2D = Array.from({ length: 8 })
	.map((_, _index) => {
		return ((Math.PI * 2) / 8) * _index;
	})
	.map(
		(value) =>
			[
				Math.cos(value) * Math.SQRT1_2,
				Math.sin(value) * Math.SQRT1_2,
			] as vector2d
	);

export const gradients3D: vector3d[] = [
	[0, 1 / 2, 1 / 2],
	[0, -1 / 2, 1 / 2],
	[1 / 2, 0, 1 / 2],
	[-1 / 2, 0, 1 / 2],
	[1 / 2, 1 / 2, 0],
	[-1 / 2, 1 / 2, 0],
	[0, 1 / 2, -1 / 2],
	[0, -1 / 2, -1 / 2],
	[1 / 2, 0, -1 / 2],
	[-1 / 2, 0, -1 / 2],
	[1 / 2, -1 / 2, 0],
	[-1 / 2, -1 / 2, 0],
];

/**
 * a number which is very nearly but not quite 1
 *
 * @private
 */
export const _maxFix = 1 - Number.EPSILON;

/**
 * processOptions
 *
 * process perlin noise options
 *
 * @private
 * @param options - perlin noise options
 * @returns options with the required values enforced
 */
export const processPerlinOptions = <
	t extends perlinNoiseOptions1d | perlinNoiseOptions2d | perlinNoiseOptions3d
>(
	options: t
): Required<t> => {
	return baseOptionsProcess(options);
};
