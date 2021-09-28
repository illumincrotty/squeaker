import { getCanvasFromID } from './demoUtil';
import type { messageData } from './workerTypes';
import perlinWorker from './perlinNoiseWorker?worker';
import valueWorker from './valueNoiseWorker?worker';

const createWorker = (
	canvasElement: HTMLCanvasElement,
	constructorMessage: messageData['constructor'],
	WorkerConstructor: {
		new (): Worker;
	},
	live: () => boolean = () => true
) => {
	const worker = new WorkerConstructor();
	const context = canvasElement.getContext('2d');
	let frame = 0;
	if (context) {
		const imageQueue: ImageBitmap[] = [];
		// const imageQueue: ImageData[] = [];

		const setup = async () => {
			context.fillStyle = 'grey';
			context.fillRect(0, 0, canvasElement.width, canvasElement.height);
			const append = async (pic: ImageData) => {
				return Promise.resolve(
					imageQueue.push(await createImageBitmap(pic))
				);
			};

			worker.addEventListener('message', (message) => {
				void append(message.data);
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

		return async (grid = false) => {
			if (live()) {
				if (imageQueue.length < 5) {
					request(frame);
					request(frame);
					request(frame);
				}
				if (imageQueue.length > 1) {
					context.drawImage(imageQueue.shift() as ImageBitmap, 0, 0);
					if (grid) {
						context.fillStyle = 'rgba(256, 0, 0, .2)';
						{
							const xStep = canvasElement.width / 5;
							for (let xIndex = 1; xIndex < 5; xIndex++) {
								context.fillRect(
									xStep * xIndex - 1,
									0,
									2,
									canvasElement.height
								);
							}
						}
						{
							const yStep = canvasElement.height / 5;
							for (let yIndex = 1; yIndex < 5; yIndex++) {
								context.fillRect(
									0,
									yStep * yIndex - 1,
									canvasElement.width,
									2
								);
							}
						}
					}
				}
			}
			return Promise.resolve();
		};
	}

	return () => {
		console.log('invalid canvas context');
	};
};

export const main = (): void => {
	// const [perlinWorkerPromise, valueWorkerPromise] = [
	// 	import('./perlinNoiseWorker?worker'),
	// 	import('./valueNoiseWorker?worker'),
	// ];

	// const perlinWorker = (await perlinWorkerPromise).default;

	const p3d = getCanvasFromID('perlin3d'),
		p3dTile = getCanvasFromID('perlin3dTile'),
		p3dParent = p3d.parentElement as HTMLElement,
		v3d = getCanvasFromID('value3d'),
		v3dTile = getCanvasFromID('value3dTile'),
		v3dParent = v3d.parentElement as HTMLElement;

	let perlinAnimate = true,
		valueAnimate = true;
	const animationObserver = new IntersectionObserver(
		(entries) => {
			for (const element of entries) {
				switch (element.target) {
					case p3dParent: {
						perlinAnimate = element.isIntersecting;
						// console.log(
						// 	`Perlin animation: ${perlinAnimate ? 'on' : 'off'}`
						// );
						break;
					}
					case v3dParent: {
						valueAnimate = element.isIntersecting;
						break;
					}
					default: {
						break;
					}
				}
			}
		},
		{ threshold: [0] }
	);

	animationObserver.observe(p3dParent);
	animationObserver.observe(v3dParent);

	window.requestIdleCallback(() => {
		const workerPerlin3d = createWorker(
			p3d,
			{
				canvasHeight: 500,
				canvaswidth: 500,
				seed: 563_729_047,
				forceHigh: true,
				interpolation: 'hermite',
			},
			perlinWorker,
			() => perlinAnimate
		);
		const workerPerlin3dTile = createWorker(
			p3dTile,
			{
				canvasHeight: 500,
				canvaswidth: 500,
				seed: 563_759_047,
				xSize: 5,
				ySize: 5,
				forceLow: true,
				interpolation: 'hermite',
			},
			perlinWorker,
			() => perlinAnimate
		);

		// const valueWorker = (await valueWorkerPromise).default;
		setTimeout(() => {
			const workerValue3d = createWorker(
				v3d,
				{
					canvasHeight: 500,
					canvaswidth: 500,
					seed: 563_729_047,
					forceHigh: true,
					interpolation: 'hermite',
				},
				valueWorker,
				() => valueAnimate
			);
			const workerValue3dTile = createWorker(
				v3dTile,
				{
					canvasHeight: 500,
					canvaswidth: 500,
					seed: 563_759_047,
					xSize: 5,
					ySize: 5,
					forceLow: true,
					interpolation: 'hermite',
				},
				valueWorker,
				() => valueAnimate
			);

			let frame = 0;

			const update = () => {
				frame += 1;

				switch (frame % 2) {
					case 0: {
						void workerPerlin3d();
						void workerValue3d();
						break;
					}
					case 1: {
						void workerPerlin3dTile(true);
						void workerValue3dTile(true);
						break;
					}
					default:
						break;
				}

				window.requestAnimationFrame(update);
			};

			setTimeout(update, 3000);
		});
	});
};
