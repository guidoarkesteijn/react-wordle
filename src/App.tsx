import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
//import { BoardData } from './Wordle';

export enum State {
  Unknown = "",
  Active = "active",
  Wrong = "wrong",
  Location = "location",
  Correct = "correct"
}

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
        let state = State.Unknown;
        if(letters !== undefined && index < letters.length)
        {
          this.letters[index] = letters[index];
        }
        else if(letter !== "")
        {
          state = State.Active;
          this.letters[index] = new LetterData(index, letter, state);
        }
      }
    }
  }

  getState(index : number) : State {
    return this.letters[index].state;
  }
}

export class BoardData {
  guesses : GuessData[] = [];
  index : number;
  update : ((guess : GuessData) => void) | null = null;
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
      this.trySend(newGuess);
    }
  }

  public backspacePressed() {
    if(this.current.word.length > 0)
    {
        let newWord = this.current.word.substring(0, this.current.word.length - 1);
        let guess : GuessData = new GuessData(this.current.index, newWord);
        this.trySend(guess);
    }
  }
  
  public submit() : {correct : boolean, letters? : LetterData[]} {
    if(this.current.word.length < 5)
    {
      let correct : boolean = false;
      console.log("Too short");
      return {correct};
    }

    console.log("Submit");

    const data = this.checkWord(this.answer, this.current.word);
    const guessData = new GuessData(this.index, this.current.word, data.letters);

    if(!data.correct)
    {
      this.index++;
    }
    this.trySend(guessData);

    return data;
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

  getGuess() : GuessData {
    return this.guesses[this.index];
  }

  trySend(current : GuessData) {
    if(this.update !== null){
      this.update(current);
    }
  }
}

function App() {
  const answer : string = "gggdo";
  const [board, setBoard] = useState<BoardData>(new BoardData(answer, 6, 0));

  board.update = update;

  function keyPressed(key : string){
    board.keyPressed(key);
  }

  function backspacePressed() {
    board.backspacePressed();
  }

  function submit() {
    const data = board.submit();
    if(data.correct){
      console.log("WIN");
    }
  }

  function update(guess : GuessData)
  {
    let guesses = board.guesses;
    const current = board.index;
    guesses[guess.index] = guess;
    let newBoard : BoardData = new BoardData(answer, -1, current, guesses);
    setBoard(newBoard);
  }

  return (
    <div className="container">
      <Header />
      <Board board={board}/>
      <Keyboard keyPressed={keyPressed} backspacePressed={backspacePressed} submitPressed={submit} />
    </div>
  );
}

export default App;
