import { interpolate3d } from '../interpolation';
import type { noiseFunction3d } from '../noiseTypes';
import { consistentModulus, pair3d, processOptions } from '../util';
import { _defaultValueNoiseOptions3d } from './valueConstants';
import type { valueNoiseOptions3d } from './valueTypes';

/**
 * _permutationGenerator
 *
 *
 * @private
 * @param rand - a random number generator
 * @returns a function which takes 3d coordinates and returns a pseudo-random 3d vector
 */
/*@__PURE__*/
const _permutationGenerator = (
	rand: () => number
): ((x: number, y: number, z: number) => number) => {
	const rands = new Float32Array(0xf_ff + 1).map(() => rand());

	return (x: number, y: number, z: number) => rands[pair3d(x, y, z) & 0xf_ff];
	// rands[((x * 17) ^ (y * 31) ^ (z * 5)) & 0xff];
};

/**
 * Generates a 3D value noise function
 *
 * @param options - configuration
 * @returns 3D value noise function
 */
export const valueNoise3dFactory = (
	options?: Partial<valueNoiseOptions3d>
): noiseFunction3d => {
	const _options = processOptions({
		..._defaultValueNoiseOptions3d,
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

		return interpolate3d(
			_perms(_x0, _y0, _z0),
			_perms(_x0, _y0, _z1),
			_perms(_x0, _y1, _z0),
			_perms(_x0, _y1, _z1),
			_perms(_x1, _y0, _z0),
			_perms(_x1, _y0, _z1),
			_perms(_x1, _y1, _z0),
			_perms(_x1, _y1, _z1),
			_xFade,
			_yFade,
			_zFade
		);
	};
};
