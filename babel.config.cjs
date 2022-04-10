module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }]
	],
	plugins: [
		'@babel/plugin-transform-runtime',
		'@babel/proposal-class-properties',
		'@babel/transform-regenerator',
		'@babel/plugin-transform-template-literals'
	],
}