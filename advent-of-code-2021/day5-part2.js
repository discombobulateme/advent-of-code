/*
--- Part Two ---
Unfortunately, considering only horizontal and vertical lines doesn't give you
the full picture; you need to also consider diagonal lines.

Because of the limits of the hydrothermal vent mapping system, the lines in your list
will only ever be horizontal, vertical, or a diagonal line at exactly 45 degrees. In other words:

An entry like 1,1 -> 3,3 covers points 1,1, 2,2, and 3,3.
An entry like 9,7 -> 7,9 covers points 9,7, 8,8, and 7,9.
Considering all lines from the above example would now produce the following diagram:

1.1....11.
.111...2..
..2.1.111.
...1.2.2..
.112313211
...1.2....
..1...1...
.1.....1..
1.......1.
222111....
You still need to determine the number of points where at least two lines overlap.
In the above example, this is still anywhere in the diagram with a 2 or larger -
now a total of 12 points.

Consider all of the lines. At how many points do at least two lines overlap?

Expected output: 19349
*/

/*Resolution based on: https://github.com/TheAngularGuy/aoc2021/blob/master/day5/part2.js */

const fs = require('fs');
const input = fs.readFileSync('day5-input.txt').toString().split('\n');

const linesCoord = input.filter(el => !!el).map(line => line.split(' -> ').map(c => c.split(',').map(el => +el)));

function start(list) {
  const map = new Map();
  let sum = 0;
  list.forEach(([firstPoint, lastPoint]) => {
    let x = firstPoint[0];
    let x2 = lastPoint[0];
    let y = firstPoint[1];
    let y2 = lastPoint[1];
    const moveX = (x2 - x) <= 0 ? (x2 - x) === 0 ? 0 : -1 : 1;
    const moveY = (y2 - y) <= 0 ? (y2 - y) === 0 ? 0 : -1 : 1;
    while (x !== x2 + moveX || y !== y2 + moveY) {
      const pointValue = map.get(`${x},${y}`) || 0;
      if (pointValue === 1) sum++;
      map.set(`${x},${y}`, pointValue + 1);
      x += moveX;
      y += moveY;
    }
  });
  console.log(sum);
}

(() => {
  const d1 = new Date();
  start(linesCoord); // 19081
  const end = new Date() - d1;
  console.info('Execution time: %dms', end);
})();
