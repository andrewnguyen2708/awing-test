function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function set(obj: any, path: string, value: string | number | boolean) {
	let schema = obj;
	const pList = path.split('.');
	const len = pList.length;
	for (let i = 0; i < len - 1; i++) {
		const elem = pList[i];
		if (!schema[elem]) schema[elem] = {};
		schema = schema[elem];
	}
	schema[pList[len - 1]] = value;
}

export { a11yProps, set };
