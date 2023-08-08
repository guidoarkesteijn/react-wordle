import { useState } from "react";
import dictionary from '../words.json';
import { BoardData } from "../models/BoardData";

export function useGameData() {
    const [answer] = useState<string>(dictionary.puzzle_words[Math.floor(Math.random() * dictionary.puzzle_words.length)])
    const [board, setBoard] = useState<BoardData>(new BoardData(answer, 6, 0));

    return {answer, board, setBoard};
}