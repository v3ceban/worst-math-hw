# Worst ~~MATH~~ JavaScript Homework Ever

## Introduction

It's currently 1:51 AM and I stumbled upon [this](https://www.youtube.com/watch?v=1aywN5eFOys&t=410s) YouTube video with a terrible, yet interesting
math homework problem. As author suggests, there are over 725,000 possible ways to brute-force
the solution, so, pausing the video at 6:40, I though why not to try them all... With a little
help of JavaScript.

## Solution

### Strategy

Because the question doesn't specify the order of operations, we need to consider two scenarios:

1. Operations are performed from left to right, ignoring the usual precedence rules.
2. Operations follow the standard precedence rules ([PEMDAS](https://en.wikipedia.org/wiki/Order_of_operations)).

### Implementation

To start, I decided to start with writing two functions: `pemdas` and `linear`. Both accept
numbers `a` throgh `i`, defaulting to `1` through `9`, and calculate the same equation with different
order of operations, along a validation function to ensure the inputs are indeed integers
between `1` and `9`, which may come in handy later when I start generating permutations.

As a sanity check, I ran both functions with default values to see what results they produce and
whether they work correctly, comparing them to the expected result of `66`.

```bash
./main.js
PEMDAS result (52.88888888888889) is incorrect.
Linear result (93.70370370370372) is incorrect.
```

As expected, neither produced the correct result, but at least they work. Next step is to
generate all possible permutations of numbers `1` through `9` and execute the calculations
for each permutation. To get started, I wrote a simple `permute` generator function that
yields all possible arrangements of the input array that I can check, one at a time,
without storing them all in memory at once. Iterating over all of them I was able to
find the _first_ solution for the linear order of operations:

```bash
./main.js
Found a solution with permutation: 2,1,6,4,5,3,7,8,9
PEMDAS result: 50.38888888888889
Linear result: 66
```

This, however, made me curious whether there are more solutions and if there are any
combinations of unique integers from `1` to `9` that produce the correct solution irregardless
of operations order. So I modified the code to collect all of them in an array and print them
at the end of the run. After a while, the program finished and printed the following results:

```bash
./main.js
Found 272 results:
No permutations yielded correct result for both methods.
```

You can find the complete set of valid permutations in the `results.txt` file.

## Final Thoughts and Conclusion

As you see, there are **272 UNIQUE ANSWERS** (out of 9! options mind you) that produce the correct result.
None of them, however, worked for both methods, which is slightly disappointing. Nonetheless, this
definitely doesn't sound like a good math homework problem to me. Though this was a fun
computer-science exercise, I'm glad I didn't have to do this by hand back in school.

### Side Note

Final code can be found in the `main.js` file. To run it you need to have [Node.js](https://nodejs.org/en/download/) installed on your machine.
It does not attempt to be the most efficient solution, there is definitely room for improvement for the
algorithm and code quality, but I'm not going to bother with that for this exercise.

### Update

After watching the video further, I found out that the author actually did run a computer program
to find some solutions and the number was **128**, which is different from my **272**. To check what's
going on, I counted how many of my solutions each function produced separately:

```bash
./main.js
Found 272 results:

Total pemdas results: 128
Total linear results: 144
```

Given 128 pemdas results matches the number from the video, I suspect the author only considered
the solutions using the standard order of operations, which makes sense. The author also hints
they followed PEMDAS first at 12:30 in the video, so that likely explains the discrepancy.
