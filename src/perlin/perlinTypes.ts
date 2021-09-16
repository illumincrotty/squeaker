import type {
	baseNoiseOptions1d,
	baseNoiseOptions3d,
	baseNoiseOptions2d,
} from '../noiseTypes';

/**
 * base perlin noise settings
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface perlinOptions {}

/**
 * 1d perlin noise settings
 */

export interface perlinNoiseOptions1d
	extends baseNoiseOptions1d,
		perlinOptions {}

/**
 * 2d perlin noise settings
 */
export interface perlinNoiseOptions2d
	extends perlinNoiseOptions1d,
		baseNoiseOptions2d {}

/**
 * 3d perlin noise settings
 */
export interface perlinNoiseOptions3d
	extends perlinNoiseOptions2d,
		baseNoiseOptions3d {}
