import bench from 'benny';

import type { Options } from 'benny/lib/internal/common-types';

import {
	interpolationHeptic,
	interpolationHermite,
	interpolationLinear,
	interpolationQuintic,
	interpolationTrignonometric,
	randomFactory,
} from '../src/squeaker';
import {
	cantorPairing,
	hash,
	pair3d,
	rosenbergStrongPair,
	shuffle,
	szudzikPair,
} from '../src/util';
import { percent, summarize } from './benchmarkUtilities';

const _options: Options = {
	minSamples: 10,
	initCount: 10,
	delay: 1,
	// minTime: 0.1,
};

const _pairing2d = (o?: Options) => {
	/***************************************************************************************/
	/*                                                                                     */
	/*    2d Pairing functions Results:                                                    */
	/*                                                                                     */
	/*    szudzik:          229,704,718 operations/second ± 0.074% | Fastest               */
	/*    rosenberg strong: 229,537,013 operations/second ± 0.179% | 2nd | 0.07% slower    */
	/*    cantor:           229,517,972 operations/second ± 0.184% | 3rd | 0.08% slower    */
	/*                                                                                     */
	/***************************************************************************************/
	void bench.suite(
		'2d Pairing functions',
		bench.add('cantor', () => cantorPairing(100, 100), o),
		bench.add('szudzik', () => szudzikPair(100, 100), o),
		bench.add('rosenberg strong', () => rosenbergStrongPair(100, 100), o),
		bench.cycle(percent),
		bench.complete(summarize)
	);
};

const _pairingBigInt = (o?: Options) => {
	/*********************************************************************************************/
	/*                                                                                           */
	/*    Bigint Pairing Vs numberPairing Results:                                               */
	/*                                                                                           */
	/*    rosenberg strong number: 225,242,440 operations/second ± 0.109% | Fastest              */
	/*    rosenberg strong bigint: 6,710,524 operations/second ± 0.502% | 2nd | 97.02% slower    */
	/*                                                                                           */
	/*********************************************************************************************/
	// const hundred = 100n;
	void bench.suite(
		'Bigint Pairing Vs number Pairing',
		// bench.add(
		// 	'rosenberg strong bigint',
		// 	() => rosenbergStrongPairBigInt(hundred, hundred),
		// 	o
		// ),
		bench.add(
			'rosenberg strong number',
			() => rosenbergStrongPair(100, 100),
			o
		),
		bench.cycle(percent),
		bench.complete(summarize)
	);
};

const _bigIntBasics = (o?: Options) => {
	/*******************************************************************************************/
	/*                                                                                         */
	/*    Big Int speed vs Number Results:                                                     */
	/*                                                                                         */
	/*    number shift up:   1,393,271,723 operations/second ± 0.102% | Fastest                */
	/*    number add:        1,390,375,073 operations/second ± 0.188% | 2nd | 0.21% slower     */
	/*    number subtract:   1,386,372,071 operations/second ± 0.308% | 3rd | 0.50% slower     */
	/*    bigint subtract:   1,366,796,292 operations/second ± 0.098% | 4th | 1.90% slower     */
	/*    number shift down: 1,184,083,815 operations/second ±20.618% | 5th | 15.01% slower    */
	/*    number exponents:  636,837,431 operations/second ±37.935% | 6th | 54.29% slower      */
	/*    number Modulus:    151,350,414 operations/second ± 2.409% | 7th | 89.14% slower      */
	/*    number Multiply:   147,116,063 operations/second ± 2.440% | 8th | 89.44% slower      */
	/*    number divide:     146,012,562 operations/second ± 2.970% | 9th | 89.52% slower      */
	/*    bigint add:        132,293,735 operations/second ± 5.440% | 10th | 90.50% slower     */
	/*    bigint shift down: 20,622,408 operations/second ± 4.083% | 11th | 98.52% slower      */
	/*    bigint shift up:   17,299,321 operations/second ± 5.706% | 12th | 98.76% slower      */
	/*    bigint Modulus:    14,662,528 operations/second ± 0.362% | 13th | 98.95% slower      */
	/*    bigint Multiply:   14,233,873 operations/second ± 5.129% | 14th | 98.98% slower      */
	/*    bigint divide:     13,282,633 operations/second ± 0.716% | 15th | 99.05% slower      */
	/*    bigint exponents:   5,258,301 operations/second ± 3.383% | 16th | 99.62% slower      */
	/*                                                                                         */
	/*******************************************************************************************/
	const hundred = 100n;
	const two = 2n;
	void bench.suite(
		'Big Int speed vs Number',
		bench.add('bigint add', () => hundred + hundred, o),
		bench.add('number add', () => 100 + 100, o),
		bench.add('bigint subtract', () => hundred - hundred, o),
		bench.add('number subtract', () => 100 - 100, o),
		bench.add('bigint Multiply', () => hundred * hundred, o),
		bench.add('number Multiply', () => 100 * 100, o),
		bench.add('bigint divide', () => hundred / hundred, o),
		bench.add('number divide', () => 100 / 100, o),
		bench.add('bigint shift up', () => hundred << two, o),
		bench.add('number shift up', () => 100 << 2, o),
		bench.add('bigint shift down', () => hundred >> two, o),
		bench.add('number shift down', () => 100 >> 2, o),
		bench.add('bigint Modulus', () => hundred % two, o),
		bench.add('number Modulus', () => 100 % 2, o),
		bench.add('bigint exponents', () => hundred ** 8n, o),
		bench.add('number exponents', () => 100 ** 8, o),
		bench.cycle(percent),
		bench.complete(summarize)
	);
};

