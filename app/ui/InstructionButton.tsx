"use client";

import { useRouter } from "next/navigation";

interface Props {
  btnText: string;
  type: string;
  typeBTN?: string;
}

const InstructionButton = ({ btnText, type, typeBTN }: Props) => {
  const router = useRouter();

  return (
    <button
      className={`text-white bg-blue pl-14 pr-14 border-darkNavy border-l-4 border-r-4 border-b-[6px] border-t-2 uppercase border-inner-shadow text-3xl lg:text-5xl ${type} ${typeBTN} tracking-wider hover:bg-hoverBtn hover:movebtn`}
      onClick={() => router.push("/howtoplay")}
      type="button"
    >
      {btnText}
    </button>
  );
};

export default InstructionButton;
