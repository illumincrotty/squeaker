import type { messageData } from './workerTypes';

export const animate = async (
	canvasPerlin3d: HTMLCanvasElement,
	canvasPerlin3dTile: HTMLCanvasElement
): Promise<void> => {
	// eslint-disable-next-line promise/prefer-await-to-then
	void import('./noiseWorker3d?worker').then((worker) => {
		const NoiseWorker = worker.default;
		const createWorker = (
			canvasElement: HTMLCanvasElement,
			constructorMessage: messageData['constructor']
		) => {
			const worker = new NoiseWorker();
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
						context.drawImage(
							imageQueue.shift() as ImageBitmap,
							0,
							0
						);
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

		const workerPerlin3d = createWorker(canvasPerlin3d, {
			canvasHeight: 500,
			canvaswidth: 500,
			seed: 563_729_047,
			forceHigh: true,
			interpolation: 'hermite',
		});
		const workerPerling3dTile = createWorker(canvasPerlin3dTile, {
			canvasHeight: 500,
			canvaswidth: 500,
			seed: 563_759_047,
			xSize: 5,
			ySize: 5,
			forceLow: true,
			interpolation: 'hermite',
		});

		let frame = 0;

		const update = () => {
			frame += 1;

			switch (frame % 2) {
				case 0: {
					void workerPerlin3d();
					break;
				}
				case 1: {
					void workerPerling3dTile(true);
					break;
				}
				default:
					break;
			}

			window.requestAnimationFrame(update);
		};
		update();

		return;
	});

	return Promise.resolve();
};
