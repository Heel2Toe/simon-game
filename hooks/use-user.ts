import { create } from 'zustand';
import {persist, createJSONStorage} from "zustand/middleware"

interface UpdateUserProps{
  username?: string,
  id?: string,
  highScore?: number
}

interface UserProps{
    username: string,
    id: string,
    highScore: number
    updateUser: (props: UpdateUserProps) => void,
    logoutUser: () => void
};

export const useUser = create(
    persist<UserProps>(
      (set) => ({
        username: '',
        id: '',
        highScore: 0,
        updateUser: (props: UpdateUserProps) => set((state) => ({ ...state, ...props })),
        logoutUser: () => set(()=>({username: '', id: '', highScore: 0}))
      }),
      {
        name: 'user-storage', 
        storage: createJSONStorage(()=>localStorage), 
      }
    )
  );