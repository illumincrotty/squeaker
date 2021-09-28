import {
	perlinNoise1dFactory,
	perlinNoise2dFactory,
	randomFactory,
} from '../dist/squeaker';
import { draw1d, draw2d, getCanvasFromID } from './demoUtil';
// const sourcePromise = (async () => import('../src/squeaker'))();

export const main = (): void => {
	window.requestIdleCallback(() => {
		void drawPerlin1d(getCanvasFromID('perlin1d'));
		void drawPerlin2d(getCanvasFromID('perlin2d'));
		void drawPerlin2dTile(getCanvasFromID('perlin2dTile'));
	});
	// requestIdleCallback(() => {

	// });
	// requestIdleCallback(() => {});

	// return done;
};

const drawPerlin1d = async (
	canvasElement: HTMLCanvasElement
): Promise<void> => {
	const scale = 100;
	const noise = perlinNoise1dFactory({
		random: randomFactory('jinkes').random,
		xSize: canvasElement.width / scale,
	});

	return draw1d(canvasElement, (x: number) => {
		return noise(x / scale);
	});
};

const drawPerlin2d = async (canvasElement: HTMLCanvasElement) => {
	const scale = 20;
	const noise = perlinNoise2dFactory({
		random: randomFactory('plaigerism').random,
		// xSize: canvasElement.width / scale,
		// ySize: canvasElement.height / scale,
	});

	return draw2d(
		canvasElement,
		(x: number, y: number) => noise(x / scale, y / scale),
		1
	);
};

const drawPerlin2dTile = async (
	canvasElement: HTMLCanvasElement,
	xTiles = 5,
	yTiles = 5
) => {
	const scale = 20;
	const noise = perlinNoise2dFactory({
		random: randomFactory('67uyjh n,').random,
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
};
