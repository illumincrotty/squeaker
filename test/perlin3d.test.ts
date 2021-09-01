import test from 'ava';
import { aleaFactory, perlinNoise3dFactory } from '../src/squeaker';

const noiseData: number[][][] = [];
const generalNoiseGenerator = perlinNoise3dFactory();
let min = 1,
	max = 0;
for (let x = 0; x < 1000; x += 1) {
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
	const noise = perlinNoise3dFactory();
	t.is(noise(0, 0, 0), 0.5);
});

test('range is [0,1)', (t) => {
	t.true(noiseData.flat(2).every((v) => v >= 0 && v < 1));
});

test('perlin 2d is repeatable/isomorphic', (t) => {
	const random = aleaFactory().random,
		randX = random() * 100,
		randY = random() * 100,
		randZ = random() * 100;
	const actual = perlinNoise3dFactory({ seed: 71_238 });
	t.is(actual(randX, randY, randZ), actual(randX, randY, randZ));
});
