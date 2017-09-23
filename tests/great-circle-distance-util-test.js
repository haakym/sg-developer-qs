const fs = require('fs');
const chai = require('chai');

const expect = chai.expect;
const greatCircleDistanceUtil = require('../src/great-circle-distance-util');

// Helper function to round a decimal value
function round(value, decimals) {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

describe('greatCircleDistanceUtil', () => {
	it('provides functions to calculate the great-circle distance between two coordinates', () => {
		const londonCoordinates = [51.515419, -0.141099];
		const londonRadians = londonCoordinates.map(greatCircleDistanceUtil.degreeToRadian);

		const spiderGapOfficeCoordinates = [51.507735, -0.067022];
		const spiderGapOfficeRadians = spiderGapOfficeCoordinates.map(greatCircleDistanceUtil.degreeToRadian);

		const centralAngle = greatCircleDistanceUtil.sphericalLawOfCosines(londonRadians, spiderGapOfficeRadians);

		const distance = greatCircleDistanceUtil.distance(centralAngle);

		const roundedDistance = round(distance, 2);

		expect(roundedDistance).to.equal(5.2);
	});
});

describe('greatCircleDistanceUtil', () => {
	it('provides functions to calculate the great-circle distance between a list of coordinates', () => {
		let companies;

		try {
			companies = JSON.parse(fs.readFileSync('./data/partners.json', 'utf8'));
		} catch (err) {
			console.log('An error occured with JSON parsing', err);
			process.exit();
		}

		const londonCoordinates = [51.515419, -0.141099];
		const londonRadians = londonCoordinates.map(greatCircleDistanceUtil.degreeToRadian);

		const companiesNearLondon = companies.map(company => {
			return {
				organization: company.organization,
				offices: company.offices.filter(office => {
					const officeRadians = office.coordinates.split(',')
                        .map(coordinate => parseFloat(coordinate))
                        .map(greatCircleDistanceUtil.degreeToRadian);

					const centralAngle = greatCircleDistanceUtil.sphericalLawOfCosines(londonRadians, officeRadians);
					const distance = greatCircleDistanceUtil.distance(centralAngle);

					return distance <= 100;
				})
			};
		}).filter(company => company.offices.length)
    .reduce((result, company) => {
	company.offices.forEach(office => {
		result.push(`${company.organization} ${office.address}`);
	});
	return result;
}, [])
    .sort();

		const expected = [
			'Blue Square 360 St Saviours Wharf, London SE1 2BE',
			'Gallus Consulting Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG',
			'Gallus Consulting No1 Royal Exchange, London, EC3V 3DG'
		];

		expect(companiesNearLondon).to.include.ordered.members(expected);
	});
});
