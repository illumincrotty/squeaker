import test from 'ava';
import {
	aleaFactory,
	perlinNoise3dFactory,
	perlinNoise3dFactoryHeavy,
	perlinNoise3dFactoryLight,
} from '../src/squeaker';

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
noiseData.flat(2).forEach((value) => {
	min = Math.min(min, value);
	max = Math.max(max, value);
});

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
			_forceHighMemoryMode: true,
			xSize: 3,
			ySize: 3,
			zSize: 3,
			seed: 6_237_892,
		})(0, 0, 0),
		0.5
	);
});

test('does not allow invalid options', (t) => {
	t.throws(() => {
		perlinNoise3dFactory({
			_forceHighMemoryMode: true,
			_forceLowMemoryMode: true,
			xSize: 3,
			ySize: 3,
			zSize: 3,
		});
	});
});

test('Force low', (t) => {
	t.is(
		perlinNoise3dFactory({
			_forceLowMemoryMode: true,
			xSize: 3,
			ySize: 3,
			zSize: 3,
		})(0, 0, 0),
		0.5
	);
});

test('Force High', (t) => {
	t.is(
		perlinNoise3dFactory({
			_forceHighMemoryMode: true,
			xSize: 3,
			ySize: 3,
			zSize: 3,
		})(0, 0, 0),
		0.5
	);
});
test('Heavy works', (t) => {
	const heavy = perlinNoise3dFactoryHeavy({
		xSize: 200,
		ySize: 200,
		zSize: 200,
		random: aleaFactory('97gikbv').random,
	});
	t.is(heavy(0, 0, 0), 0.5);
});

test('light works', (t) => {
	const light = perlinNoise3dFactoryLight({
		xSize: 200,
		ySize: 200,
		zSize: 200,
		random: aleaFactory('97gikbv').random,
	});
	t.is(light(0, 0, 0), 0.5);
});
