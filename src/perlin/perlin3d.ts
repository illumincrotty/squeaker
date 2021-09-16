import { interpolate3d } from '../interpolation';
import type { noiseFunction3d, vector3d } from '../noiseTypes';
import { consistentModulus, dotProduct3d, pair3d } from '../util';
import {
	maxFix,
	processPerlinOptions,
	_defaultPerlinNoise3dOptions,
} from './perlinConstants';
import type { perlinNoiseOptions3d } from './perlinTypes';

/*@__PURE__*/
const _generateGradients = (rand: () => number): readonly vector3d[] => {
	const gradients: vector3d[] = [];
	const oneOverSqrtThree = 1 / Math.sqrt(3);
	for (let index = 0; index < 256; index++) {
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
/*@__pure__*/
const _permutationGenerator = (
	rand: () => number
): ((x: number, y: number, z: number) => Readonly<vector3d>) => {
	const _gradients: readonly vector3d[] = _generateGradients(rand);
	return (x: number, y: number, z: number) =>
		_gradients[(pair3d(x, y, z) >> (x & 0x4)) & 0xff];
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

	const getX0 = _options.xSize
		? (_xFloor: number) => consistentModulus(_xFloor, _options.xSize)
		: (_xFloor: number) => _xFloor;

	const getX1 = _options.xSize
		? (_x0: number) => (_x0 + 1 >= _options.xSize ? 0 : _x0 + 1)
		: (_x0: number) => _x0 + 1;

	const getY0 = _options.ySize
		? (_yFloor: number) => consistentModulus(_yFloor, _options.ySize)
		: (_yFloor: number) => _yFloor;

	const getY1 = _options.ySize
		? (_y0: number) => (_y0 + 1 >= _options.ySize ? 0 : _y0 + 1)
		: (_y0: number) => _y0 + 1;

	const getZ0 = _options.zSize
		? (_zFloor: number) => consistentModulus(_zFloor, _options.zSize)
		: (_zFloor: number) => _zFloor;

	const getZ1 = _options.zSize
		? (_z0: number) => (_z0 + 1 >= _options.zSize ? 0 : _z0 + 1)
		: (_z0: number) => _z0 + 1;

	return (x: number, y: number, z: number): number => {
		const _xFloor = Math.floor(x),
			_yFloor = Math.floor(y),
			_zFloor = Math.floor(z),
			/** integer below input x */
			_x0 = getX0(_xFloor),
			/** integer below input y */
			_y0 = getY0(_yFloor),
			/** integer below input y */
			_z0 = getZ0(_zFloor),
			/** integer below input x */
			_x1 = getX1(_x0),
			/** integer below input y */
			_y1 = getY1(_y0),
			/** integer below input y */
			_z1 = getZ1(_z0),
			/**  fractional x value */
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
			_zFade = _options.blendFunction(_zFrac);

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

		// const _nx00 = interpolate(_n000, _n100, _xFade),
		// 	_nx01 = interpolate(_n001, _n101, _xFade),
		// 	_nx10 = interpolate(_n010, _n110, _xFade),
		// 	_nx11 = interpolate(_n011, _n111, _xFade),
		// 	_nxy0 = interpolate(_nx00, _nx10, _yFade),
		// 	_nxy1 = interpolate(_nx01, _nx11, _yFade),
		// 	_nxyz = interpolate(_nxy0, _nxy1, _zFade);

		const _nxyz = interpolate3d(
			_n000,
			_n010,
			_n100,
			_n110,
			_n001,
			_n011,
			_n101,
			_n111,
			_xFade,
			_yFade,
			_zFade
		);

		// shift up and limit the max so instead of going to 1, it only goes to extremely slightly below 1
		// without shift the output is [z.5, .5] and with shift and limit it's [0,1)
		// return Math.min(_nxyz + 0.5, _maxFix);
		return Math.min(_nxyz + 0.5, maxFix);
	};
};
