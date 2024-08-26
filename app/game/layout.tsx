"use client"
import Menu from "../ui/Menu"
import { menu } from "../Utils"
import Game from "./page"
import { useState } from "react"

export default function Layout({children}:{children: React.ReactNode}){
   const[menuType, setMenuType]= useState("")
    return(
       <>
         { (menuType) && <Menu onOpen={setMenuType} menuType={menuType}/>}
         <Game onOpen={setMenuType}/>
       </>
    )
}