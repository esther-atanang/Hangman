"use client"
import { ALPHABET } from "@/app/constants";
import { heart, menu } from "@/app/Utils";
import Image from "next/image";
import React, { SetStateAction, Suspense, useEffect, useMemo, useRef, useState } from "react";
import useWordGenerator, { ITEMS, processedWord } from "../hooks/useWordGenerator";
import WordDisplay from "../ui/wordDisplay";


type popUpParameters = ""|"paused"|"You Win"|"You Lose"
const Game = ({
  onPopUp,
  reload,
  setReload
}:
  {
    onPopUp: (type:popUpParameters) => void,
    reload: boolean,
    setReload: React.Dispatch<SetStateAction<boolean>>
  }) => {
  const buttonRef = useRef<HTMLButtonElement[]>([])
  const id = useRef<NodeJS.Timeout | null>(null)
  const healthRef = useRef(null)

  const [playerHealth, setPlayerHealth] = useState(0)
  const [hasWon, setHasWon] = useState(false)
  const [hasLost, setHasLost] = useState(false)

  const {
    selectedCategory,
    currentWord,
    setSelectedCategory,
    setCurrentWord,
  } = useWordGenerator(reload)


  //If Player Loses 
  useEffect(():()=>void => {
    if (playerHealth == 100 && !hasWon) {
      setHasLost(true)
      let updatedState: unknown = currentWord?.map((value: processedWord[]) => {
        return value.map((item: processedWord) => {
          return {
            ...item,
            seen: true
          }
        })
      })

      setCurrentWord(updatedState as ITEMS[])
      id.current = setTimeout(() => onPopUp("You Lose"), 2000)
    }
    return () => id.current && clearTimeout(id.current as NodeJS.Timeout)
  }, [playerHealth])

  //If player Wins
  useEffect(() => {
    let hasWon: boolean = false;
    if (currentWord?.length !== 0) {
      hasWon = currentWord?.every((value: processedWord[]) => {
        return value.every((item: processedWord) => item.seen)
      }) as boolean
    }

    if (hasWon && !hasLost) {
      setHasWon(hasWon)
      onPopUp("You Win")
    }
    return () => { hasWon = false }
  }, [currentWord, hasLost,hasWon])


  //If a reload is requested.
  useEffect(() => {
    if (reload) {
      buttonRef.current.map((value: HTMLButtonElement) => value.disabled = false)
      onPopUp("")
      setHasWon(false)
      setHasLost(false)
      setPlayerHealth(0)
      setReload(false)
    }
  }, [reload, selectedCategory])

  //This works when a letter is picked
  function handleLetterSelection(i: number, letter: string) {
    buttonRef.current[i].disabled = true
    let matchCount = 0;
    let updatedWordState: unknown = currentWord?.map((value: processedWord[]) => {
      return value.map((item: processedWord) => {
        if (item.letter === letter.toLowerCase()) {
          matchCount++
          return {
            ...item,
            seen: true,
          }
        }
        return item
      })
    })

    setCurrentWord(updatedWordState as ITEMS[])

    //If player Picks the wrong letter 
    if (matchCount == 0 && playerHealth !== 100) {
      setPlayerHealth(value => value += 20)
    }
  }



  return (
    <main
      className="p-6 h-screen flex flex-col justify-between gap-y-[3rem] after:absolute after:left-0 after:right-0 after:top-0 after:bottom-0 after:bg-darkNavy *:z-50 after:opacity-70  md:pl-12 md:pr-12 lg:pl-16 lg:pr-16 xl:pr-24 xl:pl-24 lg:pt-14 pb-12 md:pb-0"
    >
      {/*top Navigation*/}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-6">
          <button
            className={`playbtn2 gradient flex items-center justify-center rounded-[100%] after:bg-gradient-to-b after:top-[35%] after:left-[50%] after:rounded-[100%] after:absolute after:translate-x-[-50%] after:translate-y-[-50%] relative shadow-1 `}
            onClick={() => onPopUp("paused")}
            type="button"
          >
            <Image
              src={menu}
              className="z-50 w-[25px]"
              alt=""
            />
          </button>
          <h1 className="text-white font-main text-4xl lg:text-6xl capitalize">{selectedCategory}</h1>
        </div>

        <div className="flex items-center gap-x-4">
          <div className="w-[60px] md:w-[170px] h-[16px] rounded-lg border-white bg-white border-[5px] relative">
            <div ref={healthRef} className={`bg-darkNavy h-full w-0 ${playerHealth == 20 && "w-20"} ${playerHealth == 40 && "w-40"} ${playerHealth == 60 && "w-60"} ${playerHealth == 80 && "w-80"} ${playerHealth == 100 && "w-100"} rounded-md transition-all duration-1000`}></div>
          </div>
          <div className="animate-pulse">
            <Image
              src={heart}
              className="w-[2.5rem]"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Word Display */}
      <div>
        <Suspense>
          <WordDisplay
            currentWord={currentWord}
            hasLost={hasLost}
            onSelectedCategory={setSelectedCategory}
          />
        </Suspense>
      </div>

      {/* Button grid. */}
      <div className="grid grid-cols-9 ns:grid-cols-9  md:grid-cols gap-[0.3rem] md:gap-2 md:gap-y-4 xl:gap-x-4  gap-y-5 flex-wrap md:pb-10 place-content-center">
        {ALPHABET.map((value, i) => (
          <button
            type="button"
            key={value}
            ref={(el: HTMLButtonElement) => { buttonRef.current[i] = el }}
            onClick={() => handleLetterSelection(i, value)}
            className="bg-white text-darkNavy font-main text-center md:rounded-[1.8rem] h-full text-3xl ns:text-4xl md:text-5xl lg:text-[2.7rem] pt-3 pb-4 xl:pb-3 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed border-darkNavy border-b-4 active:border-b-0 "
          >
            {value}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Game;





