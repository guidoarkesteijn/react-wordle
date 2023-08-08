import { LetterData } from "./LetterData";
import { State } from "./State";

export class GuessData {
    get word() : string {
      let word = "";
      for (let index = 0; index < this.letters.length; index++) {
        const element = this.letters[index];
        word += element.letter;
      }
      return word;
    }
  
    index : number;
    letters : LetterData[] = [];
    
    constructor(index : number, word? : string, letters? : LetterData[]){
      this.index = index;
  
      this.letters.push(new LetterData(0, "", State.Unknown));
      this.letters.push(new LetterData(1, "", State.Unknown));
      this.letters.push(new LetterData(2, "", State.Unknown));
      this.letters.push(new LetterData(3, "", State.Unknown));
      this.letters.push(new LetterData(4, "", State.Unknown));
  
      if(word !== undefined)
      {
        for (let index = 0; index < word.length; index++) {
          const letter = word[index];
          if(letters !== undefined && index < letters.length)
          {
            this.letters[index] = letters[index];
          }
          else if(letter !== "")
          {
            this.letters[index] = new LetterData(index, letter,  State.Active);
          }
        }
      }
    }
  }
  