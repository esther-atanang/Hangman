"use client"
import InstructionButton from "@/app/ui/InstructionButton"
import PlayButton from "@/app/ui/PlayButton"
import { CATEGORY, NAVTITLE } from "@/app/constants"
import { back } from "../Utils"
import { useRouter } from "next/navigation"

const Category = () => {
  // const country = fetchRandomCountry()
  // const books = fetchRandomBook()
  // const sport = fetchRandomSport()
  // const animal = fetchRandomAnimal()
 
  
  return (
    <main className="h-screen p-8 pt-8 lg:pt-24 lg:pl-20 lg:pr-20">
      <section className="flex items-center">
                <div><PlayButton icon={back} type={"playbtn2"} size={"btnImgSize"}/></div>
                <div className="flex flex-1 justify-end md:justify-center"><h1 className="font-main *:inline text-5xl lg:text-7xl text-white relative"><p className="relative z-20 text-c">{NAVTITLE[1]}</p> <p className="absolute top-0 left-0 text-s">{NAVTITLE[1]}</p></h1></div>
     </section> 
     <section className="grid gap-y-6 mt-20 w-full md:grid-cols-2 md:gap-8 lg:mt-28 lg:grid-cols-3">
            {CATEGORY.map((value)=><CategoryBtn key={value.id} btnText={value.category} value={value.id} />)}
     </section>
    </main>
  )
}

export default Category


const CategoryBtn = ({btnText, value}:{btnText:string, value:string}) =>{
  const router = useRouter()
  return(
    <button className={` text-white bg-blue pl-14 pr-14 border-darkNavy border-l-4 border-r-4 border-b-[6px] border-t-2 uppercase border-inner-shadow text-3xl text-nowrap lg:text-5xl playbtn3 tracking-wider hover:bg-hoverBtn`} onClick={() => router.push(`/game?value=${value}`)} >
    {btnText}
 </button>
  )
}
