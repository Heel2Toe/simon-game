import  cn  from "classnames";
import { forwardRef, ForwardedRef } from "react";

interface GameButtonProps {
  color: string;
  name: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string
  gameOver?: boolean
}

const GameButton: React.ForwardRefRenderFunction<HTMLDivElement, GameButtonProps> = ({ color, name, onClick, className, gameOver }, ref) => {
  return (
    <div
      id={name}
      className={cn(`h-28 w-28 sm:h-40 sm:w-40 aspect-square rounded-xl shadow-md cursor-pointer transition duration-300`, className)}
      onClick={onClick}
      style={{ backgroundColor: gameOver ? 'rgb(239 68 68)' : color }}
      ref={ref as ForwardedRef<HTMLDivElement>}
    />
  );
};

export default forwardRef(GameButton);
