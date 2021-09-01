import { interpolate } from '../interpolation';
import type { noiseFunction1d } from '../noiseTypes';
import { _defaultPerlinNoiseOptions } from './perlinConstants';
import type { perlinNoiseOptions1d } from './perlinTypes';
import { aleaFactory } from '../random/randomIndex';

/** the size of two bytes */
const twoBytes = 0xff;

/**
 * One dimensional perlin noise factory
 *
 * @param options - the settings for the noise
 * @returns one dimensional perlin noise function
 */
export const perlinNoise1dFactory = (
	options?: perlinNoiseOptions1d
): noiseFunction1d => {
	const _options = {
		..._defaultPerlinNoiseOptions,
		...options,
	};

	if (options && options.seed) {
		_options.random = aleaFactory(options.seed.toString(10)).random;
	}

	const _randomValues = new Uint8Array(_options.xSize).map(
		(_, _index) => _options.random() * twoBytes
	);

	// console.log(_randomValues);

	return (x: number): number => {
		const xModulus = x % _options.xSize;
		const xFloor = Math.floor(xModulus);
		const xCeil = xFloor + 1;
		return (
			interpolate(
				_randomValues[xFloor],
				_randomValues[xCeil % _options.xSize],
				xModulus - xFloor,
				_options.blendFunction
			) / twoBytes
		);
	};
};

export const perlin1d = perlinNoise1dFactory();
