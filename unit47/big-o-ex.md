# Big-O Notation Practice

## Part 1: Simplifying Expressions
1. O(n + 10)
   > O(n)
2. O(100 * n)
   > O(n)
3. O(25)
   > O(1)
4. O(n^2 + n^3)
   > O(n^3)
5. 5O(n + n + n + n)
   > O(n)
6. O(1000 * log(n) + n)
   > O(n)
7. O(1000 * n * log(n) + n)
   > O(n log n)
8. O(2^n + n^2)
   > O(2^n)
9.  O(5 + 3 + 1)
    > O(1)
10. O(n + n^(1/2) + n^2 + n * log(n)^10)
    > O(n^2)


&nbsp;
## Part 2: Calculating Time Complexity

```js
function logUpTo(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
}
```
Time Complexity: O(n)

```js
function logAtLeast10(n) {
  for (let i = 1; i <= Math.max(n, 10); i++) {
    console.log(i);
  }
```
Time Complexity: O(n)

```js
function logAtMost10(n) {
  for (let i = 1; i <= Math.min(n, 10); i++) {
    console.log(i);
  }
}
```
Time Complexity: O(1)


```js
function onlyElementsAtEvenIndex(array) {
  let newArray = [];

  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      newArray.push(array[i]);
    }
  }

  return newArray;
}
```
Time Complexity: O(n)

```js
function subtotals(array) {
  let subtotalArray = [];

  for (let i = 0; i < array.length; i++) {
    let subtotal = 0;

    for (let j = 0; j <= i; j++) {
      subtotal += array[j];
    }

    subtotalArray.push(subtotal);
  }

  return subtotalArray;
}
```
Time Complexity: O(n^2)


```js
function vowelCount(str) {
  let vowelCount = {};
  const vowels = "aeiouAEIOU";

  for (let char of str) {
    if(vowels.includes(char)) {
      if(char in vowelCount) {
        vowelCount[char] += 1;
      } else {
        vowelCount[char] = 1;
      }
    }
  }

  return vowelCount;
}
```
Time Complexity: O(n)

&nbsp;
## Part 3 - short answer
1. true
2. true
3. false
4. O(n)
5. O(n)
6. O(n)
7. O(n log n)
8. O(n)
9. O(1)
10. O(n)
11. O(1)
12. O(n)
13. O(n)