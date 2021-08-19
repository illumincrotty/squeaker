// import type { chartFactoryEx } from './demoUtil';
import type { IRoundFactory } from '../demo/demoUtil';
import { baseColors, baseFontSize, fontSet } from '../demo/demoUtil';
import { themeColors } from '../demo/demoUtil';
import type { ChartOptions, ChartConfiguration } from 'chart.js';
import { Chart } from 'chart.js';
import { mulberryFactory as randomBuilder } from '../src/randomFunctions';
import { range } from '../src/util';
import { perlinNoiseFactory } from '../src/noise';

/**
 * _roundNoiseFactory.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {} title
 * @param {} seed
 * @param {} _looping
 * @returns {Chart}
 */
const _roundNoiseFactory: IRoundFactory = (
	canvas: HTMLCanvasElement,
	title = 'Round 1D Perlin Noise',
	seed = 3_931_624_246,
	_looping = false
): Chart => {
	const _ruffles = 6;
	const _noise = perlinNoiseFactory(
		randomBuilder((seed as number) * 12 + 2352),
		_ruffles
	);
	const _range = range(0, _ruffles, _ruffles / 360);
	const _dataSet = _range.map((_input) => _noise(_input) * 3 + 2);
	const _labels = range(0, 360);
	const _labelMap = [
		'𝜋/2',
		'𝜋/3',
		'𝜋/6',
		'0',
		'11𝜋/6',
		'4𝜋/3',
		'3𝜋/2',
		'4𝜋/3',
		'7𝜋/6',
		'𝜋',
		'5𝜋/6',
		'2𝜋/3',
	];

	const data = {
		labels: _labels,
		datasets: [
			{
				label: 'Radial Perlin Noise',
				data: _dataSet,
				fill: false,
				backgroundColor: themeColors.primary,
				borderColor: themeColors.primary,
			},
		],
	};

	const config: ChartConfiguration = {
		type: 'radar',
		data: data,
		options: {
			elements: {
				line: {
					borderWidth: 5,
				},
				point: { radius: 0 },
			},
			radar: {
				datasets: {},
			},
			scales: {
				r: {
					type: 'radialLinear',
					angleLines: {
						color: baseColors.text,
						display: false,
					},
					grid: {
						circular: true,
						color: baseColors.text,
					},
					ticks: {
						display: false,
						maxTicksLimit: 10,
					},
					pointLabels: {
						color: baseColors.text,
						font: fontSet.small(),
						callback: (_label, index) =>
							index % 30 === 0
								? _labelMap[index / 30]
								: '',
					},
					max: 5,
					min: 0,
				},
			},
			plugins: {
				legend: {
					display: false,
					labels: {
						font: fontSet.small(),
						color: baseColors.text(),
						boxHeight: baseFontSize() / 2,
						boxWidth: baseFontSize() / 2,
					},
				},
				title: {
					text: title,
					display: true,
					font: fontSet.normal(),
					color: baseColors.text(),
				},
			},
		},
	};

	const _config: ChartConfiguration = {
		type: 'radar',
		data: data,
		options: _roundNoiseFactory.options(),
	};

	return new Chart(canvas, config);

	// return new Chart(canvas, _config);
};

/**
 * _roundNoiseFactory.options.
 *
 * @param {} title
 * @returns {ChartOptions}
 */
/**
 * _roundNoiseFactory.options
 * TODO describe function
 *
 * @param title - TODO describe parameter
 * @returns - TODO describe return value
 */
/**
 * _roundNoiseFactory.options
 * TODO describe function
 *
 * @param title - TODO describe parameter
 * @returns - TODO describe return value
 */
/**
 * _roundNoiseFactory.options
 * TODO describe function
 *
 * @param title - TODO describe parameter
 * @returns - TODO describe return value
 */
/**
 * _roundNoiseFactory.options
 * TODO describe function
 *
 * @param title - TODO describe parameter
 * @returns - TODO describe return value
 */
_roundNoiseFactory.options = (
	title = 'Round 1D Perlin Noise'
): ChartOptions => {
	return {
		scales: {
			r: {
				type: 'linear',
				min: 0,
				max: 1,
				ticks: {
					count: 6,
				},
				grid: {
					circular: true,
				},
			},
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
			chart.options = _roundNoiseFactory.options();
		},
	};
};

export { _roundNoiseFactory as roundNoiseFactory };
