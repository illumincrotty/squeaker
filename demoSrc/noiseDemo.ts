import '../assets/styles/noiseDemo.css';
import '../assets/styles/styles.css';
import { drawCanvasPlaceholders } from './demoUtil';
import {
	drawHermite,
	drawLinear,
	drawQuintic,
	drawTrig,
} from './interpolationDemo';
import NoiseWorker from './noiseWorker3d?worker';
import { drawPerlin1d, drawPerlin2d, drawPerlin2dTile } from './perlinDemo';
import { drawValue1d, drawValue2d } from './valueDemo';
import type { messageData } from './workerTypes';

const createWorker = (
	canvas: HTMLCanvasElement,
	constructorMessage: messageData['constructor']
) => {
	const worker = new NoiseWorker();
	const context = canvas.getContext('2d');
	let frame = 0;
	if (context) {
		const imageQueue: ImageBitmap[] = [];
		// const imageQueue: ImageData[] = [];

		const setup = async () => {
			context.fillStyle = 'grey';
			context.fillRect(0, 0, canvas.width, canvas.height);
			const append = async (pic: ImageData) => {
				return Promise.resolve(
					imageQueue.push(await createImageBitmap(pic))
				);
			};
			// Image Data
			// const append = async (pic: ImageData) => {
			// 	Promise.resolve(imageQueue.push(pic));
			// };

			worker.addEventListener('message', (message) => {
				void append(message.data);
				if (imageQueue.length < 5) {
					worker.postMessage({});
				}
			});

			worker.postMessage({
				constructor: constructorMessage,
			} as messageData);
			return Promise.resolve();
		};

		void setup();
		const request = (requestFrame: number) => {
			worker.postMessage({
				update: { frame: requestFrame },
			} as messageData);
			frame++;
		};

		return () => {
			if (imageQueue.length < 5) {
				request(frame);
				request(frame);
				request(frame);
			}
			if (imageQueue.length > 1)
				context.drawImage(imageQueue.shift() as ImageBitmap, 0, 0);
			// if (imageQueue.length > 1)
			// 	context.putImageData(imageQueue.shift() as ImageData, 0, 0);
		};
	}

	return () => {
		console.log('invalid canvas context');
	};
};

const scope = () => {
	const canvasPerlin2d = document.querySelector(
			'#perlin2d'
		) as HTMLCanvasElement,
		canvasPerlin2dTile = document.querySelector(
			'#perlin2dTile'
		) as HTMLCanvasElement,
		canvasPerlin3dHeavy = document.querySelector(
			'#perlin3dHeavy'
		) as HTMLCanvasElement,
		canvasPerlin3dLight = document.querySelector(
			'#perlin3dLight'
		) as HTMLCanvasElement,
		canvasPerlin1d = document.querySelector(
			'#perlin1d'
		) as HTMLCanvasElement,
		canvasValue1d = document.querySelector('#value1d') as HTMLCanvasElement,
		canvasValue2d = document.querySelector('#value2d') as HTMLCanvasElement,
		canvasLinear = document.querySelector(
			'#interpolationLinear'
		) as HTMLCanvasElement,
		canvasHermite = document.querySelector(
			'#interpolationHermite'
		) as HTMLCanvasElement,
		canvasQuintic = document.querySelector(
			'#interpolationQuintic'
		) as HTMLCanvasElement,
		canvasTrig = document.querySelector(
			'#interpolationTrig'
		) as HTMLCanvasElement;

	drawCanvasPlaceholders([
		canvasValue1d,
		canvasPerlin1d,
		canvasValue2d,
		canvasPerlin2d,
		canvasPerlin2dTile,
		canvasPerlin3dLight,
		canvasPerlin3dHeavy,
		canvasLinear,
		canvasHermite,
		canvasQuintic,
		canvasTrig,
	]);

	const workerHeavy = createWorker(canvasPerlin3dHeavy, {
		canvasHeight: 500,
		canvaswidth: 500,
		seed: 563_729_047,
		xSize: 25,
		ySize: 25,
		forceHigh: true,
		interpolation: 'hermite',
	});
	const workerLight = createWorker(canvasPerlin3dLight, {
		canvasHeight: 500,
		canvaswidth: 500,
		seed: 563_759_047,
		xSize: 25,
		ySize: 25,
		forceLow: true,
		interpolation: 'hermite',
	});

	// Perlin
	void drawPerlin1d(canvasPerlin1d);
	void drawPerlin2d(canvasPerlin2d);
	void drawPerlin2dTile(canvasPerlin2dTile);

	// Value
	void drawValue1d(canvasValue1d);
	void drawValue2d(canvasValue2d);

	// interpolation
	void drawLinear(canvasLinear);
	void drawHermite(canvasHermite);
	void drawQuintic(canvasQuintic);
	void drawTrig(canvasTrig);

	const _purpleGradient = [
			'#eeb4b3',
			'#c179b9',
			'#a42cd6',
			'#502274',
			'#2f242c',
		],
		_landGradient = ['#0b0531', '#133465', '#298a91', '#48b482', '#83bc83'],
		_multicolor = ['#1f2041', '#4b3f72', '#ffc857', '#119da4', '#19647e'];

	let frame = 0;

	const update = () => {
		frame += 1;

		switch (frame % 2) {
			case 0: {
				void workerHeavy();
				break;
			}
			case 1: {
				void workerLight();
				break;
			}
			default:
				break;
		}

		window.requestAnimationFrame(update);
	};
	update();
};

scope();
