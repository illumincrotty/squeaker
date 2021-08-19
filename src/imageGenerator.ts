import { promises, createReadStream, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { range } from './util';
import { aleaFactory as _aleaFactory } from './random/alea';
import { perlin } from './wikipediaPerlin';
import { PNG } from 'pngjs';
import { perlinNoise1dFactory, perlinNoise2dFactory } from './squeaker';

// #region svg

const generateSVG = async (fileName: string, data: string) => {
	await promises.writeFile(
		join(dirname(''), `generated/${fileName}.svg`),
		data
	);
};
const svgBoilerPlate = (input: string): string => {
	return `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
         width="1000" height="1000">
         ${input}
    </svg>`;
};

const rectGen = (x: number, y: number, fill: string): string =>
	`<rect x="${x * 10}" y="${
		y * 10
	}" width="10" height="10" fill="${fill}" />`;

const numberToColorString = (value: number): string => {
	return `hsl(0,0%,${(100 * value).toFixed(2)}%)`;
};

const numberArrayToSvg = (input: number[][]) =>
	svgBoilerPlate(
		input
			.map((line, row) =>
				line
					.map((element, column) =>
						rectGen(column, row, numberToColorString(element))
					)
					.map((value) => `\t${value}`)
					.join('\n')
			)
			.join('\n')
	);

const generateArray = (
	rows: number,
	columns: number,
	filler: (x: number, y: number) => number
) =>
	range(0, rows).map((_value, rowIndex) =>
		range(0, columns).map((_value, columnIndex) =>
			filler(rowIndex, columnIndex)
		)
	);

export const generateStaticSVG = (): void => {
	const rand = _aleaFactory('');
	void generateSVG(
		'static',
		numberArrayToSvg(
			generateArray(100, 100, (_x: number, _y: number) => rand.random())
		)
	);
};

export const generate2dNoiseSVG = (): void => {
	// const noise = perlinNoiseFactory(aleaFactory('').random, 20);
	void generateSVG(
		'noise',
		numberArrayToSvg(
			generateArray(100, 100, (x: number, y: number) =>
				perlin(10 + x / 10, y / 10)
			)
		)
	);
};

// #endregion

export const generatePNG = (
	fileName: string,
	colorFunction: (x: number, y: number) => number
): void => {
	createReadStream(join(dirname(''), 'generated/blank.png'))
		.pipe(
			new PNG({
				filterType: -1,
			})
		)
		.on('parsed', function () {
			for (var y = 0; y < this.height; y++) {
				for (var x = 0; x < this.width; x++) {
					var index = (this.width * y + x) << 2;

					// const color = Math.min(255 * colorFunction(x, y), 255);
					const color = 255 * colorFunction(x, y);

					// give gray
					this.data[index] = color;
					this.data[index + 1] = color;
					this.data[index + 2] = color;
					this.data[index + 3] = 255;
				}
			}

			this.pack().pipe(
				createWriteStream(
					join(dirname(''), `generated/${fileName}.png`)
				)
			);
		});
};

const _noisyFunction = (x: number, y: number) => perlin(10 + x / 10, y / 10);

const perlin1d = perlinNoise1dFactory({
	seed: 1_092_362,
	domain: 5,
});
const _noise1d = (x: number, y: number): number => {
	return perlin1d(x / 10 + y / 10);
};

const perlin2d = perlinNoise2dFactory({
	// seed: 1_092_378,
	domain: 100,
	range: 100,
});
const _noise2d = (x: number, y: number): number => {
	const output = perlin2d(x / 5, y / 5);
	// console.log(output);
	return output;
};
// generatePNG('static', _aleaFactory('').random);
// generatePNG('1dNoise', _noise1d);
generatePNG('2dNoise', _noise2d);
// generatePNG('wikiNoise', _noisyFunction);
