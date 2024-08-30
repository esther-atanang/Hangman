"use client"

import OptionsMenu from "@/app/ui/OptionsMenu"
import EndGameMenu from "../ui/EndGame/optionsMenu"
import Game from "./page"
import { useState } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
   const [menuType, setMenuType] = useState<""|"paused"|"You Win"|"You Lose">("")
   const [reload, setReload] = useState(false)

   function handleNewGame(){
      setReload(value => !value)
   }
   
   function handleMenuType(type:(""|"paused"|"You Win"|"You Lose")){
      setMenuType(type)
   }

   const renderMenu = () => {
      switch (menuType) {
        case "You Lose":
        case "You Win":
          return <EndGameMenu menuType={menuType} onSelected={handleNewGame} />;
        case "paused":
          return <OptionsMenu menuType={menuType} />;
        default:
          return null;
      }
    };

   return (
      <> 
         {renderMenu()}
         <Game onPopUp={handleMenuType} reload={reload} setReload={setReload} />
      </>
   )
}