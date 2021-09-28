import test from 'ava';
import { aleaFactory } from '../../src/random/alea';
import { perlinNoise3dFactory, randomFactory } from '../../src/squeaker';
import { getRandomLargePrime } from '../../src/util';

const noiseData: number[][][] = [];
const generalNoiseGenerator = perlinNoise3dFactory();
let min = 1,
	max = 0;
for (let x = 0; x < 100; x += 1) {
	noiseData.push([]);
	for (let y = 0; y < 100; y += 1) {
		noiseData[x].push([]);
		for (let z = 0; z < 100; z += 1) {
			noiseData[x][y].push(generalNoiseGenerator(x / 10, y / 10, z / 10));
		}
	}
}
for (const value of noiseData.flat(2)) {
	min = Math.min(min, value);
	max = Math.max(max, value);
}

// console.log(`Max: ${max}, Min: ${min}`);

test('Basic 3d test', (t) => {
	t.is(generalNoiseGenerator(0, 0, 0), 0.5);
});

test('range is [0,1)', (t) => {
	t.true(noiseData.flat(2).every((v) => v >= 0 && v < 1));
});

test('perlin 3d is repeatable/isomorphic', (t) => {
	const random = aleaFactory().random,
		randX = random() * 100,
		randY = random() * 100,
		randZ = random() * 100;
	t.is(
		generalNoiseGenerator(randX, randY, randZ),
		generalNoiseGenerator(randX, randY, randZ)
	);
});
test('seed not random', (t) => {
	t.is(
		perlinNoise3dFactory({
			xSize: 3,
			ySize: 3,
			zSize: 3,
			seed: 6_237_892,
		})(0, 0, 0),
		0.5
	);
});
test('respects ranges', (t) => {
	const random = randomFactory('testing key');

	const [xRange, yRange, zRange] = [
		Math.floor(1000 * random.random()),
		Math.floor(1000 * random.random()),
		Math.floor(1000 * random.random()),
	];
	const noise = perlinNoise3dFactory({
		xSize: xRange,
		ySize: yRange,
		zSize: zRange,
		random: random.random,
	});
	const noiseNoBounds = perlinNoise3dFactory({
		random: random.random,
	});

	const x = xRange * random.random(),
		y = yRange * random.random(),
		z = zRange * random.random(),
		shift = getRandomLargePrime(random.random);

	t.is(
		noise(shift + x, shift + y, shift + z),
		noise((shift + x) % xRange, (shift + y) % yRange, (shift + z) % zRange),
		'large random positions'
	);
	t.is(noise(0, 0, 0), noise(xRange, yRange, zRange), 'Cusp before');
	t.is(
		noise(-0.5, -0.5, -0.5),
		noise(xRange - 0.5, yRange - 0.5, zRange - 0.5),
		'Cusp after'
	);
	t.not(
		noiseNoBounds(shift + x, shift + y, shift + z),
		noiseNoBounds(
			(shift + x) % xRange,
			(shift + y) % yRange,
			(shift + z) % zRange
		),
		'No bounds'
	);
});
