
export function sumPrices(prices) {
  return prices.reduce((total, p) => total + Number(p), 0);
}
