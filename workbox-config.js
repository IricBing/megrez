module.exports = {
	globDirectory: 'docs/',
	globPatterns: [
		'**/*.{md,js,ico,html,jpg,css}'
	],
	swDest: 'docs/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};