import theme from '@/themes';
import { WorldBound } from '@/types/model';
import { useMediaQuery } from '@mui/material';

export const useOrbitControl = (
  orbitControlRef: React.MutableRefObject<any>
) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const zoomInOut = (zoomStep: number) => {
    if (orbitControlRef.current) {
      const controls: any = orbitControlRef.current;
      const camera = controls.object;

      const newZ = camera.position.z + zoomStep;

      const targetZoom = Math.max(newZ, 3);
      const zoomDuration = 300; // duration in milliseconds
      const startTime = performance.now();

      const animateZoom = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / zoomDuration, 1);
        const newZoom =
          camera.position.z + (targetZoom - camera.position.z) * progress;
        camera.position.z = newZoom;
        controls.update();

        if (progress < 1) {
          requestAnimationFrame(animateZoom);
        }
      };

      requestAnimationFrame(animateZoom);
    }
  };

  const moveOrbitToCenter = (worldBound: WorldBound): Promise<void> => {
    const width = Math.abs(worldBound.xMax - worldBound.xMin);
    const centerPoint = worldBound.xMax - width / 2;

    const control: any = orbitControlRef.current;

    const marginLeft = isMobile ? 0 : -1;
    const targetPosition = {
      x: centerPoint + marginLeft,
      y: worldBound.hasTopModule ? (isMobile ? 1 : 1.4) : 0.5,
      z: 0,
    };

    const startPosition = {
      x: control.target.x,
      y: control.target.y,
      z: control.target.z,
    };

    return animateOrbitControlToPosition(
      control,
      null,
      startPosition,
      targetPosition,
      300
    );
  };

  const animateOrbitControlToPosition = (
    control: any,
    camera: any,
    startPosition: { x: number; y: number; z: number },
    targetPosition: { x: number; y: number; z: number },
    duration: number
  ): Promise<void> => {
    const startTime = performance.now();
    const animate = (resolve: () => void) => (time: number) => {
      const elapsedTime = time - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Interpolate camera position
      if (camera) {
        camera.position.set(
          startPosition.x + (targetPosition.x - startPosition.x) * progress,
          startPosition.y + (targetPosition.y - startPosition.y) * progress,
          startPosition.z + (targetPosition.z - startPosition.z) * progress
        );
      } else {
        control.target.set(
          startPosition.x + (targetPosition.x - startPosition.x) * progress,
          startPosition.y + (targetPosition.y - startPosition.y) * progress,
          startPosition.z + (targetPosition.z - startPosition.z) * progress
        );
      }

      control.update();

      if (progress < 1) {
        requestAnimationFrame(animate(resolve));
      } else {
        resolve();
      }
    };

    return new Promise((resolve) => requestAnimationFrame(animate(resolve)));
  };

  const cameraToFrontView = async (worldBound: WorldBound) => {
    let width = Math.abs(worldBound.xMax - worldBound.xMin);
    let depth = Math.abs(worldBound.zMax - worldBound.zMin);
    width = Math.max(width, 5.5);

    const z = (isMobile ? width * 4.3 : width * 2.3) + depth * 0.2;

    const control: any = orbitControlRef.current;
    const camera = control.object;
    const targetCamera = { x: 0, y: 0, z };

    // Make sure the orbit control is centered
    await moveOrbitToCenter(worldBound);

    return await animateOrbitControlToPosition(
      control,
      camera,
      camera.position,
      targetCamera,
      300
    );
  };

  return {
    zoomInOut,
    moveOrbitToCenter,
    cameraToFrontView,
  };
};
