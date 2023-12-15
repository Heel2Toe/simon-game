import { PowerCircle } from "lucide-react";

const UserLogout = ({logOut}:{logOut: ()=> void}) => {
    return ( 
        <div className="flex flex-col items-center justify-center h-16 w-16 sm:h-20 sm:w-20 border border-gray-600 rounded-xl">
        <PowerCircle onClick={logOut} className="text-gray-400 h-4 w-4 sm:h-6 sm:w-6  cursor-pointer hover:text-red-400 transition"/>
        <p className="text-xs sm:text-sm">logout</p>
        </div>
     );
}
 
export default UserLogout;