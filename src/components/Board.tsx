import React from "react";
import { GuessData, IBoardData } from "../App";
import Row from "./Row";

const Board : React.FC<IBoardData> = ({guesses}) => {
    return <section>
        {guesses.map(function (value : GuessData, index : number) {
            return <Row key={index} index={index} word={value.word}/>
        })}
    </section>
}

export default Board;