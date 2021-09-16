import bench from 'benny';
import type {
	CaseResult,
	Options,
	Summary,
} from 'benny/lib/internal/common-types';

import {
	interpolationHeptic,
	interpolationHermite,
	interpolationLinear,
	interpolationQuintic,
	interpolationTrignonometric,
} from '../src/squeaker';
import { randomFactory } from '../src/squeaker';
import {
	cantorPairing,
	hash,
	pair3d,
	rosenbergStrongPair,
	shuffle,
	szudzikPair,
} from '../src/util';

const _options: Options = {
	minSamples: 10,
	initCount: 10,
	delay: 1,
	// minTime: 0.1,
};
const ordinalSuffix = (n: number): string => {
	return `${n}${
		['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th'
	}`;
};

const format = new Intl.NumberFormat().format;

const resultTag = <resultType extends CaseResult>(
	_result: resultType,
	nameSpace = 0,
	opSpace = 0
) =>
	`${`${_result.name}:`.padEnd(nameSpace + 1, ' ')} ${format(
		+_result.ops.toFixed(0)
	).padStart(
		opSpace
	)} operations/second ±${_result.details.relativeMarginOfError
		.toFixed(3)
		.padStart(6)}%`;

const percent: (result: CaseResult, summary: Summary) => void = (
	_result: CaseResult,
	_summary: Summary
) => {
	const completed = _summary.results.filter(
		(value) => value.completed
	).length;
	console.log(
		`${((100 * completed) / _summary.results.length).toFixed(0)}% completed`
	);
	// console.log(resultTag(_result));
};

const summarize: (summary: Summary) => void = (_summary) => {
	const longestName = Math.max(
		..._summary.results.map((result) => result.name.length)
	);
	const longestOpCount = Math.max(
		..._summary.results.map((result) => result.ops.toFixed(0).length)
	);

	const results = ['', `${_summary.name} Results: `, ''];

	const sortedResults = [..._summary.results].sort((a, b) => b.ops - a.ops);
	sortedResults.forEach((result, index) => {
		results.push(
			`${resultTag(result, longestName, longestOpCount)} | ${
				index
					? `${ordinalSuffix(
							index + 1
					  )} | ${result.percentSlower.toFixed(2)}% slower`
					: 'Fastest'
			}`
		);
	});
	results.push('');
	const longestResultString = Math.max(
		...results.map((value) => value.length)
	);
	const modifiedResults = results.map(
		(line) => `\t/*    ${line.padEnd(longestResultString)}    */`
	);
	console.log(`\n\n\t/${'*'.repeat(longestResultString + 10)}/`);
	console.log(modifiedResults.join('\n'));
	console.log(`\t/${'*'.repeat(longestResultString + 10)}/\n\n`);
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
_interpolations(_options);
// _hashBenchmark(_options);
