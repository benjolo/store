
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const defaultInventory: Col[] = [
    {
      id: 1,
      name: "Inventory",
      value: [],
      limit: 20,
      type: "inventory",
    },
    {
      id: 2,
      name: "Potion",
      value: [],
      limit: 1,
      type: "potion",
    },
    {
      id: 3,
      name: "Gloves",
      value: [],
      limit: 1,
      type: "wearable",
    },
    {
      id: 4,
      name: "Weapon",
      value: [],
      limit: 1,
      type: "weapon",
    },
    {
      id: 5,
      name: "Helmet",
      value: [],
      limit: 1,
      type: "wearable",
    },
    {
      id: 6,
      name: "Chestplate",
      value: [],
      limit: 1,
      type: "wearable",
    },
    {
      id: 7,
      name: "Boots",
      value: [],
      limit: 1,
      type: "wearable",
    },
    {
      id: 8,
      name: "Amulet",
      value: [],
      limit: 1,
      type: "wearable",
    },
    {
      id: 9,
      name: "Shield",
      value: [],
      limit: 1,
      type: "wearable",
    },
    {
      id: 10,
      name: "Spell",
      value: [],
      limit: 1,
      type: "wearable",
    },
    {
      id: 11,
      name: "Bag",
      value: [],
      limit: 10,
      type: "inventory",
    },
  ];
interface Stats {
    attack: number;
    defense: number;
    speed: number;
    weight: number;
    curability: number;
}

interface Specs {
    name: string;
    description: string;
    stats: Stats
}

export interface Item {
    id: number;
    type: string;
    img: string;
    specs: Specs;
}

export type Col = {id: number, name: string, value: Item[], limit: number, type: string};

interface Store {
    wearhouse: Item[];
    columns: Col[];
    loadItemsInInventory: (items: Item[], colName: string, limit: number, type: string) => void;
    checkIfItemExists: (item: Item, inv: Item[]) => Item | undefined;
    addItemsInCol: (items: Item[], colId: number) => void;
    addItemAndUpdateCol: (item: Item, colId: number) => void;
    removeItemAndUpdateCol: (item: Item, colId: number) => void;
}

export const useStore = create<Store>((set, get) => ({
    wearhouse: [] as Item[],
    //column with default values
    columns: defaultInventory,
    //function to load items in a column, if exist update the column, if not create a new column

    loadItemsInInventory: (items: Item[], colName: string, limit: number, type: string) => set((state) => ({ columns: [...state.columns, { id: state.columns.length + 1, name: colName, value: items, limit: limit, type: type }] })),
    checkIfItemExists: (item: Item, inv: Item[]) => inv.find((i) => i.specs.name === item.specs.name),
    //att Items in col
    addItemsInCol: (items: Item[], colId: number) => set((state) => ({ columns: state.columns.map((col) => col.id === colId + 1 ? { ...col, value: [...col.value, ...items] } : col)})),
    addItemAndUpdateCol: (item: Item, colId: number) => set((state) => ({ columns: state.columns.map((col) => col.id === colId + 1 ? { ...col, value: col.value.length != 0 ? col.limit > col.value.length ? [...col.value, item] : [...col.value] : [item]} : col)})),
    removeItemAndUpdateCol: (item: Item, colId: number) => set((state) => ({ columns: state.columns.map((col) => col.id === colId + 1 ? { ...col, value: col.value.filter((it: Item) => it.specs.name !== item.specs.name) } : col)})),
    //add item sulla dest and remove item dalla source col
    


}));




