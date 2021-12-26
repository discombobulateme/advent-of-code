/*
Problem:
---PART 1---
This report indicates that, scanning outward from the submarine, the sonar sweep
found depths of 199, 200, 208, 210, and so on.

The first order of business is to figure out how quickly the depth increases,
just so you know what you're dealing with - you never know if the keys will get
carried into deeper water by an ocean current or a fish or something.

To do this, count the number of times a depth measurement increases from the previous measurement.
(There is no measurement before the first measurement.) In the example above, the changes are as follows:

199 (N/A - no previous measurement)
200 (increased)
208 (increased)
210 (increased)
200 (decreased)
207 (increased)
240 (increased)
269 (increased)
260 (decreased)
263 (increased)
In this example, there are 7 measurements that are larger than the previous measurement.

How many measurements are larger than the previous measurement?

---PART 2---
--- Part Two ---
Considering every single measurement isn't as useful as you expected: there's just too much noise in the data.

Instead, consider sums of a three-measurement sliding window. Again considering the above example:

199  A
200  A B
208  A B C
210    B C D
200  E   C D
207  E F   D
240  E F G
269    F G H
260      G H
263        H
Start by comparing the first and second three-measurement windows. The measurements in the first window are marked A (199, 200, 208); their sum is 199 + 200 + 208 = 607. The second window is marked B (200, 208, 210); its sum is 618. The sum of measurements in the second window is larger than the sum of the first, so this first comparison increased.

Your goal now is to count the number of times the sum of measurements in this sliding window increases from the previous sum. So, compare A with B, then compare B with C, then C with D, and so on. Stop when there aren't enough measurements left to create a new three-measurement sum.

In the above example, the sum of each three-measurement window is as follows:

A: 607 (N/A - no previous sum)
B: 618 (increased)
C: 618 (no change)
D: 617 (decreased)
E: 647 (increased)
F: 716 (increased)
G: 769 (increased)
H: 792 (increased)
In this example, there are 5 sums that are larger than the previous sum.

Consider sums of a three-measurement sliding window. How many sums are larger than the previous sum?
*/

/* Transforms input copied as text into an array */
const fs = require('fs');
const input = fs.readFileSync('./day1-input.txt', 'utf-8').split("\n");
const depths = input.map(Number);
//console.log(depth)

// Resolution #1
let increases = 0;
let decreases = 0;
let sumIncreases = 0;

// Part 1
for (let i = 0; i < depths.length; i++) {
    if (depths[i] < depths[i+1]) {
        increases++;
    } else {
        decreases++;
    };
}

// Part 2
for (let i = 0; i < depths.length; i++) {
    let mat1 = depths[i]+depths[i+1]+depths[i+2]
    let mat2 = depths[i+1]+depths[i+2]+depths[i+3]
    if (mat1 < mat2) {
        sumIncreases++;
    }
}

console.log('--------------------------');
console.info(`Total Increases: ${increases}`);
console.info(`Total Decreases: ${decreases}`);
console.info(`Sum Increases: ${sumIncreases}`);


/*
// Resolution #2

let increased = 0;
let rolling = 0;

depths.map((depth, index) => {
  let status = depth > depths[index - 1] ? "increased" : "decreased";
  // console.log(depths[index - 1], depth, status);
  if (status === "increased") {
    increased++;
  }
});

depths.map((depth, index) => {
  // Are there three four prior elements for the math to work here?
  if (index < 3) {
    return;
  }
  // Get the last three, and the last two for the current.
  let prior = depths[index - 1] + depths[index - 2] + depths[index - 3];
  let current = depths[index] + depths[index - 1] + depths[index - 2];
  let status = prior < current ? "increased" : "decreased";
  if (status === "increased") {
    rolling++;
  }
});
console.log({ increased, rolling });
*/

// expected output: 1655
