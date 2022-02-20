import React, { Dispatch, SetStateAction } from "react";
import Key from "./Key";

interface IProps{
    keyPressed : (key : string) => void;
    backspacePressed : () => void;
    submitPressed : () => void;
}

class Keyboard extends React.Component<IProps> {
    componentDidMount() : void {
        document.addEventListener<'keydown'>('keydown', this.onHandleKeyDown);
    }
    componentWillUnmount() : void {
        document.removeEventListener<'keydown'>('keydown', this.onHandleKeyDown);
    }

    onHandleKeyDown = (event: globalThis.KeyboardEvent) => {
        console.log("Pressed:" + event.key);
        if(event.key === 'Backspace')
        {
            this.props.backspacePressed();
        }
        else if(event.key === 'Enter')
        {
            this.props.submitPressed();
        }
        else if(event.key.match(/[a-z,A-Z]/) && event.key.length == 1)
        {
            this.props.keyPressed(event.key);
        }
    };

    render() {
        return <div className="keyboard">
            <div className="keyboard-row">
                <Key letter="Q" keyPressed={this.props.keyPressed}/>
                <Key letter="W" keyPressed={this.props.keyPressed}/>
                <Key letter="E" keyPressed={this.props.keyPressed}/>
                <Key letter="R" keyPressed={this.props.keyPressed}/>
                <Key letter="T" keyPressed={this.props.keyPressed}/>
                <Key letter="Y" keyPressed={this.props.keyPressed}/>
                <Key letter="U" keyPressed={this.props.keyPressed}/>
                <Key letter="I" keyPressed={this.props.keyPressed}/>
                <Key letter="O" keyPressed={this.props.keyPressed}/>
                <Key letter="P" keyPressed={this.props.keyPressed}/>
            </div>
            <div className="keyboard-row">
                <Key letter="A" keyPressed={this.props.keyPressed}/>
                <Key letter="S" keyPressed={this.props.keyPressed}/>
                <Key letter="D" keyPressed={this.props.keyPressed}/>
                <Key letter="F" keyPressed={this.props.keyPressed}/>
                <Key letter="G" keyPressed={this.props.keyPressed}/>
                <Key letter="H" keyPressed={this.props.keyPressed}/>
                <Key letter="J" keyPressed={this.props.keyPressed}/>
                <Key letter="K" keyPressed={this.props.keyPressed}/>
                <Key letter="L" keyPressed={this.props.keyPressed}/>
            </div>
            <div className="keyboard-row">
                <Key letter="<-" backspacePressed={this.props.backspacePressed}/>
                <Key letter="Z" keyPressed={this.props.keyPressed}/>
                <Key letter="X" keyPressed={this.props.keyPressed}/>
                <Key letter="C" keyPressed={this.props.keyPressed}/>
                <Key letter="V" keyPressed={this.props.keyPressed}/>
                <Key letter="B" keyPressed={this.props.keyPressed}/>
                <Key letter="N" keyPressed={this.props.keyPressed}/>
                <Key letter="M" keyPressed={this.props.keyPressed}/>
                <Key letter="Enter" submitPressed={this.props.submitPressed}/>
            </div>
        </div>
    }
}

export default Keyboard;