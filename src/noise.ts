// /* eslint-disable @typescript-eslint/no-magic-numbers */
type blendingFunction = (input: number) => number;

/**
 * oldBlendingFunction.
 * uses f(x) = -2x^3+3x^2
 *
 * @param input - number between 0 and 1
 * @returns number between 0 and 1
 */
export const oldBlendingFunction: blendingFunction = (input: number): number =>
	input ** 2 * (3 - 2 * input);

/**
 * newBlendingFunction.
 * uses f(x) = 6x^5-15x^4+10x^3
 *
 * @param input - number between 0 and 1
 * @returns number between 0 and 1
 */
export const newBlendingFunction: blendingFunction = (input: number): number =>
	input ** 3 * (10 + input * (-15 + input * 6));

/**
 * 1d linearInterpolation.
 *
 * @param a - previous point
 * @param b - next point
 * @param t - the position in between
 * @returns a number betwixt a and
 */
const _linearInterpolation = (a: number, b: number, t: number): number =>
	a * (1 - t) + b * t;

/**
 * 1d perlinNoiseFactory.
 *
 * @param randomFunction - the desired random number generator function (defaults to Math.random)
 * @param size - the size of the functions domain (numbers outside this domain will be modulus this number, NOT and error)
 * @param blendingFunction - the function used to interpolate peaks of the domain
 * @returns a perlin noise generator
 */
export const perlinNoiseFactory = (
	randomFunction: () => number = Math.random,
	size = 256,
	blendingFunction: blendingFunction = newBlendingFunction
): ((x: number) => number) => {
	const _vertices = size;

	const _randomValues = new Uint8Array(_vertices).map(
		(_, _index) => randomFunction() * _vertices
	);

	return (input: number): number => {
		const xFloor = Math.floor(input); // round toward -infinity
		const xMin = xFloor % _vertices; // mod size
		const xMax = Math.ceil(input) % _vertices; // round to +infinity mod size

		const y = _linearInterpolation(
			_randomValues[xMin],
			_randomValues[xMax],
			blendingFunction(input - xFloor /* just the fractional portion */)
		);

		return y / _vertices;
	};
};
