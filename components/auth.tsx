"use client";
import { useEffect, useState } from "react";
import TextInput from "@/components/text-input"

import {StatusDisk} from "./status-disk";
import { Chrome } from "lucide-react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";



const Auth = () => {

    const [user, setUser] = useState({username: '', password: '', email: ''});
    const [login, setLogin] = useState(true);
    const [disk, setDisk] = useState({success: false, failure: false});
    const {updateUser} = useUser();
    const router = useRouter();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const textboxName = e.target.name;
        setUser((prev)=>({
            ...prev,
            [textboxName]: e.target.value
        }));       
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault(); 
        try{
           if(login){
               const userAuth = await signInWithEmailAndPassword(auth,user.email,user.password);
               const q = query(collection(db, 'userScores'), where('name', '==', userAuth.user.displayName));
               const querySnapshot = await getDocs(q);
               const highScore = querySnapshot.docs[0].data().highscore; 
               updateUser({username: userAuth.user.displayName!, id: userAuth.user.uid, highScore});
               router.push(`/game`) 
           }
           else{
               const q = query(collection(db, 'userScores'), where('name', '==', user.username));
               const querySnapshot = await getDocs(q);
               if(querySnapshot.empty){
                   const userAuth = await createUserWithEmailAndPassword(auth,user.email,user.password);
                   await updateProfile(userAuth.user,{displayName: user.username});
                   await addDoc(collection(db, 'userScores'),{
                       name: userAuth.user.displayName,
                       highscore: 0,
                   });
                   updateUser({username: userAuth.user.displayName!, id: userAuth.user.uid, highScore: 0});
               }
               else{
                   toast.error("username taken");
                   setDisk((disk)=> ({...disk, failure:true}));
                   setTimeout(()=>{
                     setDisk((disk)=> ({...disk, failure:false}));
                   },1000)    
                   return;
               }
           }
           setDisk((disk)=> ({...disk, success:true}));
           setTimeout(()=>{
           router.push(`/game`);
           },1000);
       }
        catch(err: any){
             toast.error(err.message);
             setDisk((disk)=> ({...disk, failure:true}));
             setTimeout(()=>{
               setDisk((disk)=> ({...disk, failure:false}));
             },1000)        
        }   
     }

    const switcher = () => { setLogin((prev) => !prev);  };




    return ( 
        <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 h-auto w-96 bg-sky-300 shadow-xl rounded-xl space-y-6">
            <div className="space-y-4 flex flex-col items-center w-full mt-10">
                <h1 className=" text-2xl font-bold text-sky-100">SIMON GAME</h1>
                {!login && <TextInput placeholder="username" name="username" onChange={handleInput}/>}
                <TextInput placeholder="email" name="email" onChange={handleInput}/>
                <TextInput placeholder="password" name="password" onChange={handleInput} type="password"/>
                <button type="submit"  className="h-10 w-[80%] bg-pink-400 text-sm rounded-md hover:bg-pink-300 transition text-white">{login === true ? 'Login' : 'Sign Up'}</button>
                <button className="p-5 w-[80%] flex items-center justify-between bg-slate-200 text-sm rounded-md transition"><Chrome size={30}/> sign in with google</button>
                <StatusDisk 
                primaryColor="rgb(59 130 246)"  
                secondaryColor="rgb(20 184 166)"
                failure={disk.failure}
                success={disk.success}
                colorToggle={login} 
                onClick={switcher}/>
            </div>
               {login ? <p>click on the icon to create an account</p>
                      : <p>click on icon to login</p>}    
        </form>
     );
}
 
export default Auth;