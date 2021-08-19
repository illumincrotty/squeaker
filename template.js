'use strict';
var __spreadArray =
	(this && this.__spreadArray) ||
	function (to, from, pack) {
		if (pack || arguments.length === 2)
			for (var i = 0, l = from.length, ar; i < l; i++) {
				if (ar || !(i in from)) {
					if (!ar)
						ar = Array.prototype.slice.call(from, 0, i);
					ar[i] = from[i];
				}
			}
		return to.concat(ar || Array.prototype.slice.call(from));
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.generatePropertyDoc =
	exports.generateFunctionDoc =
	exports.generateInterfaceDoc =
	exports.generateClassDoc =
		void 0;
/**
 * stringArrayToDocumentation
 *
 * Formats string array in documentation style
 *
 * @param input - documentation as an array of strings
 * @param leadingSpaces - number of leading spaces for each line
 * @returns stylized documentation
 */
var stringArrayToDocumentation = function (input, leadingSpaces) {
	if (leadingSpaces === void 0) {
		leadingSpaces = 0;
	}
	return (
		'' +
		__spreadArray(
			__spreadArray(
				['/**'],
				input.map(function (line) {
					return ' * '.concat(line);
				}),
				true
			),
			[' */'],
			false
		)
			.map(function (line) {
				return '' + '\t'.repeat(leadingSpaces) + line;
			}) //add spaces to beginning of each line
			.join('\n')
	);
}; //convert array to one string with new lines between each element
/**
 * generateClassDoc
 *
 * converts information object into class documentation
 *
 * @param input - information about a class
 * @returns class documentation string
 */
var generateClassDoc = function (input) {
	return stringArrayToDocumentation(
		__spreadArray(
			[input.name, '', 'TODO describe class'],
			input.heritageClauses.length > 0
				? input.heritageClauses.map(function (clause) {
						return '@' + clause.type + ' ' + clause.value;
				  })
				: [],
			true
		)
	);
};
exports.generateClassDoc = generateClassDoc;
/**
 * interfaceDocumentation
 *
 * converts information object into an array of documentation strings
 *
 * @param input - information about an interface
 * @returns interface documentation as an array of strings
 */
var interfaceDocumentation = function (input) {
	return [input.name, '', 'TODO describe interface'];
};
/**
 * generateInterfaceDoc
 *
 * converts information object into interface documentation
 *
 * @param input - information about an interface
 * @returns the documentation string
 */
var generateInterfaceDoc = function (input) {
	return stringArrayToDocumentation(interfaceDocumentation(input));
};
exports.generateInterfaceDoc = generateInterfaceDoc;
/**
 * internalFunctionDoc
 *
 * converts information object into function documentation as an unformatted array of strings
 *
 * @param input - information about a function
 * @returns function documentation as unformatted string array
 */
var internalFunctionDoc = function (input) {
	return __spreadArray(
		__spreadArray(
			__spreadArray(
				__spreadArray(
					[],
					input.name.length > 0 ? [input.name] : [],
					true
				),
				['', 'TODO describe function', ''],
				false
			),
			input.params.map(function (parameter) {
				return (
					'@param ' +
					parameter.name +
					' - TODO describe parameter'
				);
			}),
			true
		),
		input.returnType.length > 0
			? ['@returns TODO describe return value']
			: [],
		true
	);
};
/**
 * generateFunctionDoc
 *
 * converts information object into function documentation
 *
 * @param input - information about a function
 * @returns function documentation string
 */
var generateFunctionDoc = function (input) {
	return stringArrayToDocumentation(
		internalFunctionDoc(input),
		input.start.column
	);
};
exports.generateFunctionDoc = generateFunctionDoc;
/**
 * generatePropertyDoc
 *
 * converts information object into property debug documentation
 *
 * @param input - object of information about class property
 * @returns debugging documentation string
 */
var generatePropertyDoc = function (input) {
	return stringArrayToDocumentation(
		['Name: ' + input.name],
		input.start.column
	);
};
exports.generatePropertyDoc = generatePropertyDoc;
