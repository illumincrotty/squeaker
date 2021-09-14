import test from 'ava';
import { perlinNoise1dFactory as noise } from '../../src/squeaker';
import { aleaFactory } from '../../src/random/alea';

test('1d noise returns number', (t) => {
	const actual = noise();
	t.is(typeof actual(0), 'number');
});

test('1d noise is seedable', (t) => {
	const noiseSeed1 = noise({ seed: 3024 });
	const noiseSeed1v2 = noise({ seed: 3024 });
	const noiseSeed2 = noise({ seed: 8024 });
	t.is(
		noiseSeed1(Math.PI),
		noiseSeed1v2(Math.PI),
		'Same seed -> same output'
	);
	t.not(
		noiseSeed1(Math.PI),
		noiseSeed2(Math.PI),
		'Different seed -> different output'
	);
});

test('Between 0 and 1', (t) => {
	const noiseGen = noise();
	const data = Array.from({ length: 1e5 }).map((_, index) =>
		noiseGen(index / 1e4)
	);
	t.true(data.every((value) => value >= 0 && value <= 1));
});

test('random overrrides seed', (t) => {
	const noiseSeed = noise({ seed: 3024 });
	const noiseSeedAndRandom = noise({
		seed: 3024,
		random: aleaFactory('2024').random,
	});
	t.not(noiseSeed(1.432), noiseSeedAndRandom(1.432));
});

test('range is effective', (t) => {
	const size = 10,
		generator = noise({ xSize: size });
	t.is(generator(Math.PI), generator(Math.PI + size), 'add');
	t.is(generator(Math.PI), generator(-size + Math.PI), 'subtract');
});

test('edge case: cusp', (t) => {
	const size = 10,
		generator = noise({ xSize: size });
	t.is(generator(0), generator(size), 'add');
});
