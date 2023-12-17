import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import toast from "react-hot-toast";

export const userLogin = async (
  email: string,
  password: string,
  updateUser: Function
) => {
  try {
    const userAuth = await signInWithEmailAndPassword(auth, email, password);
    const q = query(
      collection(db, "userScores"),
      where("name", "==", userAuth.user.displayName)
    );
    const querySnapshot = await getDocs(q);
    const highScore = querySnapshot.docs[0].data().highscore;
    updateUser({
      username: userAuth.user.displayName!,
      id: userAuth.user.uid,
      highScore,
    });
    return true;
  } catch (error: any) {
    console.log("LOGIN_ERROR", error);
    toast.error("Invalid credentials");
    return false;
  }
};

export const userSignup = async (
  email: string,
  username: string,
  password: string,
  updateUser: Function
) => {
  try {
    const q = query(
      collection(db, "userScores"),
      where("name", "==", username)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userAuth.user, { displayName: username });
      await addDoc(collection(db, "userScores"), {
        name: userAuth.user.displayName,
        highscore: 0,
      });
      updateUser({
        username: userAuth.user.displayName!,
        id: userAuth.user.uid,
        highScore: 0,
      });
      return true;
    } else {
      toast.error("Username already exists");
      return false;
    }
  } catch (err: any) {
    if (
      err.message ==
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      toast.error("Password should be at least 6 characters");
    } else {
      toast.error("Something went wrong");
    }
    console.log("SIGNUP_ERROR", err);
    return false;
  }
};
