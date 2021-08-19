/* eslint-disable @typescript-eslint/no-magic-numbers */
import { baseColors } from './demoUtil';
import { noiseFactory } from './noiseChartFactory';
import { roundNoiseFactory } from './roundNoise';
import { range as _range } from '../src/util';
import { zeroToOneChart } from './zeroToOneChartFactory';

const _blendCanvas = document.querySelector(
	'#chart-blend'
) as HTMLCanvasElement;
const _blendTitle = 'Blending Equation Comparison';
const _blendChart = zeroToOneChart(_blendCanvas, _blendTitle);

const _noiseCanvasLinear = document.querySelector(
	'#chart-noise-linear'
) as HTMLCanvasElement;
const _noiseRegularTitle = '1d Perlin Noise';
const _noiseChartLinear = noiseFactory(
	_noiseCanvasLinear,
	_noiseRegularTitle,
	47_120_176
);

const _noiseCanvasLoop = document.querySelector(
	'#chart-noise-loop'
) as HTMLCanvasElement;
const _noiseLoopTitle = '1d Perlin Noise Loop';
const _noiseChartLoop = noiseFactory(
	_noiseCanvasLoop,
	_noiseLoopTitle,
	47_120_175,
	true,
	10
);

const _noiseCanvasRound = document.querySelector(
	'#chart-noise-circle'
) as HTMLCanvasElement;
const _roundNoiseTitle = 'Round 1D Perlin Noise';
const _noiseChartRound = roundNoiseFactory(
	_noiseCanvasRound,
	_roundNoiseTitle
);

window
	.matchMedia('(prefers-color-scheme: light)')
	.addEventListener('change', (_): void => {
		Object.entries(baseColors).forEach((_input) =>
			_input[1].reset()
		);
		_blendChart.config.options =
			zeroToOneChart.options(_blendTitle);
		_blendChart.update();
	});
