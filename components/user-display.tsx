import { User2 } from "lucide-react";

const UserDisplay = ({username}: {username: string}) => {
    return ( 
        <div className="flex items-center justify-center flex-col h-16 w-16 sm:h-20 sm:w-20 border border-gray-600 
        rounded-xl transition  cursor-pointer hover:border-white hover:translate-y-[-5px]">
        <User2 className="h-4 w-4 sm:h-6 sm:w-6"/>
        <h1 className="text-xs sm:text-sm">{username}</h1>
      </div>
     );
}
 
export default UserDisplay;