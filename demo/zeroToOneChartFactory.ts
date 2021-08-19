import type {
	ChartOptions,
	ChartData,
	ChartConfiguration,
} from 'chart.js';
import { Chart, registerables } from 'chart.js';
import {
	newBlendingFunction as _blendNew,
	oldBlendingFunction as _blendOld,
} from '../src/noise';
import { range } from '../src/util';
import type { chartFactory } from '../demo/demoUtil';
import {
	themeColors,
	scaleGen,
	fontSet,
	baseFontSize,
	baseColors,
} from '../demo/demoUtil';

Chart.register(...registerables);

/**
 * _zeroChart.
 *
 * @param canvas - Canvas that the chart will be drawn on.
 * @param title - name of the chart
 * @returns - Chart.js Chart
 * @example
 */
const _zeroChartFactory: chartFactory = (
	canvas: HTMLCanvasElement,
	title?: string
) => {
	const _zeroToOneRange = range(0, 1.01, 0.01);
	const _blendOldDataSet = _zeroToOneRange.map((_input) =>
		_blendOld(_input)
	);
	const _blendNewDataSet = _zeroToOneRange.map((_input) =>
		_blendNew(_input)
	);
	const _labels = _zeroToOneRange.map((_input) =>
		_input.toFixed(3)
	);

	const _blendData: ChartData = {
		labels: _labels,
		datasets: [
			{
				type: 'line',
				label: 'f(x) = -2x³+3x²',
				backgroundColor: themeColors.secondary(),
				borderColor: themeColors.secondary(),
				data: _blendOldDataSet,
			},
			{
				type: 'line',
				label: 'f(x) = 6x⁵-15x⁴+10x³',
				backgroundColor: themeColors.primary(),
				borderColor: themeColors.primary(),
				data: _blendNewDataSet,
			},
		],
	};

	const _zeroToOneConfig: ChartConfiguration = {
		type: 'line',
		data: _blendData,
		options: _zeroChartFactory.options(title),
	};

	return new Chart(canvas, _zeroToOneConfig);
};

/**
 * _zeroChartFactory.options.
 *
 * @returns {ChartOptions}
 */
/**
 * _zeroChartFactory.options
 * TODO describe function
 *
 * @returns - TODO describe return value
 */
/**
 * _zeroChartFactory.options
 * TODO describe function
 *
 * @returns - TODO describe return value
 */
/**
 * _zeroChartFactory.options
 * TODO describe function
 *
 * @returns - TODO describe return value
 */
/**
 * _zeroChartFactory.options
 * TODO describe function
 *
 * @returns - TODO describe return value
 */
_zeroChartFactory.options = (): ChartOptions => {
	return {
		scales: {
			x: scaleGen(),
			y: scaleGen(),
		},
		elements: {
			point: {
				radius: 0,
			},
		},
		normalized: true,
		plugins: {
			legend: {
				position: 'bottom',
				align: 'center',
				labels: {
					font: fontSet.extraSmall(),
					boxWidth: baseFontSize() * 0.5,
					boxHeight: baseFontSize() * 0.5,
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
				text: 'Blending Equation Comparison',
				display: true,
				font: fontSet.normal(),
				color: baseColors.text(),
			},
		},
		color: baseColors.text(),
		backgroundColor: baseColors.background(),
		borderColor: baseColors.background(),
		aspectRatio: 0.9,
		responsive: true,
		resizeDelay: 60,
		onResize: (chart, _size) => {
			baseFontSize.reset();
			chart.options = _zeroChartFactory.options();
		},
	};
};

export { _zeroChartFactory as zeroToOneChart };
