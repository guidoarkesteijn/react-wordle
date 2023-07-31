import { State } from "../App";
import Key from "./Key";
import { render } from '@testing-library/react'

test('<Notification>', () => {
    const wrapper = render(<Key letter={'l'}state={State.Correct}/>)
});