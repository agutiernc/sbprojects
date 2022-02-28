// ES2015 Arrow Functions Shorthand
const doubleFunc = (arr) => arr.map(val => val * 2)

// Refactoring to arrow functions
const squareAndFindEvens = (numbers) => {
  return numbers
    .map(num => num ** 2)
    .filter(square => square % 2 === 0)
}

