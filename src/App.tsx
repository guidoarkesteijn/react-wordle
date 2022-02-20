import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import { NotificationData, NotificationType } from './components/Notifications';
import dictionary from './words.json';

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
  
  public submit() : {correct : boolean, gameover : boolean, unknown : boolean, letters? : LetterData[]} {
    if(this.current.word.length < 5)
    {
      let correct : boolean = false;
      let gameover : boolean = false;
      let unknown : boolean = false;
      console.log("Too short");
      this.trySendWrong();
      return {correct, gameover, unknown};
    }
    else if(dictionary.all_words.indexOf(this.current.word) == -1){
      //not known.
      let correct : boolean = false;
      let gameover : boolean = false;
      let unknown : boolean = true;
      return {correct, gameover, unknown};
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

    return {correct, gameover, unknown, letters};
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
const answer : string = dictionary.puzzle_words[Math.floor(Math.random() * dictionary.puzzle_words.length)]
  
function App() {
  const [board, setBoard] = useState<BoardData>(new BoardData(answer, 6, 0));
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [interactable, setInteraction] = useState(true);

  board.update = update;
  board.wrong = wrong;

  function wrong() {
    const _list = notifications.slice();
    _list.push( new NotificationData("Woord niet lang genoeg.", NotificationType.Error));
    setNotifications(_list);
  }

  function deleteNotification(index : number){
    let nots : NotificationData[] = notifications.slice();
    nots.splice(index, 1);
    setNotifications(nots);
  }

  function keyPressed(key : string){
    if(!interactable)
    {
      return;
    }

    board.keyPressed(key);
  }

  function backspacePressed() {
    if(!interactable)
    {
      return;
    }

    board.backspacePressed();
  }

  function submit() {
    if(!interactable)
    {
      return;
    }
    
    setInteraction(false);
    const data = board.submit();
    if(data.correct){
      let _list : NotificationData[] = [];
      _list.push(new NotificationData("Gewonnen!", NotificationType.Success));
      setNotifications(_list);
      return;
    }
    if(data.gameover) {
      let _list : NotificationData[] = [];
      _list.push(new NotificationData("Verloren! \nAntwoord: " + answer, NotificationType.Error));
      setNotifications(_list);
      return;
    }
    if(data.unknown) {
      let _list : NotificationData[] = [];
      _list.push(new NotificationData("Woord niet bekend.", NotificationType.Error));
      setNotifications(_list); 
    }

    setInteraction(true);
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
      <Board board={board} notifications={notifications} deleteNotification={deleteNotification} />
      <Keyboard keyPressed={keyPressed} backspacePressed={backspacePressed} submitPressed={submit} />
    </div>
  );
}

export default App;
