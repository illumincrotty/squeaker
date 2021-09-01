import NoiseWorker from './noiseWorker3d?worker&inline';
import NoiseWorker2d from './noiseWorker2d?worker&inline';

const createWorker = (
	canvas: HTMLCanvasElement,
	constructorMessage: messageData['constructor']
) => {
	const worker = new NoiseWorker();

	worker.addEventListener('message', (message) => {
		canvas.getContext('2d')?.putImageData(message.data as ImageData, 0, 0);
	});

	worker.postMessage({
		constructor: constructorMessage,
	} as messageData);
	worker.postMessage({
		update: { frame: 0 },
	} as messageData);
	return worker;
};

const scope = () => {
	const _canvas2d = document.querySelector('#perlin2d') as HTMLCanvasElement,
		_canvas3dHeavy = document.querySelector(
			'#perlin3d-default'
		) as HTMLCanvasElement,
		_canvas3dLight = document.querySelector(
			'#perlin3d-scale'
		) as HTMLCanvasElement;

	const solidCanvasFill = (
		canvas: HTMLCanvasElement,
		fill: CanvasRenderingContext2D['fillStyle'] = 'white'
	) => {
		const _context = canvas.getContext('2d');
		if (_context) {
			_context.fillStyle = fill;
			_context.fillRect(0, 0, canvas.width, canvas.height);
		}
	};

	const drawCanvasPlaceholders = () => {
		solidCanvasFill(_canvas2d);
		solidCanvasFill(_canvas3dHeavy);
		solidCanvasFill(_canvas3dLight);
	};

	drawCanvasPlaceholders();

	const workerHeavy = createWorker(_canvas3dHeavy, {
		canvasHeight: 500,
		canvaswidth: 500,
		seed: 563_729_047,
		forceHigh: true,
	});
	const workerLight = createWorker(_canvas3dLight, {
		canvasHeight: 500,
		canvaswidth: 500,
		seed: 563_759_047,
		forceLow: true,
	});

	const worker2d = new NoiseWorker2d();
	worker2d.addEventListener('message', (message) => {
		_canvas2d
			.getContext('2d')
			?.putImageData(message.data as ImageData, 0, 0);
	});

	worker2d.postMessage({
		constructor: {
			canvasHeight: _canvas2d.height,
			canvasWidth: _canvas2d.width,
			interpolation: 'quintic',
			seed: 823_662_918,
		},
	} as messageData2d);

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
		if (frame % 2 === 0) {
			workerHeavy.postMessage({
				update: { frame: frame },
			} as messageData);
		}
		if ((frame + 1) % 2 === 0) {
			workerLight.postMessage({
				update: { frame: frame },
			} as messageData);
		}

		window.requestAnimationFrame(update);
	};
	update();
};

scope();
