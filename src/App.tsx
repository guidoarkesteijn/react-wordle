import { useRef, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import { NotificationData, NotificationType } from './components/Notifications';
import { BoardData } from './models/BoardData';
import { GuessData } from './models/GuessData';
import { useGameData } from './hooks/useGameData';
import { useKeys } from './hooks/useKeys';

function App() {
  const { answer, board, setBoard } = useGameData();
  const { keys, setKeys } = useKeys();
  const [ notifications, setNotifications ] = useState<NotificationData[]>([]);
  const [ interactable, setInteraction ] = useState(true);

  board.update = onUpdate;
  board.wrong = onWrong;

  function onWrong() {
    const _list = notifications.slice();
    _list.push( new NotificationData("Woord niet lang genoeg.", NotificationType.Error));
    setNotifications(_list);
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
    setKeys(data);

    if(data.correct){
      let _list : NotificationData[] = [];
      _list.push(new NotificationData("Gewonnen!", NotificationType.Success));
      setNotifications(_list);
      return;
    }
    if(data.gameover) {
      let _list : NotificationData[] = [];
      _list.push(new NotificationData("Verloren!\nAntwoord: " + answer, NotificationType.Error));
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

  function onUpdate(guess : GuessData)
  {
    let guesses = board.guesses;
    const current = board.index;
    guesses[guess.index] = guess;
    let newBoard : BoardData = new BoardData(answer, -1, current, guesses);
    setBoard(newBoard);
  }
  function deleteNotification(index : number){
    let nots : NotificationData[] = notifications.slice();
    nots.splice(index, 1);
    setNotifications(nots);
  }


  return (
    <div className="container">
      <Header />
      <Board board={board} notifications={notifications} deleteNotification={deleteNotification} />
      <Keyboard keys={keys.current} keyPressed={keyPressed} backspacePressed={backspacePressed} submitPressed={submit} />
    </div>
  );
}

export default App;
