import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
//import { BoardData } from './Wordle';

export enum State {
  Unknown = 0,
  Wrong = 1,
  Guess = 2,
  Correct = 3
}

export class GuessData {
  word : string;
  state : State;
  
  constructor(){
      this.word = "";
      this.state = State.Unknown;
  }
}

export interface IBoardData {
  guesses : GuessData[];
}

export class BoardData implements IBoardData {
  guesses : GuessData[] = [];
  index : number = 0;

  constructor() {    
    this.guesses.push(new GuessData());
    this.guesses.push(new GuessData());
    this.guesses.push(new GuessData());
    this.guesses.push(new GuessData());
    this.guesses.push(new GuessData());
    this.guesses.push(new GuessData());
  }
}

function App() {
  const [word, setWord] = useState("");
  const [board, setBoard] = useState<IBoardData>(new BoardData());

  return (
    <div className="container">
      <Header />
      <Board guesses={board.guesses}/>
      <Keyboard/>
    </div>
  );
}

export default App;
