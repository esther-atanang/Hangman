"use client"
import Image from "next/image"
import { useRouter } from 'next/navigation'
interface Props{
   icon: string,
   type: string,
   size?: string,
}

const StartButton = ({icon, type}:Props) => {
   const router = useRouter()
  return (
     <button className={`${type} gradient flex items-center justify-center rounded-[100%] after:bg-gradient-to-b after:top-[35%] after:left-[50%] after:rounded-[100%] after:absolute after:translate-x-[-50%] after:translate-y-[-50%] relative shadow-1 hover:scale-95`} onClick={type === "playbtn2" ? ()=>router.back() : ()=>router.push("/category")} type="button">
        <Image
         src={icon}
         className="z-50"
         alt=""
        />
     </button>
  )
}

export default StartButton;
