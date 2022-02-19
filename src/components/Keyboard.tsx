import React, { Dispatch, SetStateAction } from "react";
import Key from "./Key";

interface IProps{
    keyPressed : (key : string) => void;
    backspacePressed : () => void;
    submit : () => void;
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
            this.props.submit();
        }
        else if(event.key.match(/[a-z]/) && event.key.length == 1)
        {
            this.props.keyPressed(event.key);
        }
    };

    render(): React.ReactNode {
        return <Key />
    }
}

export default Keyboard;