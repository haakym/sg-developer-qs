const chai = require('chai');

const expect = chai.expect;
const deepClone = require('../src/deep-clone');

describe('deepClone', () => {
	it('takes a simple nested object and creates a copy of it', () => {
		const target = {
			name: 'Paddy',
			address: {town: 'Lerum', country: 'Sweden'}
		};

		const cloned = deepClone(target);

		expect(cloned).to.deep.equal(target);
	});
});

describe('deepClone', () => {
	it('takes an complex nested object with arrays and creates a copy of it', () => {
		const target = {
			items: [
				'item1',
        {},
				{
					nestedItem: true
				}
			]
		};

		const cloned = deepClone(target);

		expect(cloned).to.deep.equal(target);
	});
});
