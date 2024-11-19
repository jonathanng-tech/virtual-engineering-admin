import { GuideLineStore } from '@/store/storeGuideline';
import { useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface State {
  steps?: Step[];
}

interface GuideLineUserDesktopProps {}

export const GuideLineUserDesktop: React.FC<
  GuideLineUserDesktopProps
> = ({}) => {
  const { setShowOne, showGuideLine, setShowGuideLine } = GuideLineStore();
  const [{ steps }, setState] = useState<State>({
    steps: [
      {
        content:
          'You select the products tab and the product group you need, and the product list will appear.',
        placement: 'bottom',
        disableBeacon: true,
        target: '.__tabMenu',
      },
      {
        content:
          'Click to select a product, and the product information will be displayed along with buttons to add the item, add to the left, and add to the right for your customization',
        placement: 'bottom',
        disableBeacon: true,
        target: '.__gridItem',
      },
      {
        content: 'Click the button to open/close the product list box',
        placement: 'bottom',
        disableBeacon: true,
        target: '.__closeButton',
      },
    ],
  });

  const handleJoyrideCallback = ({ status, type }: CallBackProps) => {
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setShowGuideLine(false);
      setShowOne(true);
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      run={showGuideLine}
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
