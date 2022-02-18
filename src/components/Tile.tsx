import React from "react";

interface IProps {
    index : number;
    letter : string;
}

const Tile : React.FC<IProps> = (props : IProps) => {
    return <div className="tile"><div className="letter">{props.letter}</div></div>;
}

export default Tile;