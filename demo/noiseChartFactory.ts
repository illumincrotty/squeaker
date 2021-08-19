// import type { DeepPartial } from 'chart.js/types/utils';
// import type { FontSpec, ScaleOptions } from 'chart.js';
// import { closureBuilder as _closureBuilder } from './util';
// import { getCssProperty } from './util';
import type { INoiseFactory } from './demoUtil';
import {
	baseColors,
	baseFontSize,
	fontSet,
	scaleGen,
	themeColors,
} from './demoUtil';
import { mulberryFactory as randomBuilder } from '../src/randomFunctions';
import type {
	ChartOptions,
	ChartData,
	ChartConfiguration,
} from 'chart.js';
import { Chart } from 'chart.js';
import { range } from '../src/util';
import { perlinNoiseFactory } from '../src/noise';

/**
 * noiseFactory.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {string} title
 * @param {} seed
 * @param {} looping
 * @param {} size
 * @returns {Chart}
 */
const noiseFactory: INoiseFactory = (
	canvas: HTMLCanvasElement,
	title: string,
	seed = 3_931_624_246,
	looping = false,
	size = 10
): Chart => {
	noiseFactory.size = size as number;
	const _noise = perlinNoiseFactory(
		randomBuilder(seed as number),
		looping ? (size as number) : undefined
	);
	const _range = range(
		0,
		(size as number) + 0.1,
		Math.min(0.1, (size as number) / 200)
	);
	const _dataSet = _range.map((_input) => _noise(_input));
	const _labels = _range.map((_input) => _input.toFixed(3));

	const _data: ChartData = {
		labels: _labels,
		datasets: [
			{
				type: 'line',
				label: 'Noise',
				backgroundColor: themeColors.tertiary(),
				borderColor: themeColors.tertiary(),
				data: _dataSet,
			},
		],
	};

	const _config: ChartConfiguration = {
		type: 'line',
		data: _data,
		options: noiseFactory.options(title),
	};

	return new Chart(canvas, _config);
};

noiseFactory.size = 12;
/**
 * noiseFactory.options.
 *
 * @param {} title
 * @returns {ChartOptions}
 */
/**
 * noiseFactory.options
 * TODO describe function
 *
 * @param title - TODO describe parameter
 * @returns - TODO describe return value
 */
/**
 * noiseFactory.options
 * TODO describe function
 *
 * @param title - TODO describe parameter
 * @returns - TODO describe return value
 */
/**
 * noiseFactory.options
 * TODO describe function
 *
 * @param title - TODO describe parameter
 * @returns - TODO describe return value
 */
/**
 * noiseFactory.options
 * TODO describe function
 *
 * @param title - TODO describe parameter
 * @returns - TODO describe return value
 */
noiseFactory.options = (title = '1d Perlin Noise'): ChartOptions => {
	return {
		scales: {
			x: scaleGen(true, 0, noiseFactory.size, 2),
			y: scaleGen(true, 0, 1, 3),
		},
		elements: {
			point: {
				radius: 0,
			},
		},
		normalized: true,
		plugins: {
			legend: {
				display: false,
				position: 'bottom',
				align: 'center',
				labels: {
					font: fontSet.extraSmall(),
					boxWidth: baseFontSize() / 2,
					boxHeight: baseFontSize() / 2,
				},
				onClick: () => {
					return;
				},
			},
			tooltip: {
				position: 'nearest',
				mode: 'index',
				intersect: false,
				callbacks: {
					title: (_): string => {
						return '';
					},
					label: (context): string =>
						`f(${context.label}) = ${(
							context.raw as number
						).toFixed(3)}`,
				},
				bodyFont: fontSet.small(),
			},
			title: {
				text: title,
				display: true,
				font: fontSet.normal(),
				color: baseColors.text(),
			},
		},
		color: baseColors.text(),
		backgroundColor: baseColors.background(),
		borderColor: baseColors.background(),
		// aspectRatio: 2,
		maintainAspectRatio: false,
		responsive: true,
		// resizeDelay: 60,
		// layout: { padding: { right: 40 } },
		onResize: (chart, _size) => {
			baseFontSize.reset();
			chart.options = noiseFactory.options(title);
		},
	};
};

export { noiseFactory };
