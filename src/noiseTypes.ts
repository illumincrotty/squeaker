export interface noiseFunction1d {
	/**
	 * 1D Noise
	 *
	 * @param x - positive or negative
	 * @returns a number in range `[0,1)` like Math.random()
	 */
	(x: number): number;
}

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

export interface interpolationFunction {
	(t: number): number;
}

export interface vector2d {
	x: number;
	y: number;
}
export interface vector3d extends vector2d {
	z: number;
}

export type vectorArray3d = [x: number, y: number, z: number];
export type vectorArray2d = [x: number, y: number, z: number];
