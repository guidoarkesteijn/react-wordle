import React from "react";

interface IProps {
    letter : string;
    keyPressed? : (key : string) => void;
    backspacePressed? : () => void;
    submitPressed? : () => void;
}

class Key extends React.Component<IProps> {
    constructor(props : IProps) {
        super(props);
        this.onHandleKeyDown = this.onHandleKeyDown.bind(this);
    }

    onHandleKeyDown() {
        if(this.props.keyPressed !== undefined)
        {
            this.props.keyPressed(this.props.letter)
        }
        else if(this.props.submitPressed !== undefined)
        {
            this.props.submitPressed();
        }
        else if(this.props.backspacePressed !== undefined)
        {
            this.props.backspacePressed();
        }
    }

    render() {
        let className = "key";
        if(this.props.backspacePressed !== undefined || this.props.submitPressed !== undefined)
        {
            className += " key-big";
        }

        return <div className={className} onClick={this.onHandleKeyDown}>{this.props.letter}</div>
    }
}

export default Key;