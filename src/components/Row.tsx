import React from "react";
import Tile from "./Tile";

interface IProps {
    word : string;
    index : number;
}

const Row : React.FC<IProps> = (props : IProps) => {
    return <div className="row">
        <Tile key={"element-1"} index={0} letter={props.word.length > 0 ? props.word[0] : ""}></Tile>
        <Tile key={"element-2"} index={1} letter={props.word.length > 1 ? props.word[1] : ""}></Tile>
        <Tile key={"element-3"} index={2} letter={props.word.length > 2 ? props.word[2] : ""}></Tile>
        <Tile key={"element-4"} index={3} letter={props.word.length > 3 ? props.word[3] : ""}></Tile>
        <Tile key={"element-5"} index={4} letter={props.word.length > 4 ? props.word[4] : ""}></Tile>
    </div>;
}

export default Row;