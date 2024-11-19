import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MainLayout } from '@/components/layout';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup'; // Import Yup
import React, { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Formik, Form } from 'formik';
import { FieldInput } from '@/components/field/field';
import { UseCustomer } from '@/store/useCustomer';
import { createCustomerInfo } from '@/services/api/customer';
import { InputCustomerInfo, StyleEntity } from '@/types/model';
// import { UsePDF } from '@/store/storePdf';
import { productStore, useBrandStore, useStyleStore } from '@/store';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { Bounce, toast } from 'react-toastify';
import { calculateTotalPrice } from '@/components/checkout/BillCheckout';
import { use3DCaptureStore } from '@/store/use3DCaptureStore';
import { useDimensionStore } from '@/store/useDimensionStore';

const CustomerPage: React.FC = () => {
  const { activeStore } = useBrandStore();
  const [loading, setLoading] = useState(false);
  const { brand, store } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { listCart, clearListCart, cabinetColor, benchtopColor } =
    productStore();
  const { totalDimension } = useDimensionStore();
  // const { blobUrl } = UsePDF();
  const { setShowCustomer, showModalSuccess, setShowModalSuccess } =
    UseCustomer();
  const { setShowCheckout } = useCheckoutStore();
  const totalPrice = calculateTotalPrice(listCart);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    // .matches(
    //   /^(?:\+61[2-9][0-9]{8}|\+64[1-9][0-9]{7,8})$/,
    //   'Phone Number must be in the format +61 (AU) or +64 (NZ) followed by digits.'
    // ),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const { captureBase64String } = use3DCaptureStore();

  const { dataStyle } = useStyleStore();
  const { activeSeries } = useBrandStore();

  const filteredDataStyles = activeSeries?.id
    ? dataStyle?.filter((p) => p.serieIds?.includes(activeSeries.id))
    : dataStyle;

  const _cabinetColor = () => {
    let color = cabinetColor?.name;
    if (!color) {
      filteredDataStyles?.forEach((style: StyleEntity) => {
        if (style.type?.toLowerCase() === 'cabinet' && style.default) {
          color = style.name;
        }
      });
    }

    return color;
  };

  const _benchtopColor = () => {
    let color = benchtopColor?.name;
    if (!color) {
      filteredDataStyles?.forEach((style: StyleEntity) => {
        if (style.type?.toLowerCase() === 'benchtop' && style.default) {
          color = style.name;
        }
      });
    }

    return color;
  };

  const handleSubmit = async (input: InputCustomerInfo) => {
    try {
      setLoading(true);
      const result = await createCustomerInfo(input);
      if (result) {
        setShowModalSuccess(true);
      }
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.errors?.[0]?.message ||
        'An unexpected error occurred';
      toast.warn(errorMessage, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Grid2
        className="customer-page"
        container
        sx={{
          background: 'white',
          flexGrow: 1,
          overflow: 'scroll',
          paddingBottom: '50px',
        }}
      >
        <Box
          onClick={() => setShowCustomer(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            cursor: 'pointer',
            marginLeft: '20px',
            marginTop: '20px',
            color: 'black',
            gap: '8px',
            width: 'max-content',
            position: isMobile ? 'relative' : 'absolute',
          }}
        >
          <Box
            sx={{
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
            <CloseRoundedIcon sx={{ color: 'white' }} />
          </Box>
        </Box>
        <Box
          sx={{
            maxWidth: '735px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            input: {
              background: 'white !important',
              backgroundColor: 'white !important',
              width: '100%',
              border: '1px solid #C7C7C7',
              padding: '12px',
              boxSizing: 'border-box',
              color: 'black',
              ':focus': {
                background: 'white !important',
                backgroundColor: 'white !important',
                border: '1px solid #C7C7C7',
                outline: '1px solid #C7C7C7',
                colorScheme: 'white',
              },
              colorScheme: 'white',
            },
            padding: {
              mobile: '0 16px',
              desktop: '0',
            },
          }}
        >
          <Typography
            sx={{
              color: 'black',
              fontSize: '30px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            Customer details
          </Typography>
          <Typography
            sx={{
              color: 'black',
              fontSize: '14px',
              fontWeight: '500',
              textTransform: 'uppercase',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            Fill your details for your design to be emailed to you.
          </Typography>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              phoneNumber: '',
              email: '',
              postcode: '',
              address: '',
            }}
            validationSchema={validationSchema} // Thêm schema xác thực
            onSubmit={(values) => {
              const input: InputCustomerInfo = {
                fullname: `${values.firstName} ${values.lastName}`,
                phone: values.phoneNumber,
                email: values.email,
                address: `${values.postcode ? `${values.postcode}, ` : ''}${values.address}`,
                checkoutForm: {
                  products: listCart.map((p0) => ({
                    SKU: p0.SKU,
                    code: p0.code,
                    name: p0.name,
                    price: p0.price,
                    serieIds: p0.serieIds,
                    storeIds: p0.storeIds,
                    brandName: p0.brandName,
                    cabinetColor: _cabinetColor(),
                    benchtopColor: _benchtopColor(),
                  })),
                  totalPrice: totalPrice,
                  totalDimension: {
                    d: totalDimension.z,
                    h: totalDimension.y,
                    w: totalDimension.x,
                  },
                },
                storeId: store ?? '',
                tenantId: brand ?? '',
                attachFile: captureBase64String,
                totalPrice: totalPrice,
                shouldShowNote:
                  totalPrice >
                  (activeStore!.tenant.settings.minDiscountQuota ?? 0),
                // attachFile: captureBase64String.replace(
                //   /^data:image\/octet-stream;base64,/,
                //   ''
                // ),
              };

              handleSubmit(input);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid2 container spacing={2} rowSpacing={3}>
                  <Grid2 size={{ mobile: 12, tablet: 12, desktop: 6 }}>
                    <FieldInput
                      name="firstName"
                      errors={errors}
                      touched={touched}
                      placeholder="First Name*"
                    />
                  </Grid2>
                  <Grid2 size={{ mobile: 12, tablet: 12, desktop: 6 }}>
                    <FieldInput
                      name="lastName"
                      errors={errors}
                      touched={touched}
                      placeholder="Last Name*"
                    />
                  </Grid2>
                  <Grid2 size={{ mobile: 12, tablet: 12, desktop: 4 }}>
                    <FieldInput
                      name="phoneNumber"
                      type="text" // Chỉnh sửa type cho đúng
                      errors={errors}
                      touched={touched}
                      placeholder="Phone number*"
                    />
                  </Grid2>
                  <Grid2 size={{ mobile: 12, tablet: 12, desktop: 8 }}>
                    <FieldInput
                      name="email"
                      type="email"
                      errors={errors}
                      touched={touched}
                      placeholder="Email*"
                    />
                  </Grid2>
                  <Grid2 size={{ mobile: 12, tablet: 12, desktop: 4 }}>
                    <FieldInput
                      name="postcode"
                      placeholder="Postcode"
                      errors={{}}
                      touched={{}}
                    />
                  </Grid2>
                  <Grid2 size={{ mobile: 12, tablet: 12, desktop: 8 }}>
                    <FieldInput
                      name="address"
                      placeholder="Home address"
                      errors={{}}
                      touched={{}}
                    />
                  </Grid2>
                </Grid2>

                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      marginTop: '40px',
                      color: 'black',
                      fontSize: '10px',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      maxWidth: '500px',
                      marginBottom: '20px',
                    }}
                  >
                    This site is protected by Recaptcha and the Google
                    <span style={{ fontWeight: 'bold' }}> Privacy Policy </span>
                    and
                    <span style={{ fontWeight: 'bold' }}>Term of Service </span>
                    apply
                  </Typography>
                  {totalPrice >
                    (activeStore!.tenant.settings.minDiscountQuota ?? 0) && (
                    <Typography
                      sx={{
                        color: 'red',
                        fontSize: '14px',
                        lineHeight: '1.3',
                        marginBottom: '20px',
                        textAlign: 'center',
                      }}
                    >
                      After you have received the quote in the email, call us
                      right away for a further 10% discount.
                    </Typography>
                  )}
                  <button
                    type="submit"
                    style={{
                      marginTop: '20px',
                      background: 'black',
                      color: 'white',
                      padding: '10px 0px',
                      fontSize: '16px',
                      width: '100%',
                      maxWidth: '300px',
                      margin: 'auto',
                      borderRadius: '0',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                    }}
                  >
                    Receive Email
                  </button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid2>
      <Modal
        open={loading}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CircularProgress size={isMobile ? 20 : 40} sx={{ color: '#EBB91A' }} />
      </Modal>
      <Modal
        open={showModalSuccess}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            margin: 'auto',
            height: 'max-content',
            maxWidth: '800px',
            backgroundColor: 'white',
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
            alignItems: 'center',
            flexDirection: 'column',
            gap: '30px',
            textAlign: 'center',
            padding: '5%',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: 'bold',
              }}
            >
              THANK YOU
            </Typography>
            <Typography
              sx={{
                fontSize: isMobile ? '1rem' : '1.5rem',
                fontWeight: 'bold',
              }}
            >
              Your information has been successfully submitted
            </Typography>
          </Box>
          <Button
            onClick={() => {
              setShowModalSuccess(false);
              setShowCustomer(false);
              setShowCheckout(false);
              clearListCart();
              emitter.emit(THREE_EVENTS.removeAllModel);
            }}
            sx={{
              background: 'black',
              color: 'white',
              padding: isMobile ? '10px 10px' : '10px 20px',
              fontSize: '16px',
              width: '100%',
              maxWidth: '300px',
              margin: 'auto',
              borderRadius: '8px',
              fontWeight: '600',
              textTransform: 'uppercase',
              border: '1px solid black',
              '&:hover': {
                border: '1px solid black',
              },
            }}
          >
            Go to home
          </Button>
        </Box>
      </Modal>
    </MainLayout>
  );
};

export default CustomerPage;
