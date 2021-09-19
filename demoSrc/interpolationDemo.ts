import { interpolationTrignonometric } from '../src/interpolation';
import type { interpolationFunction } from '../src/noiseTypes';
import {
	interpolationHermite,
	interpolationLinear,
	interpolationQuintic,
} from '../src/squeaker';
import { draw1d, getCanvasFromID } from './demoUtil';

export const main = (): void => {
	void drawLinear(getCanvasFromID('interpolationLinear'));
	void drawHermite(getCanvasFromID('interpolationHermite'));
	void drawQuintic(getCanvasFromID('interpolationQuintic'));
	void drawTrig(getCanvasFromID('interpolationTrig'));
};

const drawInterpolation = async (
	canvasElement: HTMLCanvasElement,
	interpolate: interpolationFunction
): Promise<void> => {
	const scale = canvasElement.width;
	return draw1d(
		canvasElement,
		(x: number) => {
			return interpolate(x / scale);
		},
		false
	);
};

const drawLinear = async (canvasElement: HTMLCanvasElement): Promise<void> =>
	drawInterpolation(canvasElement, interpolationLinear);
const drawHermite = async (canvasElement: HTMLCanvasElement): Promise<void> =>
	drawInterpolation(canvasElement, interpolationHermite);
const drawQuintic = async (canvasElement: HTMLCanvasElement): Promise<void> =>
	drawInterpolation(canvasElement, interpolationQuintic);
const drawTrig = async (canvasElement: HTMLCanvasElement): Promise<void> =>
	drawInterpolation(canvasElement, interpolationTrignonometric);
