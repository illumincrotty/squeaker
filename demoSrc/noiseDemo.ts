// import { main as placeholders } from './placeHolders';
import { main as workerMain } from './workerCall';
import { main as perlinMain } from './perlinDemo';
import { main as valueMain } from './valueDemo';
import { main as interpolationMain } from './interpolationDemo';
import '../assets/styles/noiseDemo.css';
import '../assets/styles/styles.css';
import { solidCanvasFill } from './demoUtil';

// queueMicrotask(() => {
// 	void (async () => (await import('./workerCall')).main())();
// });
// window.setTimeout(() => {
// 	void (async () => (await import('./workerCall')).main())();
// }, 1000);
void perlinMain();
queueMicrotask(() => {
	document
		.querySelectorAll('canvas')
		// eslint-disable-next-line unicorn/no-array-for-each
		.forEach((canvas) => solidCanvasFill(canvas));
});

// placeholders();
requestIdleCallback(() => {
	void workerMain();
});
requestIdleCallback(() => {
	void valueMain();
});
requestIdleCallback(() => {
	void interpolationMain();
});
// window.setTimeout(() => perlinMain());

// queueMicrotask(() => {

// });
// window.setTimeout(() => {
// 	void (async () => (await import('./perlinDemo')).main())();
// }, 1000);

// window.setTimeout(() => {
// 	void (async () => (await import('./perlinDemo')).main())();
// }, 1000);

// queueMicrotask(() => {
// 	void import('./workerCall').then((workers) => {
// 		void workers.main();
// 		return;
// 	});
// });
// void perlinMain();
// queueMicrotask(() => {
// void import('./perlinDemo').then((perlinDemo) => {
// 	void perlinDemo.main();
// 	return;
// });
// });
// queueMicrotask(() => {
// 	void import('./valueDemo').then((valueDemo) => {
// 		void valueDemo.main();
// 		return;
// 	});
// });
