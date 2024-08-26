"use client"
import { ALPHABET } from "@/app/constants";
import { heart, menu } from "@/app/Utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import useGetWord from "../hooks/useGetWord";
import useLose from "../hooks/useLose";
import useWin from "../hooks/useWin";


const Game = ({ onOpen, reload, setReload }: any) => {
  const itemsRef: any = useRef([])
  const wordRef: any = useRef(null)
  const healthRef: any = useRef()
  const id: any = useRef(null)

  //The health score 
  const [life, setLife] = useState(0)
  const [win, setWin] = useState(false)
  //When a letter is found in the word picked.
  //This useeffect is for when the user wins

  const {
    category,
    word,
    setCategory,
  } = useGetWord(reload)

  useLose({ life, id, onOpen, itemsRef, getMap })
  useWin({ win, id, onOpen })


  useEffect(() => {
    let map = getMap()
    map.clear()
    itemsRef.current.map((value: HTMLButtonElement) => value.disabled = false)
    healthRef.current.classList.remove(`w-100`)
    onOpen(false)
    setWin(false)
    setLife(value => value = 0)
    setReload(false)
  }, [reload])


  //This is used to get the refs to the letters 
  function getMap() {
    if (!wordRef.current) {
      wordRef.current = new Map()
    }
    return wordRef.current
  }


  //This is to fetch random words
  function letterInWord(i: number, letter: string) {
    itemsRef.current[i].disabled = true
    //For the letter in the word display
    let counter = 0;
    let map = getMap()
    map.forEach((value: string, key: HTMLParagraphElement) => {
      //THE ERROR IS HERE!!!
      if (value == letter.toLowerCase()) {
        counter++;
        if (key) {
          key.classList.add("text-white")
          key.classList.add("opacity-[1]")
          map.delete(key)
        }
      }
    })

    if (map.size == 0) {
      setWin(true)
    }

    if (counter == 0) {
      healthRef.current.classList.remove(`w-[${life}]`)
      if (life == 0) {
        healthRef.current.classList.add(`w-20`)
      } else if (life == 20) {
        healthRef.current.classList.add(`w-40`)
        healthRef.current.classList.remove(`w-20`)
      } else if (life == 60) {
        healthRef.current.classList.add(`w-60`)
        healthRef.current.classList.remove(`w-40`)
      } else if (life == 80) {
        healthRef.current.classList.add(`w-80`)
        healthRef.current.classList.remove(`w-60`)
      } else if (life == 100) {
        healthRef.current.classList.add(`w-100`)
        healthRef.current.classList.remove(`w-80`)
      }
      setLife(value => value += 20)
    }
  }




  return (
    <main className="p-6 h-screen flex flex-col justify-between gap-y-[3rem] after:absolute after:left-0 after:right-0 after:top-0 after:bottom-0 after:bg-darkNavy *:z-50 after:opacity-70  md:pl-12 md:pr-12 lg:pl-16 lg:pr-16 xl:pr-24 xl:pl-24 lg:pt-14 pb-12 md:pb-0">
      {/* NAVBAR */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-10">
          <button className={`playbtn2 gradient flex items-center justify-center rounded-[100%] after:bg-gradient-to-b after:top-[35%] after:left-[50%] after:rounded-[100%] after:absolute after:translate-x-[-50%] after:translate-y-[-50%] relative shadow-1 `} onClick={() => onOpen((value: string) => "paused")}>
            <Image
              src={menu}
              className="z-50 w-[35px]"
              alt=""
            />
          </button>
          <h1 className="text-white font-main text-4xl lg:text-6xl capitalize">{category}</h1>
        </div>

        <div className="flex items-center gap-x-4">
          <div className="w-[60px] md:w-[170px] h-[16px] rounded-lg border-white bg-white border-[5px] relative">
            <div ref={healthRef} className="bg-darkNavy h-full w-0  rounded-md transition-all duration-1000"></div>
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

      {/* WORD BANKS */}
      <div className="flex h-[200px] justify-center flex-col lg:mr-[5rem] lg:ml-[5rem] lg:mt-[1rem]">
        <Suspense>
          <WordBank OnCategory={setCategory} word={word} win={win} life={life} getMap={getMap} reload={reload} />
        </Suspense>
      </div>

      {/* ALPHABET GRID */}
      <div className="grid grid-cols-9 ns:grid-cols-9  md:grid-cols gap-[0.3rem] md:gap-2 md:gap-y-4 xl:gap-x-4  gap-y-5 flex-wrap md:pb-10 place-content-center">
        {ALPHABET.map((value, i) => (
          <button
            type="button"
            key={value}
            ref={(el: HTMLButtonElement) => { itemsRef.current[i] = el }}
            onClick={() => letterInWord(i, value)}
            className="bg-white text-darkNavy font-main text-center md:rounded-[1.8rem] h-full text-3xl ns:text-4xl md:text-5xl lg:text-[3rem] pt-4 pb-4 xl:pb-3 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {value}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Game;





const WordBank = ({ OnCategory, getMap, win, life, word, reload }: any) => {
  const search = useSearchParams()
  let category = search.get("value")

  //I think I have to fix this.
  useEffect(() => {
    OnCategory(category)
  }, [category, OnCategory])

  let wordarr = word.split(" ")

  return (
    <div className="flex flex-wrap p-10 gap-y-2 place-content-center">
      {/**I NEED TO FIX THIS */}
      {wordarr?.map((value: string, i: number) => (
        <div key={i} className={`flex gap-x-2 ${life === 120 && 'animate-bounce'} ${(win) && 'animate-pulse'} ${reload && 'animate-none'}`}>

          {value.split('').map((letter, j) => (
            <p
              key={j}
              ref={(el: HTMLParagraphElement) => {
                const map = getMap()
                if (letter) {
                  if (el) {
                    map.set(el, letter)
                  }
                } else {
                  map.delete(el)
                }
              }}
              className={`font-main text-transparent uppercase flex-1  w-[10vw] lg:w-[9vw] xl:w-[7vw]  p-2 ns:p-3  md:p-4 md:pr-2 md:pl-2 lg:p- rounded-xl text-5xl bg-blue  border-darkNavy border-l-4 border-r-4 border-b-8 border-t-4 md:rounded-2xl border-inner-shadow lg:rounded-[2rem] xl:rounded-[2.5rem] opacity-50 xl:text-7xl flex items-center justify-center ${reload && ("text-transparent")} ${reload && "duration-0"}`}
            >
              {letter}
            </p>
          ))}

        </div>

      ))}
    </div>
  )
}


