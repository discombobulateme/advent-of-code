/*
--- Part Two ---
Next, you need to find the largest basins so you know what areas are most
importantto avoid.

A basin is all locations that eventually flow downward to a single low point.
Therefore, every low point has a basin, although some basins are very small.
Locations of height 9 do not count as being in any basin,
and all other locations will always be part of exactly one basin.

The size of a basin is the number of locations within the basin,
including the low point. The example above has four basins.

The top-left basin, size 3:

2199943210
3987894921
9856789892
8767896789
9899965678
The top-right basin, size 9:

2199943210
3987894921
9856789892
8767896789
9899965678
The middle basin, size 14:

2199943210
3987894921
9856789892
8767896789
9899965678
The bottom-right basin, size 9:

2199943210
3987894921
9856789892
8767896789
9899965678
Find the three largest basins and multiply their sizes together.
In the above example, this is 9 * 14 * 9 = 1134.

What do you get if you multiply together the sizes of the three largest basins?

Expected output: 916688
*/

//Resolution based on: https://github.com/adarsh0d/advent-of-code-2021/blob/master/day8/day8.js
const fs = require('fs');
const list = fs.readFileSync('day9-input.txt').toString().trim().split('\n');

function traverse(map, x, y, visited = new Map()) {
  if (map[y] === undefined || map[y][x] === undefined || map[y][x] === 9 || visited.has(`${x}, ${y}`)) {
    return 0;
  }
  visited.set(`${x}, ${y}`, true);
  let sum = 1;
  sum += traverse(map, x + 1, y, visited); // go right
  sum += traverse(map, x - 1, y, visited); // go left
  sum += traverse(map, x, y + 1, visited); // go bottom
  sum += traverse(map, x, y - 1, visited); // go up
  return sum;
}

function start(data) {
  const map = data.reduce((acc, line) => [...acc, line.split('').map(Number)], []);
  const bassins = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const top = map[y - 1] === undefined ? Infinity : map[y - 1][x];
      const bottom = map[y + 1] === undefined ? Infinity : map[y + 1][x];
      const left = map[y][x - 1] === undefined ? Infinity : map[y][x - 1];
      const right = map[y][x + 1] === undefined ? Infinity : map[y][x + 1];
      if (map[y][x] >= Math.min(top, bottom, left, right)) continue;
      bassins.push(traverse(map, x, y));
    }
  }
  return bassins.sort((a, b) => b > a ? 1 : -1).slice(0, 3).reduce((acc, size) => acc * size, 1);
}

(() => {
  const d1 = new Date();
  const output = start(list); // 950600
  console.log(output);
  const end = new Date() - d1;
  console.info('Execution time: %dms', end);
})();
