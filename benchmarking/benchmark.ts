import {
	cantorPairing,
	szudzikPair,
	rosenbergStrongPair,
	pairNd,
	pair3d,
} from '../src/util';
import bench from 'benny';

const _pairing2d = () => {
	/**
	 * cantor:
	 * 221 322 627 ops/s, ±0.99%   | slowest, 1.26% slower
	 *
	 * szudzik:
	 * 222 880 926 ops/s, ±0.45%   | 0.57% slower
	 *
	 * rosenberg strong:
	 * 224 150 863 ops/s, ±0.12%   | fastest
	 */
	void bench.suite(
		'Pairing functions',
		bench.add('cantor', () => cantorPairing(100, 100)),
		bench.add('szudzik', () => szudzikPair(100, 100)),
		bench.add('rosenberg strong', () => rosenbergStrongPair(100, 100)),
		bench.cycle(),
		bench.complete()
	);
};

const _pairing3d = () => {
	/**
	 * cantor:
	 * 221 322 627 ops/s, ±0.99%   | slowest, 1.26% slower
	 *
	 * szudzik:
	 * 222 880 926 ops/s, ±0.45%   | 0.57% slower
	 *
	 * rosenberg strong:
	 * 224 150 863 ops/s, ±0.12%   | fastest
	 */
	void bench.suite(
		'Pairing functions',
		bench.add('nD', () => pairNd(100, 100, 100)),
		bench.add('3D', () => pair3d(100, 100, 100)),
		bench.add('specific', () =>
			rosenbergStrongPair(rosenbergStrongPair(100, 100), 100)
		),
		bench.cycle(),
		bench.complete()
	);
};
