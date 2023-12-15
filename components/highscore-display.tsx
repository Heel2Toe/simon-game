import { useUser } from "@/hooks/use-user";
import { useEffect, useRef, useState } from "react";
import cn from "classnames";

const HighscoreDisplay = ({score}: {score:number}) => {

    const {highScore} = useUser();
    const [bg, setBg] = useState('')
    const div = useRef<HTMLDivElement>(null);

    useEffect(()=>{
     setBg('dashStarted bg-slate-600');
     setTimeout(()=>{
     setBg('');
     },600)
    },[highScore])
    
    return ( 
        <div className={cn(`h-16 w-16 sm:h-20 sm:w-20 border border-gray-600 flex flex-col items-center 
         justify-center text-xs sm:text-sm rounded-xl m-2 transition duration-1000`, bg)}>
          <div>Highscore</div>
          <div className="h-5 w-5 border border-gray-500 flex items-center justify-center mt-2">
           {score}
          </div>
        </div>
     );
}
 
export default HighscoreDisplay;