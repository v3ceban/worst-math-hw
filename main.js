#!/usr/bin/env node

/**
 * Validates that the input is an array of 9 unique numbers
 * between 1 and 9.
 *
 * @param {number[]} numbers - The array of numbers to validate
 * @throws Will throw an error if the input is invalid
 * @returns {boolean} True if the input is valid
 */
const validate = (numbers) => {
  if (
    !Array.isArray(numbers) ||
    numbers.length !== 9 ||
    new Set(numbers).size !== 9
  ) {
    throw new Error(
      `Input must be an array of 9 unique numbers. Received: ${numbers}`,
    );
  }
  for (const num of numbers) {
    if (
      typeof num !== "number" ||
      num < 1 ||
      num > 9 ||
      !Number.isInteger(num)
    ) {
      throw new Error(
        `All numbers must be between 1 and 9. Received: ${num}. Input: ${numbers}`,
      );
    }
  }
};

/**
 * Calculates the result following the order of operations.
 * Takes in the numbers 1 through 9 as parameters
 * and performs the calculation.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @param {number} e
 * @param {number} f
 * @param {number} g
 * @param {number} h
 * @param {number} i
 * @returns {number} The result of the calculation
 */
const pemdas = (
  a = 1,
  b = 2,
  c = 3,
  d = 4,
  e = 5,
  f = 6,
  g = 7,
  h = 8,
  i = 9,
) => {
  return a + (13 * b) / c + d + 12 * e - f - 11 + (g * h) / i - 10;
};

/**
 * Calculates the result in a linear fashion without following
 * the order of operations.
 * Takes in the numbers 1 through 9 as parameters
 * and performs the calculation.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @param {number} e
 * @param {number} f
 * @param {number} g
 * @param {number} h
 * @param {number} i
 * @returns {number} The result of the calculation
 */
const linear = (
  a = 1,
  b = 2,
  c = 3,
  d = 4,
  e = 5,
  f = 6,
  g = 7,
  h = 8,
  i = 9,
) => {
  return (((((a + 13) * b) / c + d + 12) * e - f - 11 + g) * h) / i - 10;
};

/**
 * Generates permutations of an array.
 *
 * @param {number[]} arr - The array to permute
 * @param {number} n - The length of the array
 * @yields {number[]} The next permutation of the array
 */
function* permute(arr, n = arr.length) {
  if (n <= 1) yield arr.slice();
  else {
    for (let i = 0; i < n; i++) {
      yield* permute(arr, n - 1);
      const j = n % 2 ? 0 : i;
      [arr[n - 1], arr[j]] = [arr[j], arr[n - 1]];
    }
  }
}

const main = () => {
  const correct = 66;
  const results = [];

  for (const permutation of permute([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    validate(permutation);
    const pemdasResult = pemdas(...permutation);
    const linearResult = linear(...permutation);

    if (pemdasResult === correct) {
      results.push({ method: "pemdas", permutation });
    }
    if (linearResult === correct) {
      results.push({ method: "linear", permutation });
    }
  }

  // const identical = results.filter((result) =>
  //   results.some(
  //     (r) =>
  //       r.method !== result.method &&
  //       r.permutation.every((num, idx) => num === result.permutation[idx]),
  //   ),
  // );

  let pemdasCount = 0;
  let linearCount = 0;
  console.log(`Found ${results.length} results:`);
  results.forEach((result) => {
    if (result.method === "pemdas") pemdasCount++;
    if (result.method === "linear") linearCount++;
    console.log(`${result.method}: [${result.permutation.join(", ")}]`);
  });
  console.log(`\nTotal pemdas results: ${pemdasCount}`);
  console.log(`Total linear results: ${linearCount}`);

  // if (identical.length > 0) {
  //   console.log("Permutations yielding correct result for both methods:");
  //   identical.forEach((result) => {
  //     console.log(`${result.method}: [${result.permutation.join(", ")}]`);
  //   });
  // } else {
  //   console.log("No permutations yielded correct result for both methods.");
  // }
};

main();
