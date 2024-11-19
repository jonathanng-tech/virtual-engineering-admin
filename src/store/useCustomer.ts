import { create } from 'zustand/react';

interface StateEnvironment {
  showCustomer: boolean;
  showModalSuccess:boolean;
}
interface Action {
  setShowCustomer: (value: boolean) => void;
  setShowModalSuccess:(value:boolean)=>void;
}

export const UseCustomer = create<StateEnvironment & Action>((set) => ({
  showCustomer: false,
  setShowCustomer: (value) => {
    set({ showCustomer: value });
  },
  showModalSuccess:false,
  setShowModalSuccess:(value)=>{
    set({showModalSuccess:value})
  },

}));
