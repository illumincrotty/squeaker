import { interpolationQuintic } from '../interpolation';
import type { vector2d, vectorArray3d } from '../noiseTypes';
import { aleaFactory } from '../random/randomIndex';
import { rangeGenerator } from '../util';
import type { vector3d } from '../noiseTypes';

export const _defaultPerlinNoiseOptions = {
	xSize: 256,
	blendFunction: interpolationQuintic,
	random: aleaFactory('38hril;l]-[').random,
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
export const gradients2D: vector2d[] = [
	...rangeGenerator({
		start: 0,
		end: Math.PI * 2,
		step: (Math.PI * 2) / 8,
	}),
].map((value) => ({
	x: Math.cos(value) * Math.SQRT1_2,
	y: Math.sin(value) * Math.SQRT1_2,
}));

export const gradients3D: vector3d[] = [
	{ x: 0, y: 1 / 2, z: 1 / 2 },
	{ x: 0, y: -1 / 2, z: 1 / 2 },
	{ x: 1 / 2, y: 0, z: 1 / 2 },
	{ x: -1 / 2, y: 0, z: 1 / 2 },
	{ x: 1 / 2, y: 1 / 2, z: 0 },
	{ x: -1 / 2, y: 1 / 2, z: 0 },
	{ x: 0, y: 1 / 2, z: -1 / 2 },
	{ x: 0, y: -1 / 2, z: -1 / 2 },
	{ x: 1 / 2, y: 0, z: -1 / 2 },
	{ x: -1 / 2, y: 0, z: -1 / 2 },
	{ x: 1 / 2, y: -1 / 2, z: 0 },
	{ x: -1 / 2, y: -1 / 2, z: 0 },
];

export const gradients3DArray: vectorArray3d[] = [
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
