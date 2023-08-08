import React from "react";
import Notifications, { NotificationData } from "./Notifications";
import Row from "./Row";
import { BoardData } from "../models/BoardData";
import { GuessData } from "../models/GuessData";

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