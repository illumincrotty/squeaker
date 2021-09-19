// import {} from '@std'

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

export const getStandardDeviation = (
	data: number[],
	sample = false,
	mean?: number
): number => {
	const _mean =
		mean ?? data.reduce((sum, value) => sum + value, 0) / data.length;
	return Math.sqrt(
		data.reduce(
			(sum, value) => sum + (value - _mean) * (value - _mean),
			0
		) /
			(data.length - (sample ? 1 : 0))
	);
};

// const uniformCDF = (input: number) => input;
// const erf = (x: number) => {
// 	// constants
// 	const a1 = 0.254_829_592;
// 	const a2 = -0.284_496_736;
// 	const a3 = 1.421_413_741;
// 	const a4 = -1.453_152_027;
// 	const a5 = 1.061_405_429;
// 	const p = 0.327_591_1;

// 	// Save the sign of x

// 	const sign = Math.sign(x);
// 	x = Math.abs(x);

// 	// A&S formula 7.1.26
// 	var t = 1 / (1 + p * x);
// 	var y =
// 		1 -
// 		((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

// 	return sign * y;
// };

// const normalCDFFactory = (mean: number, standardDeviation: number) => {
// 	if (standardDeviation === 0) {
// 		return (input: number) => (input < mean ? 0 : 1);
// 	}
// 	const DENOMINATOR = standardDeviation * Math.SQRT2;
// 	return (input: number) => 0.5 * erf((mean - input) / DENOMINATOR);
// };

// export const ksTest = (
// 	x: number[],
// 	y: 'normal' | 'uniform' | ((input: number) => number)
// ) => {
// 	const SUM = x.reduce((sum, add) => sum + add, 0),
// 		MEAN = SUM / x.length,
// 		standardDeviation = getStandardDeviation(x, true, MEAN);

// 	const cdf =
// 		typeof y === 'string'
// 			? y === 'normal'
// 				? normalCDFFactory(MEAN, standardDeviation)
// 				: uniformCDF
// 			: y;
// };
