/**
 * simple range utility
 *
 * @param min - starting number (inclusive)
 * @param max - ending number (exclusive)
 * @param step - step per iteration (can be negative)
 * @returns
 */
export const range = (
	min: number,
	max: number,
	step = 1
): number[] => {
	if ((max - min) / step <= 0) return [];
	return [min, ...range(min + step, max, step)];
};

/**
 * Gets the value of a CSS Property
 * @param property - the css property that is desired (no -- before)
 * @param element - the element to read the property off of, defaults to body
 */
export const getCssProperty = function (
	property: string,
	element = document.body
): string {
	return getComputedStyle(element).getPropertyValue(
		`--${property}`
	);
};
