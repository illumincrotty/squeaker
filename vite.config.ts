import autoprefixer from 'autoprefixer';
import type { UserConfig, UserConfigFn } from 'vite';

const config: UserConfigFn = (environment) => {
	if (environment.command === 'build') {
		1;
	}

	const configSet: UserConfig = {
		css: {
			modules: false,
			postcss: { plugins: [autoprefixer()] },
		},
		base: '/squeaker/',
		build: {
			outDir: 'docs',
			minify: 'terser',
			rollupOptions: {
				// output: {
				// 	interop: 'esModule',
				// 	format: 'esm',
				// 	esModule: true,
				// 	compact: true,
				// 	minifyInternalExports: true,
				// },
			},
			terserOptions: {
				compress: {
					// drop_console: true,
					// 	dead_code: true,
					// 	booleans: true,
					// booleans_as_integers: true,
					// 	evaluate: true,
					// 	arguments: true,
					// 	// inline: true,
					// 	loops: true,
					// 	module: true,
					// 	computed_props: true,
					// 	directives: true,
					// 	side_effects: true,
					// 	arrows: true,
					// 	join_vars: true,
					// 	keep_fargs: false,
					// 	conditionals: true,
					// 	collapse_vars: true,
					// 	expression: false,
					// unsafe: true,
					// 	unsafe_arrows: true,
					// 	unsafe_comps: true,
					// 	unsafe_math: true,
					// 	unsafe_Function: true,
					// 	unsafe_regexp: true,
					// 	unsafe_proto: true,
					// 	unsafe_undefined: true,
					// 	comparisons: true,
					// 	unsafe_methods: true,
					passes: 3,
					// 	keep_infinity: false,
					// 	properties: true,
					// 	pure_getters: true,
					// 	reduce_vars: true,
					// 	unused: true,
					// 	toplevel: true,
				},
				module: true,
				ecma: 2020,
			},
			target: 'esnext',
		},
	};

	return configSet;
};

export default config;
