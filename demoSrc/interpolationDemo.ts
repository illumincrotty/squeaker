import { interpolationTrignonometric } from '../src/interpolation';
import type { interpolationFunction } from '../src/noiseTypes';
import {
	interpolationHermite,
	interpolationLinear,
	interpolationQuintic,
} from '../src/squeaker';
import { draw1d } from './demoUtil';

export const drawLinear = async (
	canvasElement: HTMLCanvasElement
): Promise<void> => drawInterpolation(canvasElement, interpolationLinear);
export const drawHermite = async (
	canvasElement: HTMLCanvasElement
): Promise<void> => drawInterpolation(canvasElement, interpolationHermite);
export const drawQuintic = async (
	canvasElement: HTMLCanvasElement
): Promise<void> => drawInterpolation(canvasElement, interpolationQuintic);
export const drawTrig = async (
	canvasElement: HTMLCanvasElement
): Promise<void> =>
	drawInterpolation(canvasElement, interpolationTrignonometric);

export const drawInterpolation = async (
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
