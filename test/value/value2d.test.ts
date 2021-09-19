import test from 'ava';
import { aleaFactory } from '../../src/random/randomIndex';
import { valueNoise2dFactory as noiseGenerator } from '../../src/squeaker';

import { getRandomLargePrime } from '../../src/util';
import { xyPair } from '../testUtil';

const _testing = (_parameter: {
	xSize: number;
	ySize: number;
	xDiv: number;
	yDiv: number;
}): [
	min: number,
	max: number,
	count: number,
	accumulator: number,
	tenths: number[]
] => {
	const noise = noiseGenerator({
		xSize: _parameter.xSize,
		ySize: _parameter.ySize,
	});

	const noiseGen = xyPair(_parameter.xSize, _parameter.ySize, (x, y) =>
		noise(x * _parameter.xDiv, y * _parameter.yDiv)
	);

	let noiseData = noiseGen.next(),
		count = 0,
		accumulator = 0,
		min = noiseData.value as number,
		max = noiseData.value as number;
	const tenths = Array.from({ length: 10 }).fill(0) as number[];
	while (!noiseData.done) {
		count += 1;
		accumulator += noiseData.value;
		min = Math.min(min, noiseData.value);
		max = Math.max(max, noiseData.value);
		tenths[Math.floor(noiseData.value * 10)] += 1;
		noiseData = noiseGen.next();
	}
	return [min, max, count, accumulator, tenths];
};
const _bigTestparameters = {
	xSize: 100,
	ySize: 100,
	xDiv: 0.1,
	yDiv: 0.1,
};

const _smallTestparameters = {
	xSize: 10,
	ySize: 10,
	xDiv: 0.1,
	yDiv: 0.1,
};

const data = (() => {
	const closuredData = _testing(_bigTestparameters);
	return () => closuredData;
})();

test('Basic 2d test', (t) => {
	const noise = noiseGenerator();
	t.is(typeof noise(0, 0), 'number');
});

test('range is [0,1)', (t) => {
	const noise = noiseGenerator();
	const noiseData = [...xyPair(100, 100, (x, y) => noise(x * 0.1, y * 0.1))];
	t.true(noiseData.every((v) => v >= 0 && v < 1));
});

test('value 2d is repeatable/isomorphic', (t) => {
	const random = aleaFactory().random,
		randX = random() * 100,
		randY = random() * 100;
	const actual = noiseGenerator({ seed: 71_238 });
	t.is(actual(randX, randY), actual(randX, randY));
});

test('value 2d is pseduo-random/seedable', (t) => {
	const random = aleaFactory().random,
		randX = random() * 100,
		randY = random() * 100;
	const actual = noiseGenerator({ seed: 71_238 });
	const expected = noiseGenerator({ seed: 71_238 });
	t.is(actual(randX, randY), expected(randX, randY));
});

test('Respects ranges', (t) => {
	const noise = noiseGenerator({
		seed: 71_238,
		xSize: 10,
		ySize: 10,
	});

	t.is(
		noise(0.286, 0.286).toPrecision(10),
		noise(10.286, 10.286).toPrecision(10),
		'specific case'
	);

	const random = aleaFactory().random,
		randX = random() * 10,
		randY = random() * 10;

	t.is(
		noise(randX, randY).toPrecision(10),
		noise(10 + randX, 10 + randY).toPrecision(10),
		'random case'
	);
});

test('works in the negative', (t) => {
	const noise = noiseGenerator({
		seed: 71_238,
		xSize: 10,
		ySize: 10,
	});

	t.true(typeof noise(-0.2, -0.2) === 'number');
});

test('respects range in the negative', (t) => {
	const noise = noiseGenerator({
		seed: 71_238,
		xSize: 10,
		ySize: 10,
	});

	t.is(
		noise(-0.2, -0.2).toPrecision(10),
		noise(10 - 0.2, 10 - 0.2).toPrecision(10),
		'specific case'
	);

	const random = aleaFactory().random,
		randX = -random() * 10,
		randY = -random() * 10;

	t.is(
		noise(randX, randY).toPrecision(15),
		noise(10 + randX, 10 + randY).toPrecision(15),
		'random case'
	);
});

test('Range at cusps', (t) => {
	const xRange = 10,
		yRange = 10;
	const noise = noiseGenerator({ xSize: xRange, ySize: yRange });
	t.is(noise(-0.5, -0.5), noise(xRange - 0.5, yRange - 0.5));
});

test('unbounded range', (t) => {
	const noise = noiseGenerator({ xSize: 0, ySize: 0 });
	t.notThrows(() =>
		noise(
			getRandomLargePrime(Math.random),
			getRandomLargePrime(Math.random)
		)
	);
});

test('Average value approximately .5', (t) => {
	const [_a, _b, count, accumulator, _c] = data();

	t.is((accumulator / count).toPrecision(1), '0.5');
});

test('returns values in range [0,1]', (t) => {
	const [_min, _max, _count, _accumulator, _tenths] = data();

	t.is(Math.max(1, _max), 1);
	t.is(Math.min(0, _min), 0);
});
