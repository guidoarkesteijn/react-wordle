import React, { useState } from "react";
import { BoardData, GuessData } from "../App";
import Row from "./Row";

interface IProps {
    board : BoardData;
}

const Board : React.FC<IProps> = ({board}) => {
    return <section>
        {board.guesses.map(function (value : GuessData, index : number) {
            return <Row key={index} index={index} word={value.word}/>
        })}
    </section>
}

export default Board;