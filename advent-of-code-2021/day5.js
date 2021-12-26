/*
--- Day 5: Hydrothermal Venture ---
You come across a field of hydrothermal vents on the ocean floor!
These vents constantly produce large, opaque clouds, so it would be best to avoid them if possible.

They tend to form in lines; the submarine helpfully produces a list of nearby
lines of vents (your puzzle input) for you to review. For example:

0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1
are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end.
These line segments include the points at both ends. In other words:

An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.
For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.

So, the horizontal and vertical lines from the above list would produce the following diagram:

.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....
In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9.
Each position is shown as the number of lines which cover that point or . if no line covers that point.
The top-left pair of 1s, for example, comes from 2,2 -> 2,1;
the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.

To avoid the most dangerous areas, you need to determine the number of points
where at least two lines overlap.
In the above example, this is anywhere in the diagram with a 2 or larger - a total of 5 points.

Consider only horizontal and vertical lines. At how many points do at least two lines overlap?

Expected output: 6007
*/

/*Resolution based on: https://github.com/TheAngularGuy/aoc2021/blob/master/day5/part1.js */

const fs = require('fs');
const input = fs.readFileSync('day5-input.txt').toString().split('\n');

const linesCoord = input.filter(el => !!el).map(line => line.split(' -> ').map(c => c.split(',').map(el => +el)));
const filteredLinesCoord = linesCoord.filter(coord => coord[0][0] === coord[1][0] || coord[0][1] === coord[1][1]);

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
  start(filteredLinesCoord); // 6666
  const end = new Date() - d1;
  console.info('Execution time: %dms', end);
})();

