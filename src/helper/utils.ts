function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function set(obj, path, value) {
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
