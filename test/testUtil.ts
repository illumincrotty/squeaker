import ranjs from 'ranjs';

export const xyPair = function* <t>(
	x: number,
	y: number,
	function_: (x: number, y: number) => t
): Generator<t, void, unknown> {
	for (let xIndex = 0; xIndex < x; xIndex++) {
		for (let yIndex = 0; yIndex < y; yIndex++) {
			yield function_(xIndex, yIndex);
		}
	}
};

/**
 * Calculates the unbiased sample variance of an array of values using [Welford's algorithm]{@link https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm}.
 *
 * @function variance
 * @param values - Array of values to calculate variance for.
 * @returns Variance of the values if there are more than two, undefined otherwise.
 * @example
 *
 * ran.dispersion.variance([])
 * // => undefined
 *
 * ran.dispersion.variance([1])
 * // => undefined
 *
 * ran.dispersion.variance([1, 2, 3])
 * // => 2.5
 */
export const variance = (values: number[]): number | undefined => {
	if (values.length > 1) {
		let n = 0;
		let diff = 0;
		let mean = 0;
		let M = 0;
		for (const x of values) {
			diff = x - mean;
			mean += diff / ++n;
			M += diff * (x - mean);
		}
		return M / (n - 1);
	}
};

/**
 * Calculates the unbiased standard deviation of an array of values.
 *
 * @function stdev
 * @param values -  Array of values to calculate standard deviation for.
 * @returns - Standard deviation of the values if there are more than two, undefined otherwise.
 * @example
 *
 * ran.dispersion.stdev([])
 * // => undefined
 *
 * ran.dispersion.stdev([1])
 * // => undefined
 *
 * ran.dispersion.stdev([1, 2, 3, 4, 5])
 * // => 1.5811388300841898
 */
export const stdev = (values: number[]): number | undefined => {
	const v = variance(values);
	return v && Math.abs(Math.sqrt(v));
};

const uniform = new ranjs.dist.Uniform(0, 1);

export const isUniform = (
	input: number[]
): ReturnType<typeof uniform['test']> => {
	return uniform.test(input);
};

export const isNormal = (
	input: number[]
): ReturnType<typeof kolmogorovSmirnov> => {
	{
		const normal = new ranjs.dist.Normal(
			input.reduce((sum, value) => sum + value, 0) / input.length,
			stdev(input)
		);

		return kolmogorovSmirnov(input, normal.cdf.bind(normal));
	}
};

export const kolmogorovSmirnov = (
	values: number[],
	cdf: (x: number) => number
): { statistics: number; passed: boolean } => {
	// Sort values for estimated CDF
	values.sort((a, b) => a - b);

	// Calculate D value
	let D = 0;
	for (let index = 0; index < values.length; index++) {
		D = Math.max(
			D,
			Math.abs((index + 1) / values.length - cdf(values[index]))
		);
	}

	// Return comparison results
	return {
		statistics: D,
		passed: D <= 1.628 / Math.sqrt(values.length),
	};
};
