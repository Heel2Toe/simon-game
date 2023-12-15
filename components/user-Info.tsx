import { auth } from "@/firebase";
import { useUser } from "@/hooks/use-user";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HighscoreDisplay from "./highscore-display";
import UserDisplay from "./user-display";
import { PowerCircle } from "lucide-react";

const UserInfo= ({username}: {username: string}) => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {logoutUser, highScore} = useUser();


  const logOut = async () => {
    await signOut(auth).catch(err => console.log(err));      
    logoutUser();
    router.push('/');
    }

    return ( 
        <div className="ml-2 mt-4 w-[90px] sm:w-[176px] h-[337px] border border-gray-500 rounded-xl p-4">
            <div className="flex flex-col h-full items-center justify-between text-white">
            <UserDisplay username={username}/>
            <div className="flex flex-col items-center justify-center">
            <PowerCircle onClick={logOut} className="text-gray-400 h-4 w-4 sm:h-6 sm:w-6  cursor-pointer hover:text-red-400 transition"/>
            <p className="text-xs sm:text-sm">logout</p>
            </div>
            <HighscoreDisplay score={highScore}/>
            </div>
        </div>
     );
}
 
export default UserInfo;