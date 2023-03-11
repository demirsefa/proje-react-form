module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			rules: {
				semi: 0,
				"@typescript-eslint/no-shadow": ["error"],
				"no-shadow": "off",
				"no-undef": "off",
			},
		},
	],
};
