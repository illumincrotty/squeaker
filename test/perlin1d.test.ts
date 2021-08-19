import test from 'ava';
import { perlinNoise1dFactory as noise } from '../src/squeaker';

test('1d noise returns number', (t) => {
	const actual = noise();
	t.is(typeof actual(0), 'number');
});

test('1d noise is seedable', (t) => {
	const noiseGen1 = noise({ seed: 3024 });
	const noiseGen1Copy = noise({ seed: 3024 });
	const noiseGen2 = noise({ seed: 8024 });
	t.is(noiseGen1(Math.PI), noiseGen1Copy(Math.PI));
	t.not(noiseGen1(Math.PI), noiseGen2(Math.PI));
});
