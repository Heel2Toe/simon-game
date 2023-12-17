import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import ScoreBar from "./score-bar";
import ScoreLoad from "./score-load";
import FlipMove from "react-flip-move";

interface Score {
  id: string;
  name: string;
  highscore: number;
}

const ScoreTable = ({ username }: { username: string }) => {
  const [data, setData] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const q = query(collection(db, "userScores"), orderBy("highscore", "desc"));

  useEffect(() => {
    const getScores = () => {
      try {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          setData(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Score[]
          );
          setLoading(false);
        });
        return unsubscribe;
      } catch (error) {
        console.log(error);
      }
    };

    getScores();
  }, []);



  return (
    <div className="mt-4 w-full sm:w-[236px] h-[340px] border border-gray-500 rounded-xl">
      <div className="flex flex-col items-center h-full w-full overflow-x-hidden overflow-y-scroll hide-scrollbar">
        <ScoreBar name="Name" score="Score" />

        {loading ? (
          <ScoreLoad/>
        ) : (
          <FlipMove duration={600} className="w-full flex flex-col items-center justify-center">
            {data.map((user, index) => (
              <ScoreBar
                key={user.id}
                position={index + 1}
                name={user.name}
                score={user.highscore}
              />
            ))}
          </FlipMove>
        )}
      </div>
    </div>
  );
};

export default ScoreTable;
