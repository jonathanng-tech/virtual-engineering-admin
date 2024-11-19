import React, { useEffect } from 'react';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { productStore } from '@/store/storeProducts';
import { delay } from 'lodash';
import { drawerStore } from '@/store';
import theme from '@/themes';
import { useMediaQuery } from '@mui/material';

interface MainMenuProps {
  children: React.ReactNode;
}

export default function MainMenu({ children }: MainMenuProps) {
  const {
    updateListCart,
    setLoading,
    isLoading,
    setActiveProduct,
    activeProduct,
  } = productStore();
  const { openModalProduct, setShowHideModal } = drawerStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  useEffect(() => {
    // Timeout for loading to make sure NEVER loading forever
    if (isLoading) {
      delay(() => {
        setLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleModelLoad = (payload: any) => {
      // delay(() => {}, 1000);
      setLoading(false);

      if (payload.error) {
        return;
      }
      const { model } = payload;
      updateListCart(model.product);

      if (isMobile) {
        setShowHideModal(false);
      }
    };

    emitter.on(THREE_EVENTS.onModelDidLoad, handleModelLoad);

    // Cleanup to prevent duplicate listeners
    return () => {
      emitter.off(THREE_EVENTS.onModelDidLoad, handleModelLoad);
    };
  }, []);

  useEffect(() => {
    if (openModalProduct == false) {
      setActiveProduct(null);
    }
  }, [openModalProduct]);

  return <>{children}</>;
}
