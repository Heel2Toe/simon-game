import classNames from "classnames";
import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface GameDashProps{
    clickedTiles: number,
    totalTiles: number,
    started: boolean,
    currentScore: number
}
const GameDash: React.FC<GameDashProps> = ({
    clickedTiles,
    totalTiles,
    started,
    currentScore
}) => {
    const tilesLeft = totalTiles-clickedTiles;
    const dashRef = useRef<HTMLDivElement>(null);


    useEffect(()=>{
        if(started){
            dashRef.current?.classList.add('dashStarted');
        }
        else{
            dashRef.current?.classList.remove('dashStarted');
        }
    },[started]);

    useEffect(()=>{
        if(started){
            dashRef.current?.classList.add('passed');
            dashRef.current!.innerHTML = `Level ${currentScore} passed`;    
            setTimeout(()=>{
                dashRef.current?.classList.remove('passed');
            },600)
        }
    },[currentScore])



    return ( 
        <div className="relative m-4 rounded-xl">
        {!started &&<Info className="absolute h-4 w-4 text-white top-1 right-1 cursor-pointer"/>}
        <div className='text-white text-center w-56 p-6 text-xs sm:text-sm sm:p-10
          border border-gray-500 rounded-xl sm:w-80 transition duration-500' ref={dashRef}> 
            {started ? tilesLeft+' more to go' : 'Press play icon to start'}
        </div>
        </div>
     );
}
 
export default GameDash;