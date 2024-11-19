import 'react';
import {
  Box,
  Divider,
  Grid2,
  Modal,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { SeriesEntity, StoreEntity } from '@/types/model';
import { drawerStore, productStore, useBrandStore } from '@/store';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import theme from '@/themes';
import { useParams } from 'react-router-dom';
import { GuideLineStore } from '@/store/storeGuideline';
import { STYLE } from '@/configs/constant';

interface ModalSeriesProps {
  isVisibleModalSeries: boolean;
  activeStore: StoreEntity | null;
}

export default function ModalSeries({
  isVisibleModalSeries,
  activeStore,
}: ModalSeriesProps) {
  const { changeTypeStyle } = drawerStore();
  const { fetchProducts, clearListCart, resetCategoryAndStyle } =
    productStore();
  const { showOnce, setShowGuideLine } = GuideLineStore();
  const { activeSeries, setActiveSeries, setIsVisibleModalSeries } =
    useBrandStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { store } = useParams();

  const handleActiveSeries = (series: SeriesEntity) => {
    // clear cart when change series
    if (activeSeries?.id != series.id) {
      clearListCart();
      resetCategoryAndStyle();
      changeTypeStyle(STYLE.CABINET);
    }
    fetchProducts(store as string, series?.id);
    setActiveSeries(series);
    setIsVisibleModalSeries(false);
    if (showOnce == false) {
      setShowGuideLine(true);
    }
  };

  return (
    <>
      <Modal open={isVisibleModalSeries}>
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            margin: isMobile ? 'auto 16px 12px 16px' : 'auto',
            height: 'max-content',
            maxWidth: '800px',
            maxHeight: isMobile ? '80vh' : '80vh',
            overflow: 'hidden',
            backgroundColor: isMobile ? 'white' : 'rgb(255 255 255 / 50%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '6px',
            ':focus': {
              border: '1px solid white',
              outline: 'none',
            },
            ':focus-visible': {
              border: '1px solid white',
              outline: 'none',
            },
            ':active': {
              border: '1px solid white',
              outline: 'none',
            },
            border: '1px solid white',
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '30px',
          }}
        >
          {activeSeries != null && (
            <CloseRoundedIcon
              onClick={() => setIsVisibleModalSeries(false)}
              sx={{
                position: 'absolute',
                width: '40px',
                height: '40px',
                top: '10px',
                right: '10px',
                background: 'black',
                color: 'white',
                borderRadius: '50px',
              }}
            />
          )}
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '26px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginTop: '40px',
              marginBottom: '25px',
            }}
          >
            Select series
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'scroll',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              // padding: '0 30px',
            }}
          >
            {activeStore?.series.map((series, index) => {
              const isActive = activeSeries === series;
              return (
                <SeriesItem
                  key={`${series.name}-${index}`}
                  index={index}
                  isMobile={isMobile}
                  series={series}
                  handleActiveSeries={handleActiveSeries}
                  setActiveSeries={setActiveSeries}
                />
              );
            })}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

interface SeriesItemProps {
  index: number;
  isMobile: boolean;
  series: SeriesEntity;
  setActiveSeries: (item: SeriesEntity) => void;
  handleActiveSeries: (item: SeriesEntity) => void;
}

function SeriesItem({
  series,
  handleActiveSeries,
  isMobile,
  index,
}: SeriesItemProps) {
  return (
    <>
      {index != 0 && isMobile && <Divider />}
      <Grid2
        onClick={() => handleActiveSeries(series)}
        container
        sx={{
          cursor: 'pointer',
          maxWidth: '580px',
          display: 'flex',
          margin: isMobile ? '0 20px' : 'auto',
          marginTop: '10px',
          marginBottom: '10px',
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
          ':active': {
            outline: 'none',
            boxShadow: 'none',
          },
          ':hover': {
            outline: 'none',
            boxShadow: 'none',
            background: 'white',
            border: '2px solid #F5943D',
          },
          border: '2px solid white',
          height: '100%',
          maxHeight: 'unset',
          background: 'white',
          borderRadius: '6px',
          padding: 0,
          position: 'relative',
        }}
      >
        <Grid2
          size={{ mobile: 12, tablet: 4 }}
          sx={{
            padding: '12px 16px',
            boxSizing: 'border-box',
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            flexDirection: 'column',
            flexGrow: 1,
            maxHeight: 'unset',
          }}
        >
          <img
            src={
              series.thumbnail
                ? `/${series.thumbnail}`
                : `/icons/${series.id}.svg`
            }
            alt=""
            style={{
              width: isMobile ? '150px' : '100%',
              height: 'auto',
              margin: 'auto',
            }}
          />
        </Grid2>
        <Grid2
          size={{ mobile: 12, tablet: 8 }}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start',
            padding: '10px',
            borderLeft: isMobile ? '' : '1px solid #D1D1D1',
          }}
        >
          <Typography
            sx={{
              color: '#555555',
              fontSize: '16px',
              fontWeight: 600,
              textAlign: 'start',
              textDecoration: 'underline',
            }}
          >
            {series.name}
          </Typography>
          <Typography
            sx={{
              color: 'black',
              fontSize: '14px',
              textAlign: 'start',
              fontWeight: 400,
              marginTop: '8px',
              paddingBottom: '20px',
            }}
          >
            {(series.description ?? '').substring(0, 300)}
          </Typography>
        </Grid2>
        <Box sx={arrowBoxStyles}>
          <ArrowForwardRoundedIcon sx={arrowIconStyles} />
        </Box>
      </Grid2>
    </>
  );
}

const arrowBoxStyles = {
  borderRadius: '50px',
  background: 'black',
  width: '35px',
  height: '35px',
  display: 'flex',
  right: '5px',
  bottom: '5px',
  position: 'absolute',
};

const arrowIconStyles = {
  color: 'white',
  margin: 'auto',
};
