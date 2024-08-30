"use client"
import { CATEGORY, NAVTITLE } from "@/app/constants"
import { back } from "../Utils"
import { useRouter } from "next/navigation"
import Image from "next/image"


const Category = () => {
  const router = useRouter()
  return (
    <main className="h-screen p-8 pt-8 lg:pt-24 lg:pl-20 lg:pr-20">
      <section className="flex items-center">
                <div>
                <button className={`playbtn2 gradient flex items-center justify-center rounded-[100%] after:bg-gradient-to-b after:top-[35%] after:left-[50%] after:rounded-[100%] after:absolute after:translate-x-[-50%] after:translate-y-[-50%] relative shadow-1 hover:scale-95`} onClick={()=>router.push("/")} type="button">
                <Image
                src={back}
                className="z-50"
                alt=""
                />
     </button>
                </div>
                <div className="flex flex-1 justify-end md:justify-center"><h1 className="font-main *:inline text-5xl lg:text-7xl text-white relative"><p className="relative z-20 text-c">{NAVTITLE[1]}</p> <p className="absolute top-0 left-0 text-s">{NAVTITLE[1]}</p></h1></div>
     </section> 
     <section className="grid sm:gap-y-3  gap-y-4 mt-10 w-full md:grid-cols-2 md:gap-8 lg:mt-28 lg:grid-cols-3">
            {CATEGORY.map((value)=><CategoryBtn key={value.id} btnText={value.category} value={value.id} />)}
     </section>
    </main>
  )
}

export default Category


const CategoryBtn = ({btnText, value}:{btnText:string, value:string}) =>{
  const router = useRouter()
  return(
    <button className={` text-white bg-blue pl-14 pr-14 border-darkNavy border-l-4 border-r-4 border-b-[6px] border-t-2 uppercase border-inner-shadow text-3xl text-nowrap lg:text-5xl playbtn3 tracking-wider hover:bg-hoverBtn hover:movebtn` } onClick={() => router.push(`/game?value=${value}`)} type="button" >
    {btnText}
 </button>
  )
}
