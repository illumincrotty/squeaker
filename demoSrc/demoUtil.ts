/*__PURE__*/
/*__INLINE__*/
export const solidCanvasFill = (
	canvas: HTMLCanvasElement,
	fill: CanvasRenderingContext2D['fillStyle'] = 'gray'
): void => {
	const _context = canvas.getContext('2d');
	if (_context) {
		_context.fillStyle = fill;
		_context.fillRect(0, 0, canvas.width, canvas.height);
	}
};

/*__PURE__*/
/*__INLINE__*/
export const drawCanvasPlaceholders = (
	canvasArray: HTMLCanvasElement[]
): void => canvasArray.forEach((canvas) => solidCanvasFill(canvas));

/*__PURE__*/
/*__INLINE__*/
export const getCanvasFromID = (element: string): HTMLCanvasElement =>
	document.querySelector(`#${element}`) as HTMLCanvasElement;

/**
 * "Draws" a rectangle to a uint8 representation of a canvas. This is an inplace operation
 *
 * @param x - x coordinate of rectangle
 * @param y - x coordinate of rectangle
 * @param width - the desired width
 * @param height - the desired height
 * @param fill - the grayscale fill color
 * @param colorArray - the canvas to "paint" onto
 * @param arrayWidth - the width of the canvas
 * @returns the array with the modification, useful for chaining
 */
/*__PURE__*/
export const rect = (
	x: number,
	y: number,
	width: number,
	height: number,
	fill: number,
	colorArray: Uint8ClampedArray,
	arrayWidth = 500
): Uint8ClampedArray => {
	for (let yIndex = y; yIndex < y + height; yIndex += 1) {
		colorArray.fill(
			fill,
			x * 4 + yIndex * 4 * arrayWidth,
			(x + width) * 4 + yIndex * 4 * arrayWidth
		);
		// for (let xIndex = 0; xIndex < width; xIndex++)
		// 	colorArray.set(
		// 		[fill, fill, fill, 256],
		// 		(x + xIndex) * 4 + yIndex * 4 * arrayWidth
		// 	);
	}
	return colorArray;
};

type colorType = [r: number, g: number, b: number];
type colorTypeAlpha = [r: number, g: number, b: number, a: number];

/*__PURE__*/
/*__INLINE__*/
const rgbify = (color: colorType) =>
	`rgb(${color[0]}, ${color[1]}, ${color[2]})`;

/*__PURE__*/
/*__INLINE__*/
const rgbaify = (colorArray: colorTypeAlpha) =>
	`rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${colorArray[3]})`;

const white: colorType = [239, 245, 239],
	black: colorType = [35, 36, 36];

/**
 *	Draws a 1d function to a canvas
 *
 *	function is called with every value from 0 to canvas width
 *
 * @param canvasElement - the canvas to draw to
 * @param generator - the cartesian functin to use to generate the value
 * @param horizontals - include horizontal bars
 * @returns a promise that resolves upon completion
 */
/*__PURE__*/
export const draw1d = async (
	canvasElement: HTMLCanvasElement,
	generator: (x: number) => number,
	horizontals = true
): Promise<void> => {
	const bg = rgbify(black),
		text = rgbify(white),
		fade = rgbaify([...white, 0.3]);
	const context = canvasElement.getContext('2d');

	const width = canvasElement.width,
		height = canvasElement.height,
		halfHeight = height / 2,
		range = height * 0.5;

	if (context) {
		// background
		context.fillStyle = bg;
		context.fillRect(0, 0, width, height);

		// graph lines
		context.fillStyle = text;
		context.lineWidth = 5;

		// horizontal
		// top
		context.fillRect(0, halfHeight - range - 2, width, 4);
		// bottom
		context.fillRect(0, halfHeight + range - 2, width, 4);

		context.fillStyle = fade;

		if (horizontals) {
			// middle
			context.fillRect(0, halfHeight - 2, width, 4);
			// 1/4
			context.fillRect(0, halfHeight - range / 2 - 2, width, 4);
			// 3/4
			context.fillRect(0, halfHeight + range / 2 - 2, width, 4);
		}

		// vertical
		context.fillStyle = text;

		// left
		context.fillRect(0, halfHeight - range, 4, range * 2);
		// right
		context.fillRect(width - 4, halfHeight - range, 4, range * 2);

		context.strokeStyle = text;
		context.beginPath();
		// context.moveTo(space, verticalMiddle);
		for (let pos = 0; pos < width; pos++) {
			context.lineTo(pos, height - generator(pos) * height);
		}
		context.stroke();
	}

	return Promise.resolve();
};

/*__PURE__*/
export const draw2d = async (
	canvasElement: HTMLCanvasElement,
	generator: (x: number, y: number) => number,
	resolution = 2,
	modifier = (input: number) => input,
	grid?: [x: number, y: number] | undefined
): Promise<void> => {
	const context = canvasElement.getContext('2d', {});

	if (context) {
		context.beginPath();
		const splitSize = Math.floor(canvasElement.width / 10);
		for (
			let xSplit = 0;
			xSplit < canvasElement.width;
			xSplit += splitSize
		) {
			window.requestIdleCallback(() => {
				for (let x = xSplit; x < xSplit + splitSize; x += resolution) {
					for (let y = 0; y < canvasElement.height; y += resolution) {
						const color = Math.floor(
							modifier(generator(x, y)) * 255
						);
						context.strokeStyle = `rgb(${color}, ${color}, ${color})`;
						context.strokeRect(y, x, resolution, resolution);
						// context.fillStyle = `rgb(${color}, ${color}, ${color})`;
						// context.fillRect(x, y, resolution, resolution);
					}
				}
			});
		}
		window.requestIdleCallback(() => {
			if (grid) {
				context.fillStyle = 'rgba(256, 0, 0, .3)';
				{
					const xStep = canvasElement.width / grid[0];
					for (let xIndex = 1; xIndex < grid[0]; xIndex++) {
						context.fillRect(
							xStep * xIndex - 1,
							0,
							2,
							canvasElement.height
						);
					}
				}
				{
					const yStep = canvasElement.height / grid[1];
					for (let yIndex = 1; yIndex < grid[1]; yIndex++) {
						context.fillRect(
							0,
							yStep * yIndex - 1,
							canvasElement.width,
							2
						);
					}
				}
			}
		});
	}

	return Promise.resolve();
};
