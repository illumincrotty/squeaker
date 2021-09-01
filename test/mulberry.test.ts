/* eslint-disable @typescript-eslint/no-magic-numbers */
import test from 'ava';
import {
	mulberryFactory,
	functionalMulberryFactory,
	rangeGenerator,
} from '../src/squeaker';

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
	const oneKRandomNumbers = [...rangeGenerator({ start: 0, end: 1000 })].map(
		mulberry
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
