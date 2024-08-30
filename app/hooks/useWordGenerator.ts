import React, { SetStateAction, useEffect, useState } from "react"
import { fetchRandomAnimal, fetchRandomBook, fetchRandomCountry, fetchRandomMovie, fetchRandomSeries, fetchRandomSport } from "../lib/data";
import { v4 as uuidv4 } from 'uuid';


export type processedWord = {
  id: number,
  letter: string,
  seen: boolean
}
export type ITEMS = processedWord[]

type Returns = {
  selectedCategory: string;
  currentWord: ITEMS[] | null; //Come and correct this later
  setCurrentWord: React.Dispatch<SetStateAction<ITEMS[] | null >>;
  setSelectedCategory: React.Dispatch<SetStateAction<string>>
}


export default function useWordGenerator(reload: boolean): Returns {
  //This is used to get the category picked by the user from the url.
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  //The word that loads up when the game starts
  const [currentWord, setCurrentWord] = useState<ITEMS[]| null>(null)

  useEffect((): any => {
    let curr_word: string = "";

    if (selectedCategory == "movies") {
      curr_word = fetchRandomMovie()
    } else if (selectedCategory == "series") {
      curr_word = fetchRandomSeries()
    } else if (selectedCategory == "animals") {
      curr_word = fetchRandomAnimal()
    } else if (selectedCategory == "books") {
      curr_word = fetchRandomBook()
    } else if (selectedCategory == "sports") {
      curr_word = fetchRandomSport()
    } else {
      if (selectedCategory === "countries") {
        curr_word = fetchRandomCountry()
      }
    }

    if (curr_word) {
      let wordSegments = curr_word.split(" ")
      // let letterId = 0
      let processedWordArray:unknown = wordSegments.map(value => {
        if (value) {
          return value.split("").map(value => {
            return {
              id: uuidv4(),
              letter: value,
              seen: false
            }
          })
        }
      }) 
 
      setCurrentWord(processedWordArray as ITEMS[])
    }

    return () => curr_word = ""
  }, [selectedCategory, reload])
  return {
    selectedCategory,
    currentWord,
    setSelectedCategory,
    setCurrentWord
  }
}