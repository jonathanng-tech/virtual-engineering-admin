import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { create } from 'zustand/react';

interface StateEnvironment {
  environmentState: PresetsType;
}
interface Action {
  setEnvironmentState: (
    environmentState: StateEnvironment['environmentState']
  ) => void;
}
export const use3DEnvironmentStore = create<StateEnvironment & Action>(
  (set) => ({
    environmentState: 'city',
    setEnvironmentState: (environmentState) => {
      set(() => ({ environmentState }));
    },
  })
);
