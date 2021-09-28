import test from 'ava';
import {
	mulberryFactory,
	functionalMulberryFactory,
} from '../../src/random/randomIndex';
import { isUniform } from '../testUtil';

test('Mulberry returns number', (t) => {
	const mulberry = mulberryFactory(0);
	t.is(typeof mulberry(), 'number');
});

test('Mulberry is repeatable', (t) => {
	const mulberry = mulberryFactory(293_123);
	const mulberry2 = mulberryFactory(293_123);

	t.is(mulberry2(), mulberry());
});

test('Between 0 and 1', (t) => {
	const mulberry = mulberryFactory(928_334);
	const oneKRandomNumbers = Array.from({ length: 10_000 }).map((_0, _1) =>
		mulberry()
	);

	t.true(oneKRandomNumbers.every((number) => number >= 0));
	t.true(oneKRandomNumbers.every((number) => number < 1));
});

test('Functional Mulberry', (t) => {
	const [firstValue, fm] = functionalMulberryFactory(8_281_024);
	const [secondValue, _fm2v0] = fm();
	const [secondValueCopy, _fm2v1] = fm();
	t.is(secondValue, secondValueCopy);
	t.not(firstValue, secondValue);
});

test('Uniform Distribution', (t) => {
	const rand = mulberryFactory(37_893);
	const data = Array.from({ length: 1e5 }).map(() => rand());
	const results = isUniform(data);
	t.true(results.passed, `p value: ${results.statistics.toFixed(3)}`);
});
