import { create } from 'zustand/react';

interface CheckoutState {
  showCheckout: boolean;
}
interface Action {
  setShowCheckout: (value: boolean) => void;
}

export const useCheckoutStore = create<CheckoutState & Action>((set) => ({
  showCheckout: false,
  setShowCheckout: (value) => {
    set({ showCheckout: value });
  },
}));
