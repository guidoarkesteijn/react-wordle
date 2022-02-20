import React from "react";
import { GuessData, LetterData } from "../App";
import Tile from "./Tile";

interface IProps {
    guess : GuessData;
}

const Row : React.FC<IProps> = (props : IProps) => {
    return <div className="row">
        {props.guess.letters.map(function (value : LetterData, index : number) {
            return <Tile key={"element-" + index} index={index} letter={value.letter} state={value.state}></Tile>
        })}
    </div>;
}

export default Row;