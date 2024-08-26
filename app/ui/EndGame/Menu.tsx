"use client"
import { useRouter } from "next/navigation"


//Change the menu type on every click
const Menu = ({menuType, handleNewGame}:any) => {
  const router = useRouter()
  return (
    <div className="absolute top-0 left-0 right-0 z-[9999]  flex items-center justify-center h-screen p-10 bg-transparent_darkNavy">
      <div className="header-bg border-headerBorder border-b-[10px] border-t-2 border-l-4 border-r-4 rounded-[3.5rem] header-inner-shadow relative flex items-center w-full max-w-[600px] flex-col p-6 pb-14 lg:rounded-[5rem]">

        <div className="relative -top-16"><h1 className="font-main *:inline text-8xl lg:text-[9rem] text-white relative lg:-top-8 capitalize"><p className="relative z-20 text-c">{menuType}</p> <p className="absolute top-0 left-0 text-s">{menuType}</p></h1></div>

        <div className="flex items-center flex-col gap-y-8">

          <button className={` text-white bg-blue w-[50vw] md:w-[37vw] lg:w-[25vw]  border-darkNavy border-l-4 border-r-4 border-b-[6px] border-t-2 uppercase border-inner-shadow text-3xl text-nowrap lg:text-5xl playbtn4 tracking-wider hover:bg-hoverBtn disabled:opacity-60 disabled:hover:bg-blue disabled:cursor-not-allowed`} onClick={()=>handleNewGame(true)}>
            Play Again!
          </button>
          <button className={` text-white bg-blue w-[55vw] md:w-[40vw] lg:w-[30vw] border-darkNavy border-l-4 border-r-4 border-b-[6px] border-t-2 uppercase border-inner-shadow text-3xl text-nowrap lg:text-5xl  playbtn4 tracking-wider hover:bg-hoverBtn `} onClick={()=>{router.push("/category")}}>
             New Category
          </button>
          <button className={` text-white bg-blue w-[50vw] md:w-[37vw] lg:w-[25vw]  border-darkNavy border-l-4 border-r-4 border-b-[6px] border-t-2 uppercase border-inner-shadow text-3xl text-nowrap lg:text-5xl playbtn4 quitbtn tracking-wider hover:bg-hoverBtn`} onClick={()=>router.push("/")}>
            Quit
          </button>
        
        </div>
      </div>

    </div>
  )
}

export default Menu

