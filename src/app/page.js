'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';


export default function IndexPage() {

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: 'url(/storeimage.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <CssBaseline />
        <h1 style={{ fontSize: '4rem', color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
          Welcome to Colins Phone Store
        </h1>
        
        
      </Box>
    </ThemeProvider>
  );
}
