import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';

import React, { useEffect } from 'react';
import { DrawerCustom } from '@/components/layout/components';
import FooterCart from '@/components/layout/components/FooterCart';
import PopoverHelper from '@/components/layout/components/PopoverHelper';
import {
  Box,
  CssBaseline,
  Modal,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MainLayout } from '@/components/layout';
import MainMenu from '@/components/layout/components/MainMenu';
import { KitchenWorld } from '@/components/threejs/KitchenWorld';
import { useNavigate, useParams } from 'react-router-dom';
import MenuMobile from '@/components/layout/components/MenuMobiles/MenuMobiles';
import {
  drawerStore,
  useBrandStore,
  useCategoriesStore,
  useStyleStore,
} from '@/store';
import { productStore } from '@/store/storeProducts';
import { getStoreDetail } from '@/services';
import ModalSeries from '@/components/layout/components/ModalSeries';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { UseCustomer } from '@/store/useCustomer';
import CustomerPage from './CustomerPage';
import CheckoutPage from './CheckoutPage';
import { GuideLineUserDesktop } from '@/components/joyride/GuideLineUserDesktop';
import { GuideLineUserModelsDesktop } from '@/components/joyride/GuideLineUserModelsDesktop';
import { ACTION_CAPTCHA, KEY_CAPTCHA } from '@/configs/constant';
import { Helmet } from 'react-helmet';

const StorePage: React.FC = () => {
  const { openModalProduct, setShowHideModal, openHandleDrawer } =
    drawerStore();
  const { brand, store } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { fetchProducts, activeProduct, clearListCart } = productStore();
  const { fetchStyles } = useStyleStore();
  const { fetchCategories } = useCategoriesStore();
  const {
    activeStore,
    setActiveStore,
    setActiveSeries,
    isVisibleModalSeries,
    setIsVisibleModalSeries,
  } = useBrandStore();
  const { showCheckout, setShowCheckout } = useCheckoutStore();
  const { showCustomer, setShowCustomer } = UseCustomer();

  const hanldeGetStoreDetail = async () => {
    try {
      const data = await getStoreDetail(store as string);
      if (data) {
        // check show modal acitve series
        if (data?.series && data?.series?.length > 0) {
          setIsVisibleModalSeries(true);
        } else {
          fetchProducts(store as string);
          setIsVisibleModalSeries(false);
        }
        //reset state active series
        setActiveSeries(null);
        // set state active store
        setActiveStore(data);
      } else {
        // back to select store
        navigate(`/${brand}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // check store active
  useEffect(() => {
    if (activeStore?.id !== store) {
      hanldeGetStoreDetail();
    } else {
      //reset state active series
      setActiveSeries(null);
      // check show modal acitve series
      if (activeStore?.series && activeStore?.series?.length > 0) {
        setIsVisibleModalSeries(true);
      } else {
        fetchProducts(store as string);
        setIsVisibleModalSeries(false);
      }
    }
    clearListCart();
    setShowCheckout(false);
    setShowCustomer(false);
    openHandleDrawer();
  }, [activeStore, store]);

  // fetch category, product, style
  useEffect(() => {
    fetchCategories(brand as string);
    fetchStyles(brand as string);
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <>
      <Helmet>
        <title>{activeStore?.tenant?.name}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={activeStore?.tenant?.thumbnail}
        />
      </Helmet>
      <GoogleReCaptchaProvider
        reCaptchaKey={`${import.meta.env.VITE_RECAPTCHA_KEY}`}
      >
        <MainLayout>
          {!isMobile && <GuideLineUserDesktop />}
          {!isMobile && <GuideLineUserModelsDesktop />}
          {!isVisibleModalSeries && isMobile && (
            <MainMenu>
              <MenuMobile />
            </MainMenu>
          )}

          <Box
            className="store-page"
            sx={{ height: '100%', overflow: 'hidden' }}
          >
            <PopoverHelper />
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
              }}
            >
              <CssBaseline />
              {!isVisibleModalSeries && !isMobile && (
                <MainMenu>
                  <DrawerCustom />
                </MainMenu>
              )}
              <Box
                onClick={() => {
                  // closeDrawer();
                }}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  canvas: {
                    flexGrow: 1,
                    width: '100% !important',
                  },
                }}
              >
                <KitchenWorld />
              </Box>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {!isVisibleModalSeries && <FooterCart />}
              </Box>
            </Box>
          </Box>
          <Modal open={showCheckout}>
            <CheckoutPage />
          </Modal>
          <Modal open={showCustomer}>
            <CustomerPage />
          </Modal>
          <ModalSeries
            isVisibleModalSeries={isVisibleModalSeries}
            activeStore={activeStore}
          />
        </MainLayout>
        <GoogleReCaptcha
          action={ACTION_CAPTCHA}
          onVerify={(token) => {
            localStorage.setItem(KEY_CAPTCHA, token);
          }}
        />
      </GoogleReCaptchaProvider>
    </>
  );
};

export default StorePage;
