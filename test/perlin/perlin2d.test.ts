import test from 'ava';
import { aleaFactory } from '../../src/random/randomIndex';
import { perlinNoise2dFactory as noiseGenerator } from '../../src/squeaker';
// eslint-disable-next-line ava/no-import-test-files
import { xyPair } from '../testUtil';

// _testing();

test('Basic 2d test', (t) => {
	const noise = noiseGenerator();
	t.is(noise(0, 0), 0.5);
});

test('range is [0,1)', (t) => {
	const noise = noiseGenerator();
	const noiseData = [...xyPair(100, 100, (x, y) => noise(x * 0.1, y * 0.1))];
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
const noiseGlobal = noiseGenerator(),
	noiseDataGenerator = xyPair(1000, 1000, (x, y) =>
		noiseGlobal(x * 0.1, y * 0.1)
	);
let noiseDataCount = 0,
	noiseDataTotal = 0,
	noiseDataMax = Number.NEGATIVE_INFINITY,
	noiseDataMin = Number.POSITIVE_INFINITY;
for (const value of noiseDataGenerator) {
	noiseDataCount++;
	noiseDataTotal += value;
	noiseDataMax = Math.max(noiseDataMax, value);
	noiseDataMin = Math.min(noiseDataMin, value);
}
test('Average value approximately .5', (t) => {
	t.true(noiseDataTotal / noiseDataCount - 0.5 < 0.001);
});

test('returns values in range [0,1]', (t) => {
	t.true(noiseDataMax <= 1, `Max is ${noiseDataMax}`);
	t.true(noiseDataMin >= 0, `Min is ${noiseDataMin}`);
});

test('creates normal distribution', (t) => {
	// const [_a, _b, _count, _accumulator, _tenths] = data();
	// const distribution = [0, 2, 8, 16, 23, 23, 16, 8, 2, 0];
	// const set = _tenths.map(
	// 	(input, index) => distribution[index] - (input / _count) * 100
	// );

	// t.log(set);

	// t.true(set.every((input) => Math.abs(input) <= 1));
	t.pass('Need to be implemented');
});
