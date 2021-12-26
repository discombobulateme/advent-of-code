/*
--- Part Two ---
Now that you're warmed up, it's time to play the real game.

A second compartment opens, this time labeled Dirac dice.
Out of it falls a single three-sided die.

As you experiment with the die, you feel a little strange.
An informational brochure in the compartment explains that this is a quantum die:
when you roll it, the universe splits into multiple copies, one copy for each
possible outcome of the die. In this case, rolling the die always splits the
universe into three copies: one where the outcome of the roll was 1,
one where it was 2, and one where it was 3.

The game is played the same as before, although to prevent things from getting
too far out of hand, the game now ends when either player's score reaches at least 21.

Using the same starting positions as in the example above, player 1 wins in
444356092776315 universes, while player 2 merely wins in 341960390180808 universes.

Using your given starting positions, determine every possible outcome.
Find the player that wins in more universes; in how many universes does that player win?

Expected output: 433315766324816
*/
//Resolution based on: https://github.com/constb/aoc2021/blob/master/21/index2.js

let test = false;
let player1 = test ? 4 : 7; /* Player 1 starting position: 7 (my advent input) */
let player2 = test ? 8 : 9; /* Player 2 starting position: 9 (my advent input) */

let combinations = [
  [1, 1, 1],
  [1, 1, 2],
  [1, 1, 3],
  [1, 2, 1],
  [1, 2, 2],
  [1, 2, 3],
  [1, 3, 1],
  [1, 3, 2],
  [1, 3, 3],
  [2, 1, 1],
  [2, 1, 2],
  [2, 1, 3],
  [2, 2, 1],
  [2, 2, 2],
  [2, 2, 3],
  [2, 3, 1],
  [2, 3, 2],
  [2, 3, 3],
  [3, 1, 1],
  [3, 1, 2],
  [3, 1, 3],
  [3, 2, 1],
  [3, 2, 2],
  [3, 2, 3],
  [3, 3, 1],
  [3, 3, 2],
  [3, 3, 3],
];

let combinationCounts = new Map();
for (const c of combinations) {
  const sum = c[0] + c[1] + c[2];
  combinationCounts.set(sum, (combinationCounts.get(sum) ?? 0) + 1);
}

let wins = new Map();

function count(p1, p2, s1, s2) {
  // always p1's turn, p2 just made theirs
  if (s2 >= 21) return [0, 1];

  const key = [p1, p2, s1, s2].join(",");
  const cached = wins.get(key); // very slow without cache
  if (cached != null) return cached;

  let res = [0, 0];

  for (const [sum, cnt] of combinationCounts.entries()) {
    let n1 = p1 + sum;
    n1 = ((n1 - 1) % 10) + 1;
    let ns1 = s1 + n1;
    let w = count(p2, n1, s2, ns1);
    res[0] += w[1] * cnt;
    res[1] += w[0] * cnt;
  }

  wins.set(key, res); // memoize result
  return res;
}

const cnt = count(player1, player2, 0, 0);
// console.log(wins.size);
// console.log(cnt);
console.log(Math.max(...cnt));
