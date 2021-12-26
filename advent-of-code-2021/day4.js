/*
--- Day 4: Giant Squid ---
You're already almost 1.5km (almost a mile) below the surface of the ocean,
already so deep that you can't see any sunlight. What you can see, however,
is a giant squid that has attached itself to the outside of your submarine.

Maybe it wants to play bingo?

Bingo is played on a set of boards each consisting of a 5x5 grid of numbers.
Numbers are chosen at random, and the chosen number is marked on all boards on which it appears.
(Numbers may not appear on all boards.)
If all numbers in any row or any column of a board are marked, that board wins.
(Diagonals don't count.)

The submarine has a bingo subsystem to help passengers (currently, you and the giant squid)pass the time.
It automatically generates a random order in which to draw numbers and a random
set of boards (your puzzle input). For example:

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
After the first five numbers are drawn (7, 4, 9, 5, and 11), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
Finally, 24 is drawn:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
At this point, the third board wins because it has at least one complete row or
column of marked numbers (in this case, the entire top row is marked: 14 21 17 24 4).

The score of the winning board can now be calculated.
Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188.
Then, multiply that sum by the number that was just called when the board won, 24,
to get the final score, 188 * 24 = 4512.

To guarantee victory against the giant squid, figure out which board will win first.
What will your final score be if you choose that board?

Expected output:


*/

/*
const fs = require('fs');
const input = fs.readFileSync('day4-input.txt').toString();

function getDrawnNumbersAndBoards(text) {
  const partsOfInput = text.split('\n\n');
  const drawnNumbers = partsOfInput[0].split(',').map(el => +el);
  const boards = partsOfInput.slice(1).map(
    board => board.split('\n')
      .filter(line => !!line)
      .map(line => line.trim()
        .replace(/  /g, ' ')
        .split(' ')
        .map(el => ({value: +el, marked: false}))
      )
  );
  return [drawnNumbers, boards];
}

function checkIfWining(board, x, y) {
  let nbVertical = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i][x].marked) nbVertical++;
    if (nbVertical === board.length) return true;
  }
  let nbHorizontal = 0;
  for (let i = 0; i < board[0].length; i++) {
    if (board[y][i].marked) nbHorizontal++;
    if (nbHorizontal === board[0].length) return true;
  }
}

function markNumInBoradAndCheckWinCondition(board, drawnNum) {
  let isWining = false;
  board.forEach((line, y) => {
    line.forEach((numOb, x) => {
      if (numOb.value === drawnNum) {
        numOb.marked = true;
        isWining = isWining || checkIfWining(board, x, y);
      }
    })
  });
  return isWining;
}

function getWiningBoardAndLastDrawnNumber(drawnNumbers, boards) {
  for (let drawnNum of drawnNumbers) {
    let indexBoard = 0;
    for (let board of boards) {
      if (markNumInBoradAndCheckWinCondition(board, drawnNum)) {
        return [boards[indexBoard], drawnNum];
      }
      indexBoard++;
    }
  }
}

function start() {
  let [drawnNumbers, boards] = getDrawnNumbersAndBoards(input);
  const [winingBoard, winingNumber] = getWiningBoardAndLastDrawnNumber(drawnNumbers, boards);
  let sum = winingBoard.reduce((sum, line) =>
    (line.reduce((accu, nb) => !nb.marked ? (accu + nb.value) : accu, 0) + sum), 0);
  console.log(sum * winingNumber); //10680
}

(() => {
  const d1 = new Date();
  start();
  const end = new Date() - d1;
  console.info('Execution time: %dms', end);
})();
*/

/*Resolution reference: https://github.com/CamdynR/Advent-of-Code-2021/blob/master/day-4/challenge-1.js */

const fs = require('fs');
const Board = require('./day4-board');

// Call the initializing function to run the program
init();

/**
 * The initializing function, the program starts here
 */
function init() {
  // Read in the input text, then split it by return character
  let input = fs.readFileSync('day4-input.txt', 'utf-8').split('\n');
  // The numbers to be called for the bingo game
  const numsToCall = input.shift().split(',');
  // The list of populated boards
  const boardList = populateBoardList(input);
  // Find the winning board
  const winningBoard = findWinningBoard(boardList, numsToCall);
  // Grab the uncalled sum of the winning board and the last number called
  const unCalledSum = winningBoard.sumUncalled();
  const finalNum = winningBoard.numsCalled[winningBoard.numsCalled.length - 1];

  // Log the winning board and stats about it
  console.log(winningBoard);
  console.log(`This board won in ${winningBoard.numsCalled.length} numbers`);
  console.log(`Uncalled sum: ${unCalledSum}, Final num: ${finalNum}\n
  Answer: ${unCalledSum*finalNum}`);
}

/**
 * Takes in the list of input rows, creates Board objects, and populates
 * an array with them
 * @param {array<string>} input An array of rows for every game board
 * @returns {array<Board>} a populated list of every board
 */
function populateBoardList(input) {
  const boardList = []; // The boardList to populate and return
  let currBoard = new Board(); // Create a new board to start
  input.forEach(currRow => {
    // If the row's empty start a new board
    if (currRow.length == 0) {
      boardList.push(currBoard);
      currBoard = new Board();
      return;
    }
    // Split the row by spaces
    currRow = currRow.split(' ');
    // If there are any empty strings remove those
    while (currRow.includes('')) {
      currRow.splice(currRow.indexOf(''), 1);
    }
    // Coerce the strings to be numbers in the row
    currRow = currRow.map(str => Number(str));
    // Add the row to the current board
    currBoard.addRow(currRow);
  });
  return boardList;
}

/**
 * Calls each number for each board and returns the first winner
 * @param {array<Board>} boardList List of all the boards to check
 * @param {array<number>} numsToCall List of numbers to call, in order
 * @returns {Board}
 */
function findWinningBoard(boardList, numsToCall) {
  // Loop through every board
  for (let i = 0; i < numsToCall.length; i++) {
    for (let j = 0; j < boardList.length; j++) {
      // Call the new number for each board
      boardList[j].callNumber(numsToCall[i]);
      // Return if the board was a winner
      if (boardList[j].checkWinner()) return boardList[j];
    }
  }
}
