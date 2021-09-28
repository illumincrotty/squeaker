/**
 * noiseFunction1d
 *
 * the interface of a 1d noise function
 */
/*@__INLINE__*/
export interface noiseFunction1d {
	/**
	 *
	 * 1D Noise
	 *
	 * @param x - positive or negative
	 * @returns a number in range `[0,1)` like Math.random()
	 */
	(x: number): number;
}

/**
 * noiseFunction2d
 *
 * the interface of a 2d noise function
 */
/*@__INLINE__*/
export interface noiseFunction2d {
	/**
	 * 2D Noise
	 *
	 * @param x - positive or negative
	 * @param y - positive or negative
	 * @returns a number in range `[0,1)` like Math.random()
	 */
	(x: number, y: number): number;
}

/**
 * noiseFunction3d
 *
 * the interface of a 3d noise function
 */
/*@__INLINE__*/
export interface noiseFunction3d {
	/**
	 * 3D Noise
	 *
	 * @param x - positive or negative
	 * @param y - positive or negative
	 * @param z - positive or negative
	 * @returns a number in range `[0,1)` like Math.random()
	 */

	(x: number, y: number, z: number): number;
}
/**
 * noiseFunction4d
 *
 * the interface of a 4d noise function
 */
/*@__INLINE__*/
export interface noiseFunction4d {
	/**
	 * 4D Noise
	 *
	 * @param x - positive or negative
	 * @param y - positive or negative
	 * @param z - positive or negative
	 * @param w - positive or negative
	 * @returns a number in range `[0,1)` like Math.random()
	 */
	(x: number, y: number, z: number, w: number): number;
}

/**
 * interpolationFunction
 *
 * the interface of an interpolation function
 */
/*@__INLINE__*/
export interface interpolationFunction {
	/**
	 * Interpolation function
	 *
	 * @param t - a number in range [0,1]
	 * @returns a number in range [0,1]
	 */
	(t: number): number;
}
/**
 * baseNoiseOptions1d
 *
 * the noise factory options common to all noise factories of at least 1 dimension
 */
export interface baseNoiseOptions1d {
	/**
	 * The seed used to generate the noise
	 */
	seed?: number | string;
	/**
	 * the x size before the noise starts to loop, 0 or undefined are infinite
	 */
	xSize: number;
	/**
	 * the function used to smooth the noise, defaults to Quintic blending
	 */
	blendFunction?: interpolationFunction;
	/**
	 * a function to generate random numbers, takes priority over seed if both exist
	 */
	random?: () => number;
}

/**
 * baseNoiseOptions2d
 *
 * the noise factory options common to all noise factories of at least 2 dimensions
 */
export interface baseNoiseOptions2d extends baseNoiseOptions1d {
	/**
	 * the y size before the noise starts to loop, 0 or undefined are infinite
	 */
	/**
	 * Name: ySize
	 */
	ySize: number;
}

/**
 * baseNoiseOptions3d
 *
 * the noise factory options common to all noise factories of at least 3 dimensions
 */
export interface baseNoiseOptions3d extends baseNoiseOptions2d {
	/**
	 * the z size before the noise starts to loop, 0 or undefined are infinite
	 */
	zSize: number;
}

/**
 * baseNoiseOptions4d
 *
 * the noise factory options common to all noise factories of at least 4 dimensions
 */
export interface baseNoiseOptions4d extends baseNoiseOptions3d {
	/**
	 * the z size before the noise starts to loop, 0 or undefined are infinite
	 */
	wSize: number;
}

/**
 * vectorArray3d
 *
 * the shape of a 3d vector
 */
export type vector3d = readonly [x: number, y: number, z: number];
/**
 * vectorArray2d
 *
 * the shape of a 2d vector
 */
export type vector2d = readonly [x: number, y: number];
