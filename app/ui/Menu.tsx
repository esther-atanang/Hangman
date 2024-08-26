"use client"
import InstructionButton from "@/app/ui/InstructionButton"
import { MENU } from "@/app/constants/index"
import { useRouter } from "next/navigation"


//Change the menu type on every click
const Menu = ({onOpen, menuType}:any) => {
  const router = useRouter()
  return (
    <div className="absolute top-0 left-0 right-0 z-[9999]  flex items-center justify-center h-screen p-10 bg-transparent_darkNavy">
      <div className="header-bg border-headerBorder border-b-[10px] border-t-2 border-l-4 border-r-4 rounded-[3rem] header-inner-shadow relative flex items-center w-full max-w-[600px] flex-col p-6 pb-14 lg:rounded-[3.5rem]">

        <div className="relative -top-16"><h1 className="font-main *:inline text-8xl lg:text-9xl text-white relative lg:-top-8 capitalize"><p className="relative z-20 text-c">{menuType}</p> <p className="absolute top-0 left-0 text-s">{menuType}</p></h1></div>

        <div className="flex flex-col gap-y-8">

          <button className={` text-white bg-blue pl-14 pr-14 border-darkNavy border-l-4 border-r-4 border-b-[6px] border-t-2 uppercase border-inner-shadow text-3xl text-nowrap lg:text-5xl playbtn4 tracking-wider hover:bg-hoverBtn disabled:opacity-60 disabled:hover:bg-blue disabled:cursor-not-allowed`} onClick={()=>onOpen("")} disabled={menuType == "You Lose" && true}>
            Continue
          </button>
          <button className={` text-white bg-blue pl-14 pr-14 border-darkNavy border-l-4 border-r-4 border-b-[6px] border-t-2 uppercase border-inner-shadow text-3xl text-nowrap lg:text-5xl  playbtn4 tracking-wider hover:bg-hoverBtn`} onClick={()=>{router.refresh()}}>
             New Game
          </button>
          <button className={` text-white bg-blue pl-14 pr-14 border-darkNavy border-l-4 border-r-4 border-b-[6px] border-t-2 uppercase border-inner-shadow text-3xl text-nowrap lg:text-5xl playbtn4 quitbtn tracking-wider hover:bg-hoverBtn`} onClick={()=>router.push("/category")}>
            Quit
          </button>
        
        </div>
      </div>

    </div>
  )
}

export default Menu

