import type { noiseFunction3d } from '../dist/noiseTypes';
import {
	interpolationHermite,
	interpolationLinear,
	interpolationQuintic,
	valueNoise3dFactory,
	valueNoiseOptions3d,
} from '../dist/squeaker';
import { rect } from './demoUtil';
import type { interpolation, messageData } from './workerTypes';
let noiseMachine: [width: number, height: number, rand: noiseFunction3d] = [
	500,
	500,
	(_x: number, _y: number, _z: number) => 0.5,
];

const interpolationSwitch = (_functionName: interpolation = 'hermite') => {
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
): Partial<valueNoiseOptions3d> => {
	if (!constructor) {
		constructor = {
			canvasHeight: 500,
			canvaswidth: 500,
			xSize: 0,
			ySize: 0,
			zSize: 0,
			interpolation: 'hermite',
			forceHigh: false,
			forceLow: false,
		};
	}
	return {
		xSize: constructor.xSize,
		ySize: constructor.ySize,
		zSize: constructor.zSize,
		blendFunction: interpolationSwitch(constructor.interpolation),
	};
};

self.addEventListener('message', (message): void => {
	const data = message.data as messageData;

	if (data.constructor?.canvasHeight) {
		noiseMachine = [
			data.constructor.canvaswidth,
			data.constructor.canvasHeight,
			valueNoise3dFactory(messageToConstructor(data.constructor)),
		];
	}
	if (data.update) {
		self.postMessage(update(data.update.frame));
	}
});
const resolution = 4,
	scale = 20;
const update = (frame: number): ImageData => {
	const [width, height, rand] = noiseMachine;

	const colorArray = new Uint8ClampedArray(4 * width * height);

	for (let x = 0; x < width; x += resolution) {
		for (let y = 0; y < height; y += resolution) {
			const color = Math.floor(
				rand(
					x / scale + frame / 75,
					y / scale + frame / 100,
					frame / 50
				) * 0xff
			);
			rect(x, y, resolution, resolution, color, colorArray);
		}
	}

	const image = new ImageData(colorArray, 500, 500);
	return image;
};
