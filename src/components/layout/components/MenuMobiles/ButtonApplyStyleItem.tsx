// import { drawerStore, productStore } from '@/store';
// import { Box, Button } from '@mui/material';
// import React, { memo } from 'react';
// import { styleButtonMobile } from '../styles';
// import { emitter, THREE_EVENTS } from '@/utils/events';

// interface ButtonApplyStyleItemProps {
//   onCloseDrawer: () => void;
// }

// const ButtonApplyStyleItem: React.FC<ButtonApplyStyleItemProps> = memo(
//   ({ onCloseDrawer }) => {
//     const {
//       isLoading,
//       // cabinetColor,
//       // benchtopColor,
//       // setCabinetColor,
//       // setBenchtopColor,
//     } = productStore();
//     // const { activeTypeStyle } = drawerStore();

//     function setStyle() {
//       // let styleActive;
//       // if (activeTypeStyle === 'CABINET') {
//       //   styleActive = selectCabinetColor;
//       //   setCabinetColor(selectCabinetColor);
//       // } else {
//       //   styleActive = selectBenchtopColor;
//       //   setBenchtopColor(selectBenchtopColor);
//       // }
//       // emitter.emit(
//       //   THREE_EVENTS.changeMaterial,
//       //   styleActive?.type?.toLowerCase(),
//       //   `${import.meta.env.VITE_S3_URL}/${styleActive?.path ?? ''}`
//       // );
//       // onCloseDrawer();
//     }

//     // const isVisible = cabinetColor != null || benchtopColor != null;
//     const isVisible = true;

//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           padding: '8px 0 30px 0',
//           position: 'relative',
//         }}
//       >
//         <Button
//           sx={{
//             ...styleButtonMobile,
//             textTransform: 'uppercase',
//             fontSize: '16px',
//             marginTop: 0,
//             color: isVisible ? ' black' : ' #A3A3A3',
//             border: isVisible ? '2px solid black' : '2px solid #A3A3A3',
//             ':focus': {
//               border: isVisible ? '2px solid black' : '2px solid #A3A3A3',
//             },
//             ':hover': {
//               border: isVisible ? '2px solid black' : '2px solid #A3A3A3',
//             },
//           }}
//           onClick={() => {
//             if (!isLoading && isVisible) {
//               setStyle();
//             }
//           }}
//         >
//           APPLY
//         </Button>
//       </Box>
//     );
//   }
// );

// export default ButtonApplyStyleItem;
