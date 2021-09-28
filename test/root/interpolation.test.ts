import test from 'ava';

import {
	interpolate,
	interpolate2d,
	interpolate3d,
	interpolate4d,
	interpolationHeptic,
	interpolationHermite,
	interpolationLinear,
	interpolationQuintic,
	interpolationTrignonometric,
	powerEase,
} from '../../src/interpolation';

const range0to1 = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

test('Linear', (t) => {
	t.deepEqual(
		range0to1.map((element) => interpolationLinear(element)),
		range0to1
	);
});

test('Hermitic', (t) => {
	t.deepEqual(
		range0to1
			.map((element) => interpolationHermite(element))
			.map((v) => v.toFixed(3)),
		[0, 0.028, 0.104, 0.216, 0.352, 0.5, 0.648, 0.784, 0.896, 0.972, 1].map(
			(v) => v.toFixed(3)
		)
	);
});

test('Quintic', (t) => {
	t.deepEqual(
		range0to1
			.map((element) => interpolationQuintic(element))
			.map((v) => v.toFixed(6)),
		[
			0, 0.008_56, 0.057_92, 0.163_08, 0.317_44, 0.5, 0.682_56, 0.836_92,
			0.942_08, 0.991_44, 1,
		].map((v) => v.toFixed(6))
	);
});

test('Heptic', (t) => {
	t.deepEqual(
		range0to1
			.map((element) => interpolationHeptic(element))
			.map((v) => v.toFixed(6)),
		[
			0, 0.076_855_750_507_422_1, 0.179_233_689_599_999_97,
			0.302_383_908_769_922_05, 0.438_879_750_400_000_4,
			0.579_357_147_216_796_9, 0.713_451_110_399_999_9,
			0.830_822_896_348_047_3, 0.922_172_169_599_999_6,
			0.980_137_063_163_672_6, 1,
		].map((v) => v.toFixed(6))
	);
});

test('trig', (t) => {
	t.deepEqual(
		range0to1
			.map((element) => interpolationTrignonometric(element))
			.map((v) => v.toFixed(6)),
		[
			0, 0.024_471_741_852_423_234, 0.095_491_502_812_526_27,
			0.206_107_373_853_763_43, 0.345_491_502_812_526_33, 0.5,
			0.654_508_497_187_473_7, 0.793_892_626_146_236_5,
			0.904_508_497_187_473_7, 0.975_528_258_147_576_8, 1,
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
