import { Grid2, Checkbox, styled, Typography, Box } from '@mui/material';
import { useStyleStore } from '@/store';

interface StyleProps {
  activeItem: string;
  onChange: (item: string) => void;
}

export default function Style({
  activeItem,
  onChange,
}: StyleProps): JSX.Element {
  const { dataStyleTypes } = useStyleStore();

  return (
    <>
      {dataStyleTypes?.map((child, index) => {
        return (
          <Grid2
            key={index}
            sx={{
              width: 'max-content',
              borderRadius: '4px',
              border: '1px solid rgb(193, 191, 191)',
              padding: '4px 12px',
              fontWeight: '500',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: 'black',
                color: 'white',
                img: {
                  filter: 'drop-shadow(0px 100px 0 #ffffff)',
                  transform: 'translateY(-100px)',
                },
              },
              minWidth: '150px',
              backgroundColor: child == activeItem ? 'black' : 'white',
              color: child == activeItem ? 'white' : 'black',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflow: 'hidden',
            }}
            onClick={() => onChange(child)}
          >
            <BpCheckbox
              checked={child == activeItem}
              value={child}
              label={child}
              onChange={() => {
                onChange(child);
              }}
            />
          </Grid2>
        );
      })}
    </>
  );
}

interface CheckboxProps {
  checked: boolean;
  value: string;
  label: string;
  onChange: () => void;
}
function BpCheckbox({ checked, value, label, onChange }: CheckboxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '8px',
        width: 'max-content',
        padding: '1px 0',
        '.MuiButtonBase-root': {
          padding: '3px !important',
        },
      }}
      onClick={onChange}
    >
      <Checkbox
        checked={checked}
        value={value}
        sx={{ '&:hover': { bgcolor: 'transparent' } }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ 'aria-label': 'Checkbox demo' }}
      />
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: '400',
          textTransform: 'capitalize',
        }}
      >
        {label.toLowerCase()}
      </Typography>
    </Box>
  );
}

export const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50px',
  width: 16,
  height: 16,
  boxShadow:
    'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#black',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
    padding: '0px !important',
  },

  'input:hover ~ &': {
    backgroundColor: '#black',
    ...theme.applyStyles('dark', {
      backgroundColor: '#black',
    }),
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    backgroundColor: '#black',
    ...theme.applyStyles('dark', {
      backgroundColor: '#black',
    }),
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
    backgroundColor: '#black',
  }),
}));

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'black',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  borderRadius: '50px',
  'input:hover ~ &': {
    backgroundColor: 'black',
  },
});
