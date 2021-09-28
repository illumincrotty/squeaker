import type { interpolationFunction } from './noiseTypes';

/**
 * General Interpolation
 *
 * @param start - start value (integer)
 * @param end - end value (integer)
 * @param mid - a value in domain [0,1]
 * @returns a number between start and end
 */
/*@__PURE__*/
/*@__INLINE__*/
export const interpolate = (start: number, end: number, mid: number): number =>
	start * (1 - mid) + end * mid;

/**
 * Bilinear interpolation
 *
 * the p inputs are the values at relative points
 *
 * @param p00 - the value from relative position `(x+0, y+0)`
 * @param p01 - the value from relative position `(x+0, y+1)`
 * @param p10 - the value from relative position `(x+1, y+0)`
 * @param p11 - the value from relative position `(x+1, y+1)`
 * @param xMid - a fractional position between the x values [0,1]
 * @param yMid - a fractional position between the y values [0,1]
 * @returns the interpolated value
 */
export const interpolate2d = (
	p00: number,
	p01: number,
	p10: number,
	p11: number,
	xMid: number,
	yMid: number
): number => {
	return interpolate(
		interpolate(p00, p10, xMid),
		interpolate(p01, p11, xMid),
		yMid
	);
};

/**
 * Trilinear interpolation
 *
 * the p inputs are the values at relative points
 *
 * @param p000 - the value from relative position `(x+0, y+0, z+0)`
 * @param p001 - the value from relative position `(x+0, y+0, z+1)`
 * @param p010 - the value from relative position `(x+0, y+1, z+0)`
 * @param p011 - the value from relative position `(x+0, y+1, z+1)`
 * @param p100 - the value from relative position `(x+1, y+0, z+0)`
 * @param p101 - the value from relative position `(x+1, y+0, z+1)`
 * @param p110 - the value from relative position `(x+1, y+1, z+0)`
 * @param p111 - the value from relative position `(x+1, y+1, z+1)`
 * @param xMid - the fractional position between the x values [0,1]
 * @param yMid - the fractional position between the y values [0,1]
 * @param zMid - the fractional position between the z values [0,1]
 * @returns the interpolated value
 */
/*@__PURE__*/
export const interpolate3d = (
	p000: number,
	p001: number,
	p010: number,
	p011: number,
	p100: number,
	p101: number,
	p110: number,
	p111: number,
	xMid: number,
	yMid: number,
	zMid: number
): number =>
	interpolate(
		interpolate2d(p000, p010, p100, p110, xMid, yMid),
		interpolate2d(p001, p011, p101, p111, xMid, yMid),
		zMid
	);

/**
 * Quadralinear interpolation
 *
 * the p inputs are the values at relative points
 *
 * @param p0000 - the value from relative position `(x+0, y+0, z+0, w+0)`
 * @param p0001 - the value from relative position `(x+0, y+0, z+0, w+1)`
 * @param p0010 - the value from relative position `(x+0, y+0, z+1, w+0)`
 * @param p0011 - the value from relative position `(x+0, y+0, z+1, w+1)`
 * @param p0100 - the value from relative position `(x+0, y+1, z+0, w+0)`
 * @param p0101 - the value from relative position `(x+0, y+1, z+0, w+1)`
 * @param p0110 - the value from relative position `(x+0, y+1, z+1, w+0)`
 * @param p0111 - the value from relative position `(x+0, y+1, z+1, w+1)`
 * @param p1000 - the value from relative position `(x+1, y+0, z+0, w+0)`
 * @param p1001 - the value from relative position `(x+1, y+0, z+0, w+1)`
 * @param p1010 - the value from relative position `(x+1, y+0, z+1, w+0)`
 * @param p1011 - the value from relative position `(x+1, y+0, z+1, w+1)`
 * @param p1100 - the value from relative position `(x+1, y+1, z+0, w+0)`
 * @param p1101 - the value from relative position `(x+1, y+1, z+0, w+1)`
 * @param p1110 - the value from relative position `(x+1, y+1, z+1, w+0)`
 * @param p1111 - the value from relative position `(x+1, y+1, z+1, w+1)`
 * @param xMid - the fractional position between the x values [0,1]
 * @param yMid - the fractional position between the y values [0,1]
 * @param zMid - the fractional position between the z values [0,1]
 * @param wMid - the fractional position between the w values [0,1]
 * @returns the interpolated value
 */
