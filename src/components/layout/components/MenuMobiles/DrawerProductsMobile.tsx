import iconDrawer from '/icons/ic_drawer.svg';
import { drawerStore, productStore, useBrandStore } from '@/store';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  SpeedDial,
  SpeedDialProps,
  Typography,
  styled,
} from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchInput from '../SearchInput';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { buttonSort } from './style';
import GridItemMobile from './GridItemMobile';
import ListItemMobile from './ListItemMobile';
import { Spinner } from '@/components/spinner';
import { CATEGORY } from '@/configs/constant';
import { ActionButton } from '../GridItem';

interface DrawerProductsMobileProps {
  open: boolean;
  handleToggle: (status: string) => void;
  openSortPrice: () => void;
  openSortProduct: () => void;
}

const DrawerProductsMobile: React.FC<DrawerProductsMobileProps> = React.memo(
  ({ open, handleToggle, openSortPrice, openSortProduct }) => {
    const { viewType, changeViewType } = drawerStore();
    const {
      isLoadingFetchProduct,
      listFilteredProducts,
      categoryId,
      listCart,
      filterProductsByCategory,
    } = productStore();
    const { activeSeries } = useBrandStore();

    const [isFullHeight, setIsFullHeight] = useState(false);

    const handleViewTypeChange = () =>
      changeViewType(viewType === 'grid' ? 'list' : 'grid');

    return (
      <Drawer
        sx={{
          zIndex: 999999999,
          '.MuiPaper-root': {
            height: isFullHeight ? '95vh' : '40vh !important',
            padding: '8px 16px',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
            overflow: 'visible',
          },
        }}
        anchor="bottom"
        open={open}
        onClose={handleToggle}
      >
        <Box
          className="__closeButton_mobile"
          onClick={() => handleToggle('')}
          sx={{ position: 'absolute', right: 0, top: 0, padding: '8px' }}
        >
          <img src="/icons/icon-close.png" alt="close" width={24} height={24} />
        </Box>
        <Box
          onClick={() => setIsFullHeight(!isFullHeight)}
          sx={{
            height: 'max-content',
            position: 'absolute',
            top: '-24px',
            left: 0,
            right: 0,
            margin: 'auto',
            width: 'max-content',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <IconButton
            disableRipple={true}
            sx={{
              padding: '8px 24px',
              background: '#B0AFAF',
              borderRadius: '6px',
              width: 'max-content',
              margin: 'auto',
              ':focus': {
                border: 'none',
                outline: 'none',
              },
            }}
          >
            <img
              src={iconDrawer}
              alt=""
              style={{
                color: 'white',
                height: '16px',
                transform: isFullHeight ? 'rotate(270deg)' : 'rotate(90deg)',
              }}
            />
          </IconButton>
          <Typography sx={{ fontSize: '12px' }}>Pull to expand list</Typography>
        </Box>
        <Box sx={{ display: 'flex', marginTop: '24px', position: 'relative' }}>
          <SearchInput
            placeholder={'Search ..'}
            showIconPrefix={false}
            sx={{
              background: 'white',
              '.MuiButtonBase-root': {
                boxShadow: 'none !important',
              },
              border: 'none',
              color: 'black !important',
              button: {
                background: 'white',
                border: 'none',
                outline: 'none',
                ':focus': {
                  background: 'white',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                },
                ':hover': {
                  background: 'white',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                },
                boxShadow: 'none !important',
              },
              boxShadow: 'none !important',
            }}
            handleMobile={() => {}}
          />
        </Box>

        {/* Sorting and View Type Toggle */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
        >
          <Button
            onClick={openSortProduct}
            sx={buttonSort}
            disableRipple={true}
          >
            {categoryId} <ArrowDropDownIcon />
          </Button>
          <img
            onClick={openSortPrice}
            src="/icons/icon-filter.png"
            alt={viewType}
            width={24}
            height={24}
            style={{ marginLeft: 'auto', marginRight: '16px' }}
          />
          <Box
            sx={{ cursor: 'pointer', display: 'flex' }}
            onClick={handleViewTypeChange}
          >
            <img
              src={`/icons/icon-${viewType}.png`}
              alt={viewType}
              width={24}
              height={24}
            />
          </Box>
        </Box>

        {/* Product List */}
        <Spinner loading={isLoadingFetchProduct} size="small">
          <Box
            sx={{
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* check add top */}
            {!listCart.some((p) => p.categoryId == CATEGORY.BBQ) &&
              categoryId == CATEGORY.RANGE_HOOD && (
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center', // Vertically center content
                    justifyContent: 'center', // Horizontally center content
                  }}
                >
                  {/* Semi-transparent background */}
                  <Box
                    sx={{
                      position: 'absolute',
                      backgroundColor: 'white',
                      opacity: 0.8,
                      width: '100%',
                      height: '100%',
                    }}
                  />

                  {/* Centered content */}
                  <Box
                    sx={{
                      // width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      flexDirection: 'column',
                      zIndex: 100, // Ensure content is above the background
                    }}
                  >
                    {/* Text with proper wrapping */}
                    <Box
                      sx={{
                        // width: '100%',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        marginBottom: '16px',
                        textAlign: 'center', // Optional: Center the text horizontally
                        padding: '20px', // Add padding for better appearance
                      }}
                    >
                      Please add the BBQ product first, followed by the range
                      hood.
                    </Box>

                    {/* Action Button */}
                    <ActionButton
                      onClick={() =>
                        filterProductsByCategory(CATEGORY.BBQ, activeSeries?.id)
                      }
                      label="ADD BBQ"
                      isFullWidth={false}
                    />
                  </Box>
                </Box>
              )}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                width: '100%',
                height: '100%',
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {listFilteredProducts.length === 0 ? (
                <NotFoundMobile />
              ) : (
                listFilteredProducts.map((item, index) =>
                  viewType === 'grid' ? (
                    <GridItemMobile key={`${item.name}-${index}`} item={item} />
                  ) : (
                    <ListItemMobile
                      key={`${item.name}-${index}`}
                      item={item}
                      sx={{
                        '&.MuiPaper-root': {
                          width: '100%',
                          height: 'max-content !important',
                          padding: '0px !important',
                          boxShadow: 'none !important',
                        },
                        '.MuiAccordionSummary-content': {
                          width: '100%',
                          padding: '0px !important',
                          margin: '0px 0px 16px 0px !important',
                        },
                      }}
                    />
                  )
                )
              )}
            </Box>
          </Box>
        </Spinner>
      </Drawer>
    );
  }
);

export default DrawerProductsMobile;

export const NotFoundMobile: React.FC = () => {
  const { filterProductsByCategory } = productStore();
  const { activeSeries } = useBrandStore();

  return (
    <Box
      sx={{
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <SearchIcon sx={{ width: '60px', height: '60px', color: '#A3A3A3' }} />
      <Typography
        sx={{ fontSize: '16px', fontWeight: '600', color: '#211d1e' }}
      >
        No result found
      </Typography>
      <Typography
        sx={{ fontSize: '16px', fontWeight: '500', color: '#7A7A7A' }}
      >
        Sorry, there are no results for matching this keyword
      </Typography>
      {/* <Button
        sx={{
          marginTop: '16px',
          marginBottom: '4px',
          border: '1px solid #211d1e',
          width: 'max-content',
          fontSize: '12px',
          fontWeight: '600',
          padding: '12px 16px',
          color: '#211d1e',
          '&:hover': { background: 'none', border: '1px solid #211d1e' },
          '&:focus': {
            background: 'none',
            border: '1px solid #211d1e',
            outline: 'none',
          },
        }}
        onClick={() => filterProductsByCategory(CATEGORY.BBQ, activeSeries?.id)}
      >
        <img src={backButton} alt="back" width={24} />
        {'BACK TO PRODUCTS'}
      </Button> */}
    </Box>
  );
};
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  top: 0,
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    left: theme.spacing(2),
  },
}));
