import React from "react";
import Key from "./Key";

interface IProps{
    keys : Map<string,string>;
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
        else if(event.key.match(/[a-z,A-Z]/) && event.key.length === 1)
        {
            this.props.keyPressed(event.key);
        }
    };

    render() {
        return <div className="keyboard">
            <div className="keyboard-row">
                <Key color={this.props.keys.get("q")} letter="q" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("w")} letter="w" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("e")} letter="e" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("r")} letter="r" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("t")} letter="t" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("y")} letter="y" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("u")} letter="u" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("i")} letter="i" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("o")} letter="o" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("p")} letter="p" keyPressed={this.props.keyPressed}/>
            </div>
            <div className="keyboard-row">
                <Key color={this.props.keys.get("a")} letter="a" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("s")} letter="s" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("d")} letter="d" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("f")} letter="f" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("g")} letter="g" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("h")} letter="h" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("j")} letter="j" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("k")} letter="k" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("l")} letter="l" keyPressed={this.props.keyPressed}/>
            </div>
            <div className="keyboard-row">
                <Key letter="<-" backspacePressed={this.props.backspacePressed}/>
                <Key color={this.props.keys.get("z")} letter="z" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("x")} letter="x" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("c")} letter="c" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("v")} letter="v" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("b")} letter="b" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("n")} letter="n" keyPressed={this.props.keyPressed}/>
                <Key color={this.props.keys.get("m")} letter="m" keyPressed={this.props.keyPressed}/>
                <Key letter="Enter" submitPressed={this.props.submitPressed}/>
            </div>
        </div>
    }
}

export default Keyboard;