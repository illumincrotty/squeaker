/* eslint-disable promise/prefer-await-to-then */
import '../assets/styles/noiseDemo.css';
import '../assets/styles/styles.css';
import { getCanvasFromID, solidCanvasFill } from './demoUtil';

const startup = async () => {
	document
		.querySelectorAll('canvas')
		.forEach((canvas) => solidCanvasFill(canvas));
	return Promise.resolve();
};

void startup();

/** Perlin 1D and 2D */
// canvasPerlin2d = getCanvasFromID('perlin2d'),
// 	canvasPerlin2dTile = getCanvasFromID('perlin2dTile'),
// 	canvasPerlin1d = getCanvasFromID('perlin1d'),
void import('./perlinDemo').then(
	async (perlinDemo) => (
		perlinDemo.drawPerlin1d(getCanvasFromID('perlin1d')),
		perlinDemo.drawPerlin2d(getCanvasFromID('perlin2d')),
		perlinDemo.drawPerlin2dTile(getCanvasFromID('perlin2dTile'))
	)
);

// Perlin 3D
void import('./workerCall').then(async (worker) =>
	worker.animate(getCanvasFromID('perlin3d'), getCanvasFromID('perlin3dTile'))
);

const canvasValue1d = getCanvasFromID('value1d'),
	canvasValue2d = getCanvasFromID('value2d'),
	canvasValue2dTile = getCanvasFromID('value2dTile'),
	canvasLinear = getCanvasFromID('interpolationLinear'),
	canvasHermite = getCanvasFromID('interpolationHermite'),
	canvasQuintic = getCanvasFromID('interpolationQuintic'),
	canvasTrig = getCanvasFromID('interpolationTrig');

// Value
void import('./valueDemo').then((valueDemo) => {
	void valueDemo.drawValue1d(canvasValue1d);
	void valueDemo.drawValue2d(canvasValue2d);
	void valueDemo.drawValue2dTile(canvasValue2dTile);
	return;
});

// interpolation
void import('./interpolationDemo').then((interpolateDemo) => {
	void interpolateDemo.drawLinear(canvasLinear);
	void interpolateDemo.drawHermite(canvasHermite);
	void interpolateDemo.drawQuintic(canvasQuintic);
	void interpolateDemo.drawTrig(canvasTrig);
	return;
});
