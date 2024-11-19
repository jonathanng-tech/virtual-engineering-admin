import { create } from 'zustand/react';

interface CaptureState {
  captureBase64String: string;
}
interface Action {
  setCaptureBase64String: (base64String: string) => void;
}

export const use3DCaptureStore = create<CaptureState & Action>((set) => ({
  captureBase64String: '',
  setCaptureBase64String: (captureBase64String) => {
    set({ captureBase64String });
  },
}));
