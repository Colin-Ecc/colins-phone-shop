// tests/cart.test.js
import { module, test } from 'qunit';
import { addToCart } from '../src/app/cart.js';

module('addToCart()', function() {
  test('adds a new product with quantity 1 to an empty cart', function(assert) {
    const initial = [];
    const product = { _id: 'ip4', pname: 'iPhone 15 Pro', price: '799' };

    const updated = addToCart(initial, product);

    assert.ok(Array.isArray(updated),   'returns an array');
    assert.equal(updated.length, 1,      'one item in cart');
    assert.deepEqual(
      updated[0],
      { ...product, quantity: 1 },
      'item has quantity = 1'
    );
    assert.equal(initial.length, 0,      'initial not mutated');
  });

  test('increments quantity when same product is added again', function(assert) {
    const initial = [{ _id: 'ip4', pname: 'iPhone 15 Pro', price: '799', quantity: 1 }];
    const product = { _id: 'ip4', pname: 'iPhone 15 Pro', price: '799' };

    const updated = addToCart(initial, product);

    assert.equal(updated.length, 1,       'still one item');
    assert.equal(updated[0].quantity, 2,  'quantity is now 2');
    assert.equal(initial[0].quantity, 1,  'original stayed 1');
  });
});
