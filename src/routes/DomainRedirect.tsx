import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DOMAIN_TENANT_MAP: { [key: string]: string } = {
  'builder.grillkingbbqs.com': '/grill-king',
};

const DomainRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentDomain = window.location.hostname;
    const currentPath = window.location.pathname;

    if (currentPath !== '/') return;

    if (DOMAIN_TENANT_MAP[currentDomain]) {
      navigate(DOMAIN_TENANT_MAP[currentDomain], { replace: true });
    }
  }, [navigate]);

  return null;
};

export default DomainRedirect;
