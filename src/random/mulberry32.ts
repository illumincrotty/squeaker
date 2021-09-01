/**
 * equivalent to 2^32
 */
const _sizeOfThirtyTwoBits = 4_294_967_296;
const _magicNumberAdd = 1_831_565_813;

/**
 * functionalRandom.
 */
interface functionalRandom {
	(): [number, functionalRandom];
}
/**
 * functionalRandomBuilder.
 *
 * @param seed - the seed for the random number generation
 * @returns - random number and a new random function
 */

export const functionalRandomBuilder = (
	seed: number
): [number, () => [number, functionalRandom]] => {
	const _seedNew = seed + _magicNumberAdd;
	const _stepOne = Math.imul(_seedNew ^ (_seedNew >>> 15), _seedNew | 1);
	const _stepTwo =
		_stepOne ^
		(_stepOne + Math.imul(_stepOne ^ (_stepOne >>> 7), _stepOne | 61));
	const _stepFinal =
		((_stepTwo ^ (_stepTwo >>> 14)) >>> 0) / _sizeOfThirtyTwoBits;
	return [
		_stepFinal,
		() => {
			return functionalRandomBuilder(_seedNew);
		},
	];
};
/**
 * randomBuilder - create a mulberry32 random number generator
 *
 * @param seed - the seed for the random number generation
 * @returns - a mulberry32 based random number generator
 */

export const randomBuilder = (seed: number): (() => number) => {
	return function () {
		const _seedNew = (seed += _magicNumberAdd);
		const _stepOne = Math.imul(_seedNew ^ (_seedNew >>> 15), _seedNew | 1);
		const _stepTwo =
			_stepOne ^
			(_stepOne + Math.imul(_stepOne ^ (_stepOne >>> 7), _stepOne | 61));
		const _stepFinal =
			((_stepTwo ^ (_stepTwo >>> 14)) >>> 0) / _sizeOfThirtyTwoBits;
		return _stepFinal;
	};
};
