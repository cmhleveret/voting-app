// Example test file (see exampleNumber.js)

const { adder } = require('./exampleNumber');

describe('adder', () => {
	it('adds numbers', () => {
		const results = adder(1, 2);
		expect(results).toEqual(3);
	})
})