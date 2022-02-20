import React from "react";
import { BoardData, GuessData } from "../App";
import Notifications, { NotificationData } from "./Notifications";
import Row from "./Row";

interface IProps {
    board : BoardData;
    notifications : NotificationData[];
    deleteNotification : (index : number) => void;
}

const Board : React.FC<IProps> = ({board, notifications, deleteNotification}) => {
    return <section>
        {board.guesses.map(function (value : GuessData, index : number) {
            return <Row key={index} guess={value}/>
        })}
        <Notifications notifications={notifications} deleteNotification={deleteNotification}/>
    </section>
}

export default Board;