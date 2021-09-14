import test from 'ava';
import {
	interpolationHeptic,
	powerEase,
	interpolationTrignonometric,
} from '../src/interpolation';
import {
	interpolate2d,
	interpolate3d,
	interpolate4d,
} from '../src/interpolation';
import {
	interpolationQuintic,
	interpolate,
	interpolationHermite,
	interpolationLinear,
} from '../src/squeaker.js';

const range0to1 = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

test('Linear', (t) => {
	t.deepEqual(range0to1.map(interpolationLinear), range0to1);
});

test('Hermitic', (t) => {
	t.deepEqual(
		range0to1.map(interpolationHermite).map((v) => v.toFixed(3)),
		[0, 0.028, 0.104, 0.216, 0.352, 0.5, 0.648, 0.784, 0.896, 0.972, 1].map(
			(v) => v.toFixed(3)
		)
	);
});

test('Quintic', (t) => {
	t.deepEqual(
		range0to1.map(interpolationQuintic).map((v) => v.toFixed(6)),
		[
			0, 0.008_56, 0.057_92, 0.163_08, 0.317_44, 0.5, 0.682_56, 0.836_92,
			0.942_08, 0.991_44, 1,
		].map((v) => v.toFixed(6))
	);
});

test('Heptic', (t) => {
	t.deepEqual(
		range0to1.map(interpolationHeptic).map((v) => v.toFixed(6)),
		[
			0, 0.0768557505074221, 0.17923368959999997, 0.30238390876992205,
			0.4388797504000004, 0.5793571472167969, 0.7134511103999999,
			0.8308228963480473, 0.9221721695999996, 0.9801370631636726, 1,
		].map((v) => v.toFixed(6))
	);
});

test('trig', (t) => {
	t.deepEqual(
		range0to1.map(interpolationTrignonometric).map((v) => v.toFixed(6)),
		[
			0, 0.024471741852423234, 0.09549150281252627, 0.20610737385376343,
			0.34549150281252633, 0.5, 0.6545084971874737, 0.7938926261462365,
			0.9045084971874737, 0.9755282581475768, 1,
		].map((v) => v.toFixed(6))
	);
});

test('Power', (t) => {
	t.notThrows(() => powerEase(0)(0.5));
});

test('interpolate default', (t) => {
	t.is(interpolate(0, 100, 0.25), 25);
	t.is(interpolate(0, 100, 0.5), 50);
	t.is(interpolate(0, 100, 0.75), 75);
});

test('interpolate custom', (t) => {
	t.is(interpolate(0, 100, interpolationHermite(0.2)).toFixed(1), '10.4');
	t.is(interpolate(0, 100, interpolationHermite(0.5)).toFixed(1), '50.0');
	t.is(interpolate(0, 100, interpolationHermite(0.8)).toFixed(1), '89.6');
});

test('interpolate 2d', (t) => {
	t.is(interpolate2d(0, 0, 0, 0, 0, 0), 0, 'All 0');
	t.is(interpolate2d(1, 1, 1, 1, 1, 1), 1, 'All 1');
	t.is(interpolate2d(0, 0.5, 0.5, 1, 0.5, 0.5), 0.5, 'All 1/2');
});

test('interpolate 3d', (t) => {
	t.is(interpolate3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), 0, 'All 0');
	t.is(interpolate3d(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), 1, 'All 1');
	t.is(
		interpolate3d(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5),
		0.5,
		'All 1/2'
	);
});

test('interpolate 4d', (t) => {
	t.is(
		interpolate4d(
			...(Array.from({ length: 20 }).fill(0) as Parameters<
				typeof interpolate4d
			>)
		),
		0,
		'All 0'
	);
	t.is(
		interpolate4d(
			...(Array.from({ length: 20 }).fill(0.5) as Parameters<
				typeof interpolate4d
			>)
		),
		0.5,
		'All 1/2'
	);

	t.is(
		interpolate4d(
			...(Array.from({ length: 20 }).fill(1) as Parameters<
				typeof interpolate4d
			>)
		),
		1,
		'All 1'
	);
});
