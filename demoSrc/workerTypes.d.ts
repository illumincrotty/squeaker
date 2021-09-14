export type interpolation = 'hermite' | 'linear' | 'quintic' | 'trig';
export interface messageData {
	constructor?: {
		canvasHeight: number;
		canvaswidth: number;
		/** the value to determine the random source */
		seed?: number;
		/** the x size before the noise starts to loop */
		xSize?: number;
		/** the y size before the noise starts to loop */
		ySize?: number;
		/** the z size before the noise starts to loop */
		zSize?: number;
		interpolation?: interpolation;
		forceLow?: boolean;
		forceHigh?: boolean;
	};
	update?: { frame: number };
}

export interface messageData2d {
	constructor: {
		canvasHeight: number;
		canvasWidth: number;
		/** the value to determine the random source */
		seed?: number;
		/** the x size before the noise starts to loop */
		xSize?: number;
		/** the y size before the noise starts to loop */
		ySize?: number;
		interpolation?: 'hermite' | 'linear' | 'quintic';
	};
}
