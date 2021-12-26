/*
This problems is solved by using Dijkstra's algorithm is an algorithm for finding
the shortest paths between nodes in a graph
https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm

--- Day 15: Chiton ---
You've almost reached the exit of the cave, but the walls are getting closer together.
Your submarine can barely still fit, though; the main problem is that the walls
of the cave are covered in chitons, and it would be best not to bump any of them.

The cavern is large, but has a very low ceiling, restricting your motion to
two dimensions. The shape of the cavern resembles a square; a quick scan of
chiton density produces a map of risk level throughout the cave (your puzzle input).
For example:

1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
You start in the top left position, your destination is the bottom right position,
and you cannot move diagonally. The number at each position is its risk level;
to determine the total risk of an entire path, add up the risk levels of each
position you enter (that is, don't count the risk level of your starting position
unless you enter it; leaving it adds no risk to your total).

Your goal is to find a path with the lowest total risk.
In this example, a path with the lowest total risk is highlighted here:

1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
The total risk of this path is 40 (the starting position is never entered, so its risk is not counted).

What is the lowest total risk of any path from the top left to the bottom right?

Expected output: 363


--- Part Two ---
Now that you know how to find low-risk paths in the cave, you can try to find your way out.

The entire cave is actually five times larger in both dimensions than you thought;
the area you originally scanned is just one tile in a 5x5 tile area that forms the full map.
Your original map tile repeats to the right and downward;
each time the tile repeats to the right or downward, all of its risk levels are
1 higher than the tile immediately up or left of it.
However, risk levels above 9 wrap back around to 1.
So, if your original map had some position with a risk level of 8,
then that same position on each of the 25 total tiles would be as follows:

8 9 1 2 3
9 1 2 3 4
1 2 3 4 5
2 3 4 5 6
3 4 5 6 7
Each single digit above corresponds to the example position with a value of 8
on the top-left tile. Because the full map is actually five times larger in
both dimensions, that position appears a total of 25 times,
once in each duplicated tile, with the values shown above.

Here is the full five-times-as-large version of the first example above,
with the original map in the top left corner highlighted:

*see image in website https://adventofcode.com/2021/day/15#part2

Equipped with the full map, you can now find a path from the top left corner
to the bottom right corner with the lowest total risk:

The total risk of this path is 315 (the starting position is still never entered,
  so its risk is not counted).

Using the full map, what is the lowest total risk of any path from the top left
to the bottom right?

Expected output: 2835
*/

//Resolution based on: https://github.com/tpatel/advent-of-code-2021/blob/main/day15.js
// Video explanation: https://www.youtube.com/watch?v=1mDDed3MlSo

const fs = require("fs");

const map = fs
  .readFileSync("day15-input.txt", { encoding: "utf-8" }) // read day??.txt content
  .trim()
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n") // Split on newline
  .map((x) => [...x].map(Number)); // Parse each line into a number

/* console in a noce formated way */
//console.table(map);

function coordinatesToIndex({ x, y }, map) {
  return x + y * map.length;
}

function indexToCoordinates(index, map) {
  const x = index % map.length;
  const y = (index - x) / map.length;
  return {
    x,
    y,
  };
}

function getNeighbors(index, map) {
  const { x, y } = indexToCoordinates(index, map);
  const list = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ].filter(({ x, y }) => x >= 0 && y >= 0 && x < map.length && y < map.length);
  return list;
}

function solve(map) {
  const target = { x: map.length - 1, y: map.length - 1 };
  const targetIndex = coordinatesToIndex(target, map);

  const dist = Array(map.length * map.length).fill(Infinity);
  const Q = new Set(
    Array(map.length * map.length)
      .fill(0)
      .map((x, index) => index)
  );

  /*
  Dijkstra's algorithm Pseudocode:
 1  function Dijkstra(Graph, source):
 2
 3      create vertex set Q
 4
 5      for each vertex v in Graph:
 6          dist[v] ← INFINITY
 7          prev[v] ← UNDEFINED
 8          add v to Q
 9      dist[source] ← 0
10
11      while Q is not empty:
12          u ← vertex in Q with min dist[u]
13
14          remove u from Q
15
16          for each neighbor v of u still in Q:
17              alt ← dist[u] + length(u, v)
18              if alt < dist[v]:
19                  dist[v] ← alt
20                  prev[v] ← u
21
22      return dist[], prev[]
  */

  dist[0] = 0;

  while (Q.size > 0) {
    let min = Infinity;
    let minIndex = 0;

    for (const value of Q) {
      if (dist[value] < min) {
        min = dist[value];
        minIndex = value;
      }
    }

    const u = minIndex;
    Q.delete(u);

    if (u === targetIndex) break;

    const neighbors = getNeighbors(u, map);

    for (const neighbor of neighbors) {
      const neighborIndex = coordinatesToIndex(neighbor, map);
      const alt = dist[u] + map[neighbor.y][neighbor.x];

      if (alt < dist[neighborIndex]) {
        dist[neighborIndex] = alt;
      }
    }
  }

  console.log(dist[coordinatesToIndex(target, map)]);
}

solve(map);

const biggerMap = Array(5 * map.length)
  .fill(0)
  .map((_, y) =>
    Array(5 * map.length)
      .fill(0)
      .map((_, x) => {
        const originalX = x % map.length;
        const originalY = y % map.length;
        const offset = Math.floor(x / map.length) + Math.floor(y / map.length);
        const value = map[originalY][originalX] + offset;
        return value > 9 ? value - 9 : value;
      })
  );

// console.log(biggerMap.map((v) => v.join("")).join`\n`);

solve(biggerMap);
