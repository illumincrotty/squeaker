/* eslint-disable @typescript-eslint/no-magic-numbers */
import test from 'ava';
import { example } from '../src/example';

test('passing test', (t) => {
	t.pass();
});

test('should know truth values', (t) => {
	t.true(true);
});

test('should know 1 == 1', (t) => {
	t.is(1, 1);
	t.is(1, 1);
});

test('should work with named imports', (t) => {
	const test = { property: 7 };
	t.deepEqual(example.identity(test)(), test);
	t.is(1, 1);
	t.is(2, 2);
});

test('can achieve full coverage', (t) => {
	t.is(example.fiveFunction(), 5);
});

test('can dynamically import fs', async (t) => {
	const fs = (await import('node:fs')).promises;
	const text = await fs.readFile('./test/example.txt');
	t.is(text.BYTES_PER_ELEMENT, 1);
});
