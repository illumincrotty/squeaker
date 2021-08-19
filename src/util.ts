/**
 * Simple range utility, not very efficient
 *
 * @param start - starting number (inclusive)
 * @param end - ending number (exclusive)
 * @param step - step per iteration (can be negative)
 * @returns an array of the numbers from min to max
 */
export const range = (start: number, end: number, step = 1): number[] => {
	if ((end - start) / step <= 0) return [];
	return [start, ...range(start + step, end, step)];
};

export type rangeParameters = {
	/** starting number (inclusive) */
	start: number;
	/** ending number (exclusive) */
	end: number;
	/** step per iteration (can be negative), defaults to 1*/
	step?: number;
};

/**
 * Simple range generator utility
 *
 * @param options - options for generation
 * @param options.start - starting number (inclusive)
 * @param options.end - ending number (exclusive)
 * @param options.step - step per iteration (can be negative)
 * @yields an array of the numbers from min to max
 */
export function* rangeGenerator({
	start,
	end,
	step = 1,
}: rangeParameters): Generator<number, void, unknown> {
	const stepsNeeded = (end - start - Number.EPSILON) / step;
	for (
		let place = start, currentStep = 0;
		currentStep < stepsNeeded;
		currentStep += 1, place += step
	) {
		yield place;
	}
	return;
}

/**
 * Efficient Grid Generation
 *
 * @param xOptions - parameters for domain
 * @param yOptions  - parameters for range
 * @param mappingFunction - converts coordinates to desired value
 * @yields mapped value
 */
export function* flatGridGenerator(
	xOptions: rangeParameters,
	yOptions: rangeParameters,
	mappingFunction: (x: number, y: number) => number = (_0, _1): number => 0
): Generator<number, void, unknown> {
	const xGen = rangeGenerator(xOptions);
	let yGen = rangeGenerator(yOptions);
	let xtemp = xGen.next();
	let ytemp = yGen.next();
	while (!xtemp.done) {
		while (!ytemp.done) {
			yield mappingFunction(xtemp.value, ytemp.value);
			ytemp = yGen.next();
		}
		yGen = rangeGenerator(yOptions);
		ytemp = yGen.next();
		xtemp = xGen.next();
	}
	return;
}

/**
 * Modulus that consistenly works on negative numbers
 *
 * @param divisor - the number to be divided
 * @param dividend - the number it is being divided by
 * @returns the remainded between 0 and divisor
 */
export const consistentModulus = (divisor: number, dividend: number): number =>
	((divisor % dividend) + dividend) % dividend;

export type vector2d = { x: number; y: number };
export type vector3d = [number, number, number];

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
