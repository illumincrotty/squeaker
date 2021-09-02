import test from 'ava';
import {
	interpolationQuintic,
	interpolate,
	interpolationHermite,
	interpolationLinear,
} from '../src/squeaker.js';

const range0to10 = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

test('linear is linear', (t) => {
	t.deepEqual(range0to10.map(interpolationLinear), range0to10);
});

test('hermitic', (t) => {
	t.deepEqual(
		range0to10.map(interpolationHermite).map((v) => v.toFixed(3)),
		[0, 0.028, 0.104, 0.216, 0.352, 0.5, 0.648, 0.784, 0.896, 0.972, 1].map(
			(v) => v.toFixed(3)
		)
	);
});

test('Quintic', (t) => {
	t.deepEqual(
		range0to10.map(interpolationQuintic).map((v) => v.toFixed(6)),
		[
			0, 0.008_56, 0.057_92, 0.163_08, 0.317_44, 0.5, 0.682_56, 0.836_92,
			0.942_08, 0.991_44, 1,
		].map((v) => v.toFixed(6))
	);
});

test('interpolate default', (t) => {
	t.is(interpolate(0, 100, 0.25), 25);
	t.is(interpolate(0, 100, 0.5), 50);
	t.is(interpolate(0, 100, 0.75), 75);
});

test('interpolate custom', (t) => {
	t.is(interpolate(0, 100, 0.2, interpolationHermite).toFixed(1), '10.4');
	t.is(interpolate(0, 100, 0.5, interpolationHermite).toFixed(1), '50.0');
	t.is(interpolate(0, 100, 0.8, interpolationHermite).toFixed(1), '89.6');
});
