import { State } from "./State";

export class LetterData {
    index : number;
    letter : string;
    state : State;
  
    constructor(index : number, letter : string, state : State) {
      this.index = index;  
      this.letter = letter;
      this.state = state;
    }
  }
