import test from 'ava';
import { aleaFactory } from '../../src/random/randomIndex';
import { valueNoise2dFactory as noiseGenerator } from '../../src/squeaker';

import { flatGridGenerator, rangeGenerator } from '../../src/util';

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
	const perlin2d = noiseGenerator({
		// seed: 1_092_378,
		xSize: _parameter.xSize,
		ySize: _parameter.ySize,
	});

	const noiseGen = flatGridGenerator(
		{
			start: 0,
			end: _parameter.xSize,
			step: _parameter.xSize / _parameter.xDiv,
		},
		{
			start: 0,
			end: _parameter.ySize,
			step: _parameter.ySize / _parameter.yDiv,
		},
		perlin2d
	);
	let noiseData = noiseGen.next(),
		count = 0,
		accumulator = 0,
		min = noiseData.value as number,
		max = noiseData.value as number;
	const tenths = [...rangeGenerator({ start: 0, end: 10 })].map(() => 0);
	while (!noiseData.done) {
		count += 1;
		accumulator += noiseData.value;
		min = Math.min(min, noiseData.value);
		max = Math.max(max, noiseData.value);
		tenths[Math.floor(noiseData.value * 10)] += 1;
		noiseData = noiseGen.next();
	}

	// console.log(`Elements seen: ${count}`);
	// console.log(`Noise Max: ${max}`);
	// console.log(`Noise Min: ${min}`);
	// console.log(`Noise Average: ${accumulator / count}`);
	// console.log(
	// 	`Noise distribution: \n${tenths
	// 		.map(
	// 			(value, _index) =>
	// 				`\t0.${_index}: ${((value / count) * 100)
	// 					.toFixed(2)
	// 					.padStart(6, ' ')}% - ${value}`.padEnd(28, ' ') +
	// 				'*'.repeat(1 + (value / count) * 100)
	// 		)
	// 		.join('\n')}`
	// );
	return [min, max, count, accumulator, tenths];
};
const _bigTestparameters = {
	xSize: 100,
	ySize: 100,
	xDiv: 1000,
	yDiv: 1000,
};

const _smallTestparameters = {
	xSize: 10,
	ySize: 10,
	xDiv: 100,
	yDiv: 100,
};

const data = (() => {
	const closuredData = _testing(_bigTestparameters);
	return () => closuredData;
})();

// _testing();

test('Basic 2d test', (t) => {
	const noise = noiseGenerator();
	t.is(typeof noise(0, 0), 'number');
});

test('range is [0,1)', (t) => {
	const noiseData = [
		...flatGridGenerator(
			{ start: 0, end: 10, step: 0.1 },
			{ start: 0, end: 10, step: 0.1 },
			noiseGenerator()
		),
	];
	t.true(noiseData.every((v) => v >= 0 && v < 1));
});

test('perlin 2d is repeatable/isomorphic', (t) => {
	const random = aleaFactory().random,
		randX = random() * 100,
		randY = random() * 100;
	const actual = noiseGenerator({ seed: 71_238 });
	t.is(actual(randX, randY), actual(randX, randY));
});

test('perlin 2d is pseduo-random/seedable', (t) => {
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
		noise(0.286, 0.286).toPrecision(15),
		noise(10.286, 10.286).toPrecision(15),
		'specific case'
	);

	const random = aleaFactory().random,
		randX = random() * 10,
		randY = random() * 10;

	t.is(
		noise(randX, randY).toPrecision(15),
		noise(10 + randX, 10 + randY).toPrecision(15),
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

test('Average value approximately .5', (t) => {
	const [_a, _b, count, accumulator, _c] = data();

	t.is((accumulator / count).toPrecision(1), '0.5');
});

test('returns values in range [0,1]', (t) => {
	const [_min, _max, _count, _accumulator, _tenths] = data();

	t.is(Math.max(1, _max), 1);
	t.is(Math.min(0, _min), 0);
});
