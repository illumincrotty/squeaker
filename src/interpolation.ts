import type { interpolationFunction } from './noiseTypes';

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
 * Linear Interpolation
 *
 * @param start - start value (integer)
 * @param end - end value (integer)
 * @param mid - a value in domain [0,1]
 * @returns a number between start and end
 */
export const interpolateLinear = (
	start: number,
	end: number,
	mid: number
): number => {
	return start * (1 - mid) + end * mid;
};

/**
 * Async linear Interpolation
 *
 * @param start - start value (integer)
 * @param end - end value (integer)
 * @param mid - a value in domain [0,1]
 * @returns a number between start and end
 */
export const interpolateAsync = async (
	start: Promise<number>,
	end: Promise<number>,
	mid: number
): Promise<number> => {
	return Promise.resolve((await start) * (1 - mid) + (await end) * mid);
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
export const interpolationQuintic: interpolationFunction = (t: number) =>
	t * t * t * (10 + t * (-15 + t * 6));
