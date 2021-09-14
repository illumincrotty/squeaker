import { draw1d, draw2d } from './demoUtil';
import {
	valueNoise1dFactory,
	valueNoise2dFactory,
	randomFactory,
} from '../src/squeaker';

const alea = randomFactory('offer code elbows');
const initialState = alea.exportState();

export const drawValue1d = async (
	canvasElement: Readonly<HTMLCanvasElement>
): Promise<void> => {
	// reset random
	alea.importState(initialState);

	const scale = 40;
	const noise = valueNoise1dFactory({
		random: alea.random,
		xSize: canvasElement.width / scale,
	});

	return draw1d(canvasElement, (x: number) => noise(x / scale));
};

export const drawValue2d = async (
	canvasElement: HTMLCanvasElement
): Promise<void> => {
	// reset random
	alea.importState(initialState);

	const scale = 5;
	const noise = valueNoise2dFactory({
		random: alea.random,
		xSize: canvasElement.width / scale,
		ySize: canvasElement.height / scale,
	});
	return draw2d(
		canvasElement,
		(x: number, y: number) => noise(x / scale, y / scale),
		1
	);
};
