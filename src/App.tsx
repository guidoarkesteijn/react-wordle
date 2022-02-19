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

export class GuessData {
  index : number;
  word : string;
  
  constructor(index : number, word? : string){
    this.index = index;
    this.word = word !== undefined ? word : "";
  }

  public updateWord(word : string) {
    this.word = word;
  }
}

export class BoardData {
  guesses : GuessData[] = [];
  index : number = 0;
  update : ((guess : GuessData) => void) | null = null;
  
  get current() : GuessData {
    return  this.guesses[this.index];
  }

  constructor(tries : number, guesses? : GuessData[]) {
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
      this.current.word += key;
      let newGuess = new GuessData(this.current.index, this.current.word);
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
  
  public submit() {
    if(this.current.word.length < 5)
    {
      console.log("Too short");
      return;
    }
    console.log("Submit");
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
  const [board, setBoard] = useState<BoardData>(new BoardData(6));

  board.update = update;

  function keyPressed(key : string){
    board.keyPressed(key);
  }

  function backspacePressed() {
    board.backspacePressed();
  }

  function submit() {
    board.submit();
  }

  function update(guess : GuessData)
  {
    let guesses = board.guesses;
    guesses[guess.index] = guess;
    let newBoard : BoardData = new BoardData(-1, guesses);
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
