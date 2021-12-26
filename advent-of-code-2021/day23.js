/*
--- Day 23: Amphipod ---
A group of amphipods notice your fancy submarine and flag you down.
"With such an impressive shell," one amphipod says, "surely you can help us with
a question that has stumped our best scientists."

They go on to explain that a group of timid, stubborn amphipods live in a nearby burrow.
Four types of amphipods live there: Amber (A), Bronze (B), Copper (C), and Desert (D).
They live in a burrow that consists of a hallway and four side rooms.
The side rooms are initially full of amphipods, and the hallway is initially empty.

They give you a diagram of the situation (your puzzle input),
including locations of each amphipod (A, B, C, or D, each of which is occupying
an otherwise open space), walls (#), and open space (.).

For example:

#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
The amphipods would like a method to organize every amphipod into side rooms so
that each side room contains one type of amphipod and the types are sorted A-D
going left to right, like this:

#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########
Amphipods can move up, down, left, or right so long as they are moving into an
unoccupied open space. Each type of amphipod requires a different amount of
energy to move one step: Amber amphipods require 1 energy per step,
Bronze amphipods require 10 energy,
Copper amphipods require 100, and Desert ones require 1000.
The amphipods would like you to find a way to organize the amphipods that
requires the least total energy.

However, because they are timid and stubborn, the amphipods have some extra rules:

Amphipods will never stop on the space immediately outside any room.
They can move into that space so long as they immediately continue moving.
(Specifically, this refers to the four open spaces in the hallway that are directly
above an amphipod starting position.)
Amphipods will never move from the hallway into a room unless that room is their
destination room and that room contains no amphipods which do not also have that
room as their own destination. If an amphipod's starting room is not its destination
room, it can stay in that room until it leaves the room. (For example, an Amber
amphipod will not move from the hallway into the right three rooms, and will
only move into the leftmost room if that room is empty or if it only contains
other Amber amphipods.)
Once an amphipod stops moving in the hallway, it will stay in that spot until it
can move into a room. (That is, once any amphipod starts moving, any other amphipods
currently in the hallway are locked in place and will not move again until
they can move fully into a room.)
In the above example, the amphipods can be organized using a minimum of 12521 energy.
One way to do this is shown below.

Starting configuration:

#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
One Bronze amphipod moves into the hallway, taking 4 steps and using 40 energy:

#############
#...B.......#
###B#C#.#D###
  #A#D#C#A#
  #########
The only Copper amphipod not in its side room moves there, taking 4 steps and
using 400 energy:

#############
#...B.......#
###B#.#C#D###
  #A#D#C#A#
  #########
A Desert amphipod moves out of the way, taking 3 steps and using 3000 energy,
and then the Bronze amphipod takes its place, taking 3 steps and using 30 energy:

#############
#.....D.....#
###B#.#C#D###
  #A#B#C#A#
  #########
The leftmost Bronze amphipod moves to its room using 40 energy:

#############
#.....D.....#
###.#B#C#D###
  #A#B#C#A#
  #########
Both amphipods in the rightmost room move into the hallway, using 2003 energy in total:

#############
#.....D.D.A.#
###.#B#C#.###
  #A#B#C#.#
  #########
Both Desert amphipods move into the rightmost room using 7000 energy:

#############
#.........A.#
###.#B#C#D###
  #A#B#C#D#
  #########
Finally, the last Amber amphipod moves into its room, using 8 energy:

#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########
What is the least energy required to organize the amphipods?

Expected output: 19167
*/

//Resolution: https://github.com/tymscar/Advent-Of-Code/blob/master/2021/javascript/day23/part1.js


const fs = require('fs');

const input = fs.readFileSync('day23-input.txt', 'utf8')
  .split('\n').slice(2,4)
  .map(a => a.split(''))
  .map(a=>a.filter(b => ['A', 'B', 'C', 'D']
  .includes(b)));


const priceToMove = {
	'A': 1,
	'B': 10,
	'C': 100,
	'D': 1000
};

const correspondingRoomNumber = {
	'A': 0,
	'B': 1,
	'C': 2,
	'D': 3
};

const hallEntraceFinalRoom = {
	'A': 2,
	'B': 4,
	'C': 6,
	'D': 8
};

const hallEntranceOfRoom = {
	0: 2,
	1: 4,
	2: 6,
	3: 8
};


let world = {};
world.hall = ['.','.','.','.','.','.','.','.','.','.','.'];
world.rooms = [
  [input[0][0], input[1][0]],
  [input[0][1],input[1][1]],
  [input[0][2], input[1][2]],
  [input[0][3], input[1][3]]
];

let queue = [world];
let bestPrice = [];
bestPrice[JSON.stringify(world)] = 0;

let winPrices = [];

