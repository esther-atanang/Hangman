import Image from "next/image";
import play from "@/public/assets/play.svg"
import logo from "@/public/assets/logo.svg"
import PlayButton from "./ui/PlayButton";
import InstructionButton from "./ui/InstructionButton";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center p-6 animate-header">
      <header className="header-bg border-headerBorder border-b-[10px] border-t-2 border-l-4 border-r-4 rounded-[4rem] header-inner-shadow relative flex items-center w-full max-w-[600px] flex-col p-6 pt-32 pb-14">
        <div className="absolute -top-12 ns:-top-20 md:-top-24 ">
          <Image
            src={logo}
            className="w-[275px] ns:w-full"
            alt=""
          />
        </div>

        <div><PlayButton icon={play} type={"playbtn1"} /></div>

        <div className="w-full mt-16 flex items-center justify-center"><InstructionButton btnText="How to play" type="playbtn4"/></div>
     
      </header>
    </main>
  );
}
