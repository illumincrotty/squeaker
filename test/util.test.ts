/* eslint-disable @typescript-eslint/no-magic-numbers */
import test from 'ava';
import {
	flatGridGenerator,
	range,
	rangeGenerator,
	dotProduct,
} from '../src/util';

test('includes minimum excludes maximum', (t) => {
	const testing = range(0, 1);
	const expected = [0];
	t.is(testing.length, 1);
	t.is(testing[0], 0);
	t.deepEqual(testing, expected);
});

test('normal functionality', (t) => {
	const testing = range(0, 10);
	const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	t.is(testing.length, 10);
	t.is(testing[0], 0);
	t.deepEqual(testing, expected);
});

test('non 0 min functionality', (t) => {
	const testing = range(8, 12);
	const expected = [8, 9, 10, 11];
	t.is(testing[0], 8);
	t.deepEqual(testing, expected);
});

test('non one integer steps', (t) => {
	const testing = range(0, 10, 2);
	const expected = [0, 2, 4, 6, 8];
	t.deepEqual(testing, expected);
});

test('non integer steps', (t) => {
	const testing = range(2, 4, 0.5);
	const expected = [2, 2.5, 3, 3.5];
	t.deepEqual(testing, expected);
});

test('step negative 1', (t) => {
	const testing = range(4, -3, -1);
	const expected = [4, 3, 2, 1, 0, -1, -2];
	t.deepEqual(testing, expected);
});

test('step negative 1, bad range', (t) => {
	const testing = range(4, 5, -1);
	const expected: number[] = [];
	t.deepEqual(testing, expected);
});

test('step negative non integer', (t) => {
	const testing = range(40, 38, -0.2);
	const expected: number[] = [
		40, 39.8, 39.6, 39.4, 39.2, 39, 38.8, 38.6, 38.4, 38.2,
	];
	t.deepEqual(
		testing.map((numb) => numb.toPrecision(3)),
		expected.map((numb) => numb.toPrecision(3))
	);
});

test('range generator basics', (t) => {
	t.deepEqual([...rangeGenerator({ start: 0, end: 3 })], [0, 1, 2]);
});

test('range generator next', (t) => {
	const generator = rangeGenerator({ start: 0, end: 3 });
	let data = generator.next();
	const actual = [];
	while (!data.done) {
		actual.push(data.value);
		data = generator.next();
	}
	t.deepEqual(actual, [0, 1, 2]);
});

test('range generator fractional step', (t) => {
	t.deepEqual(
		[...rangeGenerator({ start: 0, end: 2, step: 0.1 })].map((value) =>
			value.toFixed(1)
		),
		[
			0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3,
			1.4, 1.5, 1.6, 1.7, 1.8, 1.9,
		].map((value) => value.toFixed(1))
	);
});

test('range generator next fractional step', (t) => {
	const generator = rangeGenerator({ start: 0, end: 1, step: 0.1 });
	let data = generator.next();
	const actual = [];
	while (!data.done) {
		actual.push(data.value);
		data = generator.next();
	}
	t.deepEqual(
		actual.map((value) => +value.toFixed(1)),
		[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
	);
});

test('Flat Range non integer step Tests', (t) => {
	const actual = [
		...flatGridGenerator(
			{ start: 0, end: 2 },
			{ start: 0, end: 1, step: 0.1 },
			(_x: number, _y: number) => +_y.toFixed(1)
		),
	];
	t.is(actual.length, 20);
});

test('flatGrid big test', (t) => {
	const xSize = 100,
		ySize = 100,
		xDiv = 1000,
		yDiv = 1000;
	t.is(
		[
			...flatGridGenerator(
				{ start: 0, end: xSize, step: xSize / 1000 },
				{ start: 0, end: ySize, step: ySize / 1000 }
			),
		].length,
		xDiv * yDiv
	);
});

const oneZero = { x: 1, y: 0 },
	negativeOneZero = { x: -1, y: 0 };
test('dot product postive positive', (t) => {
	t.is(dotProduct(oneZero, oneZero), 1);
});

test('dot product postive negative', (t) => {
	t.is(dotProduct(oneZero, negativeOneZero), -1);
});

test('dot product partial', (t) => {
	t.is(dotProduct(oneZero, { x: 0.25, y: 0.25 }), 0.25);
});
