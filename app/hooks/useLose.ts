import { useEffect, useState } from 'react'


const useLose = ({life, id, onOpen, itemsRef,getMap}:any) => { 
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
}

export default useLose;
