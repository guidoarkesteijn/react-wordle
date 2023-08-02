import { fireEvent, render } from "@testing-library/react";
import Keyboard from "./Keyboard";

describe('<Keyboard />', () => {
    test('Keyboard Mounts Properly', () => {
        const keys = new Map<string, string>();
        const keyPressed = (key : string) => {};
        const backspacePressed = () => {};
        const submitPressed = () => {};

        const wrapper = render(<Keyboard keys={keys} keyPressed={keyPressed} backspacePressed={backspacePressed} submitPressed={submitPressed}/>)

        const keyL = wrapper.container.querySelector('#l');
        expect(keyL).not.toBeNull();
        if(keyL !== null)
        {
            fireEvent.click(keyL);
        }
        const keyEnter = wrapper.container.querySelector('#Enter');
        expect(keyEnter).not.toBeNull();
        if(keyEnter != null)
        {
            fireEvent.click(keyEnter);
        }
        const keyBackspace = wrapper.container.querySelector('#Backspace');
        expect(keyBackspace).not.toBeNull();
        if(keyBackspace != null)
        {
            fireEvent.click(keyBackspace);
        }
    });
});