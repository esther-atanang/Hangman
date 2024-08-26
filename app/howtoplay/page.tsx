import PlayButton from "@/app/ui/PlayButton"
import { INSTRUCTION, NAVTITLE } from "@/app/constants/index"
import { back } from "@/app/Utils/index"


const page = () => {
    return (
        <main className="h-screen p-6 font-main ns:p-10 md:p-12 lg:p-16 lg:pt-20 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-darkNavy after:opacity-70 *:relative *:z-50">
            <section className="flex items-center justify-between ">
                <div><PlayButton icon={back} type={"playbtn2"} size={"btnImgSize"}/></div>
                <div className="flex flex-1 justify-end md:justify-center"><h1 className="font-main text-6xl text-white relative "><p className="relative z-20 text-c">{NAVTITLE[0]}</p> <p className="absolute top-0 left-0 text-s">{NAVTITLE[0]}</p></h1></div>
            </section>
            <section className="flex flex-col gap-y-5 sm:gap-y-6 mt-10  ns:mt-12 md:mt-12 ml:mt-20 lg:mt-12 lg:flex-row lg:gap-x-6 lg:pt-12 ">
                {INSTRUCTION.map((value) =>(
                    <div key={value.id} className={`bg-white p-6 flex flex-row lg:flex-col gap-x-6 rounded-3xl lg:gap-y-10 lg:flex-1 lg:p-7 lg:pb-16 lg:pt-5 xl:pt-12 animate-card ${value.class} relative`}>
                    <div className="gap-x-5 md:flex md:items-center md:justify-center">
                        <p className="text-3xl md:text-5xl text-blue lg:text-6xl">{value.id}</p>
                       
                    </div>
                    <div className="flex flex-col gap-y-2 lg:text-center lg:gap-y-5">
                       <p className="uppercase text-3xl md:text-4xl font-thin text-darkNavy tracking-wide lg:text-4xl xl:text-5xl ">{value.title}</p>
                        <p className="text-[#887DC0] text-xl ns:text-[1.4rem] -ml-12 md:ml-0 md:text-[1.525rem] lg:text-2xl xl:text-3xl lg:leading-8">{value.instruction}</p>
                    </div>
                </div>
            ))} 
            </section>
        </main>
    )
}

export default page;




