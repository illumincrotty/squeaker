import type { vector2d } from './util';

export type interpolationFunction = (t: number) => number;

/**
 * General Interpolation
 *
 * @param start - start value (integer)
 * @param end - end value (integer)
 * @param mid - a value in domain [0,1]
 * @param interpolateFunction - an interpolation function, defaults to linear interpolation
 * @returns a number between start and end
 */
export const interpolate = (
	start: number,
	end: number,
	mid: number,
	interpolateFunction: interpolationFunction = interpolationLinear
): number => {
	const value = interpolateFunction(mid);
	return start * (1 - value) + end * value;
};

/**
 * linearInterpolation.
 *
 * @param t - a value in domain `[0,1]`
 * @returns the same input value
 */
export const interpolationLinear: interpolationFunction = (t: number): number =>
	t;

/**
 * Hermite blending function
 * uses f(t) = 3t^2-2t^3
 *
 * @param t - a value between 0 and 1
 * @returns a value between 0 and 1
 * @example
 */
export const interpolationHermite: interpolationFunction = (
	t: number
): number => t * t * (3 - 2 * t);

/**
 * Quintic blending function
 * uses f(t) = 6t^5-15t^4+10t^3
 *
 * @param t - a value between 0 and 1
 * @returns a value between 0 and 1
 * @example
 */
export const interpolationQuintic: interpolationFunction = (
	t: number
): number => t ** 3 * (10 + t * (-15 + t * 6));

/**
 * Takes the dot product of two vectors
 *
 * ___order does not matter___
 *
 * @param vectorA - a given 2D vector
 * @param vectorB - a given 2D vector
 * @returns scalar value
 */
export const dotProduct = (vectorA: vector2d, vectorB: vector2d): number => {
	return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
};

// export const bilinearInterpolation = (
// 	zeroZero: vector2d,
// 	zeroOne: vector2d,
// 	oneZero: vector2d,
// 	oneOne: vector2d,
// 	postition: vector2d
// ) => {
// 	return 1;
// };
