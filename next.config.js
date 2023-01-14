module.exports = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	webpack: config => {
		config.resolve.extensions = [
			'.web.js',
			'.web.jsx',
			'.web.ts',
			'.web.tsx',
			...config.resolve.extensions,
		];
		return config;
	},
};
