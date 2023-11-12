export function getCommandLineArg(argName: string): string | undefined {
	const arg = process.argv.find((arg) => arg.includes(`--${argName}`));

	if (!arg) {
		return undefined;
	}

	const argIndex = process.argv.indexOf(arg);
	return process.argv[argIndex + 1];
}
