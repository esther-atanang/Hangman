"use client"
import PlayButton from "@/app/ui/PlayButton";
import { ALPHABET } from "@/app/constants";
import { heart, menu } from "@/app/Utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { fetchRandomAnimal, fetchRandomBook, fetchRandomCountry, fetchRandomMovie, fetchRandomSeries, fetchRandomSport } from "../lib/data";
import { Suspense, useEffect, useRef, useState } from "react";

const Game = ({ onOpen }: any) => {
  //The word that loads up when the game starts
  const [word, setWord] = useState("")
  //The health score 
  const [life,setLife] = useState(0)
  //When a letter is found in the word picked.
  const [found, setFound] = useState(0)
 
  //This is used to keep track of the alphabets clicked
  const itemsRef:any = useRef([])

  //This is used to keep track of the letters in the choosen word.
  const wordRef:any = useRef(null)
  
  //This is used to keep track of the health 
  const healthRef:any = useRef()
  
  const id:any = useRef(null)

  //This is used to get the category picked by the user from the url.
  const[category,setCategory] = useState()
  
  //This is used to determine the length of the word
  let wordarr= (word.split("").filter(value => value !== ' '))


  //This is used to get the refs to the letters 
  function getMap(){
     if(!wordRef.current){
        wordRef.current = new Map()
     }
     return wordRef.current
  }

//This useeffect is for when the user wins
  useEffect(()=>{
    if(word && wordarr.length === found){
      id.current = setTimeout(()=>onOpen("You Win"), 3000) 
   }
   return ()=> clearTimeout(id);
  },[found,word, wordarr.length, onOpen])


  //This one 🤨 This is for when You lose.
  useEffect(()=>{
    if(life == 120){
      itemsRef.current.map((value:any)=>value.disabled = true)
      let map = getMap()
      map.forEach((letter:string,key:HTMLParagraphElement)=>{          
            if(key){
              key.classList.add("text-white")
              key.classList.add("opacity-[1]")
            }    
     })
     id.current = setTimeout(()=>onOpen("You Lose"), 3000)
    }
    return () => clearTimeout(id.current)
  },[life,onOpen])

  
  //This is to fetch random words
  useEffect((): any => {
    let _word: string;
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
    } else {
      _word = fetchRandomCountry()
    }
    if (_word) {
      setWord(_word as string)
    }
    return () => _word = ""
  }, [category])
 
  
  function letterInWord(i:number,letter:string){
    itemsRef.current[i].disabled = true
    //For the letter in the word display
    let counter = 0;
    let map = getMap()
    map.forEach((value:string, key:HTMLParagraphElement)=>{
          if(value.toLowerCase() === letter.toLowerCase()){
            counter++;
            if(key){
              key.classList.add("text-white")
              key.classList.add("opacity-[1]") 
              setFound(value=>value+1)
            }
          }
    })
   

    if(counter == 0){
       healthRef.current.classList.remove(`w-[${life}]`)
       if(life == 0){
         healthRef.current.classList.add(`w-20`)
       }else if(life == 20){
        healthRef.current.classList.add(`w-40`) 
       }else if(life == 60){
        healthRef.current.classList.add(`w-60`) 
       }else if(life == 80){
        healthRef.current.classList.add(`w-80`) 
       }else if(life == 100){
        healthRef.current.classList.add(`w-100`)  
       } 
       setLife(value=>value += 20)
    }
  }



  return (
    <main className="p-6 h-screen flex flex-col justify-between gap-y-[3rem] after:absolute after:left-0 after:right-0 after:top-0 after:bottom-0 after:bg-darkNavy *:z-50 after:opacity-70 pt-8 pb-12 md:pb-0">
      {/* NAVBAR */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className={`playbtn2 gradient flex items-center justify-center rounded-[100%] after:bg-gradient-to-b after:top-[35%] after:left-[50%] after:rounded-[100%] after:absolute after:translate-x-[-50%] after:translate-y-[-50%] relative shadow-1 `} onClick={() => onOpen((value: string) => "paused")}>
            <Image
              src={menu}
              className="z-50 w-[35px]"
              alt=""
            />
          </button>
          <h1 className="text-white font-main text-4xl lg:text-5xl uppercase">{category}</h1>
        </div>

        <div className="flex items-center gap-x-4">
          <div className="w-[60px] md:w-[200px] h-[16px] rounded-lg border-white bg-white border-[4px] relative">
            <div ref={healthRef} className="bg-darkNavy h-full w-0 rounded-md transition-all duration-1000"></div>
          </div>
          <div className="animate-pulse">
            <Image
              src={heart}
              className="w-37"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* WORD BANKS */}
      <div className="flex h-[200px] justify-center flex-col lg:mr-[5rem] lg:ml-[5rem] lg:mt-[1rem]"> 
            <Suspense>
            <WordBank OnCategory={setCategory} wordarr={wordarr} found={found} life={life} getMap={getMap}/>
            </Suspense>          
      </div>

      {/* ALPHABET GRID */}
      <div className="grid grid-cols-9 ns:grid-cols-9  md:grid-cols gap-[0.3rem] md:gap-2 md:gap-y-6 xl:gap-x-4  gap-y-5 flex-wrap lg:pl-[6rem] lg:pr-[6rem] md:p-6 md:pb-10 lg:p-10 place-content-center">
        {ALPHABET.map((value,i) => (
          <button
            type="button"
            key={value}
            ref={ (el:HTMLButtonElement)=>{itemsRef.current[i] = el}} 
            onClick={()=>letterInWord(i,value)}
            className="bg-white text-darkNavy font-main text-center md:rounded-[1.8rem] h-full text-3xl ns:text-4xl md:text-5xl lg:text-[3.2rem] pt-4 pb-4 xl:pb-3 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {value}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Game;

const WordBank = ({OnCategory, getMap, life,found, wordarr}:any) => {
  const search = useSearchParams()
  let category = search.get("value")
  
  //I think I have to fix this.
  useEffect(()=>{
      OnCategory(category)
  },[category, OnCategory])


  return(
    <div className="flex flex-wrap p-10 gap-y-2 place-content-center">
    {/**I NEED TO FIX THIS */}
    {wordarr?.map((value:string, i:number) => (
      <div key={i} className={`flex gap-x-2 ${life === 120 && 'animate-bounce'} ${(found === wordarr.length) && 'animate-pulse'}`}>
        
        {value.split('').map((letter,j)=>(
           <p
           key={j}
           ref={(el:HTMLParagraphElement)=>{
              const map = getMap()
              if(letter){
                map.set(el,letter)
              }else{
                map.delete(el)
              }
           }}
           className={`font-main text-transparent uppercase flex-1  w-[10vw] xl:w-[8vw]  p-2 ns:p-3  md:p-4 lg:p- rounded-xl text-5xl bg-blue  border-darkNavy border-l-4 border-r-4 border-b-8 border-t-4 md:rounded-2xl border-inner-shadow lg:rounded-[2rem] xl:rounded-[2.5rem] opacity-50 transition-all duration-1000 xl:text-7xl flex items-center justify-center`}
         >
           {letter}
         </p>
        ))}
       
      </div>

    ))}
  </div>
  )
}


