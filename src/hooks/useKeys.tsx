import { useRef } from "react";
import { ResultData } from "../models/ResultData";

export function useKeys() {
    const keys = useRef(new Map<string,string>());

    function setKeys(data: ResultData)
    {
      if(data.letters !== undefined)
      {
        for (let index = 0; index < data.letters.length; index++) {
          const element = data.letters[index];
          const current = keys.current.get(element.letter);
  
          if(current !== undefined && (current === "correct"))
          {
            continue;
          }
  
          if(current !== undefined && current === "location" && element.state !== "correct")
          {
            continue;
          }
  
          keys.current.set(element.letter, element.state);
        }
      }
    }

    return { keys, setKeys };
}