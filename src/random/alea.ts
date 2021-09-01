// -----------------------------------------------------
// 						 Alea
// -----------------------------------------------------

const _mashMagicNumber = 0.025_196_032_824_169_38;
const _fractionalFix = Number.EPSILON / 2;

/**
 * Equivalent to 2^32
 *
 * @private
 */
const _twoPow32 = 0x1_00_00_00_00;
/**
 * Equivalent to 2^-32
 *
 * @private
 */
const _twoPowNegative32 = 2 ** -32;

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
interface aleaState {
	seed0: number;
	seed1: number;
	seed2: number;
	constant: number;
}

/**
 * aleaType
 *
 * The required functions of an alea implementation
 */
export interface aleaType {
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
}

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

	const _state = [_mash(' '), _mash(' '), _mash(' '), 1];

	_state[0] -= _mash(seed);
	if (_state[0] < 0) _state[0] += 1;

	_state[1] -= _mash(seed);
	if (_state[1] < 0) _state[1] += 1;

	_state[2] -= _mash(seed);
	if (_state[2] < 0) _state[2] += 1;

	const aleaObject = {
		random: () => {
			const _temporary =
				2_091_639 * _state[0] + _state[3] * _twoPowNegative32;
			_state[0] = _state[1];
			_state[1] = _state[2];
			return (_state[2] =
				_temporary - (_state[3] = Math.floor(_temporary)));
		},
		uint32: () => aleaObject.random() * _twoPow32,
		fract53: () => {
			return (
				aleaObject.random() +
				Math.trunc(aleaObject.random() * 0x20_00_00) * _fractionalFix
			);
		},
		exportState: (): aleaState => ({
			seed0: _state[0],
			seed1: _state[1],
			seed2: _state[2],
			constant: _state[3],
		}),
		importState: (inputState: aleaState): void => {
			[_state[0], _state[1], _state[2], _state[3]] = [
				inputState.seed0,
				inputState.seed1,
				inputState.seed2,
				inputState.constant,
			];
		},
	};
	return aleaObject;
};

export const alea = aleaFactory('Best Of luck!').random;
