/* eslint-disable @typescript-eslint/no-magic-numbers */
import test from 'ava';
import {
	mulberryFactory,
	functionalMulberryFactory,
} from '../src/randomFunctions';
import { range } from '../src/util';

test('Mulberry returns number', (t) => {
	const mulberry = mulberryFactory(0);
	t.is(typeof mulberry(), 'number');
});

test('Mulberry is repeatable', (t) => {
	const mulberry = mulberryFactory(293123);
	const mulberry2 = mulberryFactory(293123);

	t.is(mulberry2(), mulberry());
});

test('Between 0 and 1', (t) => {
	const mulberry = mulberryFactory(928334);
	const oneKRandomNumbers = range(0, 1000).map(mulberry);

	t.true(oneKRandomNumbers.every((num) => num >= 0));
	t.true(oneKRandomNumbers.every((num) => num < 1));
});

test('Functional Mulberry', (t) => {
	const [firstValue, fm] = functionalMulberryFactory(8281024);
	const [secondValue, fm2v0] = fm();
	const [secondValueCopy, fm2v1] = fm();
	t.is(secondValue, secondValueCopy);
	t.not(firstValue, secondValue);
});
