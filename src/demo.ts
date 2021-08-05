/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	newBlendingFunction as _blend,
	oldBlendingFunction as _oldBlend,
} from './noise';

import type {
	ChartConfiguration,
	ChartData,
	FontSpec,
	ScaleOptionsByType,
	CartesianScaleTypeRegistry,
} from 'chart.js';
import { Chart } from 'chart.js';
import type { DeepPartial } from 'chart.js/types/utils';
import {
	getCssProperty as _getCssProperty,
	range as _range,
} from './util';

const _chartOne = document.querySelector(
	'#firstChart'
) as HTMLCanvasElement;

const _chartTwo = document.querySelector(
	'#secondChart'
) as HTMLCanvasElement;

const _zeroToOne = _range(0, 1.01, 0.02);
const _labels = _zeroToOne.map((element) => element.toFixed(3));
const _blendData = _zeroToOne.map((element) => _blend(element));
const _oldBlendData = _zeroToOne.map((element) => _oldBlend(element));

const _textColor = () => _getCssProperty('text');
const _backgroundColor = () => _getCssProperty('bg');
const _primary = _getCssProperty('primary');
const _secondary = _getCssProperty('secondary');
const _tertiary = _getCssProperty('tertiary');

const _fontSize = () =>
	+getComputedStyle(document.body).fontSize.slice(0, -2);
const _fontFamily = getComputedStyle(document.body).fontFamily;

const _fontConfigNormal: () => DeepPartial<FontSpec> = () => {
	return {
		family: _fontFamily,
		size: _fontSize(),
	};
};
const _fontConfigMedium: () => DeepPartial<FontSpec> = () => {
	return {
		family: _fontFamily,
		size: _fontSize() * 0.89,
	};
};
const _fontConfigSmaller: () => DeepPartial<FontSpec> = () => {
	return {
		family: _fontFamily,
		size: _fontSize() * 0.89 * 0.89,
	};
};

const data: ChartData = {
	labels: _labels,
	datasets: [
		{
			type: 'line',
			label: 'f(x) = -2x³+3x²',
			backgroundColor: _secondary,
			borderColor: _secondary,
			data: _oldBlendData,
		},
		{
			type: 'line',
			label: 'f(x) = 6x⁵-15x⁴+10x³',
			backgroundColor: _primary,
			borderColor: _primary,
			data: _blendData,
		},
	],
};

const _options = (
	_fontSmall: DeepPartial<FontSpec>
): DeepPartial<ChartConfiguration['options']> => {
	return {
		scales: {},
		plugins: {},
	};
};

const _scales = (
	_small: DeepPartial<FontSpec>
): DeepPartial<{
	[key: string]: ScaleOptionsByType<
		keyof CartesianScaleTypeRegistry | 'radialLinear'
	>;
}> => {
	return {
		x: {
			type: 'linear',
			bounds: 'data',
			ticks: {
				stepSize: 0.1,
				color: _textColor(),
				font: _small,
			},
			grid: {
				color: _textColor(),
				drawTicks: false,
			},
		},
	};
};

const _config = (
	_fontSmall: () => DeepPartial<FontSpec> = _fontConfigSmaller,
	_fontMedium: () => DeepPartial<FontSpec> = _fontConfigMedium,
	_fontLarge: () => DeepPartial<FontSpec> = _fontConfigNormal
): ChartConfiguration => {
	const small = _fontSmall();
	const medium = _fontMedium();
	const large = _fontLarge();
	return {
		type: 'line',
		data,
		options: {
			scales: {
				x: {
					type: 'linear',
					bounds: 'data',
					ticks: {
						stepSize: 0.1,
						color: _textColor(),
						font: small,
					},
					grid: {
						color: _textColor(),
						drawTicks: false,
					},
				},
				y: {
					type: 'linear',
					bounds: 'data',
					ticks: {
						stepSize: 0.1,
						color: _textColor(),
						font: small,
					},
					grid: {
						color: _textColor(),
						drawTicks: false,
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
					position: 'bottom',
					align: 'center',
					labels: {
						font: medium,
						boxWidth: _fontSize() * 0.5,
						boxHeight: _fontSize() * 0.5,
					},
					onClick: () => {
						return;
					},
				},
				tooltip: {
					// mode: 'dataset',
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
					bodyFont: medium,
				},
				title: {
					text: 'Blending Equation Comparison',
					display: true,
					font: large,
					color: _textColor(),
				},
			},
			color: _textColor(),
			backgroundColor: _backgroundColor(),
			borderColor: _backgroundColor(),
			aspectRatio: 0.9,
			maintainAspectRatio: true,
			responsive: true,
			resizeDelay: 90,
			onResize: (chart, size) => {
				// console.log(`aspect ratio: ${chart.aspectRatio}`);
				chart.config.options = _config().options;
				const aspect =
					size.width / (size.width + _fontSize() * 4.5);
				// console.log(aspect);
				if (chart.config.options?.aspectRatio)
					chart.config.options.aspectRatio = aspect;
				// console.log(`aspect ratio: ${chart.aspectRatio}`);
				// console.log(
				// 	`width: ${chart.width}, height: ${chart.height}`
				// );
				chart.update();
				// if (chart.config.options?.font?.size)
				// 	chart.config.options.font.size = _fontSize();
			},
		},
	};
};

const _jsChartOne = new Chart(_chartOne, _config());
const _jsChartTwo = new Chart(_chartTwo, _config());
_jsChartOne.update('resize');
window
	.matchMedia('(prefers-color-scheme: light)')
	.addEventListener('change', (_): void => {
		_jsChartOne.config.options = _config().options;
		_jsChartOne.update();
		_jsChartTwo.config.options = _config().options;
		_jsChartTwo.update();
	});
