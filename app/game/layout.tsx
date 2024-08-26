"use client"
import Menu from "../ui/Menu"
import EndGameMenu from "../ui/EndGame/Menu"
import { menu } from "../Utils"
import Game from "./page"
import { useState } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
   const [menuType, setMenuType] = useState<""|"paused"|"You Win"|"You Lose">("")
   const [reload, setReload] = useState(false)

   function onNewGame(){
      setReload(value => !value)
   }

   return (
      <>
         {(menuType == "You Lose" || menuType == "You Win") && <EndGameMenu onOpen={setMenuType} menuType={menuType} handleNewGame={onNewGame} />}
         {(menuType == "paused") && <Menu onOpen={setMenuType} menuType={menuType} />}
         <Game onOpen={setMenuType} reload={reload} setReload={setReload} />
      </>
   )
}