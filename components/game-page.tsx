"use client";
import Game from "@/components/game";
import ScoreTable from "@/components/score-table";
import UserInfo from "@/components/user-Info";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GamePage = () => {
  const router = useRouter();
  const { username, id } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!username) {
      router.push("/");
      toast.error("unauthenticated");
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center flex-col sm:flex-row  p-5 h-full w-full bg-slate-700">
        <div className="flex">
          <UserInfo username={username} />
          <Game />
        </div>
        <ScoreTable username={username} />
    </div>
  );
};

export default GamePage;
