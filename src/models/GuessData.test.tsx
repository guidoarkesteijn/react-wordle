import { GuessData } from "./GuessData";
import { LetterData } from "./LetterData";
import { State } from "./State";

test('Guess ', () => {
    const letters : LetterData[] = [];
    letters.push(new LetterData(0, 'h', State.Location));

    new GuessData(0, 'hello', letters);
});