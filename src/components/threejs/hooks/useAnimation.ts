import * as THREE from 'three';

export const useAnimation = () => {
  const playAnimation = (actions: any, name: string) => {
    console.log('[playAnimation] ', name);
    let action = actions[name];
    if (action) {
      action.play(); // Play the animation
      action.reset(); // Reset the animation to the beginning

      // // Optional: You can control other aspects of the animation here (loop, speed, etc.)
      action.clampWhenFinished = true; // Clamp the animation at the end
      action.loop = THREE.LoopOnce;
      return;
    }
  };

  return { playAnimation };
};
