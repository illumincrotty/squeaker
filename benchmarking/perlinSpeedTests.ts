import bench from 'benny';
import { perlinNoise2dFactory } from '../src/perlin/perlin2d';
import { percent, summarize } from './benchmarkUtilities';

const current = perlinNoise2dFactory({ seed: 'test seed' });
// const _modifiedMinusFrac = perlinNoise2dFactoryModified({ seed: 'test seed' });
// const modifiedReusedMemory = perlinNoise2dFactoryModified2({
// 	seed: 'test seed',
// });

// const modifiedReusedMemoryWithCache = perlinNoise2dFactoryModified3({
// 	seed: 'test seed',
// });

const gridTest = (
	gridFunction: (x: number, y: number) => unknown,
	size = 500
) => {
	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			gridFunction(x / 40, y / 20);
		}
	}
};

void bench.suite(
	'Modifications',

	bench.add('current', () => gridTest(current)),
	// bench.add('modified frac', () => gridTest(modifiedMinusFrac)),
	// bench.add('modified Memory', () => gridTest(modifiedReusedMemory)),
	// bench.add('modified Memory w/ cache', () =>
	// 	gridTest(modifiedReusedMemoryWithCache)
	// ),

	bench.cycle(percent),
	bench.complete(summarize)
);
