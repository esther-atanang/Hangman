import { useEffect } from 'react'

const useWin = ({win, id, onOpen}:any) => {
  useEffect(()=>{
    if(win){
      id.current = setTimeout(()=>onOpen("You Win"), 3000) 
   }
   return ()=> clearTimeout(id);
  },[win,onOpen])
}

export default useWin;
