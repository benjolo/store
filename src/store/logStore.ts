import {create} from 'zustand';
import { Item } from './store';

interface UserInfo{
    nome_completo: string;
    avatar_url: string;
}

interface Character {
    class: string;
    level: number;
    exp: number;
    equipment: Equipment;
}

interface Equipment {
    spada: Item;
    scudo: Item;
    armatura: Item;
}

export interface User {
    username: string;
    password: string;
    userInfo: UserInfo;
    character: Character;
}

export interface Log {
    log: boolean;
    user: User;
    setLog: (log: boolean) => void;
}

export const logStore = create((set) => ({
    log: false,
    user: {},
    setUser: (user: User) => set(() => ({user})),
    setLog: (log: boolean) => set(() => ({log})),
}));