// -----------------------------------------------------
// 						 Alea
// -----------------------------------------------------

const _mashMagicNumber = 0.025_196_032_824_169_38;
const _fractionalMagicnumber = 1.110_223_024_625_156_5e-16;

/**
 * Equivalent to 2^32
 */
const _twoPow32 = 0x1_00_00_00_00;
/**
 * Equivalent to 2^-32
 */
const _twoPowNegative32 = 2.328_306_436_538_696_3e-10;

/**
 * Mash factory
 * returns an alea mash function
 *
 * @private
 * @returns a stateful hash function
 */
const _aleaMash = () => {
	let _state = 0xef_c8_24_9d;
	const mash = (data: string) => {
		data = data.toString();
		for (var index = 0; index < data.length; index++) {
			_state += data.charCodeAt(index);
			var h = _mashMagicNumber * _state;
			_state = h >>> 0;
			h -= _state;
			h *= _state;
			_state = h >>> 0;
			h -= _state;
			_state += h * _twoPow32; // 2^32
		}
		return (_state >>> 0) * _twoPowNegative32; // 2^-32
	};

	return mash;
};

/**
 * aleaState
 *
 * the three 32 bit seeds of alea and a dynamic integration constant
 */
type aleaState = {
	seed0: number;
	seed1: number;
	seed2: number;
	constant: number;
};

/**
 * aleaType
 *
 * The necessary alea functions
 */
export type aleaType = {
	/**
	 * @returns a 32 bit number between `[0,1)` like Math.random
	 */
	random(): number;
	/**
	 * @returns an integer `[0, 2^32)`
	 */
	uint32(): number;
	/**
	 * @returns a pseudo-random 53-bit number between `[0, 1)`, higher precision than random()
	 */
	fract53(): number;
	/** @returns Exports the current state of the alea prng*/
	exportState(): aleaState;
	/**
	 * Imports the current state of the alea prng
	 *
	 * @param state - the new state to change the prng to
	 */
	importState(state: aleaState): void;
};

/**
 * aleaFactory
 *
 * creates a seedable pseduo random number generator
 *
 * @param seed - the seed for the pseudo random generations
 * @returns a pseduo random number generator
 */
export const aleaFactory = (seed = `${Date.now()}`): aleaType => {
	const _mash = _aleaMash();

	const _state: aleaState = {
		seed0: _mash(' '),
		seed1: _mash(' '),
		seed2: _mash(' '),
		constant: 1,
	};

	_state.seed0 -= _mash(seed);
	if (_state.seed0 < 0) _state.seed0 += 1;

	_state.seed1 -= _mash(seed);
	if (_state.seed1 < 0) _state.seed1 += 1;

	_state.seed2 -= _mash(seed);
	if (_state.seed2 < 0) _state.seed2 += 1;

	const aleaObject: aleaType = {
		random: () => {
			const _temporary =
				2_091_639 * _state.seed0 + _state.constant * _twoPowNegative32;
			_state.seed0 = _state.seed1;
			_state.seed1 = _state.seed2;
			return (_state.seed2 =
				_temporary - (_state.constant = Math.trunc(_temporary)));
		},
		uint32: () => aleaObject.random() * _twoPow32,
		fract53: () => {
			return (
				aleaObject.random() +
				Math.trunc(aleaObject.random() * 0x20_00_00) *
					_fractionalMagicnumber
			);
		},
		exportState: (): aleaState => ({ ..._state }),
		importState: (inputState: aleaState): void => {
			Object.assign(_state, inputState);
		},
	};
	return aleaObject;
};
