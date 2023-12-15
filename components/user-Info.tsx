import { auth } from "@/firebase";
import { useUser } from "@/hooks/use-user";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HighscoreDisplay from "./highscore-display";
import UserDisplay from "./user-display";
import { PowerCircle } from "lucide-react";
import UserLogout from "./user-logout";

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
            <UserLogout logOut={logOut}/>
            <HighscoreDisplay score={highScore}/>
            </div>
        </div>
     );
}
 
export default UserInfo;