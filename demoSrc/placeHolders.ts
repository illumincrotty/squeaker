/* eslint-disable promise/prefer-await-to-then */
// import { solidCanvasFill } from './demoUtil';
// export const main = (): void => {
// 	document
// 		.querySelectorAll('canvas')
// 		.forEach((canvas) => solidCanvasFill(canvas));
// };

// const asyncStartUp = async () => {
// 	const [workers, perlinDemo, valueDemo, interpolationDemo] = [
// 		import('./workerCall'),
// 		import('./perlinDemo'),
// 		import('./valueDemo'),
// 		import('./interpolationDemo'),
// 	];

// 	void (await perlinDemo).main();
// 	void (await workers).main();
// 	void (await valueDemo).main();
// 	void (await interpolationDemo).main();
// };

// void asyncStartUp();

/** Perlin 1D and 2D */
// canvasPerlin2d = getCanvasFromID('perlin2d'),
// 	canvasPerlin2dTile = getCanvasFromID('perlin2dTile'),
// 	canvasPerlin1d = getCanvasFromID('perlin1d'),
// void import('./perlinDemo').then(
// 	async (perlinDemo) => (
// 		perlinDemo.drawPerlin1d(getCanvasFromID('perlin1d')),
// 		perlinDemo.drawPerlin2d(getCanvasFromID('perlin2d')),
// 		perlinDemo.drawPerlin2dTile(getCanvasFromID('perlin2dTile'))
// 	)
// );

// Perlin 3D
// void import('./workerCall').then(async (worker) => worker.main());

// const canvasValue1d = getCanvasFromID('value1d'),
// 	canvasValue2d = getCanvasFromID('value2d'),
// 	canvasValue2dTile = getCanvasFromID('value2dTile'),
// 	canvasLinear = getCanvasFromID('interpolationLinear'),
// 	canvasHermite = getCanvasFromID('interpolationHermite'),
// 	canvasQuintic = getCanvasFromID('interpolationQuintic'),
// 	canvasTrig = getCanvasFromID('interpolationTrig');

// // Value
// void import('./valueDemo').then((valueDemo) => {
// 	void valueDemo.drawValue1d(getCanvasFromID('value1d'));
// 	void valueDemo.drawValue2d(getCanvasFromID('value2d'));
// 	void valueDemo.drawValue2dTile(getCanvasFromID('value2dTile'));
// 	return;
// });

// // interpolation
// void import('./interpolationDemo').then((interpolateDemo) => {
// 	void interpolateDemo.drawLinear(getCanvasFromID('interpolationLinear'));
// 	void interpolateDemo.drawHermite(getCanvasFromID('interpolationHermite'));
// 	void interpolateDemo.drawQuintic(getCanvasFromID('interpolationQuintic'));
// 	void interpolateDemo.drawTrig(getCanvasFromID('interpolationTrig'));
// 	return;
// });
