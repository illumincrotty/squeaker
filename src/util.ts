import type {
	baseNoiseOptions1d,
	baseNoiseOptions2d,
	baseNoiseOptions3d,
	vector2d,
	vector3d,
} from './noiseTypes';
import { aleaFactory } from './random/alea';

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
export const dotProduct2d = (
	vectorA: Readonly<vector2d>,
	vectorB: Readonly<vector2d>
): number => {
	return vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1];
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
export const dotProduct3d = (vectorA: vector3d, vectorB: vector3d): number => {
	return (
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
	input: readonly type[],
	random: () => number = Math.random
): type[] => {
	const _shuffledArray = [...input];
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
	a = a ^ 61 ^ (a >>> 16);
	a = a + (a << 3);
	a ^ (a >>> 4);
	a *= 0x27_d4_eb_2d;
	a = a ^ (a >> 15);

	return a;
};

/**
 * A fast hash function, different than the first
 *
 * @param a - input number
 * @returns a hashed version of that number (32-bit only)
 */
export const altHash = (a: number): number => {
	a = (a ^ 0xde_ad_be_ef) + (a << 4);
	a = a ^ (a >>> 10);
	a = a + (a << 7);
	a = a ^ (a >>> 13);
	return a;
};

/**
 * Generates an array of permuted values
 *
 * @param size - the desired size of the 32bit array
 * @param random - a random number generator
 * @returns an array of permuted values
 */
export const generatePermutationArray = (
	size: number,
	random: () => number = aleaFactory().random
): Uint32Array =>
	new Uint32Array(size).map((_, _index) => Math.trunc(random() * 1_048_576));

/**
 * _appendFirst
 *
 * appends the first value to the end of the list
 *
 * @private
 * @param input - any list
 * @returns the list with the first value appended to the end
 */
export const _appendFirst = <Type>(input: readonly Type[]): Type[] => [
	...input,
	input[0],
];

/**
 * primeGenerator
 *
 * Generates primes using the Sieve of Eratosthenes algorithm
 *
 * @param max - the max value of the desired prime numbers
 * @returns an array of prime numbers between 2 and max
 */
export const primeGenerator = (max = 1000): number[] => {
	const data = Array.from({ length: max }).fill(true) as boolean[],
		lim = Math.sqrt(max),
		primes: number[] = [];
	for (let spot = 2; spot < max; spot++) {
		if (data[spot]) {
			if (spot <= lim) {
				primes.push(spot);
				for (let current = spot * 2; current < max; current += spot) {
					data[current] = false;
				}
			} else {
				primes.push(spot);
			}
		}
	}

	return primes;
};

/**
 * aboveMin
 *
 * filters out the values below a certain threshold
 *
 * @private
 * @param inputArray - the array of values to filter
 * @param minimum - the threshold value to compare the values in the array to, uses greather than or equal to
 * @returns a new array of values from the input array that are greater than or equal to minimum
 */
const aboveMin =
	/*@__PURE__*/
	/*@__INLINE__*/ (
		inputArray: readonly number[],
		minimum: number
	): number[] => inputArray.filter((value) => value >= minimum);

/** primes between 2^15 and 2^16 */
export const largePrimes: readonly number[] =
	/*@__PURE__*/
	aboveMin(primeGenerator(2 ** 17), 2 ** 15);

export const getRandomLargePrime =
	/*@__PURE__*/
	(rand: () => number): number =>
		largePrimes[Math.floor(largePrimes.length * rand())];

/**
 *	Rosenberg Strong Pairing
 *
 *	bijection which maps N²->N
 *
 * @param x - the x coordinate
 * @param y - the y coordinate
 * @returns the paired value
 */
export const rosenbergStrongPair =
	/*@__PURE__*/
	(x: number, y: number): number => (x < y ? y * y + x : x * x + 2 * x - y);

/**
 *	Cantor Pairing
 *
 *	bijection which maps N²->N
 *
 * @param x - the x coordinate
 * @param y - the y coordinate
 * @returns the paired value
 */
/*@__PURE__*/
export const cantorPairing = (x: number, y: number): number =>
	((x + y) * (x + y + 1)) / 2 + x;

/**
 *	Szudzik Pairing
 *
 *	bijection which maps N²->N at 100% efficiency
 *
 * @param x - the x coordinate
 * @param y - the y coordinate
 * @returns the paired value
 */
/*@__PURE__*/
export const szudzikPair = (x: number, y: number): number =>
	x >= y ? x * x + x + y : y * y + x;

/**
 *	Pairing
 *
 *	bijection which maps N²->N
 *
 * @param x - the x coordinate
 * @param y - the y coordinate
 * @returns the paired value
 */
export const pair2d = (x: number, y: number): number /*@__INLINE__*/ =>
	szudzikPair(x, y);

/**
 *	Pairing
 *
 *	bijection which maps N^3->N
 *
 * @param x - the x coordinate
 * @param y - the y coordinate
 * @param z - the z coordinate
 * @returns the paired value
 */
export const pair3d = (x: number, y: number, z: number): number =>
	((x * 251) ^ (y * 239) ^ (z * 241)) * 4103;

/**
 * processOptions
 *
 * converts partial input options into a standard, more usable form
 *
 * @private
 * @param options - an object containing noise options
 * @returns the options modified to have the required values
 */
export const processOptions = <
	t extends baseNoiseOptions1d | baseNoiseOptions2d | baseNoiseOptions3d
>(
	options: t
): Required<t> => {
	if (options.xSize && typeof options.xSize === 'number') {
		options.xSize = Math.ceil(options.xSize);
	}
	if (
		'ySize' in options &&
		options.ySize &&
		typeof options.ySize === 'number'
	) {
		options.ySize = Math.ceil(options.ySize);
	}
	if (
		'zSize' in options &&
		options.zSize &&
		typeof options.zSize === 'number'
	) {
		options.zSize = Math.ceil(options.zSize);
	}

	if (options.seed && !options.random) {
		options.random = aleaFactory(options.seed.toString()).random;
	}

	return options as Required<t>;
};