/*@__PURE__*/
export const interpolate4d = (
	p0000: number,
	p0001: number,
	p0010: number,
	p0011: number,
	p0100: number,
	p0101: number,
	p0110: number,
	p0111: number,
	p1000: number,
	p1001: number,
	p1010: number,
	p1011: number,
	p1100: number,
	p1101: number,
	p1110: number,
	p1111: number,
	xMid: number,
	yMid: number,
	zMid: number,
	wMid: number
): number =>
	interpolate(
		interpolate3d(
			p0000,
			p0010,
			p0100,
			p0110,
			p1000,
			p1010,
			p1100,
			p1110,
			xMid,
			yMid,
			zMid
		),
		interpolate3d(
			p0001,
			p0011,
			p0101,
			p0111,
			p1001,
			p1011,
			p1101,
			p1111,
			xMid,
			yMid,
			zMid
		),
		wMid
	);

/**
 * Linear Interpolation aka LERP
 *
 * No smoothing, causes artifacts but is slightly faster
 * Uses f(t) = t, pretty simple
 *
 * @param t - a value in domain `[0,1]`
 * @returns the same input value
 */
/*@__PURE__*/
/*@__INLINE__*/
export const interpolationLinear: interpolationFunction = (t: number): number =>
	t;

/**
 * Hermite blending function
 * uses f(t) = 3t²-2t³
 *
 * @param t - a value between 0 and 1
 * @returns a value between 0 and 1
 * @example
 */
/*@__PURE__*/
export const interpolationHermite: interpolationFunction = (
	t: number
): number => t * t * (3 - 2 * t);

/**
 * Quintic blending function
 * uses f(t) = 6t⁵-15t⁴+10t³
 *
 * @param t - a value between 0 and 1
 * @returns a value between 0 and 1
 */
/*@__PURE__*/
export const interpolationQuintic: interpolationFunction = (t: number) =>
	t * t * t * (10 + t * (-15 + t * 6));

/**
 * Heptic blending function
 * uses f(t) = (2 − x)⁴(2 + x)⁴(1 − x)(1 + x)/256
 *
 * found in this [better gradient noise](https://sci.utah.edu/publications/SCITechReports/UUSCI-2008-001.pdf) paper
 *
 * @param t - a value between 0 and 1
 * @returns a value between 0 and 1
 */
/*@__PURE__*/
export const interpolationHeptic: interpolationFunction = (t: number) => {
	// const value = 1 - t * 2;
	const value = 1 - t;

	const _degree1 = 1 - (value * value) / 4;
	return 4 * _degree1 ** 5 - 3 * _degree1 ** 4;
};

/**
 * Triginometric blending function
 * uses f(t) = (2 − x)⁴(2 + x)⁴(1 − x)(1 + x)/256
 *
 * found in this [better gradient noise](https://sci.utah.edu/publications/SCITechReports/UUSCI-2008-001.pdf) paper
 *
 * @param t - a value between 0 and 1
 * @returns a value between 0 and 1
 */
/*@__PURE__*/
export const interpolationTrignonometric: interpolationFunction = (t: number) =>
	(Math.sin((t - 0.5) * Math.PI) + 1) / 2;

/**
 *
 * Power easing interpolation
 *
 * @param p - the power to raise the value to
 * @returns a power interpolation
 */
/*@__PURE__*/
export const powerEase =
	(p: number): interpolationFunction =>
	(t: number): number =>
		t ** p;
