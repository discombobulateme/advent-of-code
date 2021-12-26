/*
--- Day 9: Smoke Basin ---
These caves seem to be lava tubes.
Parts are even still volcanically active; small hydrothermal vents release smoke
into the caves that slowly settles like rain.

If you can model how the smoke flows through the caves,
you might be able to avoid it and be that much safer.
The submarine generates a heightmap of the floor of the nearby caves for you
(your puzzle input).

Smoke flows to the lowest point of the area it's in.
For example, consider the following heightmap:

2199943210
3987894921
9856789892
8767896789
9899965678
Each number corresponds to the height of a particular location,
where 9 is the highest and 0 is the lowest a location can be.

Your first goal is to find the low points - the locations that are lower than
any of its adjacent locations.
Most locations have four adjacent locations (up, down, left, and right);
locations on the edge or corner of the map have three or two adjacent locations,
respectively. (Diagonal locations do not count as adjacent.)

In the above example, there are four low points, all highlighted:
two are in the first row (a 1 and a 0), one is in the third row (a 5),
and one is in the bottom row (also a 5).
All other locations on the heightmap have some lower adjacent location,
and so are not low points.

The risk level of a low point is 1 plus its height.
In the above example, the risk levels of the low points are 2, 1, 6, and 6.
The sum of the risk levels of all low points in the heightmap is therefore 15.

Find all of the low points on your heightmap.
What is the sum of the risk levels of all low points on your heightmap?

Expected output: 522
*/

// Resolution based on:

const fs = require('fs');
const list = fs.readFileSync('day9-input.txt').toString().trim().split('\n');

function start(data) {
  const map = data.reduce((acc, line) => [...acc, line.split('').map(Number)], []);
  const lowest = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const top = map[y - 1] === undefined ? Infinity : map[y - 1][x];
      const bottom = map[y + 1] === undefined ? Infinity : map[y + 1][x];
      const left = map[y][x - 1] === undefined ? Infinity : map[y][x - 1];
      const right = map[y][x + 1] === undefined ? Infinity : map[y][x + 1];
      if (map[y][x] >= Math.min(top, bottom, left, right)) continue;
      lowest.push([`${x}, ${y}`, map[y][x]]);
    }
  }
  return lowest.map(el => el[1] + 1).reduce((acc, el) => acc + el);
}

const output = start(list); // 545
console.log(output);
