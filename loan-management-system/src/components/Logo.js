import React from 'react';
import { Box } from '@mui/material';
import standardCharteredLogo from '../assets/images/standard-chartered-logo.png';

const Logo = ({ size = 'medium', showText = true }) => {
  const logoSizes = {
    small: { height: 40 },
    medium: { height: 50 },
    large: { height: 60 }
  };

  const currentSize = logoSizes[size];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={standardCharteredLogo}
        alt="Standard Chartered"
        style={{
          height: currentSize.height,
          width: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
};

export default Logo;