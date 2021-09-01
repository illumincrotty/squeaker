import type { vector2d, vectorArray3d } from './noiseTypes';

/**
 * Simple range utility, not very efficient
 *
 * @deprecated
 * @param start - starting number (inclusive)
 * @param end - ending number (exclusive)
 * @param step - step per iteration (can be negative)
 * @returns an array of the numbers from min to max
 */
export const range = (start: number, end: number, step = 1): number[] => {
	if ((end - start) / step <= 0) return [];
	return [start, ...range(start + step, end, step)];
};

export interface rangeParameters {
	/** starting number (inclusive) */
	start: number;
	/** ending number (exclusive) */
	end: number;
	/** step per iteration (can be negative), defaults to 1*/
	step?: number;
}

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
 * Memory Efficient Grid Generation
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
): Generator<number, void, void> {
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

/**
 * Takes the dot product of two vectors
 *
 * ___order does not matter___
 *
 * @param vectorA - a given 2D vector
 * @param vectorB - a given 2D vector
 * @returns scalar value
 */
export const dotProduct2d = (vectorA: vector2d, vectorB: vector2d): number => {
	return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
};

/**
 * Takes the dot product of two vectors
 *
 * ___order does not matter___
 *
 * @param vectorA - a given 2D vector
 * @param vectorB - a given 2D vector
 * @returns scalar value
 */
export const dotProduct3d = (
	vectorA: vectorArray3d,
	vectorB: vectorArray3d
): number => {
	return (
		vectorA[0] * vectorB[0] +
		vectorA[1] * vectorB[1] +
		vectorA[2] * vectorB[2]
	);
};

/**
 * Takes the dot product of two vectors
 *
 * ___order does not matter___
 *
 * @param vectorA - a given 2D vector
 * @param vectorB - a given 2D vector
 * @returns scalar value
 */
export const dotProduct3dAsync = async (
	vectorA: [x: number, y: number, z: number],
	vectorB: [x: number, y: number, z: number]
): Promise<number> => {
	return Promise.resolve(
		vectorA[0] * vectorB[0] +
			vectorA[1] * vectorB[1] +
			vectorA[2] * vectorB[2]
	);
};

/**
 * Implementation of Durstenfeld's version of the Fisher–Yates shuffle algorithm
 *
 * Shuffles an array in O(n) time, NOT an inplace shuffle
 *
 * @param input - an array to be shuffled
 * @param random - a random number generator
 * @returns a random permutation of the input array
 */
export const shuffle = <type>(
	input: type[],
	random: () => number = Math.random
): type[] => {
	const _shuffledArray: type[] = [...input];
	let _temporary: type;
	for (let _index = input.length - 1; _index >= 0; _index--) {
		const _rand = Math.floor(_index * random());
		_temporary = _shuffledArray[_index];
		_shuffledArray[_index] = _shuffledArray[_rand];
		_shuffledArray[_rand] = _temporary;
	}

	return _shuffledArray;
};
/**
 * A fast hash function
 *
 * @param a - input number
 * @returns a hashed version of that number (32-bit only)
 */
export const hash = (a: number): number => {
	a = a ^ 61 ^ (a >> 16);
	a = a + (a << 3);
	a ^ (a >> 4);
	a *= 0x27_d4_eb_2d;
	a = a ^ (a >> 15);

	return a;
};

/**
 * A fast hash function
 *
 * @param a - input number
 * @returns a hashed version of that number (32-bit only)
 */
export const altHash = (a: number): number => {
	a = (a ^ 0xde_ad_be_ef) + (a << 4);
	a = a ^ (a >> 10);
	a = a + (a << 7);
	a = a ^ (a >> 13);
	return a;
};

export const mix = (a: number, b: number, c: number) => {
	a -= b;
	a -= c;
	a ^= c >> 13;
	b -= c;
	b -= a;
	b ^= a << 8;
	c -= a;
	c -= b;
	c ^= b >> 13;
	a -= b;
	a -= c;
	a ^= c >> 12;
	b -= c;
	b -= a;
	b ^= a << 16;
	c -= a;
	c -= b;
	c ^= b >> 5;
	a -= b;
	a -= c;
	a ^= c >> 3;
	b -= c;
	b -= a;
	b ^= a << 10;
	c -= a;
	c -= b;
	c ^= b >> 15;
	return c & 0xff_ff;
};
