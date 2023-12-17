"use client";
import { useState } from "react";
import TextInput from "@/components/text-input";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import HomeBtns from "./home-btns";
import FlipMove from "react-flip-move";
import { userLogin, userSignup } from "@/actions/user.actions";

const Auth = () => {
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUser();
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textboxName = e.target.name;
    setUser((prev) => ({
      ...prev,
      [textboxName]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (login) {
        const userAuth = await userLogin(user.email, user.password, updateUser);
        setLoading(false);
        if (userAuth) {
          router.push("/game");
        }
      } else {
        const userAuth = await userSignup(
          user.email,
          user.username,
          user.password,
          updateUser
        );
        setLoading(false);
        if (userAuth) {
          router.push("/game");
        }
      }
    } catch (err: any) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  const switcher = () => {
    setLogin((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-around p-4 sm:flex-row items-center h-full w-full bg-slate-300">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl sm:text-6xl" onClick={switcher}>
          simon game.
        </h1>
        <HomeBtns />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex h-[300px] sm:h-[400px] w-[300px]  flex-col mt-10 sm:mt-0 items-center rounded-xl bg-gray-100 shadow-md"
      >
        <div className="m-3 text-xl">Welcome</div>

        <FlipMove className="flex h-full w-full space-y-4  flex-col items-center">
          {!login && (
            <TextInput
              key={1}
              placeholder="username"
              name="username"
              onChange={handleInput}
            />
          )}
          <TextInput
            key={2}
            placeholder="email"
            name="email"
            onChange={handleInput}
          />
          <TextInput
            key={3}
            type="password"
            placeholder="password"
            name="password"
            onChange={handleInput}
          />
          <button
            type="submit"
            key={4}
            className="flex items-center justify-center p-2 rounded-md border w-[90%] hover:bg-gray-200 mb-8"
          >
            {login ? "Log in" : "Sign up"}
            {loading && (
              <div className="load-anim h-4 w-4  ml-6 rounded-full border border-transparent border-t-black border-b-black" />
            )}
          </button>
          <div className="text-sm text-gray-600 m-8">
            {login ? "new here ? " : "been here ? "}
            <span onClick={switcher} className="cursor-pointer">
              {login ? "sign up" : "log in"}
            </span>
          </div>
        </FlipMove>
      </form>
    </div>
  );
};

export default Auth;
