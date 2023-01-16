function curriedAdd(total) {
  if (total === undefined) return 0;

  return function sum(num) {
    if (num === undefined) return total;

    total += num;

    return sum;
  }
}

module.exports = { curriedAdd };
