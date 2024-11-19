import BrandCard from '@/components/brand/BrandCard';
import { Spinner } from '@/components/spinner';
import { getListStore } from '@/services';
import { useBrandStore } from '@/store';
import { StoreEntity, TenantEntity } from '@/types/model';
import { Box, Grid2, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import LogoFooter from '/stores/logo.svg';
import { isEmpty } from 'lodash';

const BrandPage: React.FC = () => {
  const { brand } = useParams();
  const navigate = useNavigate();

  const { activeStore, setActiveStore } = useBrandStore();
  const [loading, setLoading] = useState(true);
  const [dataStore, setDataStore] = useState<StoreEntity[]>([]);

  const [tenant, setTenant] = useState<TenantEntity | null>(null);

  // Fetch the stores based on the tenant ID (brand)
  const hanldeGetListStoreByTenantId = async () => {
    try {
      const data = (await getListStore(brand)) as StoreEntity[];
      if (!isEmpty(data)) {
        setTenant(data[0].tenant);
      }

      setDataStore(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch store list on component mount
  useEffect(() => {
    hanldeGetListStoreByTenantId();
  }, []);

  return (
    <>
      <Helmet>
        <title>{tenant?.name}</title>
        <link rel="icon" type="image/svg+xml" href={tenant?.thumbnail} />
      </Helmet>
      <Box
        className="brand-page"
        sx={{
          width: '100vw',
          height: '100vh',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img
          src={dataStore[0]?.tenant.thumbnail}
          alt={dataStore[0]?.tenant.name}
          style={{
            marginTop: '40px',
            width: '180px',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        />
        <Spinner loading={loading}>
          <Box sx={{ background: 'white' }}>
            <Box sx={{ marginBottom: '20px', padding: '0 16px' }}>
              <Box>
                <Grid2
                  container
                  sx={{
                    marginTop: '14px',
                    width: '100%',
                    flexGrow: 1,
                    gap: '15px',
                    borderRadius: '8px',
                    justifyContent: 'center',
                  }}
                >
                  {dataStore.map((store) => {
                    return (
                      <BrandCard
                        key={store.id}
                        store={store}
                        isActive={store === activeStore}
                        handleTapCard={() => {
                          setActiveStore(store);
                          navigate(`/${brand}/${store.id}`);
                        }}
                      />
                    );
                  })}
                </Grid2>
              </Box>
            </Box>
          </Box>
        </Spinner>
        <Box
          sx={{ marginTop: 'auto', background: '#F5F5F5', padding: '20px 0' }}
        >
          <Typography
            sx={{
              color: 'black',
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Powered by{' '}
            <img
              src={LogoFooter}
              alt="Virtual Engineering"
              style={{
                width: '30px',
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
            />
            Virtual Engineering
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default BrandPage;
