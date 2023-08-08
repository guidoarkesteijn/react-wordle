import { BoardData } from "./BoardData";
import { GuessData } from "./GuessData";
import { LetterData } from "./LetterData";
import { State } from "./State";

test('Too short - submit', () => {
    const guesses : GuessData[] = [];
    const letters : LetterData[] = [];

    letters.push(new LetterData(0, 'b', State.Correct))
    letters.push(new LetterData(1, 'a', State.Correct))

    guesses.push(new GuessData(0, 'ba', letters));

    const board : BoardData = new BoardData('paard', 0, 0, guesses);
    board.submit();
});

test('Wrong Letter - submit', () => {
    const guesses : GuessData[] = [];
    const letters : LetterData[] = [];

    letters.push(new LetterData(0, 'b', State.Correct))
    letters.push(new LetterData(1, 'a', State.Correct))
    letters.push(new LetterData(2, 'a', State.Correct))
    letters.push(new LetterData(3, 'r', State.Location))
    letters.push(new LetterData(4, 'd', State.Location))

    guesses.push(new GuessData(0, 'baard', letters));

    const board : BoardData = new BoardData('paard', 0, 0, guesses);
    board.submit();
});

test('Location Letter - submit', () => {
    const guesses : GuessData[] = [];
    const letters : LetterData[] = [];

    letters.push(new LetterData(0, 'a', State.Correct))
    letters.push(new LetterData(1, 'a', State.Correct))
    letters.push(new LetterData(2, 'p', State.Correct))
    letters.push(new LetterData(3, 'j', State.Location))
    letters.push(new LetterData(4, 'e', State.Location))

    guesses.push(new GuessData(0, 'aapje', letters));

    const board : BoardData = new BoardData('paard', 0, 0, guesses);
    board.submit();
});

test('Unknown Word - Submit', () => {
    const guesses : GuessData[] = [];
    const letters : LetterData[] = [];

    letters.push(new LetterData(0, 'b', State.Correct))
    letters.push(new LetterData(1, 'r', State.Correct))
    letters.push(new LetterData(2, 'r', State.Correct))
    letters.push(new LetterData(3, 'r', State.Location))
    letters.push(new LetterData(4, 'd', State.Location))

    guesses.push(new GuessData(0, 'brrrd', letters));

    const board : BoardData = new BoardData('paard', 0, 0, guesses);
    board.submit();
});