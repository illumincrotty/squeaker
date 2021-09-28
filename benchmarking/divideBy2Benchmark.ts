import bench from 'benny';
import { percent, summarize } from './benchmarkUtilities';

/***************************************************************************************/
/*                                                                                     */
/*    Divide by 2 Results:                                                             */
/*                                                                                     */
/*    Multiply .5:    1,391,508,635 operations/second ±  0.16% | Fastest               */
/*    Divide:         1,391,007,277 operations/second ±  0.08% | 2nd | 0.04% slower    */
/*    Shift down >>:  1,384,062,103 operations/second ±  0.21% | 3rd | 0.54% slower    */
/*    Shift down >>>: 1,383,090,518 operations/second ±  0.19% | 4th | 0.60% slower    */
/*    Math imul:      1,377,665,839 operations/second ±  0.23% | 5th | 0.99% slower    */
/*                                                                                     */
/***************************************************************************************/

void bench.suite(
	'Divide by 2',

	// Common
	bench.add('Multiply .5', () => 100 * 0.5),
	bench.add('Divide', () => 100 / 2),

	// Bitwise
	bench.add('Shift down >>', () => 100 >> 2),
	bench.add('Shift down >>>', () => 100 >>> 2),

	// Other
	bench.add('Math imul', () => Math.imul(100, 0.5)),

	bench.cycle(percent),
	bench.complete(summarize)
);
