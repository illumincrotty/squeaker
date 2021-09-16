import {
	perlinNoise2dFactory,
	perlinNoise1dFactory,
	randomFactory,
} from '../src/squeaker';
import { draw1d, draw2d } from './demoUtil';

export const drawPerlin1d = async (
	canvasElement: HTMLCanvasElement
): Promise<void> => {
	const scale = 100;
	const noise = perlinNoise1dFactory({
		random: randomFactory('98iks').random,
		xSize: canvasElement.width / scale,
	});

	return draw1d(canvasElement, (x: number) => {
		return noise(x / scale);
	});
};

export const drawPerlin2d = async (
	canvasElement: HTMLCanvasElement
): Promise<void> => {
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

export const drawPerlin2dTile = async (
	canvasElement: HTMLCanvasElement,
	xTiles = 5,
	yTiles = 5
): Promise<void> => {
	const scale = 20;
	const noise = perlinNoise2dFactory({
		random: randomFactory('67uyjh n,').random,
		xSize: canvasElement.width / (scale * xTiles),
		ySize: canvasElement.height / (scale * yTiles),
	});

	await draw2d(
		canvasElement,
		(x: number, y: number) => noise(x / scale, y / scale),
		1
	);
	const context = canvasElement.getContext('2d');
	if (context && (xTiles > 1 || yTiles > 1)) {
		context.fillStyle = 'rgba(256, 0, 0, .3)';
		{
			const xStep = canvasElement.width / xTiles;
			for (let xIndex = 1; xIndex < xTiles; xIndex++) {
				context.fillRect(
					xStep * xIndex - 1,
					0,
					2,
					canvasElement.height
				);
			}
		}
		{
			const yStep = canvasElement.height / yTiles;
			for (let yIndex = 1; yIndex < yTiles; yIndex++) {
				context.fillRect(0, yStep * yIndex - 1, canvasElement.width, 2);
			}
		}
	}

	return Promise.resolve();
};
