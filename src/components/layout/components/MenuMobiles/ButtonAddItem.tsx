import { productStore } from '@/store';
import { Box } from '@mui/material';
import React, { memo } from 'react';
import { THREE_EVENTS, emitter } from '@/utils/events';
import { MODEL_POSITION } from '@/configs/constant';
import { ActionButton } from '../GridItem';

interface ButtonAddItemProps {
  onCloseDrawer: () => void;
}

const ButtonAddItem: React.FC<ButtonAddItemProps> = memo(
  ({ onCloseDrawer }) => {
    const { isLoading, setLoading, activeProduct, listCart } = productStore();

    const handleClickAddLeft = () => {
      setLoading(true);
      emitter.emit(THREE_EVENTS.addLeft, activeProduct);
      onCloseDrawer();
    };

    const handleClickAddRight = () => {
      setLoading(true);
      emitter.emit(THREE_EVENTS.addRight, activeProduct);
      onCloseDrawer();
    };

    const handleClickAddTop = () => {
      setLoading(true);
      emitter.emit(THREE_EVENTS.addTop, activeProduct);
      onCloseDrawer();
    };

    const handleClickAddFront = () => {};

    const handleClickAddBack = () => {};

    const renderActionPosition = () => {
      const isActive = isLoading;

      if (listCart.length == 0) {
        if (activeProduct?.position == MODEL_POSITION.T) {
          return (
            <ActionButton
              onClick={() => !isLoading && handleClickAddTop()}
              isLoading={isActive}
              label="Add Top"
              active={isActive}
              isEmptyCart={true}
            />
          );
        }
        if (activeProduct?.position == MODEL_POSITION.L) {
          return (
            <ActionButton
              onClick={() => !isLoading && handleClickAddLeft()}
              isLoading={isActive}
              label="Add Item"
              active={isActive}
              isEmptyCart={true}
            />
          );
        }
        if (activeProduct?.position == MODEL_POSITION.R) {
          return (
            <ActionButton
              onClick={() => !isLoading && handleClickAddRight()}
              isLoading={isActive}
              label="Add Item"
              active={isActive}
              isEmptyCart={true}
            />
          );
        }
        if (activeProduct?.position == MODEL_POSITION.LR) {
          return (
            <ActionButton
              onClick={() => !isLoading && handleClickAddLeft()}
              isLoading={isActive}
              label="Add Item"
              active={isActive}
              isEmptyCart={true}
            />
          );
        }
        return null;
      }
      switch (activeProduct?.position) {
        case MODEL_POSITION.T:
          return (
            <ActionButton
              onClick={() => !isLoading && handleClickAddTop()}
              isLoading={isActive}
              label="Add Top"
              active={isActive}
            />
          );
        case MODEL_POSITION.L:
          return (
            <ActionButton
              onClick={() => !isLoading && handleClickAddLeft()}
              isLoading={isActive}
              label="Add Left"
              active={isActive}
            />
          );
        case MODEL_POSITION.R:
          return (
            <ActionButton
              onClick={() => !isLoading && handleClickAddRight()}
              isLoading={isActive}
              label="Add Right"
              active={isActive}
            />
          );
        case MODEL_POSITION.LR:
          return (
            <>
              <ActionButton
                onClick={() => !isLoading && handleClickAddLeft()}
                isLoading={isActive}
                label="Add Left"
                active={isActive}
                isFullWidth={false}
              />
              <ActionButton
                onClick={() => !isLoading && handleClickAddRight()}
                isLoading={isActive}
                label="Add Right"
                active={isActive}
                isFullWidth={false}
              />
            </>
          );
        case MODEL_POSITION.F:
          return (
            <ActionButton
              onClick={() => !isLoading && handleClickAddFront()}
              isLoading={isActive}
              label="Add Front"
              active={isActive}
            />
          );
        case MODEL_POSITION.B:
          return (
            <ActionButton
              onClick={() => !isLoading && handleClickAddBack()}
              isLoading={isActive}
              label="Add Back"
              active={isActive}
            />
          );
        default:
          return null;
      }
    };

    return (
      <Box
        sx={{
          display: 'flex',
          padding: '8px 0 30px 0',
          position: 'relative',
        }}
      >
        {listCart.length == 0 ? (
          <ActionButton
            onClick={() => !isLoading && handleClickAddLeft()}
            isLoading={isLoading}
            label="Add item"
            active={isLoading}
            isEmptyCart={true}
          />
        ) : (
          <Box sx={{ display: 'flex', width: '100%', gap: '8px' }}>
            {renderActionPosition()}
          </Box>
        )}
      </Box>
    );
  }
);

export default ButtonAddItem;
