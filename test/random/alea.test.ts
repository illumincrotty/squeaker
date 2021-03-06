import test from 'ava';
import { isUniform } from '../testUtil';
import { aleaFactory } from './../../src/random/alea';

test('Alea Factory type tests', (t) => {
	const alea = aleaFactory();
	const numberTest = alea.random();
	t.true(typeof numberTest === 'number', 'random returns number');
});

test('Alea random function matches the standard', (t) => {
	const alea = aleaFactory('1277182878230');

	t.is(alea.random(), 0.619_839_858_729_392_3); // returns 0.6198398587293923
	t.is(alea.random(), 0.838_533_863_425_254_8); // returns 0.8385338634252548
	t.is(alea.random(), 0.364_484_860_561_788_1); // returns 0.3644848605617881
});

test('Alea 32Bit function matches the standard', (t) => {
	const alea = aleaFactory('');

	t.is(alea.uint32(), 715_789_690);
	t.is(alea.uint32(), 2_091_287_642);
	t.is(alea.uint32(), 486_307);
});

test('Alea Fract53 matches standards', (t) => {
	const alea = aleaFactory('');

	t.is(alea.fract53(), 0.166_657_774_356_872_68);
	t.is(alea.fract53(), 0.000_113_227_381_431_602_05);
	t.is(alea.fract53(), 0.176_957_816_311_764_88);
});

test('State Tests', (t) => {
	const alea = aleaFactory('');
	const firstState = alea.exportState();
	const firstValue = alea.random();
	t.notDeepEqual(
		alea.exportState(),
		firstState,
		'State changes between calls'
	);

	alea.importState(firstState);

	t.deepEqual(alea.exportState(), firstState);

	t.deepEqual(alea.random(), firstValue);
});

test('Uniform Distribution', (t) => {
	const rand = aleaFactory().random;
	const data = Array.from({ length: 1e6 }).map(() => rand());
	const results = isUniform(data);
	t.true(results.passed, `p value: ${results.statistics.toFixed(3)}`);
});
