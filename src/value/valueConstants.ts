import { interpolationHermite } from '../interpolation';
export const _defaultValueNoiseOptions1d = {
	blendFunction: interpolationHermite,
	xSize: 0,
	seed: 5_678_990,
};

export const _defaultValueNoiseOptions2d = {
	..._defaultValueNoiseOptions1d,
	ySize: _defaultValueNoiseOptions1d.xSize,
};

export const _defaultValueNoiseOptions3d = {
	..._defaultValueNoiseOptions2d,
	zSize: _defaultValueNoiseOptions1d.xSize,
};
