/*
--- Day 2: Dive! ---
---PART1---
Now, you need to figure out how to pilot this thing.

It seems like the submarine can take a series of commands like forward 1, down 2, or up 3:

forward X increases the horizontal position by X units.
down X increases the depth by X units.
up X decreases the depth by X units.
Note that since you're on a submarine, down and up affect your depth,
and so they have the opposite result of what you might expect.

The submarine seems to already have a planned course (your puzzle input).
You should probably figure out where it's going. For example:

forward 5
down 5
forward 8
up 3
down 8
forward 2
Your horizontal position and depth both start at 0. The steps above would then
modify them as follows:

forward 5 adds 5 to your horizontal position, a total of 5.
down 5 adds 5 to your depth, resulting in a value of 5.
forward 8 adds 8 to your horizontal position, a total of 13.
up 3 decreases your depth by 3, resulting in a value of 2.
down 8 adds 8 to your depth, resulting in a value of 10.
forward 2 adds 2 to your horizontal position, a total of 15.
After following these instructions, you would have a horizontal position of 15 and a depth of 10.
(Multiplying these together produces 150.)

Calculate the horizontal position and depth you would have after following the planned course.
What do you get if you multiply your final horizontal position by your final depth?
*/

const fs = require('fs');

/* Read in the input text, then split it by return character */
let input = fs.readFileSync('day2-input.txt', 'utf-8').split('\n');

/* testing the function with a small data */
// let input = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];

/* transforms the text into an array of objects */
input = input.map(str => {
  str = str.split(' ');
  return {
    direction: str[0],
    magnitude: Number(str[1])
  }
});
//console.log(input)

/* Stores the submarine's position */
const submarine = {
  horizontal: 0,
  depth: 0
};

/* Loop through each instruction and modify the submarine's coordinates */
input.forEach(instruction => {
  // Switch statement for the three directions
  switch(instruction.direction) {
    case 'forward':
      submarine.horizontal += instruction.magnitude;
      break;
    case 'down':
      submarine.depth += instruction.magnitude;
      break;
    case 'up':
      submarine.depth -= instruction.magnitude;
      // Submarine's can't surface higher than water level, so reset to 0 if negative
      if (submarine.depth < 0) submarine.depth = 0;
      break;
  }
});

// Log the final output
console.log(submarine);
console.log(`Answer: ${submarine.horizontal * submarine.depth}`);
