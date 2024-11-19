import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid2,
} from '@mui/material';
import { productStore, useBrandStore, useStyleStore } from '@/store';
import { formatInputCurrency } from '@/utils/currency';
import { use3DCaptureStore } from '@/store/use3DCaptureStore';
import GrillKing from '/stores/grill-king.svg';
import { getCurrentDate } from '@/utils/helper';
import { StyleEntity } from '@/types/model';
import Logo from '/stores/logo.png';
interface TableCartProps {
  title: string;
}

export default function TableCart({ title }: TableCartProps): JSX.Element {
  const { listCart, cabinetColor, benchtopColor } = productStore();
  const { captureBase64String: base64String } = use3DCaptureStore();
  const { activeStore } = useBrandStore();
  const { dataStyle } = useStyleStore();
  const { activeSeries } = useBrandStore();
  // Filter by active series
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

  return (
    <Box
      sx={{
        padding: '0px 20px',
        height: 'calc(100vh - 55px)',
        boxSizing: 'border-box',
        overflow: 'scroll',
        paddingBottom: '70px',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <Grid2 container sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid2 size={4}>
          <Box>
            <img
              src={activeStore?.tenant.thumbnail ?? Logo}
              alt={activeStore?.tenant.name}
              style={{
                marginTop: '0px',
                marginBottom: '20px',
                width: '140px',
                // marginRight: 'auto',
                // marginLeft: 'auto',
              }}
            />

            {(activeStore?.tenant.description ?? '')
              .replace(/\\n/g, '\n')
              .split('\n')
              .map((str) => (
                <Typography
                  sx={{
                    color: 'black',
                    fontSize: '0.83rem',
                    fontWeight: '600',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {str}
                </Typography>
              ))}
          </Box>
        </Grid2>
        <Grid2 size={8}>
          <img
            src={base64String}
            style={{
              width: '100%',
              height: 'auto',
              // position: 'absolute',
              margin: 'auto',
              left: '0',
              right: '0',
              top: '0',
              objectFit: 'contain',
              bottom: '0%',
            }}
          />
          {/* <Box
            sx={{
              height: 'auto',
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
         
          </Box> */}
        </Grid2>
      </Grid2>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Typography
          sx={{
            color: 'black',
            fontSize: '1.5rem',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: 'black',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          Date: {getCurrentDate()}
        </Typography>
      </Box>

      <TableContainer>
        <Table
          sx={{
            minWidth: 650,

            td: { borderBottom: '1px solid #BABABA !important' },
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow
              sx={{
                th: {
                  fontSize: '18px',
                  fontWeight: '500',
                  background: '#DDDDDD',
                },
              }}
            >
              <TableCell
                sx={{
                  width: '300px',
                }}
              >
                Name
              </TableCell>
              <TableCell align="left">Product Code</TableCell>
              <TableCell align="left">SKU</TableCell>

              <TableCell align="left">Cabinet Color</TableCell>
              <TableCell align="left">Benchtop Color</TableCell>
              {activeStore != null &&
                activeStore.tenant.settings.showPrice == true && (
                  <TableCell align="right">Price</TableCell>
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {listCart.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  // '&:last-child td, &:last-child th': { border: 0 },
                  th: {
                    fontSize: '16px',
                    fontWeight: '600',
                    padding: '20px 16px !important',
                  },
                }}
              >
                <TableCell scope="left">{row.name}</TableCell>
                <TableCell align="left">{row.code ?? ''}</TableCell>
                <TableCell align="left">{row.SKU ?? ''}</TableCell>
                <TableCell align="left">{_cabinetColor()}</TableCell>
                <TableCell align="left">{_benchtopColor()}</TableCell>
                {activeStore != null &&
                  activeStore.tenant.settings.showPrice == true && (
                    <TableCell align="right" sx={{ fontWeight: '600' }}>
                      {formatInputCurrency(
                        (row.price ?? '0').toString(),
                        '$',
                        false
                      )}
                    </TableCell>
                  )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function ListCard({ title }: TableCartProps): JSX.Element {
  const { listCart } = productStore();
  const { activeStore } = useBrandStore();
  const { captureBase64String: base64String } = use3DCaptureStore();
  return (
    <Box sx={{ padding: '8px 16px', height: '100%', boxSizing: 'border-box' }}>
      <Box>
        <img
          src={activeStore?.tenant.thumbnail ?? Logo}
          alt={activeStore?.tenant.name}
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            width: '140px',
          }}
        />
        {(activeStore?.tenant.description ?? '')
          .replace(/\\n/g, '\n')
          .split('\n')
          .map((str) => (
            <Typography
              sx={{
                color: 'black',
                fontSize: '14px',

                fontWeight: '600',
                whiteSpace: 'pre-line',
              }}
            >
              {str}
            </Typography>
          ))}
      </Box>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <img
          src={base64String}
          style={{
            width: '100%',
            height: 'auto',
            margin: 'auto !important',
            marginTop: 'auto !important',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Typography
          sx={{
            color: 'black',
            fontSize: '24px',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: 'black',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          Date: {getCurrentDate()}
        </Typography>
      </Box>
      {listCart.map((row, index) => (
        <Box
          key={index}
          sx={{
            p: {
              color: 'black',
              fontSize: '16px',
              fontWeight: '600',
              marginTop: '10px',
            },
            marginTop: '30px !important',
            marginBottom: '10px !important',
          }}
        >
          <Typography
            sx={{
              color: 'black',
              fontWeight: '600',
            }}
          >
            {row.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '5px',
              alignItems: 'end',
            }}
          >
            <Typography
              sx={{
                color: 'black',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              Product Code
            </Typography>
            <Typography
              sx={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              {row.code}
            </Typography>
          </Box>
          {activeStore != null &&
            activeStore.tenant.settings.showPrice == true && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '5px',
                  alignItems: 'end',
                }}
              >
                <Typography
                  sx={{
                    color: 'black',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  Price
                </Typography>
                <Typography
                  sx={{
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  {formatInputCurrency(
                    (row.price ?? '0').toString(),
                    '$',
                    false
                  )}
                </Typography>
              </Box>
            )}
        </Box>
      ))}
    </Box>
  );
}
