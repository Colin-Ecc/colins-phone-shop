import './globals.css';
import Navbar from '../components/navbar';
import SessionWrapper from './session-provider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const metadata = {
  title: "Colin's Phone Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Navbar />
          <main style={{ padding: '20px' }}>
            {children}
          </main>
          <Box
            component="footer"
            sx={{
              mt: 4,
              mt: 10,
              py: 2,
              textAlign: 'center',
              borderTop: '1px solid #ddd',
              bgcolor: '#3396ff', 
            }}
          >
            <Typography variant="body2">
              1 Dublin Road, Dublin, Ireland
            </Typography>
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} Colin's Phone Shop
            </Typography>
          </Box>

        </SessionWrapper>
      </body>
    </html>
  );
  
}
