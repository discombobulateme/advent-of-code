/*
--- Part Two ---
Through a little deduction, you should now be able to determine the remaining digits.
Consider again the first example above:

acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf
After some careful analysis, the mapping between signal wires and segments only
make sense in the following configuration:

 dddd
e    a
e    a
 ffff
g    b
g    b
 cccc
So, the unique signal patterns would correspond to the following digits:

acedgfb: 8
cdfbe: 5
gcdfa: 2
fbcad: 3
dab: 7
cefabd: 9
cdfgeb: 6
eafb: 4
cagedb: 0
ab: 1
Then, the four digits of the output value can be decoded:

cdfeb: 5
fcadb: 3
cdfeb: 5
cdbaf: 3
Therefore, the output value for this entry is 5353.

Following this same process for each entry in the second, larger example above,
the output value of each entry can be determined:

fdgacbe cefdb cefbgd gcbe: 8394
fcgedb cgb dgebacf gc: 9781
cg cg fdcagb cbg: 1197
efabcd cedba gadfec cb: 9361
gecf egdcabf bgf bfgea: 4873
gebdcfa ecba ca fadegcb: 8418
cefg dcbef fcge gbcadfe: 4548
ed bcgafe cdgba cbgef: 1625
gbdfcae bgc cg cgb: 8717
fgae cfgab fg bagce: 4315
Adding all of the output values in this larger example produces 61229.

For each entry, determine all of the wire/segment connections and decode the four-digit output values.
What do you get if you add up all of the output values?

Expected output: 1083859
*/

//Resolution based on: https://github.com/TheAngularGuy/aoc2021/blob/master/day8/part2.js

const fs = require('fs');
const fileContent = fs.readFileSync('day8-input.txt').toString();

const decode = fileContent.split('\n').filter(el => !!el)
  .map(el => el.split('|')[0]).map(el => el.split(' ').filter(el => !!el));

const numbers = fileContent.split('\n').filter(el => !!el)
  .map(el => el.split('|')[1]).map(el => el.split(' ').filter(el => !!el));

function getNumFromPossibility(possibility, num) {
  const topRight = possibility[1];
  const bottomRight = possibility[2];
  const topLeft = possibility[3];
  const middle = possibility[4];
  const bottomLeft = possibility[6];

  if (num.length === 7) return 8;
  if (num.length === 2) return 1;
  if (num.length === 4) return 4;
  if (num.length === 3) return 7;
  if (num.length === 6 && !num.includes(middle)) return 0;
  if (num.length === 6 && num.includes(topRight) && num.includes(middle)) return 9;
  if (num.length === 6 && num.includes(bottomLeft) && num.includes(middle)) return 6;
  if (num.length === 5 && num.includes(topRight) && num.includes(bottomRight)) return 3;
  if (num.length === 5 && !num.includes(topRight) && !num.includes(bottomLeft)) return 5;
  if (num.length === 5 && !num.includes(topLeft) && !num.includes(bottomRight)) return 2;
  return null;
}

function isGoodPossibility(forDecoding, possibility) {
  let numFound = forDecoding.reduce((acc, num) =>
    getNumFromPossibility(possibility, num) !== null ? acc + 1 : acc, 0)
  return numFound === forDecoding.length;
}

function posibilities(deduction, allPossibilities = [], index = 0) {
  const list1 = [...allPossibilities, deduction[index][0]];
  const list2 = [...allPossibilities, deduction[index][1]];
  return (index === deduction.length - 1) ? [list1, list2] :
    [posibilities(deduction, list1, index + 1), posibilities(deduction, list2, index + 1)];
}

function getDeduction(forDecoding) {
  const one = forDecoding.filter(el => el.length === 2)[0];
  const seven = forDecoding.filter(el => el.length === 3)[0];
  const four = forDecoding.filter(el => el.length === 4)[0];
  const rest = ['a', 'b', 'e', 'd', 'c', 'f', 'g'].filter(c => ![...one, ...four, ...seven].includes(c));

  return [
    seven.split('').filter(c => !one.includes(c)), // top
    one, // topRight
    one, // bottomRight
    four.split('').filter(c => !one.includes(c)), // topLeft
    four.split('').filter(c => !one.includes(c)), // middle
    rest, // bottom
    rest, // bottomLeft
  ];
}

function virtualNb(forDecoding, number) {
  const deduction = getDeduction(forDecoding);
  const allPosibilities = posibilities(deduction).flat(deduction.length - 1).filter(el => {
    for (let c of el) {
      if (el.filter(v => v === c).length > 1) return false;
    }
    return true;
  });
  const goodPossibility = allPosibilities.find(possibility => isGoodPossibility(forDecoding, possibility));
  return Number(number.reduce((acc, nb) => acc + getNumFromPossibility(goodPossibility, nb), ''));
}

function start(forDecoding, numToGuess) {
  return numToGuess.reduce((sum, nb, i) => sum + virtualNb(forDecoding[i], nb), 0);
}

(() => {
  const d1 = new Date();
  const output = start(decode, numbers); // 1043101
  console.log(output);
  const end = new Date() - d1;
  console.info('Execution time: %dms', end);
})();
