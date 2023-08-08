import { LetterData } from "./LetterData";

export class ResultData {
    correct : boolean;
    gameover : boolean;
    unknown : boolean;
    letters? : LetterData[];
  
    constructor(correct : boolean, gameover : boolean, unknown : boolean, letters? : LetterData[]) {
      this.correct = correct;  
      this.gameover = gameover;
      this.unknown = unknown;
      this.letters = letters;
    }
  }