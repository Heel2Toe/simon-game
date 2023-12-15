import { Play } from "lucide-react";
import GameButton from "./game-button";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import GameDash from "./game-dash";
import { useUser } from "@/hooks/use-user";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/firebase";

const colors = ['green', 'blue', 'violet', 'pink'];

const Game = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userIndex, setUserIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const {highScore,updateUser, username}  = useUser();


  const greenButtonRef = useRef(null);
  const blueButtonRef = useRef(null);
  const violetButtonRef = useRef(null);
  const pinkButtonRef = useRef(null);

  const gameStart = () => {
    if (!start) {
      setStart(true);
      generateSequence();
    }
  };

  const updateScore = async (score : number) => {
    try{
    const q = query(collection(db, 'userScores'), where('name', '==', username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, { highscore: score }); }
    else{
      throw Error('User does not exist');
    }
  }
  catch(error){
    console.log('GAME_COMP:', error);
    toast.error('something went wrong')
  }
  }

  const gameOver = () => {
    new Audio('./audio/gameOver.mp3').play();
    if(currentScore > highScore){
      updateScore(currentScore);
      updateUser({highScore: currentScore});
    }
    setCurrentScore(0);
    setSequence([]);
    setUserIndex(0);
    setStart(false);
    setGameover(true);
    setTimeout(()=>{
    setGameover(false);
    },300)
  }

  const generateSequence = () => {
    setSequence((prevSequence) => {
      const newColor = colors[Math.floor(Math.random() * 4)];
      return [...prevSequence, newColor];
    });
  };

  useEffect(() => {
    if (sequence.length > 0) {
      const showSequence = (index: number = 0) => {
        let ref: React.RefObject<HTMLElement> | null = null;

        if (sequence[index] === 'green') ref = greenButtonRef;
        if (sequence[index] === 'blue') ref = blueButtonRef;
        if (sequence[index] === 'violet') ref = violetButtonRef;
        if (sequence[index] === 'pink') ref = pinkButtonRef;

         setTimeout(()=>{
           ref?.current?.classList.add('selected');
           new Audio('./audio/click.mp3').play();
           setTimeout(() => {
             ref?.current?.classList.remove('selected');
             if (index < sequence.length - 1) {
               showSequence(index + 1);
              }
            }, 250);
          },400)
      };
      showSequence();
    }
  }, [sequence]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if(start){
      const button = (e.target as HTMLDivElement);
      button.classList.add('selected')
      new Audio("./audio/click.mp3").play();
      setTimeout(()=>{
        button.classList.remove('selected');
      },200)
      
      
      if(sequence[userIndex] == button.id){
        if(userIndex == sequence.length-1){
          new Audio('./audio/levelPassed.mp3').play();
          setCurrentScore((prev)=>prev+1);
          setTimeout(()=>{
            setUserIndex(0);
            generateSequence();
          },1200)
        }
        else{
          setUserIndex((prev)=>prev+1);
        }
      }
      else{
        gameOver();
      }
    }
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center">

      <GameDash clickedTiles={userIndex} totalTiles={sequence.length} started={start} currentScore={currentScore}/>
      <div className="relative grid grid-cols-2 gap-3">
        <GameButton color="rgb(134 239 172)" name="green" gameOver={gameover} ref={greenButtonRef} onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClick(e)}/>
        <GameButton color="rgb(103 232 249)" name="blue" gameOver={gameover} ref={blueButtonRef} onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClick(e)}/>
        <GameButton color="rgb(165 180 252)" name="violet" gameOver={gameover} ref={violetButtonRef} onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClick(e)}/>
        <GameButton color="rgb(196 181 253)" name="pink" gameOver={gameover} ref={pinkButtonRef} onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClick(e)}/>

      <button onClick={gameStart} className="flex text-sm text-white items-center justify-center absolute top-1/2 left-1/2 
      transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:h-14 sm:w-14 bg-transparent hover:bg-slate-700 rounded-md 
      rounded-se-3xl transition duration-500">
      {sequence.length === 0 ? <Play color="white" className="h-4 w-4" /> : sequence.length }
      </button>
      
      </div>
    </div>
  </>
  );
};

export default Game;