while(queue.length >0){

	const currWorldState = queue.shift();
	const currentPrice = bestPrice[JSON.stringify(currWorldState)];

	//check if winner
	let winner = true;
	if(currWorldState.rooms[0][0] !== 'A' || currWorldState.rooms[0][1] !== 'A')
		winner = false;
	if(currWorldState.rooms[1][0] !== 'B' || currWorldState.rooms[1][1] !== 'B')
		winner = false;
	if(currWorldState.rooms[2][0] !== 'C' || currWorldState.rooms[2][1] !== 'C')
		winner = false;
	if(currWorldState.rooms[3][0] !== 'D' || currWorldState.rooms[3][1] !== 'D')
		winner = false;
	if(winner){
		winPrices.push(currentPrice);
		continue;
	}

	// move hallway pieces that can be moved
	for(let hallLoc= 0; hallLoc<11; hallLoc++){
		const animalType = currWorldState.hall[hallLoc];
		if(animalType !== '.'){// There is an animal here
			const targetRoom = correspondingRoomNumber[animalType];
			const howManyInFinalRoom = currWorldState.rooms[targetRoom].length;
			if(howManyInFinalRoom >= 2){
				continue; //room is full
			} else if (howManyInFinalRoom === 1){
				if(currWorldState.rooms[targetRoom][0] !== animalType){
					continue; //room has the wrong animal inside so dont go
				}
			}
			//room is empty or has exactly one animal of same type
			const targetHall = hallEntraceFinalRoom[animalType];
			const step = targetHall > hallLoc ? 1 : -1;
			let pos = hallLoc;
			let hitSomething = false;
			let extraPrice = 0;
			while (pos !== targetHall){
				pos += step;
				if(currWorldState.hall[pos] !== '.'){
					hitSomething = true;
				}
				extraPrice += priceToMove[animalType];
			}
			if(hitSomething)
				continue; // hit something on my way
			if(howManyInFinalRoom === 0)
				extraPrice += (2 * priceToMove[animalType]);
			else
				extraPrice += priceToMove[animalType];

      /* ONLY ON NODE 17 up!!! See structuredClone() https://developer.mozilla.org/en-US/docs/Web/API/structuredClone */
			const newState = structuredClone(currWorldState);
			newState.rooms[targetRoom] = [animalType, ...newState.rooms[targetRoom]];
			newState.hall[hallLoc] = '.';
			const newPrice = currentPrice + extraPrice;
			const oldPriceOfNewState = bestPrice[JSON.stringify(newState)] || 999_999_999;
			if(newPrice < oldPriceOfNewState){
				bestPrice[JSON.stringify(newState)] = newPrice;
				queue.push(newState);
			}
		}
	}

	// move room pieces that can be moved
	for(let roomId = 0; roomId < 4; roomId++){
		let extraPrice = 0;
		const itemsInRoom = currWorldState.rooms[roomId].length;
		if(itemsInRoom === 0){
			continue; // The room is empty, nothing to move out
		}
		if(itemsInRoom === 1){
			if(correspondingRoomNumber[currWorldState.rooms[roomId][0]] === roomId){
				continue; // Item is in its final room
			}
			extraPrice++;
		}

		if(itemsInRoom === 2){ // Theres two items in the room
			if(correspondingRoomNumber[currWorldState.rooms[roomId][0]] === roomId &&
                correspondingRoomNumber[currWorldState.rooms[roomId][1]] === roomId){
				continue; // Both items in final place, dont move
			}
		}

		extraPrice++;

		let beforeMovePrice = extraPrice;

		const possibleNewPlacesAndPrice = [];

		// exploreLeft;
		let pos = hallEntranceOfRoom[roomId]-1;
		while(pos >= 0){
			if(currWorldState.hall[pos] === '.'){
				extraPrice++;
			} else {
				break;
			}
			possibleNewPlacesAndPrice.push([pos, extraPrice]);
			pos--;
		}

		extraPrice = beforeMovePrice;

		// exploreRight;
		pos = hallEntranceOfRoom[roomId]+1;
		while(pos <= 10){
			if(currWorldState.hall[pos] === '.'){
				extraPrice++;
			} else {
				break;
			}
			possibleNewPlacesAndPrice.push([pos, extraPrice]);
			pos++;
		}

		const validNewPlaces = possibleNewPlacesAndPrice.filter(place => ![2,4,6,8].includes(place[0]));
		validNewPlaces.forEach(validNewPlace => {
			const newState = structuredClone(currWorldState);
			const itemMoved = newState.rooms[roomId].shift();
			newState.hall[validNewPlace[0]] = itemMoved;
			const newPrice = currentPrice + (validNewPlace[1] * priceToMove[itemMoved]);
			const oldPriceOfNewState = bestPrice[JSON.stringify(newState)] || 999_999_999;
			if(newPrice < oldPriceOfNewState){
				bestPrice[JSON.stringify(newState)] = newPrice;
				queue.push(newState);
			}
		});
	}
}

console.log(Math.min(...winPrices));
