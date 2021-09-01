/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsdoc/no-types */

/**
 * Creates Vite config
 *
 * @type {import('vite').UserConfigFn}
 * @param {import('vite').ConfigEnv} environment - the build environment
 * @returns {import('vite').UserConfig} - the dynamic config
 */
const config = (environment) => {
	if (environment.command === 'build') {
		1;
	}
	/**
	 * @type {import('vite').UserConfig}
	 */
	const configSet = {
		css: {
			modules: false,
		},
		build: {
			outDir: 'demoDist',
		},
	};

	return configSet;
};

export default config;
