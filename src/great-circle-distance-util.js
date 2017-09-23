const util = {
	degreeToRadian(degree) {
		return degree * Math.PI / 180;
	},
	sphericalLawOfCosines([lat1, lon1], [lat2, lon2]) {
		return Math.acos((Math.sin(lat1) * Math.sin(lat2)) + ((Math.cos(lat1) * Math.cos(lat2)) * Math.cos(lon2 - lon1)));
	},
	distance(centralAngle) {
		const earthRadius = 6371;
		return earthRadius * centralAngle;
	}
};

module.exports = util;
