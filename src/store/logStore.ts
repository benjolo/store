import { AiFillCodeSandboxSquare } from 'react-icons/ai';
import {create} from 'zustand';
import { Item } from './store';
import { Col } from './store';
{/*user default
{
    username: string,
    password: string,
    userInfo: {
        nome_completo: string,
        avatar_url: string
    },
    character: {
        class: string,
        level: number,
        exp: number,
        equipments: Col[]  
    }
*/}
export interface User {
    username: string;
    password: string;
    userInfo: UserInfo;
    character: Character;
}

interface UserInfo{
    nome_completo: string;
    avatar_url: string;
}

interface Character {
    class: string;
    level: number;
    exp: number;
    equipment: Col[];
}

interface UserLog {
    log: boolean;
    user: User;
    setLog: (log: boolean) => void;
    setUser: (user: User) => void;
    deleteUser: () => void;
}

export const logStore = create<UserLog>((set) => ({
    log: false,
    user: {} as User,
    setLog: (log: boolean) => set(() => ({log})),
    setUser: (user: User) => set(() => ({user})),
    deleteUser: () => set(() => ({user: {} as User})),
}));