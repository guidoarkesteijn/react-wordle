import React from "react";
import { State } from "../App";

interface IProps {
    index : number;
    letter : string;
    state : State;
}

const Tile : React.FC<IProps> = (props : IProps) => {
    return <div className={"tile " + props.state}><div className="letter">{props.letter}</div></div>;
}

export default Tile;