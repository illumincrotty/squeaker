import { interpolate } from '../interpolation';
import type { noiseFunction3d, vector3d } from '../noiseTypes';
import { consistentModulus, dotProduct3d, pair3d } from '../util';
import {
	processPerlinOptions,
	_defaultPerlinNoise3dOptions,
} from './perlinConstants';
import type { perlinNoiseOptions3d } from './perlinTypes';

const _generateGradients = (
	rand: () => number,
	_size = 0xf_ff
): readonly vector3d[] => {
	const gradients: vector3d[] = [];
	const oneOverSqrtThree = 1 / Math.sqrt(3);
	for (let index = 0; index <= _size; index++) {
		const phi = rand() * Math.PI * 2;
		const theta = Math.acos(rand() * 2 - 1);

		// const theta = Math.arccos(costheta);
		const x = oneOverSqrtThree * Math.sin(theta) * Math.cos(phi);
		const y = oneOverSqrtThree * Math.sin(theta) * Math.sin(phi);
		const z = oneOverSqrtThree * Math.cos(theta);
		gradients.push([x, y, z]);
	}

	return gradients as readonly vector3d[];
};

/**
 * _permutationGenerator
 *
 *
 * @private
 * @param rand - a random number generator
 * @returns a function which takes 3d coordinates and returns a pseudo-random 3d vector
 */
const _permutationGenerator = (
	rand: () => number
): ((x: number, y: number, z: number) => Readonly<vector3d>) => {
	const _gradients: readonly vector3d[] = _generateGradients(rand, 0xf_ff);
	return (_x: number, _y: number, _z: number) =>
		_gradients[/*@__INLINE__*/ pair3d(_z, _y, _x) & 0xf_ff];
};

/**
 * Generates a 3D perlin noise function
 *
 * @param options - configuration
 * @returns 3D perlin noise function
 */
export const perlinNoise3dFactory = (
	options?: Partial<perlinNoiseOptions3d>
): noiseFunction3d => {
	const _options = processPerlinOptions({
		..._defaultPerlinNoise3dOptions,
		...options,
	});

	const _perms = _permutationGenerator(_options.random);

	const _getX0 = _options.xSize
		? (_xFloor: number) => consistentModulus(_xFloor, _options.xSize)
		: (_xFloor: number) => _xFloor;

	const _getX1 = _options.xSize
		? (_x0: number) => (_x0 + 1 >= _options.xSize ? 0 : _x0 + 1)
		: (_x0: number) => _x0 + 1;

	const _getY0 = _options.ySize
		? (_yFloor: number) => consistentModulus(_yFloor, _options.ySize)
		: (_yFloor: number) => _yFloor;

	const _getY1 = _options.ySize
		? (_y0: number) => (_y0 + 1 >= _options.ySize ? 0 : _y0 + 1)
		: (_y0: number) => _y0 + 1;

	const _getZ0 = _options.zSize
		? (_zFloor: number) => consistentModulus(_zFloor, _options.zSize)
		: (_zFloor: number) => _zFloor;

	const _getZ1 = _options.zSize
		? (_z0: number) => (_z0 + 1 >= _options.zSize ? 0 : _z0 + 1)
		: (_z0: number) => _z0 + 1;

	return (x: number, y: number, z: number): number => {
		const _xFloor = Math.floor(x),
			_yFloor = Math.floor(y),
			_zFloor = Math.floor(z),
			_xFrac = x - _xFloor,
			/**  fractional y value */
			_yFrac = y - _yFloor,
			/**  fractional z value */
			_zFrac = z - _zFloor,
			/**  fractional x value with a fade function applied */
			_xFade = _options.blendFunction(_xFrac),
			/**  fractional y value with a fade function applied */
			_yFade = _options.blendFunction(_yFrac),
			/**  fractional z value with a fade function applied */
			_zFade = _options.blendFunction(_zFrac),
			_x0 = _getX0(_xFloor),
			_x1 = _getX1(_x0),
			_y0 = _getY0(_yFloor),
			_y1 = _getY1(_y0),
			_z0 = _getZ0(_zFloor),
			_z1 = _getZ1(_z0);

		const _g000 = _perms(_x0, _y0, _z0),
			_g001 = _perms(_x0, _y0, _z1),
			_g010 = _perms(_x0, _y1, _z0),
			_g011 = _perms(_x0, _y1, _z1),
			_g100 = _perms(_x1, _y0, _z0),
			_g101 = _perms(_x1, _y0, _z1),
			_g110 = _perms(_x1, _y1, _z0),
			_g111 = _perms(_x1, _y1, _z1);

		const /**  dot product of bottom left corner gradient and the vector to the input point from that corner */
			_n000 = dotProduct3d(_g000, [_xFrac, _yFrac, _zFrac]),
			/**  dot product of bottom left corner gradient and the vector to the input point from that corner */
			_n001 = dotProduct3d(_g001, [_xFrac, _yFrac, _zFrac - 1]),
			/**  dot product of top left corner gradient and the vector to the input point from that corner */
			_n010 = dotProduct3d(_g010, [_xFrac, _yFrac - 1, _zFrac]),
			/**  dot product of top left corner gradient and the vector to the input point from that corner */
			_n011 = dotProduct3d(_g011, [_xFrac, _yFrac - 1, _zFrac - 1]),
			/**  dot product of bottom right corner gradient and the vector to the input point from that corner */
			_n100 = dotProduct3d(_g100, [_xFrac - 1, _yFrac, _zFrac]),
			/**  dot product of bottom right corner gradient and the vector to the input point from that corner */
			_n101 = dotProduct3d(_g101, [_xFrac - 1, _yFrac, _zFrac - 1]),
			/**  dot product of top right corner gradient and the vector to the input point from that corner */
			_n110 = dotProduct3d(_g110, [_xFrac - 1, _yFrac - 1, _zFrac]),
			/**  dot product of top right corner gradient and the vector to the input point from that corner */
			_n111 = dotProduct3d(_g111, [_xFrac - 1, _yFrac - 1, _zFrac - 1]);

		const _nxyz = interpolate(
			interpolate(
				interpolate(_n000, _n001, _zFade),
				interpolate(_n010, _n011, _zFade),
				_yFade
			),
			interpolate(
				interpolate(_n100, _n101, _zFade),
				interpolate(_n110, _n111, _zFade),
				_yFade
			),
			_xFade
		);

		// shift up and limit the max so instead of going to 1, it only goes to extremely slightly below 1
		// without shift the output is [z.5, .5] and with shift and limit it's [0,1)
		return _nxyz + 0.5;
	};
};
