/*
--- Part Two ---
On the other hand, it might be wise to try a different strategy: let the giant squid win.

You aren't sure how many bingo boards a giant squid could play at once,
so rather than waste time counting its arms, the safe thing to do is to figure out
which board will win last and choose that one.
That way, no matter which boards it picks, it will win for sure.

In the above example, the second board is the last to win, which happens after 13
is eventually called and its middle column is completely marked.
If you were to keep playing until this point, the second board would have a sum of
unmarked numbers equal to 148 for a final score of 148 * 13 = 1924.

Figure out which board will win last. Once it wins, what would its final score be?
*/

/*Resolution reference: https://github.com/CamdynR/Advent-of-Code-2021/blob/master/day-4/challenge-2.js */

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
  const lastWinningBoard = findLastWinningBoard(boardList, numsToCall);
  // Grab the uncalled sum of the winning board and the last number called
  const unCalledSum = lastWinningBoard.sumUncalled();
  const finalNum = lastWinningBoard.numsCalled[lastWinningBoard.numsCalled.length - 1];

  // Log the winning board and stats about it
  console.log(lastWinningBoard);
  console.log(`This board won in ${lastWinningBoard.numsCalled.length} numbers`);
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
 * Calls each number for each board and returns the last winner
 * (gotta let that giant squid win)
 * @param {array<Board>} boardList List of all the boards to check
 * @param {array<number>} numsToCall List of numbers to call, in order
 * @returns {Board}
 */
function findLastWinningBoard(boardList, numsToCall) {
  // Create a set of the winning boards to avoid dupicates
  const winningBoards = new Set();
  // The current last winning board
  let currWinner = null;
  // Loop through every board
  for (let i = 0; i < numsToCall.length; i++) {
    for (let j = 0; j < boardList.length; j++) {
      // Call the new number for each board
      boardList[j].callNumber(numsToCall[i]);
      // If the board's a winner and isn't in the set, add it to the set
      // and make it the new last winning board
      if (boardList[j].checkWinner() && !winningBoards.has(boardList[j])) {
        winningBoards.add(boardList[j]);
        currWinner = boardList[j];
      }
    }
  }
  return currWinner;
}
