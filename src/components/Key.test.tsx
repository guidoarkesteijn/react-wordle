import { State } from "../App";
import Key from "./Key";
import { render } from '@testing-library/react'

test('Key State Correct', () => {
    const wrapper = render(<Key letter={'l'} state={State.Correct}/>)
    const key = wrapper.container.firstElementChild;
    expect(key?.className).toContain(State.Correct);
});

test('Key State Location', () => {
    const wrapper = render(<Key letter={'l'} state={State.Location}/>)
    const key = wrapper.container.firstElementChild;
    expect(key?.className).toContain(State.Location);
});

test('Key State Wrong', () => {
    const wrapper = render(<Key letter={'l'} state={State.Wrong}/>)
    const key = wrapper.container.firstElementChild;
    expect(key?.className).toContain(State.Wrong);
});

test('Key State Active', () => {
    const wrapper = render(<Key letter={'l'} state={State.Active}/>)
    const key = wrapper.container.firstElementChild;
    expect(key?.className).toContain(State.Active);
});