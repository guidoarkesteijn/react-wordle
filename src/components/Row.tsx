import React from "react";
import Tile from "./Tile";
import { LetterData } from "../models/LetterData";
import { GuessData } from "../models/GuessData";

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