// tests/sumPrices.test.js
import QUnit from 'qunit';
const { module, test } = QUnit;

import { sumPrices } from '../src/utils/sumPrices.js';

module('sumPrices()', () => {
  test('adds up string prices correctly', (assert) => {
    const prices = ['5', '10.5', '2.5'];
    // 5 + 10.5 + 2.5 = 18
    assert.equal(sumPrices(prices), 18, '18 total price');
  });
});
