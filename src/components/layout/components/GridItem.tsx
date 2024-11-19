import {
  CircularProgress,
  Box,
  Button,
  ClickAwayListener,
  Tooltip,
  Typography,
  useMediaQuery,
  Accordion,
  AccordionDetails,
  Modal,
  Grid2,
} from '@mui/material';
import * as React from 'react';
import { ProductEntity } from '@/types/model';
import { drawerStore, productStore, useBrandStore } from '@/store';
import {
  itemPriceStyle,
  itemTextStyle,
  styleButtonMobile,
  styleModalProduct,
} from './styles';
import { emitter, THREE_EVENTS } from '@/utils/events';
import theme from '@/themes';
import { formatInputCurrency } from '@/utils/currency';
import { useState } from 'react';
import { MODEL_POSITION } from '@/configs/constant';
import { buildThumbnailPath } from '@/utils/helper';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface GridItemProps {
  item: ProductEntity;
  sx?: object;
  onCloseDrawer: () => void;
}

export default function GridItem({
  item,
  sx,
  onCloseDrawer,
}: GridItemProps): React.ReactElement {
  const { isLoading, setLoading, activeProduct, setActiveProduct, listCart } =
    productStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);
  const { openModalProduct, setShowHideModal } = drawerStore();
  const { activeStore } = useBrandStore();

  const handleClickAddLeft = () => {
    setLoading(true);
    emitter.emit(THREE_EVENTS.addLeft, item);
    isMobile && onCloseDrawer();
  };

  const handleClickAddRight = () => {
    setLoading(true);
    emitter.emit(THREE_EVENTS.addRight, item);
    isMobile && onCloseDrawer();
  };

  const handleClickAddTop = () => {
    setLoading(true);
    emitter.emit(THREE_EVENTS.addTop, item);
    isMobile && onCloseDrawer();
  };

  const handleClickAddFront = () => {};

  const handleClickAddBack = () => {};

  const handleClickAway = () => {
    if (openTooltip) {
      setOpenTooltip(false);
      setActiveProduct(null);
    }
  };

  const handleTooltipClick = (event: React.MouseEvent) => {
    // Prevent click from closing the tooltip
    event.stopPropagation();
  };

  const renderActionPosition = () => {
    const isActive = openTooltip && isLoading;

    if (listCart.length == 0) {
      if (item.position == MODEL_POSITION.T) {
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
      if (item.position == MODEL_POSITION.L) {
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
      if (item.position == MODEL_POSITION.R) {
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
      if (item.position == MODEL_POSITION.LR) {
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
    switch (item.position) {
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
    <>
      <ClickAwayListener
        onClickAway={handleClickAway}
        touchEvent={'onTouchEnd'}
        mouseEvent={'onMouseDown'}
      >
        <Box
          className="__gridItem"
          sx={{
            background: 'white',
            position: 'relative',
            cursor: 'pointer',
            width: 'calc(31%)',
            marginBottom: '15px',
            overflow: 'hidden',
            borderRadius: '4px',
            '&.MuiPaper-root': { boxShadow: 'none !important' },
            ...sx,
          }}
        >
          <Tooltip
            onClick={(event: React.MouseEvent) => {
              handleTooltipClick(event);
              setActiveProduct(item);
            }}
            onClose={() => setOpenTooltip(false)}
            placement="right-start"
            disableFocusListener
            disableHoverListener
            disableTouchListener
            componentsProps={{
              tooltip: {
                sx: {
                  margin: '0 !important',
                  width: '100%',
                  maxWidth: '400px',
                  background: '#7F7F7F',
                  backgroundColor: '#7F7F7F',
                  color: 'white',
                  border: '1px solid #82996D',
                },
              },
            }}
            open={openTooltip && activeProduct == item}
            sx={{
              opacity: 1,
            }}
            title={
              <Box
                sx={{
                  width: '280px',
                  margin: '8px',
                  position: 'relative',
                  padding: '4px 0',
                  paddingBottom: '30px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '1.1',
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    marginTop: '6px',
                    fontSize: '14px',
                    lineHeight: '24px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    '-webkit-line-clamp': 2,
                    lineClamp: 2,
                    '-webkit-box-orient': ' vertical',
                    height: '54px',
                  }}
                >
                  {item.description}
                </Typography>
                <Typography
                  onClick={() => setShowHideModal(true)}
                  sx={{
                    marginTop: '4px',
                    fontSize: '14px',
                    lineHeight: '1.3',
                    fontWeight: '600',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    position: 'absolute',
                    left: '0px',
                    bottom: '0px',
                  }}
                >
                  View more
                </Typography>
                <CloseRoundedIcon
                  onClick={() => handleClickAway()}
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    background: 'transparent',
                    borderRadius: '50px',
                  }}
                />
              </Box>
            }
          >
            <Accordion
              expanded={openTooltip && activeProduct == item}
              id={`${item?.id}`}
            >
              <Accordion>
                <Box
                  sx={{ background: '#EFEFEF', paddingTop: '4px' }}
                  onClick={() => {
                    setOpenTooltip(true);
                  }}
                >
                  {activeStore != null &&
                    activeStore.tenant.settings.showPrice == true && (
                      <Typography
                        sx={{
                          ...itemPriceStyle,
                          fontSize: '12px',
                          width: 'max-content',
                          padding: '4px 5px',
                          borderRadius: '2px',
                          marginLeft: 'auto',
                        }}
                      >
                        {item?.price != 0
                          ? formatInputCurrency(
                              item?.price.toString() ?? '',
                              '$',
                              false
                            )
                          : ''}
                      </Typography>
                    )}
                  <Box sx={{}}>
                    <Box
                      sx={{
                        width: '100%',
                        margin: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        '.MuiBox-root': {
                          margin: '0px !important',
                        },
                        '&.MuiBox-root': {
                          margin: '0px !important',
                        },
                        paddingBottom: '15px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={buildThumbnailPath(item.path!, item.thumbnail!)}
                          alt=""
                          width={120}
                          height={120}
                        />
                      </div>
                    </Box>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        padding: '10px 12px',
                        background: 'white',
                      }}
                    >
                      <Typography
                        sx={{
                          ...itemTextStyle,
                          display: ' -webkit-box',
                          WebkitLineClamp: '2 !important',
                          WebkitBoxOrient: 'vertical',
                          textOverflow: ' ellipsis',
                          overflow: 'hidden',
                          padding: 0,
                          fontWeight: '600',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </div>
                  </Box>
                </Box>
              </Accordion>

              <AccordionDetails sx={{ padding: '0 !important' }}>
                <div
                  onClick={() => setActiveProduct(item)}
                  style={{
                    marginBottom: '6px',
                    padding: '0 8px',
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    justifyContent: 'space-between',
                  }}
                >
                  {renderActionPosition()}
                </div>
              </AccordionDetails>
            </Accordion>
          </Tooltip>
        </Box>
      </ClickAwayListener>
      {!isMobile && (
        <Modal
          open={openModalProduct}
          onClose={() => setShowHideModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            '.MuiBackdrop-root': {
              background: '#211d1e1c',
            },
          }}
        >
          <Box sx={styleModalProduct}>
            <Typography
              sx={{
                fontSize: '26px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
              }}
              className={'desc-modal'}
            >
              {item?.name ?? ''}
              <CloseRoundedIcon
                onClick={() => setShowHideModal(false)}
                sx={{
                  color: 'white',
                  marginLeft: 'auto',
                  cursor: 'pointer',
                  width: '34px',
                  height: '34px',
                }}
              />
            </Typography>
            <Grid2 container>
              <Grid2 size={{ desktop: 4 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '15px',
                  }}
                >
                  <img
                    src={buildThumbnailPath(item?.path!, item?.thumbnail!)}
                    alt=""
                    width={'100%'}
                  />
                </div>
              </Grid2>
              <Grid2 size={{ desktop: 8 }}>
                <Typography id="modal-modal-description">
                  {item?.description ?? ''}
                </Typography>
              </Grid2>
            </Grid2>
          </Box>
        </Modal>
      )}
    </>
  );
}

// Common button styles extracted
const buttonStyles = {
  ...styleButtonMobile,
  fontSize: '11px',
  padding: '6px 16px',
  // maxWidth: 'max-content',
  width: '48%',
  maxWidth: 'none',
  background: 'white',
  ':hover': {
    background: 'black',
    color: 'white',
  },
  ':active': {
    background: 'black',
    color: 'white',
  },
  ':focus': {
    background: 'white',
    color: 'black',
  },
  margin: 0,
};

// Reusable button component
export const ActionButton = ({
  onClick,
  isLoading,
  label,
  active,
  isFullWidth = true,
}: any) => (
  <Button
    sx={{
      ...buttonStyles,
      width: isFullWidth ? '100%' : '48%',
      color: '#3692CF',
      border: '1px solid #3692CF',
    }}
    onClick={onClick}
    disabled={isLoading}
  >
    {active && isLoading ? (
      <CircularProgress size={16} color="success" />
    ) : (
      label
    )}
  </Button>
);
