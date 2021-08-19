import type { DeepPartial } from 'chart.js/types/utils';
import type { FontSpec, ScaleOptions } from 'chart.js';
import type { Chart, ChartOptions } from 'chart.js';

/**
 * closureGen.
 *
 * @param _expensive - an expensive function to calculate
 * @returns a clojure function with a reset function as a property
 */
export const closureBuilder = <type>(
	_expensive: () => type
): resetable<type> => {
	let value: type | undefined;
	/**
	 * _returnObject.
	 */
	const _returnObject = () => {
		if (!value) {
			value = _expensive();
		}
		return value;
	};
	/**
	 * _returnObject.reset.
	 */
	/**
	 * _returnObject.reset
	 * TODO describe function
	 *
	 */
	/**
	 * _returnObject.reset
	 * TODO describe function
	 *
	 */
	/**
	 * _returnObject.reset
	 * TODO describe function
	 *
	 */
	/**
	 * _returnObject.reset
	 * TODO describe function
	 *
	 */
	_returnObject.reset = () => {
		value = undefined;
	};

	return _returnObject;
};

/* Get data from CSS */
// Colors

/**
 * Gets the value of a CSS Property
 * @param property - the css property that is desired (no -- before)
 * @param element - the element to read the property off of, defaults to body
 */
export const getCssProperty = function (
	property: string,
	element = document.body
): string {
	return getComputedStyle(element).getPropertyValue(
		`--${property}`
	);
};

export const baseColors = {
	background: closureBuilder(() => getCssProperty('bg')),
	text: closureBuilder(() => getCssProperty('text')),
};

export const themeColors = {
	primary: closureBuilder(() => getCssProperty('primary')),
	secondary: closureBuilder(() => getCssProperty('secondary')),
	tertiary: closureBuilder(() => getCssProperty('tertiary')),
};
// fonts
export const fontFamily = getComputedStyle(document.body).fontFamily;
/**
 * _convertComputerStyleToNumber.
 *
 * @param {string} input
 */
const _convertComputerStyleToNumber = (input: string) => {
	const units = -2; // 'px' at end
	return Number.parseInt(input.slice(0, units), 10);
};
export const baseFontSize = closureBuilder(() =>
	_convertComputerStyleToNumber(
		getComputedStyle(document.body).fontSize
	)
);
/**
 * fontSpec.
 */
type fontSpec = DeepPartial<FontSpec>;
/**
 * _createFontSpec.
 *
 * @param multiplier -
 * @returns
 */
const createFontSpec = (multiplier = 1): (() => fontSpec) => {
	return (): fontSpec => {
		return {
			family: fontFamily,
			size: baseFontSize() * multiplier,
		};
	};
};

// const _fontRatio = +getCssProperty('font-inverse-ratio');
export const fontSet = {
	extraSmall: createFontSpec((1 / 1.1) ** 2),
	small: createFontSpec(1 / 1.1),
	normal: createFontSpec(1),
};

/**
 * scaleGen.
 *
 * @param {} display
 * @param {} min
 * @param {} max
 * @param {} tickCount
 * @returns {ScaleOptions}
 */
export const scaleGen = (
	display = true,
	min = 0,
	max = 1,
	tickCount = 3
): ScaleOptions => {
	return {
		type: 'linear',
		bounds: 'ticks',
		min: min,
		max: max,
		ticks: {
			// stepSize: tickStepSize,
			color: baseColors.text(),
			font: fontSet.extraSmall(),
			display: display,
			align: 'center',
			precision: 2,
			count: tickCount,
			// autoSkip: false,
			// autoSkipPadding: 0,

			// count: 1,
			includeBounds: true,
		},
		grid: {
			color: baseColors.text(),
			drawTicks: false,
			display: display,
			tickLength: 1,
		},
	};
};

/**
 * chartFactory.
 */
export interface chartFactory {
	/**
	 * .
	 *
	 * @param canvas -
	 * @returns
	 */
	(canvas: HTMLCanvasElement, title: string): Chart;
	/**
	 * options.
	 *
	 * @returns
	 */
	options(title?: string): ChartOptions;
}

/**
 * INoiseFactory.
 *
 * @extends {chartFactory}
 */
export interface INoiseFactory extends chartFactory {
	/**
	 * .
	 *
	 * @param {HTMLCanvasElement} canvas
	 * @param {string} name
	 * @param {number} seed
	 * @param {boolean} looping
	 * @param {number} size
	 * @returns {Chart}
	 */
	(
		canvas: HTMLCanvasElement,
		name: string,
		seed?: number,
		looping?: boolean,
		size?: number
	): Chart;
	/**
	 * @type {number}
	 */
	size: number;
}

/**
 * IRoundFactory.
 *
 * @extends {chartFactory}
 */
export interface IRoundFactory extends chartFactory {
	/**
	 * .
	 *
	 * @param {HTMLCanvasElement} canvas
	 * @param {string} title
	 * @param {number} seed
	 * @param {boolean} loop
	 * @returns {Chart}
	 */
	(
		canvas: HTMLCanvasElement,
		title?: string,
		seed?: number,
		loop?: boolean
	): Chart;
}

export interface resetable<type> {
	(): type;
	/**
	 * Resets the object in the clojure, so the next time it is called, the expensive operation will take place
	 */
	reset: () => void;
}
