import test from 'ava';
import type { vector2d } from '../../src/noiseTypes';
import {
	altHash,
	cantorPairing,
	dotProduct2d,
	generatePermutationArray,
	hash,
	primeGenerator,
	rosenbergStrongPair,
	shuffle,
	szudzikPair,
	_appendFirst,
} from '../../src/util';
import { xyPair } from '../testUtil';

const oneZero: vector2d = [1, 0],
	negativeOneZero: vector2d = [-1, 0];
test('dot product postive positive', (t) => {
	t.is(dotProduct2d(oneZero, oneZero), 1);
});

test('dot product postive negative', (t) => {
	t.is(dotProduct2d(oneZero, negativeOneZero), -1);
});

test('dot product partial', (t) => {
	t.is(dotProduct2d(oneZero, [0.25, 0.25]), 0.25);
});

const hashData = Array.from({ length: 100_000 }).map((_, index) => hash(index));

const altHashData = Array.from({ length: 100_000 }).map((_, index) =>
	altHash(index)
);

test('Hash Changes number to something else', (t) => {
	t.true(hashData.every((value, index) => value !== index));
});

test('Alt Hash Changes number to something else', (t) => {
	t.true(altHashData.every((value, index) => value !== index));
});

test('Shuffle randomizes array order', (t) => {
	const numberSet = Array.from({ length: 1000 }).map((_, index) => index);
	const shuffle1 = shuffle(numberSet),
		shuffle2 = shuffle(shuffle1);
	t.notDeepEqual(shuffle1, numberSet);
	t.notDeepEqual(shuffle2, numberSet);
	t.notDeepEqual(shuffle2, shuffle1);
});

test('Generation of permutation array', (t) => {
	t.notThrows(() => generatePermutationArray(1000), 'error on generation');
});

test('Primes', (t) => {
	t.is(
		primeGenerator(120_000)[10_000 - 1],
		104_729,
		'10,000th prime is correct'
	);
});

test('_appendFirst', (t) => {
	t.deepEqual(_appendFirst([1, 0, 0, 0]), [1, 0, 0, 0, 1]);
});

test('cantor pairing', (t) => {
	const x = 1e3,
		y = 1e3,
		cantor = new Set(xyPair(x, y, cantorPairing));
	t.is(cantor.size, x * y);
});

test('szudzik pairing', (t) => {
	const x = 1e3,
		y = 1e3,
		szudzik = new Set(xyPair(x, y, szudzikPair));
	t.is(szudzik.size, x * y);
});

test('rosenberg strong pairing', (t) => {
	const x = 1e3,
		y = 1e3,
		roseStrong = new Set(xyPair(x, y, rosenbergStrongPair));
	t.is(roseStrong.size, x * y);
});
