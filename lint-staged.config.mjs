export default {
	'**/*.(ts|js)?(x)': (filenames) => [
		`eslint --ext ts,tsx --fix ${filenames.join(' ')}`,
		`prettier --write --ignore-unknown ${filenames.join(' ')}`,
	],
	'**/*.{json,md}': (filenames) => `prettier --write ${filenames.join(' ')}`,
};
