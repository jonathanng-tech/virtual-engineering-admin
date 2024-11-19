import { drawerStore } from '@/store';
import { fullscreenStore } from '../../../store/fullscreenStore';
import { use3DCaptureStore } from '@/store/use3DCaptureStore';
import { useDimensionStore } from '@/store/useDimensionStore';
import { useOrbitControl } from './useOrbitControl';
import { useMediaQuery } from '@mui/material';
import theme from '@/themes';
import { WorldBound } from '@/types/model';
import { Vector3 } from 'three';

export const use3DScreenshot = (
  canvasRef: React.RefObject<any>,
  orbitControlRef: React.MutableRefObject<any>
) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { cameraToFrontView } = useOrbitControl(orbitControlRef);
  const { setShowFullScreen } = fullscreenStore();
  const { closeDrawer } = drawerStore();
  const { setCaptureBase64String } = use3DCaptureStore();
  const { setTotalDimension } = useDimensionStore();

  const fullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();

      setShowFullScreen(false);
    } else {
      const body = document.querySelector('body');
      if (body) {
        closeDrawer();
        body.requestFullscreen();
        setShowFullScreen(true);
      }
    }
  };

  const handleScreenshot = async (
    worldBound: WorldBound,
    totalDimension: Vector3
  ) => {
    setTotalDimension(totalDimension);
    await cameraToFrontView(worldBound);

    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const base64 = await takeScreenshot(canvas);
      setCaptureBase64String(base64);
    }
  };

  const takeScreenshot = (canvas: HTMLCanvasElement): Promise<string> => {
    return new Promise<string>((resolve) => {
      const canvasWidthOriginal = canvas.width;
      const canvasHeightOriginal = canvas.height;

      const canvasWidthNew = isMobile
        ? canvasWidthOriginal
        : canvasWidthOriginal * 0.8;
      const canvasHeightNew = isMobile
        ? canvasHeightOriginal * 0.4
        : canvasHeightOriginal * 0.8;

      const offsetY = (canvasHeightOriginal - canvasHeightNew) / 2;
      const offsetX = canvasWidthOriginal - canvasWidthNew;

      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = canvasWidthNew;
      offscreenCanvas.height = canvasHeightNew;
      const context = offscreenCanvas.getContext('2d');

      if (context) {
        context.drawImage(
          canvas,
          offsetX,
          offsetY,
          canvasWidthNew,
          canvasHeightNew,
          0,
          0,
          canvasWidthNew,
          canvasHeightNew
        );

        // Convert the cropped area to a data URL
        const screenshot = offscreenCanvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');

        resolve(screenshot);
      } else {
        resolve('');
      }
    });
  };

  return { fullScreen, handleScreenshot };
};
