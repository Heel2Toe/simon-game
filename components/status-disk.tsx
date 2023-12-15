import { Aperture } from "lucide-react";
import React, { useEffect, useState } from "react";

interface StatusDiskProps {
  primaryColor: string;
  secondaryColor?: string;
  loading?: boolean;
  success?: boolean;
  failure?: boolean;
  colorToggle?: boolean;
  onClick?: () => void
}

export const StatusDisk: React.FC<StatusDiskProps> = ({
  primaryColor,
  secondaryColor,
  loading,
  success,
  failure,
  colorToggle,
  onClick
}) => {

  const [color, setColor] = useState('')
  const [transition, setTransition] = useState("-50%");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setColor(primaryColor);
    setMounted(true)
  }, []);

  useEffect(()=>{
    if(mounted){
    setTimeout(()=>{
      setTransition('-50%');
      setColor(colorToggle ? primaryColor : secondaryColor ? secondaryColor : primaryColor);
    },500)
    setTransition('50%'); }
  },[colorToggle, failure])

  const decider =
    success ? `radial-gradient(circle at center, rgb(22 163 74) 50%, transparent 50%) center 50%/200% 200%` : 
    failure ? `radial-gradient(circle at center, ${color} 50%, transparent 50%) center 50%/200% 200%`
      : `radial-gradient(circle at center, ${loading ? "#E1901D" : color} 50%, transparent 50%) center ${loading ? "50%" : transition}/200% 200%`;

  return (
    <>
      <style>
        {`
          @keyframes rotateAnim {
              0% {
              transform: rotate(0deg);
              }
              100% {
              transform: rotate(360deg);
              }
          }

          @keyframes failureAnim {
            0% {
              background: rgb(220 38 38) radial-gradient(circle at center, rgb(220 38 38) 50%, transparent 50%) center 50%/200% 200%;
            }
            50% {
              background: rgb(220 38 38) radial-gradient(circle at center, ${primaryColor} 50%, transparent 50%) center 50%/200% 200%;
            }
            100% {
              background: rgb(220 38 38) radial-gradient(circle at center, rgb(220 38 38) 50%, transparent 50%) center 50%/200% 200%;
            }
          }
        `}
      </style>

      <div
        onClick={onClick}
        className="w-[120px] h-[120px] rounded-full flex justify-center items-center backdrop-blur-10 shadow-2xl border border-amber-200 cursor-pointer"
        style={{
          background: decider,
          transition: "all 1s",
          animation: failure ? "failureAnim 1s infinite ease-out" : "none",
          animationDelay: failure ? "0.8s" : "0s"
        }}>
        <div className="h-[100px] w-[100px] rounded-full bg-amber-100 flex items-center justify-center text-black">
          <Aperture
            size={130}
            className=" text-rose-900"
            style={{
              transition: "all .5s",
              animation: loading
                ? "rotateAnim 1s linear infinite"
                : "none"
            }}/>
        </div>
      </div>
    </>
  );
};
