function deepClone(target) {
	return Object.entries(target).reduce((result, [key, value]) => {
		if (Array.isArray(target[key])) {
			result[key] = target[key].map(function map(item) {
				if (Array.isArray(item)) {
					return map(item);
				} else if (typeof item === 'object') {
					return deepClone(item);
				}
				return item;
			});
		} else if (typeof target[key] === 'object') {
			result[key] = deepClone(value);
		} else {
			result[key] = target[key];
		}

		return result;
	}, {});
}

module.exports = deepClone;
