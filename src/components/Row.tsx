import React from "react";
import { State } from "../App";
import Tile from "./Tile";

interface IProps {
    word : string;
    index : number;
}

const Row : React.FC<IProps> = (props : IProps) => {
    return <div className="row">
        <Tile key={"element-1"} index={0} letter={props.word.length > 0 ? props.word[0] : ""} state={State.Unknown}></Tile>
        <Tile key={"element-2"} index={1} letter={props.word.length > 1 ? props.word[1] : ""} state={State.Active}></Tile>
        <Tile key={"element-3"} index={2} letter={props.word.length > 2 ? props.word[2] : ""} state={State.Wrong}></Tile>
        <Tile key={"element-4"} index={3} letter={props.word.length > 3 ? props.word[3] : ""} state={State.Location}></Tile>
        <Tile key={"element-5"} index={4} letter={props.word.length > 4 ? props.word[4] : ""} state={State.Correct}></Tile>
    </div>;
}

export default Row;