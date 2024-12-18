import React, { RefObject } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../common/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <link rel="stylesheet" href={`/css/vei_custom.css`} />
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}
      >
        <Header />
        {children}
        <ToastContainer style={{ zIndex: 99999999999 }} />
      </div>
    </>
  );
}
