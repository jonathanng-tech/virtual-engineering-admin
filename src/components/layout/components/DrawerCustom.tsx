import * as React from 'react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  Link,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import { Drawer, DrawerHeader, drawerStyles, iconButtonStyles } from './styles';
import { drawerStore, productStore, useBrandStore } from '@/store';
import SearchInput from './SearchInput';
import SortAndViewOptions from './SortAndViewOptions';
import NotFound from './NotFound';
import ColorPalette from './ColorPalette';
import { Spinner } from '@/components/spinner';
import Categories from './Categories';
import GridItem, { ActionButton } from './GridItem';
import Style from './Style';
import { CATEGORY } from '@/configs/constant';
import iconDrawer from '/icons/ic_drawer.svg';
import { GuideLineStore } from '@/store/storeGuideline';
import { useEffect, useState } from 'react';
import { emitter, THREE_EVENTS } from '@/utils/events';
interface DrawerCustomProps {}

const DrawerCustom: React.FC<DrawerCustomProps> = React.memo(({}) => {
  const theme = useTheme();
  const [category, setCategory] = useState<string>('product');
  const [showBorder, setShowBorder] = useState(false);
  const { showOnceModels, setShowGuideLineModels } = GuideLineStore();
  const { openDrawer, toggleDrawer, activeTypeStyle, changeTypeStyle } =
    drawerStore();

  const {
    isLoadingFetchProduct,
    categoryId,
    listFilteredProducts,
    listCart,
    filterProductsByCategory,
  } = productStore();

  const { activeSeries, setIsVisibleModalSeries } = useBrandStore();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue);
  };

  const onChangeTypeStyle = (child: string) => {
    changeTypeStyle(child);
  };

  const handleAnimationAddRangeHood = () => {
    setCategory('product');
    setShowBorder(true);
    // Set border to false after 1000ms
    setTimeout(() => {
      setShowBorder(false);
    }, 300);
  };

  useEffect(() => {
    emitter.on(THREE_EVENTS.animationAddRangeHood, handleAnimationAddRangeHood);
    // Clean up the event listener on unmount
    return () => {
      emitter.off(
        THREE_EVENTS.animationAddRangeHood,
        handleAnimationAddRangeHood
      );
    };
  }, []);

  return (
    <Drawer variant="permanent" open={openDrawer} sx={drawerStyles}>
      <DrawerHeader
        sx={{
          marginTop: '12px',
          border: 'none',
          background: 'transparent',
          padding: 0,
          minHeight: 'unset',
          justifyContent: 'start',
        }}
      >
        {openDrawer && activeSeries && (
          <Breadcrumbs separator={'|'} aria-label="breadcrumb">
            <Link
              key="1"
              onClick={() => setIsVisibleModalSeries(true)}
              color="inherit"
              sx={{
                color: 'black',
                textDecoration: 'none',
                ':hover': { color: 'black' },
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  background: 'black',
                  display: 'flex',
                  borderRadius: '50px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '35px',
                  height: '35px',
                  cursor: 'pointer',
                }}
              >
                <ArrowBackRoundedIcon sx={{ color: 'white' }} />
              </div>
              Back to series
            </Link>
            <Box
              key="2"
              sx={{
                color: 'black',
                textDecoration: 'none',
                ':hover': { color: 'black' },
                fontWeight: '600',
                fontSize: '16px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {`${activeSeries.name} series`}
              <img
                src={
                  activeSeries.thumbnail
                    ? `/${activeSeries.thumbnail}`
                    : `/icons/${activeSeries.id}.svg`
                }
                style={{
                  width: '60px',
                  // height: '33px',
                }}
                alt=""
              />
            </Box>
          </Breadcrumbs>
        )}
        <IconButton
          disableRipple={true}
          onClick={toggleDrawer}
          sx={{
            ...iconButtonStyles,
            margin: openDrawer ? '0 0 0 auto' : 'auto',
            paddingRight: openDrawer ? '0px' : '8px',
          }}
        ></IconButton>
      </DrawerHeader>

      <IconButton
        className="__closeButton"
        disableRipple={true}
        onClick={() => {
          toggleDrawer();
          if (showOnceModels == false && listCart.length != 0) {
            setShowGuideLineModels(true);
          }
        }}
        sx={{
          position: 'absolute',
          padding: '20px 8px',
          background: '#4A4747',
          borderRadius: '6px',
          right: '-15px',
          height: 'max-content',
          top: 0,
          bottom: 0,
          marginTop: 'auto',
          marginBottom: 'auto',
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
            transform: openDrawer ? '' : 'rotate(180deg)',
            color: 'white',
            height: '16px',
            width: 'auto',
          }}
        />
      </IconButton>
      {openDrawer && <Divider sx={{ margin: '8px 0' }} />}
      {openDrawer && (
        <>
          <Tabs
            className="__tabMenuContainer"
            value={category}
            onChange={handleChange}
            sx={{
              minHeight: '34px',
              height: 'max-content',
              justifyContent: 'start',
              '.MuiTabs-indicator': {
                backgroundColor: 'transparent',
              },
              '.Mui-selected': {
                color: 'white !important',
                background: '#4A4747',
              },
              button: {
                minHeight: 'unset',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                padding: '8px 12px',
                minWidth: '160px',
                border: 'none',
                fontSize: '15px',
                outline: 'none',
                background: '#F1F1F1',
              },
            }}
          >
            <Tab
              className="__tabMenu"
              disableRipple={true}
              value="product"
              label="PRODUCTS"
            />
            <Tab disableRipple={true} value="style" label="STYLE" />
          </Tabs>
        </>
      )}
      {openDrawer && (
        <>
          <TabPanel
            value={category}
            initialValue={'product'}
            dir={theme.direction}
          >
            <SearchInput
              sx={{
                background: 'white',
                padding: '4px 8px',
              }}
            />
            <Categories />
          </TabPanel>
          <TabPanel
            value={category}
            initialValue={'style'}
            dir={theme.direction}
            sx={{ marginBottom: '20px' }}
          >
            <Style onChange={onChangeTypeStyle} activeItem={activeTypeStyle} />
          </TabPanel>
        </>
      )}
      {openDrawer && category == 'product' && <SortAndViewOptions />}
      {openDrawer && (
        <Box
          sx={{
            marginTop: '10px',
            overflow: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            flexGrow: 1,
            display: 'flex',
            position: 'relative',
          }}
        >
          {/* check add top */}
          {category == 'product' &&
            !listCart.some((p) => p.categoryId == CATEGORY.BBQ) &&
            categoryId == CATEGORY.RANGE_HOOD && (
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  zIndex: 9999,
                  display: 'flex',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    background: 'white',
                    opacity: 0.8,
                    width: '100%',
                    height: '100%',
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    flexDirection: 'column',
                    margin: 'auto',
                  }}
                >
                  <Box sx={{ marginBottom: '16px', zIndex: 100 }}>
                    Please add the BBQ product first, followed by the range
                    hood.
                  </Box>
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
          {category == 'product' && (
            <Spinner loading={isLoadingFetchProduct}>
              <Box
                className="__tabProductContainer"
                sx={{
                  height: 'max-content',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '2%',
                  rowGap: '0%',
                  justifyContent: 'start',
                  flexGrow: 1,
                  border: showBorder
                    ? '3px solid red'
                    : '1px solid transparent',
                  transition: 'border 0.3s ease-in-out',
                }}
              >
                {/* {gridItems} */}
                {listFilteredProducts.length > 0 &&
                  listFilteredProducts.map((item, index) => (
                    <GridItem
                      key={`${item.name}-${index}`}
                      item={item}
                      onCloseDrawer={() => {}}
                    />
                  ))}
              </Box>
              {listFilteredProducts.length == 0 && <NotFound />}
            </Spinner>
          )}
          {category == 'style' && (
            <Box
              sx={{
                flexGrow: 1,
                overflow: 'scroll',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <ColorPalette />
            </Box>
          )}
        </Box>
      )}
    </Drawer>
  );
});

export default DrawerCustom;

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  initialValue: string;
  value: string;
  sx?: object;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, initialValue, sx, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== initialValue}
      {...other}
      style={{ padding: '0px !important' }}
    >
      {value === initialValue && (
        <Box
          style={{
            margin: '10px 0',
            padding: '0px !important',
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '10px',
            rowGap: '10px',
            ...sx,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}
