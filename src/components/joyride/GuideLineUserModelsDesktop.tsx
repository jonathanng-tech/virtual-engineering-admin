import { GuideLineStore } from '@/store/storeGuideline';
import { useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface State {
  steps?: Step[];
}

interface GuideLineUserModelsDesktopProps {}

export const GuideLineUserModelsDesktop: React.FC<
  GuideLineUserModelsDesktopProps
> = ({}) => {
  const { setShowOneModels, showGuideLineModels, setShowGuideLineModels } =
    GuideLineStore();
  const [{ steps }, setState] = useState<State>({
    steps: [
      {
        content:
          'Click on the model to remove the selected model from the 3D view.',
        placement: 'bottom',
        disableBeacon: true,
        isFixed: true,
        target: 'canvas',
        floaterProps: {
          styles: {
            container: {
              background: 'red',
            },
            floater: {
              margin: '150px 300px',
              willChange: 'none',
              display: 'block',
            },
          },
        },
        styles: {
          tooltip: {
            right: '0',
            left: '0',
            top: '0',
            bottom: '0',
            margin: 'auto',
          },
        },
      },
    ],
  });

  const handleJoyrideCallback = ({ status, type }: CallBackProps) => {
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setShowGuideLineModels(false);
      setShowOneModels(true);
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      run={showGuideLineModels}
      scrollToFirstStep
      showProgress
      hideCloseButton
      hideBackButton
      styles={{
        tooltipContainer: {
          textAlign: 'start',
        },
        tooltipContent: {
          textAlign: 'start',
        },
        tooltip: {
          textAlign: 'start',
        },
        options: {
          zIndex: 9999999999999,
          width: 'auto',
        },
        buttonNext: {
          background: 'transparent',
          color: 'black',
          border: 'none',
          outline: 'none',
        },
        overlay: {
          zIndex: 99999999,
        },
      }}
      steps={steps}
    />
  );
};
