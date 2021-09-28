import type { CaseResult, Summary } from 'benny/lib/internal/common-types';

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
		.toFixed(2)
		.padStart(6)}%`;

export const percent: (result: CaseResult, summary: Summary) => void = (
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

export const summarize: (summary: Summary) => void = (_summary) => {
	const longestName = Math.max(
		..._summary.results.map((result) => result.name.length)
	);
	const longestOpCount = Math.max(
		..._summary.results.map((result) => result.ops.toFixed(0).length)
	);

	const results = ['', `${_summary.name} Results: `, ''];

	const sortedResults = [..._summary.results].sort((a, b) => b.ops - a.ops);
	for (const [index, result] of sortedResults.entries()) {
		results.push(
			`${resultTag(result, longestName, longestOpCount)} | ${
				index
					? `${ordinalSuffix(
							index + 1
					  )} | ${result.percentSlower.toFixed(2)}% slower`
					: 'Fastest'
			}`
		);
	}
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
