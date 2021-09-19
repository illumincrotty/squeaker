import { draw1d, draw2d, getCanvasFromID } from './demoUtil';
import {
	valueNoise1dFactory,
	valueNoise2dFactory,
	randomFactory,
} from '../src/squeaker';

const alea = randomFactory('offer code elbows');
const initialState = alea.exportState();

export const main = (): void => {
	window.requestIdleCallback(() => {
		void drawValue1d(getCanvasFromID('value1d'));
		void drawValue2d(getCanvasFromID('value2d'));
		void drawValue2dTile(getCanvasFromID('value2dTile'));
	});
};

const drawValue1d = async (
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

const drawValue2d = async (canvasElement: HTMLCanvasElement) => {
	// reset random
	alea.importState(initialState);

	const scale = 10;
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

const drawValue2dTile = async (
	canvasElement: HTMLCanvasElement,
	xTiles = 5,
	yTiles = 5
) => {
	const scale = 10;
	const noise = valueNoise2dFactory({
		random: alea.random,
		xSize: canvasElement.width / (scale * xTiles),
		ySize: canvasElement.height / (scale * yTiles),
	});

	return draw2d(
		canvasElement,
		(x: number, y: number) => noise(x / scale, y / scale),
		1,
		(input) => input,
		[xTiles, yTiles]
	);
	// const context = canvasElement.getContext('2d');
	// if (context && (xTiles > 1 || yTiles > 1)) {
	// 	context.fillStyle = 'rgba(256, 0, 0, .3)';
	// 	{
	// 		const xStep = canvasElement.width / xTiles;
	// 		for (let xIndex = 1; xIndex < xTiles; xIndex++) {
	// 			context.fillRect(
	// 				xStep * xIndex - 1,
	// 				0,
	// 				2,
	// 				canvasElement.height
	// 			);
	// 		}
	// 	}
	// 	{
	// 		const yStep = canvasElement.height / yTiles;
	// 		for (let yIndex = 1; yIndex < yTiles; yIndex++) {
	// 			context.fillRect(0, yStep * yIndex - 1, canvasElement.width, 2);
	// 		}
	// 	}
	// }

	// return Promise.resolve();
};
