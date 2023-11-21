import React from 'react';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const NotFoundContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: (theme) => theme.palette.background.default,
  color: (theme) => theme.palette.text.primary,
  fontFamily: 'QuantumCryptographyFont', // Replace with your Quantum Cryptography font
});

export default function NotFound() {
  return (
    <NotFoundContainer>
      <Typography variant="h3">404 - Not Found</Typography>
    </NotFoundContainer>
  );
}
