import type { interpolationFunction } from '../noiseTypes';

export interface perlinNoiseOptions1d {
	/** The seed used to generate the noise*/
	seed?: number;
	/** the x size before the noise starts to loop */
	xSize?: number;
	/** the function used to smooth the noise, defaults to Quintic blending */
	blendFunction?: interpolationFunction;
	/** a function to generate random numbers, takes priority over seed if both exist */
	random?: () => number;
}

/** 2d perlin noise settings */
export interface perlinNoiseOptions2d extends perlinNoiseOptions1d {
	/** the y size before the noise starts to loop */
	ySize?: number;
}

export interface perlinNoiseOptions3d extends perlinNoiseOptions2d {
	/** the z size before the noise starts to loop */
	zSize?: number;
	_forceHighMemoryMode?: boolean;
	_forceLowMemoryMode?: boolean;
}
