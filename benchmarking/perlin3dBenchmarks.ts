import bench from 'benny';
import { percent, summarize } from './benchmarkUtilities';
import { perlinNoise3dFactory } from '../src/perlin/perlin3d';
import { perlinNoise3dFactory as distFactory } from '../dist/squeaker';
import type { noiseFunction3d } from '../dist/noiseTypes';

const current = perlinNoise3dFactory({ seed: 'test seed' });
const dist = distFactory({ seed: 'test seed' });

const test3dGrid = (
	function3d: noiseFunction3d,
	size = 500,
	scale = 20
): void => {
	for (let xIndex = 0; xIndex < size; xIndex++) {
		for (let yIndex = 0; yIndex < size; yIndex++) {
			function3d(xIndex / scale, yIndex / scale, 1 / scale);
		}
	}
};

void bench.suite(
	'Perlin 3d',
	bench.add('Warmup', () => test3dGrid(current), { minSamples: 100 }),

	bench.add('Base', () => test3dGrid(current), { minSamples: 100 }),
	bench.add('Dist', () => test3dGrid(dist), { minSamples: 100 }),

	bench.cycle(percent),
	bench.complete(summarize)
);