const _numberOperations = (o?: Options) => {
	/**************************************************************************************************/
	/*                                                                                                */
	/*    Number Operations Results:                                                                  */
	/*                                                                                                */
	/*    number subtract:           1,394,039,676 operations/second ± 0.072% | Fastest               */
	/*    number shift down >>>:     1,393,909,410 operations/second ± 0.096% | 2nd | 0.01% slower    */
	/*    number Multiply:           1,393,064,041 operations/second ± 0.081% | 2nd | 0.01% slower    */
	/*    number Multiply:           1,390,519,131 operations/second ± 0.115% | 4th | 0.25% slower    */
	/*    number divide:             1,387,608,806 operations/second ± 0.174% | 5th | 0.46% slower    */
	/*    number add:                1,381,669,410 operations/second ± 0.897% | 6th | 0.89% slower    */
	/*    number shift down >>:      1,370,280,195 operations/second ± 0.752% | 7th | 1.70% slower    */
	/*    number Modulus:            147,145,381 operations/second ± 1.853% | 9th | 89.44% slower     */
	/*    number exponents **:       146,475,000 operations/second ± 2.206% | 9th | 89.49% slower     */
	/*    number exponents Math.pow: 144,053,843 operations/second ± 1.811% | 10th | 89.67% slower    */
	/*    number math imul:          142,533,641 operations/second ± 1.796% | 11th | 89.77% slower    */
	/*                                                                                                */
	/**************************************************************************************************/
	// const hundred = 100;

	// void bench.suite(
	// 	'Number Operations Basic',
	// 	bench.add('Add', () => 100 + 1, o),
	// 	bench.add('Subtract', () => hundred - 1, o),
	// 	bench.add('Increment Pre', () => ++hundredModified, o),
	// 	bench.add('Increment Post', () => hundredModified++, o),
	// 	bench.add('Decrement post', () => hundredModified--, o),
	// 	bench.add('Decrement pre', () => --hundredModified, o),
	// 	bench.add('Multiply', () => 100 * 100, o),
	// 	bench.add('Math imul', () => Math.imul(100, 2), o),
	// 	bench.add('Divide', () => 100 / 2, o),
	// 	bench.add('Modulus', () => 100 % 2, o),
	// 	bench.add('Exponents **', () => 100 ** 2, o),
	// 	// eslint-disable-next-line prefer-exponentiation-operator
	// 	bench.add('Exponents Math.pow', () => Math.pow(100, 2), o),
	// 	bench.cycle(percent),
	// 	bench.complete(summarize)
	// );

	/***************************************************************************************/
	/*                                                                                     */
	/*    Number Increment, Decrement Results:                                             */
	/*                                                                                     */
	/*    Increment Post: 1,416,501,929 operations/second ±  0.04% | Fastest               */
	/*    Decrement pre:  1,415,571,105 operations/second ±  0.05% | 2nd | 0.07% slower    */
	/*    Decrement post: 1,415,400,760 operations/second ±  0.05% | 3rd | 0.08% slower    */
	/*    Increment Pre:  1,413,898,750 operations/second ±  0.26% | 4th | 0.18% slower    */
	/*                                                                                     */
	/***************************************************************************************/
	void bench.suite(
		'Number Increment, Decrement',
		bench.add('Increment Pre', (x = 10) => ++x, o),
		bench.add('Increment Post', (x = 10) => x++, o),
		bench.add('Decrement post', (x = 10) => x--, o),
		bench.add('Decrement pre', (x = 10) => --x, o),
		bench.cycle(percent),
		bench.complete(summarize)
	);

	/***************************************************************************************/
	/*                                                                                     */
	/*    Number Operations divide by 2 Results:                                           */
	/*                                                                                     */
	/*    Multiply .5:    1,415,779,797 operations/second ±  0.13% | Fastest               */
	/*    Divide:         1,415,132,520 operations/second ±  0.11% | 2nd | 0.05% slower    */
	/*    Shift down >>:  1,414,110,628 operations/second ±  0.09% | 3rd | 0.12% slower    */
	/*    Shift down >>>: 1,414,014,720 operations/second ±  0.11% | 4th | 0.12% slower    */
	/*    Math imul:      1,413,607,004 operations/second ±  0.12% | 5th | 0.15% slower    */
	/*                                                                                     */
	/***************************************************************************************/
	// void bench.suite(
	// 	'Number Operations divide by 2',
	// 	bench.add('Multiply .5', () => 100 * 0.5, o),
	// 	bench.add('Divide', () => 100 / 2, o),
	// 	bench.add('Shift down >>', () => 100 >> 2, o),
	// 	bench.add('Shift down >>>', () => 100 >>> 2, o),
	// 	bench.add('Math imul', () => Math.imul(100, 0.5), o),
	// 	bench.cycle(percent),
	// 	bench.complete(summarize)
	// );

	/**************************************************************************/
	/*                                                                        */
	/*    Number Operations Unary Results:                                    */
	/*                                                                        */
	/*    ~: 1,416,340,833 operations/second ±  0.04% | Fastest               */
	/*    +: 1,415,663,203 operations/second ±  0.11% | 2nd | 0.05% slower    */
	/*    -: 1,415,281,539 operations/second ±  0.18% | 3rd | 0.07% slower    */
	/*    !: 1,400,197,462 operations/second ±  1.04% | 4th | 1.14% slower    */
	/*                                                                        */
	/**************************************************************************/
	// void bench.suite(
	// 	'Number Operations Unary',
	// 	bench.add('+', () => +100, o),
	// 	bench.add('-', () => -100, o),
	// 	bench.add('~', () => ~100, o),
	// 	bench.add('!', () => !100, o),
	// 	bench.cycle(percent),
	// 	bench.complete(summarize)
	// );

	/*************************************************************************************************/
	/*                                                                                               */
	/*    Number Operations binary bitwise Results:                                                  */
	/*                                                                                               */
	/*    ^:                        1,416,110,039 operations/second ±  0.09% | Fastest               */
	/*    &:                        1,416,109,600 operations/second ±  0.10% | 2nd | 0.00% slower    */
	/*    Shift right signed >>:    1,415,744,101 operations/second ±  0.12% | 3rd | 0.03% slower    */
	/*    Shift right unsigned >>>: 1,415,539,772 operations/second ±  0.13% | 4th | 0.04% slower    */
	/*    |:                        1,415,312,546 operations/second ±  0.07% | 5th | 0.06% slower    */
	/*    Shift left:               1,405,519,459 operations/second ±  0.88% | 6th | 0.75% slower    */
	/*                                                                                               */
	/*************************************************************************************************/
	// void bench.suite(
	// 	'Number Operations binary bitwise',
	// 	bench.add('Shift left', () => 100 << 2, o),
	// 	bench.add('Shift right signed >>', () => 100 >> 2, o),
	// 	bench.add('Shift right unsigned >>>', () => 100 >>> 2, o),
	// 	bench.add('&', () => 0xff & 0xff, o),
	// 	bench.add('|', () => 0xaa | 0xaa, o),
	// 	bench.add('^', () => 0xaa ^ 0xaa, o),
	// 	bench.cycle(percent),
	// 	bench.complete(summarize)
	// );
};

