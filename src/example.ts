const example = {
	/**
	 * Description
	 * @param input - any object or primitive value
	 * @returns a function that always returns that item
	 */
	identity: <type>(input: type): (() => type) => {
		return () => input;
	},

	/**
	 * Returns 5
	 * @returns 5
	 */
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	fiveFunction: (): number => 5,
};
export { example };
