import { useState, memo } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Breadcrumbs,
  Link,
  useMediaQuery,
  Modal,
} from '@mui/material';
import { LIST_DRAWER, LIST_SORT_TYPE } from '@/configs/constant';
import {
  drawerStore,
  productStore,
  useBrandStore,
  useStyleStore,
} from '@/store';
import DrawerSortMobile from './DrawerSortMobile';
import DrawerProductsMobile from './DrawerProductsMobile';
import DrawerStylesMobile from './DrawerStylesMobile';
import DrawerCategoriesMobile from './DrawerCaterogiesMobile';
import DrawerStyleTypesMobile from './DrawerStyleTypesMobile';
import DrawerProductDesc from './DrawerProductDesc';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import theme from '@/themes';
import { GuideLineStore } from '@/store/storeGuideline';
interface MenuMobileProps {}

const MenuMobile: React.FC<MenuMobileProps> = memo(() => {
  const [openSortPrice, setOpenSortPrice] = useState<boolean>(false);
  const [openSortProduct, setOpenSortProduct] = useState<boolean>(false);
  const [openSortStyle, setOpenSortStyle] = useState<boolean>(false);
  // const [openDrawerMobile, setOpenDrawerMobile] = useState<
  //   'STYLE' | 'PRODUCT' | ''
  // >('PRODUCT');
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const [value, setValue] = useState('PRODUCT');
  const { activeSeries, setIsVisibleModalSeries } = useBrandStore();
  const { dataStyleTypes } = useStyleStore();
  const { orderType, changeOrderType, setActiveProduct } = productStore();
  const {
    activeTypeStyle,
    changeTypeStyle,
    openDrawerMobile,
    setOpenDrawerMobile,
  } = drawerStore();
  const {
    showGuideLineModels,
    showOnceModels,
    setShowGuideLineModels,
    setShowOneModels,
  } = GuideLineStore();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const toggleDrawer = (drawerType: 'STYLE' | 'PRODUCT') => {
    setOpenDrawerMobile(drawerType);
  };

  const toggleSortPrice = () => setOpenSortPrice((prev) => !prev);
  const toggleSortProduct = () => setOpenSortProduct((prev) => !prev);
  const toggleSortStyle = () => setOpenSortStyle((prev) => !prev);
  const { openModalProduct } = drawerStore();

  return (
    <>
      {activeSeries && (
        <Box sx={{ padding: '8px 16px' }}>
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
            </Box>
          </Breadcrumbs>
        </Box>
      )}
      <Tabs
        value={value}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        className="__tabMenu_mobile"
        sx={{
          width: '100vw',
          background: 'white',
          minHeight: isMobile ? 'unset !important' : '48px',
          height: isMobile ? 'max-content' : '',
          zIndex: 99,
          'button:focus': { outline: 'none', border: 'none' },
          '.MuiTabs-flexContainer': {
            alignItems: 'center',
            height: isMobile ? 'max-content' : '48px',
            padding: '0 16px',
          },
          '.MuiTabs-scroller': {
            height: isMobile ? 'max-content' : '48px',
          },
          '.Mui-selected': {
            color: 'white !important',
            background: '#4A4747 !important',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
          },
          '.MuiTabs-indicator': {
            backgroundColor: 'transparent',
          },
          button: {
            minHeight: isMobile ? 'unset !important' : '48px',
            height: isMobile ? '39px' : '',
          },
        }}
      >
        {LIST_DRAWER.map(({ name, type, icon }, index) => (
          <Tab
            key={index}
            iconPosition="start"
            disableRipple
            sx={{
              width: '50%',
              color: 'black',
              fontSize: '15px',
              opacity: 1,
            }}
            value={type}
            label={name}
            onClick={() =>
              (type === 'STYLE' || type === 'PRODUCT') && toggleDrawer(type)
            }
          />
        ))}
      </Tabs>
      {/* Drawer for Styles */}
      <DrawerStylesMobile
        open={openDrawerMobile === 'STYLE'}
        handleToggle={() => toggleDrawer('STYLE')}
        openSort={toggleSortStyle}
      />
      {/* Drawer for Products */}
      <DrawerProductsMobile
        open={openDrawerMobile === 'PRODUCT'}
        handleToggle={() => toggleDrawer('PRODUCT')}
        openSortPrice={toggleSortPrice}
        openSortProduct={toggleSortProduct}
      />
      {/* Sort Drawer for Price */}
      <DrawerSortMobile
        title="Sort By"
        listSortItems={LIST_SORT_TYPE}
        open={openSortPrice}
        handleClick={toggleSortPrice}
        activeItem={orderType}
        changeOrderType={changeOrderType}
        onClose={() => setOpenSortPrice(false)}
      />
      {/* Sort Drawer for Product Categories */}
      <DrawerCategoriesMobile
        open={openSortProduct}
        handleClick={toggleSortProduct}
        onClose={() => setOpenSortProduct(false)}
      />
      {/* Sort Drawer for Styles */}
      <DrawerStyleTypesMobile
        listSortItems={dataStyleTypes ?? []}
        open={openSortStyle}
        handleClick={toggleSortStyle}
        activeItem={activeTypeStyle}
        changeType={changeTypeStyle}
        onClose={() => setOpenSortStyle(false)}
      />
      {/* Drawer product description */}
      <DrawerProductDesc
        open={openModalProduct}
        handleClick={() => {
          setOpenDrawerMobile('');
          if (showOnceModels == false) {
            setShowGuideLineModels(true);
          }
        }}
      />
      <Modal
        onClose={() => {
          setShowGuideLineModels(false);
          setShowOneModels(true);
        }}
        open={showGuideLineModels}
        sx={{
          bottom: 0,
          marginTop: 'auto',
          justifyContent: 'end',
          alignItems: 'end',
          display: 'flex',
          '.MuiBackdrop-root': {
            justifyContent: 'end',
            alignItems: 'end',
          },
        }}
      >
        <Box
          sx={{
            background: 'white',
            bottom: 0,
            marginLeft: '16px',
            marginRight: '16px',
            marginTop: 'auto ',
            marginBottom: 'auto ',
            borderRadius: '10px',
            width: '100%',
            padding: '25px',
          }}
        >
          Click on the model to remove the selected model from the 3D view.
        </Box>
      </Modal>
    </>
  );
});

export default MenuMobile;