const _pairing3d = (o?: Options) => {
	/**************************************************************************************************/
	/*                                                                                                */
	/*    3d Pairing functions Results:                                                               */
	/*                                                                                                */
	/*    specific - rosenberg strong: 229,500,801 operations/second ± 0.081% | Fastest               */
	/*    specific - cantor:           229,159,217 operations/second ± 0.100% | 2nd | 0.15% slower    */
	/*    specific - szudzik:          228,746,745 operations/second ± 0.290% | 3rd | 0.33% slower    */
	/*    3D:                          222,192,119 operations/second ± 0.304% | 4th | 3.18% slower    */
	/*                                                                                                */
	/**************************************************************************************************/
	void bench.suite(
		'3d Pairing functions',
		bench.add('3D', () => pair3d(100, 100, 100), o),
		bench.add(
			'specific - rosenberg strong',
			() => rosenbergStrongPair(rosenbergStrongPair(100, 100), 100),
			o
		),
		bench.add(
			'specific - szudzik',
			() => szudzikPair(szudzikPair(100, 100), 100),
			o
		),
		bench.add(
			'specific - cantor',
			() => cantorPairing(cantorPairing(100, 100), 100),
			o
		),
		bench.cycle(percent),
		bench.complete(summarize)
	);
};

const _interpolations = (o?: Options) => {
	const randomValue = randomFactory().random();

	/******************************************************************************/
	/*                                                                            */
	/*    Interpolation functions Results:                                        */
	/*                                                                            */
	/*    Linear:  225,712,212 operations/second ± 0.227% | Fastest               */
	/*    Quint:   225,584,103 operations/second ± 0.102% | 2nd | 0.06% slower    */
	/*    Heptic:  225,511,713 operations/second ± 0.059% | 3rd | 0.09% slower    */
	/*    Hermite: 225,226,638 operations/second ± 0.096% | 4th | 0.22% slower    */
	/*    Trig:    219,132,994 operations/second ± 0.119% | 5th | 2.91% slower    */
	/*                                                                            */
	/******************************************************************************/
	void bench.suite(
		'Interpolation functions',
		...shuffle(
			[
				bench.add(
					'Trig',
					() => interpolationTrignonometric(randomValue),
					o
				),
				bench.add(
					'Hermite',
					() => interpolationHermite(randomValue),
					o
				),
				bench.add('Quint', () => interpolationQuintic(randomValue), o),
				bench.add('Linear', () => interpolationLinear(randomValue), o),
				bench.add('Heptic', () => interpolationHeptic(randomValue), o),
			],
			randomFactory().random
		),
		bench.cycle(percent),
		bench.complete(summarize)
	);
};

const _hashBenchmark = (o?: Options) => {
	// const randomNumber = getRandomLargePrime(Math.random);
	const randomNumber = 0x83_99_00_b5;
	/*****************************************************************************/
	/*                                                                           */
	/*    hashing functions Results:                                             */
	/*                                                                           */
	/*    Hash 2: 229,580,538 operations/second ± 0.041% | Fastest               */
	/*    Hash 1: 229,332,216 operations/second ± 0.200% | 2nd | 0.11% slower    */
	/*                                                                           */
	/*****************************************************************************/
	void bench.suite(
		'hashing functions',
		bench.add('Hash 1', () => hash(randomNumber), o),
		bench.add('Hash 2', () => hash(randomNumber), o),
		bench.cycle(percent),
		bench.complete(summarize)
	);
};

// _pairing2d(_options);
// _pairing3d(_options);
// _interpolations(_options);
// _hashBenchmark(_options);
// _pairingBigInt(_options);
// _numberOperations({ minTime: 0.1 });
// _bigIntBasics(_options);
