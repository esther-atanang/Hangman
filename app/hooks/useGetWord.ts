import {useEffect, useState} from "react"
import { fetchRandomAnimal, fetchRandomBook, fetchRandomCountry, fetchRandomMovie, fetchRandomSeries, fetchRandomSport } from "../lib/data";

interface Returns{
  category: string;
  word: string;
  setWord: (s:string)=> void;
  setCategory: (s:string) => void;
}

export default function useGetWord(reload:boolean):Returns{
   //This is used to get the category picked by the user from the url.
    const[category,setCategory] = useState<string>("")
    //The word that loads up when the game starts
    const [word, setWord] = useState<string>("")

    useEffect(():any=> {
        let _word: string = "";

        if (category == "movies") {
          _word = fetchRandomMovie()
        } else if (category == "series") {
          _word = fetchRandomSeries()
        } else if (category == "animals") {
          _word = fetchRandomAnimal()
        } else if (category == "books") {
          _word = fetchRandomBook()
        } else if (category == "sports") {
          _word = fetchRandomSport()
        } else{
          if(category === "countries"){
            _word = fetchRandomCountry()
          }
        }

        if (_word) {
          setWord(_word as string)
        }

        return () => _word = ""
      }, [category, reload])
    return{
       category,
       word,
       setCategory,
       setWord
    }
}