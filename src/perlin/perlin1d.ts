import { interpolate } from '../interpolation';
import type { noiseFunction1d } from '../noiseTypes';
import { consistentModulus, largePrimes } from '../util';
import {
	processPerlinOptions,
	_defaultPerlinNoiseOptions,
} from './perlinConstants';
import type { perlinNoiseOptions1d } from './perlinTypes';

/**
 * One dimensional perlin noise factory
 *
 * @param options - the settings for the noise
 * @returns one dimensional perlin noise function
 */
export const perlinNoise1dFactory = (
	options?: Partial<perlinNoiseOptions1d>
): noiseFunction1d => {
	const _options = processPerlinOptions({
		..._defaultPerlinNoiseOptions,
		...options,
	});

	const prime =
		largePrimes[Math.floor(largePrimes.length * _options.random())];

	const _perms = new Float32Array(0xff).map(
		(_, _index) => _options.random() * 2
	);
	_perms[_perms.length - 1] = _perms[0];

	return (x: number): number => {
		const _xFloor = Math.floor(x),
			/** integer below input x */
			_x0 = consistentModulus(_xFloor, _options.xSize),
			/**  fractional x value */
			_xFrac = x - _xFloor,
			/**  fractional x value with a fade function applied */
			_xFade = _options.blendFunction(_xFrac);
		const _n0 = _perms[(_x0 * prime) & 0xff] * _xFrac,
			_n1 = _perms[(_x0 + 1 * prime) & 0xff] * (_xFrac - 1);

		return interpolate(_n0, _n1, _xFade) + 0.5;
	};
};

// const test = perlinNoise1dFactory({ xSize: 1000 });
// let min = test(0),
// 	max = min;
// for (let index = 0; index < 1e2; index += 1 / 10) {
// 	const value = test(index);
// 	min = Math.min(min, value);
// 	max = Math.max(max, value);
// 	console.log(
// 		`${index.toFixed(3)}: ${value.toFixed(3)} ${'*'.padStart(
// 			value * 30,
// 			' '
// 		)}`
// 	);
// }

// console.log(`Minimum: ${min}`);
// console.log(`Maximum: ${max}`);
// // console.log(test(0.2));
