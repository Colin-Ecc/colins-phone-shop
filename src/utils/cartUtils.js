
export function calculateTotal(items) {
  return items.reduce(
    (sum, { price, quantity = 1 }) => sum + Number(price) * quantity,
    0
  );
}

export function removeItemById(cart, idToRemove) {
  return cart.filter(item => item._id !== idToRemove);
}
