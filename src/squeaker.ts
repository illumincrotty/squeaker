export * from './perlin/perlinIndex';
export * from './interpolation';
export {
	alea as random,
	aleaFactory as randomFactory,
} from './random/randomIndex';
export type {
	interpolationFunction,
	noiseFunction1d,
	noiseFunction2d,
	noiseFunction3d,
	noiseFunction4d,
} from './noiseTypes';
// export default {
// 	perlinNoise1dFactory,
// 	perlinNoise2dFactory,
// 	rangeGenerator,
// 	flatGridGenerator,
// 	interpolationLinear,
// 	interpolationHermite,
// 	interpolationQuintic,
// };
