import { GuessData } from "./GuessData";
import { LetterData } from "./LetterData";
import { ResultData } from "./ResultData";
import { State } from "./State";
import dictionary from '../words.json';

export class BoardData {
  guesses : GuessData[] = [];
  index : number;
  update : ((guess : GuessData) => void) | null = null;
  wrong : (() => void) | null = null;
  answer : string;

  get current() : GuessData {
    return  this.guesses[this.index];
  }

  constructor(answer : string, tries : number, index : number, guesses? : GuessData[]) {
    this.index = index;
    this.answer = answer;
    if(guesses !== undefined) {
      this.guesses = guesses;
      return;
    }
    for (let index = 0; index < tries; index++) {
      this.guesses.push(new GuessData(index));
    };
  }

  public keyPressed(key : string) {
    if(this.current.word.length < 5)
    {
      let newWord = this.current.word + key.toLowerCase();
      let newGuess = new GuessData(this.current.index, newWord);
      this.trySendUpdate(newGuess);
    }
  }

  public backspacePressed() {
    if(this.current.word.length > 0)
    {
        let newWord = this.current.word.substring(0, this.current.word.length - 1);
        let guess : GuessData = new GuessData(this.current.index, newWord);
        this.trySendUpdate(guess);
    }
  }
  
  public submit() : ResultData {
    if(this.current.word.length < 5)
    {
      let correct : boolean = false;
      let gameover : boolean = false;
      let unknown : boolean = false;
      console.log("Too short");
      this.trySendWrong();
      return new ResultData(correct, gameover, unknown);
    }
    else if(dictionary.all_words.indexOf(this.current.word) === -1){
      //not known.
      let correct : boolean = false;
      let gameover : boolean = false;
      let unknown : boolean = true;
      return new ResultData(correct, gameover, unknown);
    }

    console.log("Submit");

    const data = this.checkWord(this.answer, this.current.word);
    const guessData = new GuessData(this.index, this.current.word, data.letters);

    if(!data.correct)
    {
      this.index++;
    }
    this.trySendUpdate(guessData);

    const correct = data.correct;
    const letters = data.letters;
    const gameover = this.index > 5;
    const unknown = false;

    return new ResultData(correct, gameover, unknown, letters);
  }

  checkWord(answer : string, word : string) : {correct : boolean, letters : LetterData[]} {
    let correct = true;
    let letters : LetterData[] = [];
    let indexes : number[] = [];

    for (let index = 0; index < word.length; index++) {
      if(answer[index] === word[index])
      {
        letters[index] = new LetterData(index, word[index], State.Correct);
        indexes.push(index);
      }
    }

    let rest = "";
    for (let index = 0; index < answer.length; index++) {
      if(!indexes.includes(index))
      {
        rest += answer[index];
      }
    }

    for (let index = 0; index < word.length; index++) {
      if(indexes.includes(index)) {
        continue;
      }
      const location = rest.indexOf(word[index]);
      if(location > -1)
      {
        rest = rest.replace(word[index], "");
        correct = false;
        letters[index] = new LetterData(index, word[index], State.Location);
      }
      else
      {
        correct = false;
        letters[index] = new LetterData(index, word[index], State.Wrong);
      }
    }

    return {correct, letters};
  }

  trySendUpdate(current : GuessData) {
    if(this.update !== null){
      this.update(current);
    }
  }
  
  trySendWrong() {
    if(this.wrong !== null){
      this.wrong();
    }
  }
}