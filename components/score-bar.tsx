import classNames from "classnames";
import { ForwardedRef, forwardRef } from "react";

interface ScoreBarProps {
    name: string,
    score: number | string,
    position?: number
}
 
const ScoreBar: React.ForwardRefRenderFunction<HTMLDivElement,ScoreBarProps> = ({ name, score, position }, ref) => {
    return ( 
        <div className={classNames(`w-[90%] m-2 p-2 flex justify-between items-center 
        border rounded-md border-gray-600 text-white text-xs sm:text-sm`,
        position == 1  && 'border-l-yellow-500',
        position == 2  && 'border-l-stone-300',
        position == 3  && 'border-l-orange-500'
        )} ref={ref as ForwardedRef<HTMLDivElement>}>
        <div>{name}</div>
        <div>{score}</div>
        </div>  
     );
}
 
export default forwardRef(ScoreBar);