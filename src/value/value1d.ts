import { interpolate } from '../interpolation';
import type { noiseFunction1d } from '../noiseTypes';
import { consistentModulus, largePrimes, processOptions } from '../util';
import { _defaultValueNoiseOptions1d } from './valueConstants';
import type { valueNoiseOptions1d } from './valueTypes';

/**
 * Generates a 1D value noise function
 *
 * @param options - The generation settings
 * @returns 1D value noise function
 */
export const valueNoise1dFactory = (
	options?: Partial<valueNoiseOptions1d>
): noiseFunction1d => {
	const _options = processOptions({
		..._defaultValueNoiseOptions1d,
		...options,
	});
	_options.xSize = Math.ceil(_options.xSize);

	const _perms = new Float32Array(257).map(() => _options.random());
	_perms[_perms.length - 1] = _perms[0];
	const prime =
		largePrimes[Math.floor(largePrimes.length * _options.random())];

	return (x: number): number => {
		const _xFloor = Math.floor(x),
			/** integer below input x */
			_x0 = consistentModulus(_xFloor, _options.xSize),
			/**  fractional x value with a fade function applied */
			_xFade = _options.blendFunction(x - _xFloor);
		return interpolate(
			_perms[(_x0 * prime) & 0xff],
			_perms[((_x0 + 1) * prime) & 0xff],
			_xFade
		);
	};
};
