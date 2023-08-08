import { BoardData } from "./BoardData";
import { GuessData } from "./GuessData";
import { LetterData } from "./LetterData";
import { State } from "./State";

test('Wrong Letter - submit', () => {
    const guesses : GuessData[] = [];
    const letters : LetterData[] = [];

    letters.push(new LetterData(0, 'b', State.Correct))
    letters.push(new LetterData(0, 'a', State.Correct))
    letters.push(new LetterData(0, 'a', State.Correct))
    letters.push(new LetterData(0, 'r', State.Location))
    letters.push(new LetterData(0, 'd', State.Location))

    guesses.push(new GuessData(0, 'baard', letters));

    const board : BoardData = new BoardData('paard', 0, 0, guesses);
    board.submit();
});

test('Location Letter - submit', () => {
    const guesses : GuessData[] = [];
    const letters : LetterData[] = [];

    letters.push(new LetterData(0, 'a', State.Correct))
    letters.push(new LetterData(0, 'a', State.Correct))
    letters.push(new LetterData(0, 'p', State.Correct))
    letters.push(new LetterData(0, 'j', State.Location))
    letters.push(new LetterData(0, 'e', State.Location))

    guesses.push(new GuessData(0, 'aapje', letters));

    const board : BoardData = new BoardData('paard', 0, 0, guesses);
    board.submit();
});

test('Unknown Word - Submit', () => {
    const guesses : GuessData[] = [];
    const letters : LetterData[] = [];

    letters.push(new LetterData(0, 'b', State.Correct))
    letters.push(new LetterData(0, 'r', State.Correct))
    letters.push(new LetterData(0, 'r', State.Correct))
    letters.push(new LetterData(0, 'r', State.Location))
    letters.push(new LetterData(0, 'd', State.Location))

    guesses.push(new GuessData(0, 'brrrd', letters));

    const board : BoardData = new BoardData('paard', 0, 0, guesses);
    board.submit();
});