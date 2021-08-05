import { range } from './util';
/* eslint-disable @typescript-eslint/no-magic-numbers */
/**
 * oldBlendingFunction.
 *
 * @param input -
 * @returns
 */
const oldBlendingFunction = (input: number): number =>
	input ** 2 * (3 - 2 * input);

/**
 * newBlendingFunction.
 *
 * @param input -
 * @returns
 */
const newBlendingFunction = (input: number): number =>
	input ** 3 * (10 + input * (-15 + input * 6));

const linearInterpolation = (
	a: number,
	b: number,
	t: number
): number => a * (1 - t) + b * t;

export const perlinNoiseFactory = (
	randomFunction: () => number = Math.random,
	blendingFunction: (input: number) => number = newBlendingFunction,
	scale = 1
): ((x: number) => number) => {
	const _vertices = 256;

	const _randomValues = new Uint8Array(_vertices).map(
		(_, _index) => randomFunction() * 256
	);

	console.log(_randomValues);

	return (x: number): number => {
		const scaledX = x * scale;
		const xFloor = Math.floor(scaledX);
		const t = scaledX - xFloor;
		const tRemapSmoothstep = blendingFunction(t);

		const xMin = xFloor % _vertices;
		const xMax = (xMin + 1) % _vertices;

		const y = linearInterpolation(
			_randomValues[xMin],
			_randomValues[xMax],
			tRemapSmoothstep
		);

		// console.log(
		// 	`input: ${x} floor: ${xFloor} scaled: ${scaledX} xMin: ${xMin} xmax: ${xMax}`
		// );

		return y / _vertices;
	};
};

const noise = perlinNoiseFactory();
range(0, 10, 0.1).map((value) =>
	console.log(`input: ${value.toFixed(2)}\t noise: ${noise(value)}`)
);

export { oldBlendingFunction, newBlendingFunction };
