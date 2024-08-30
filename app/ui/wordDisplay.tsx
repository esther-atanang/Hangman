"use client"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"


const WordDisplay = ({currentWord, hasLost, onSelectedCategory}:{currentWord:any, hasLost:boolean, onSelectedCategory:any }) => {
    const categoryParam = useSearchParams()
    let userSelectedCategory:string = categoryParam.get("value") as string
    type Elements =
    {
      id: number,
      letter: string,
      seen: boolean
    }
    //sets the category seleted by the user.
    useEffect(() => {
      onSelectedCategory(userSelectedCategory)
    }, [onSelectedCategory])
  
  
    return (
      <div className="flex flex-wrap justify-center gap-y-2 gap-x-5">
        {currentWord?.map((value:Elements[],i:number) => {
          return (
            <div key={i} className={`flex justify-center ${hasLost && "animate-bounce"}`}>
              {
  
                value.map((letter:Elements) => {
              
                  
                    return( letter.letter !== " " && <p key={letter.id} className={`text-2xl sm:text-4xl p-3 pr-5 pl-5 ns:pr-7 ns:pl-7 md:text-5xl md:pr-6 md:pl-6 lg:pr-7 lg:pl-7 xl:pr-8 xl:pl-8 xl:rounded-[2rem]   xl:text-[4rem] bg-blue flex justify-center  rounded-[1rem] flex-1 max-w-[50px] lg:max-w-[70px]  border-darkNavy  border-l-4 border-r-4 border-b-8 border-t-4 border-inner-shadow uppercase ${!letter.seen &&"opacity-50"}  text-transparent ${letter.seen && "opacity-100 transition-all text-white"}`} >{letter.letter}</p>)
                  
                
                })
              }
            </div>
          )
  
        })}
      </div>
    )
  }
  
export default WordDisplay;