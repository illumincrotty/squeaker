import type { perlinNoiseOptions2d } from '../src/squeaker';
import {
	perlinNoise2dFactory,
	interpolationHermite,
	interpolationLinear,
	interpolationQuintic,
} from '../src/squeaker';

const interpolationSwitch = (
	_functionName: 'hermite' | 'linear' | 'quintic' | undefined
) => {
	switch (_functionName) {
		case 'hermite': {
			return interpolationHermite;
		}
		case 'quintic': {
			return interpolationQuintic;
		}
		case 'linear': {
			return interpolationLinear;
		}
		default:
			return interpolationHermite;
	}
};

const messageToConstructor = (
	constructor: messageData2d['constructor']
): perlinNoiseOptions2d => {
	const _constructor = {
		xSize: 256,
		ySize: 256,
		interpolation: 'hermite',
		...constructor,
	};
	return {
		xSize: _constructor.xSize,
		ySize: _constructor.ySize,
		blendFunction: interpolationSwitch(
			_constructor.interpolation as 'hermite'
		),
	};
};

self.addEventListener('message', (message) => {
	const data = message.data as messageData2d;
	const width = data.constructor.canvasWidth;
	const height = data.constructor.canvasHeight;
	const rand = perlinNoise2dFactory(messageToConstructor(data.constructor));
	const colorArray = new Uint8ClampedArray(4 * width * height);

	for (let x = 0; x < width; x += 1) {
		for (let y = 0; y < height; y += 1) {
			const color = Math.floor(rand(x / 25, y / 25) * 255);
			rect(x, y, 1, 1, color, colorArray);
		}
	}
	self.postMessage(new ImageData(colorArray, width, height));
});

const rect = (
	x: number,
	y: number,
	width: number,
	height: number,
	fill: number,
	colorArray: Uint8ClampedArray,
	arrayWidth = 500
) => {
	for (let yIndex = y; yIndex < y + height; yIndex += 1) {
		colorArray.fill(
			fill,
			x * 4 + yIndex * 4 * arrayWidth,
			(x + width) * 4 + yIndex * 4 * arrayWidth
		);
	}
	return colorArray;
};
