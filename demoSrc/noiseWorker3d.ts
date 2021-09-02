import type { noiseFunction3d } from '../src/noiseTypes';
import type { perlinNoiseOptions3d } from '../src/squeaker';
import {
	perlinNoise3dFactory,
	interpolationHermite,
	interpolationLinear,
	interpolationQuintic,
} from '../src/squeaker';

let noiseMachine: [width: number, height: number, rand: noiseFunction3d] = [
	500,
	500,
	(_x: number, _y: number, _z: number) => 0.5,
];

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
	constructor: messageData['constructor']
): perlinNoiseOptions3d => {
	if (!constructor) {
		constructor = {
			canvasHeight: 500,
			canvaswidth: 500,
			xSize: 256,
			ySize: 256,
			zSize: 256,
			interpolation: 'hermite',
			forceHigh: false,
			forceLow: false,
		};
	}
	return {
		xSize: constructor.xSize ?? 256,
		ySize: constructor.ySize ?? 256,
		zSize: constructor.zSize ?? 256,
		blendFunction: interpolationSwitch(constructor.interpolation),
		_forceHighMemoryMode: constructor.forceHigh ?? false,
		_forceLowMemoryMode: constructor.forceLow ?? false,
	};
};

self.addEventListener('message', (message) => {
	const data = message.data as messageData;

	if (data.constructor?.canvasHeight) {
		noiseMachine = [
			data.constructor.canvaswidth,
			data.constructor.canvasHeight,
			perlinNoise3dFactory(messageToConstructor(data.constructor)),
		];
	}
	if (data.update) {
		self.postMessage(update(data.update.frame));
	}
});

const update = (frame: number): ImageData => {
	const [width, height, rand] = noiseMachine;

	const colorArray = new Uint8ClampedArray(4 * width * height);

	for (let x = 0; x < width; x += 4) {
		for (let y = 0; y < height; y += 4) {
			const color = Math.floor(rand(x / 25, y / 25, frame / 100) * 255);
			rect(x, y, 4, 4, color, colorArray);
		}
	}

	const image = new ImageData(colorArray, 500, 500);
	return image;
};

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
