import { getCanvasFromID } from './demoUtil';
import type { messageData } from './workerTypes';

export const animate = async (): Promise<void> => {
	// eslint-disable-next-line promise/prefer-await-to-then
	const [perlinWorker, valueWorker] = (
		await Promise.all([
			import('./perlinNoiseWorker?worker'),
			import('./valueNoiseWorker?worker'),
		])
	).map((worker) => worker.default);
	const createWorker = (
		canvasElement: HTMLCanvasElement,
		constructorMessage: messageData['constructor'],
		WorkerConstructor:
			| typeof perlinWorker
			| typeof valueWorker = perlinWorker
	) => {
		const worker = new WorkerConstructor();
		const context = canvasElement.getContext('2d');
		let frame = 0;
		if (context) {
			const imageQueue: ImageBitmap[] = [];
			// const imageQueue: ImageData[] = [];

			const setup = async () => {
				context.fillStyle = 'grey';
				context.fillRect(
					0,
					0,
					canvasElement.width,
					canvasElement.height
				);
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
				return Promise.resolve();
			};
		}

		return () => {
			console.log('invalid canvas context');
		};
	};

	const workerPerlin3d = createWorker(getCanvasFromID('perlin3d'), {
		canvasHeight: 500,
		canvaswidth: 500,
		seed: 563_729_047,
		forceHigh: true,
		interpolation: 'hermite',
	});
	const workerPerlin3dTile = createWorker(getCanvasFromID('perlin3dTile'), {
		canvasHeight: 500,
		canvaswidth: 500,
		seed: 563_759_047,
		xSize: 5,
		ySize: 5,
		forceLow: true,
		interpolation: 'hermite',
	});

	const workerValue3d = createWorker(
		getCanvasFromID('value3d'),
		{
			canvasHeight: 500,
			canvaswidth: 500,
			seed: 563_729_047,
			forceHigh: true,
			interpolation: 'hermite',
		},
		valueWorker
	);
	const workerValue3dTile = createWorker(
		getCanvasFromID('value3dTile'),
		{
			canvasHeight: 500,
			canvaswidth: 500,
			seed: 563_759_047,
			xSize: 5,
			ySize: 5,
			forceLow: true,
			interpolation: 'hermite',
		},
		valueWorker
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
	update();

	return Promise.resolve();
};
