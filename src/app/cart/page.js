'use client';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';

export default function Page() {
  // function for putting items into the cart.
  function putInCart(item) {
    console.log("putting in cart:", item);
    fetch("/api/putInCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pname: item.pname,
        price: item.price,
      }),
    });
  }

  // function for removing items from the cart.
  function removeFromCart(itemId) {
  console.log("removing from cart:", itemId);
  fetch("/api/removeFromCart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: itemId }),
  })
    .then(res => res.json())
    .then(result => {
      if (result.deletedCount === 1) {
        // remove from local state so UI updates
        setData(prev => prev.filter(item => item._id !== itemId));
      } else {
        console.error("No item deleted:", result);
      }
    })
    .catch(err => console.error("Remove error:", err));
}
  const [data, setData] = useState(null);
  const [weather, setWeatherData] = useState(0);

  useEffect(() => {
    fetch('api/getCart')
      .then(res => res.json())
      .then(data => {
        console.log("Cart items:", data);
        setData(data);
      })
      .catch(err => console.error("Fetch error:", err));

    fetch('api/getWeather')
      .then(res => res.json())
      .then(weather => {
        setWeatherData(weather);
      })
      .catch(err => console.error("Weather fetch error:", err));
  }, []);

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  const handleCheckout = () => {
    const cart = data || [];
    if (cart.length === 0) return alert("Your cart is empty.");
console.log(cart);
console.log(data);

    fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart),
    })
      .then(res => res.json())
      .then(response => {
        alert("Order placed successfully!");
      })
      .catch(err => {
        console.error("Checkout error:", err);
        alert("Checkout failed.");
      });

    console.log(JSON.parse(localStorage.getItem('cart')));
  };

  if (!data) return <p>No data</p>;
  if (!weather) return <p>No weather</p>;

  const total = data.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <ThemeProvider theme={theme}>
      Today's temperature: {JSON.stringify(weather.temp)}
      <Container component="main" maxWidth="xs">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">
            Total: €{total.toFixed(2)}
          </Typography>
        </Box>
        <div style={{ fontSize: '40px' }}>cart</div>
        <div>
          {data.map((item, i) => (
            <Box key={item._id} sx={{ p: 2, border: '1px solid #ccc', mb: 1 }}>
              <Typography>
                Unique ID: {item._id}
              </Typography>
              <Typography>
                {item.pname} - {item.price}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </Button>
            </Box>
            
          ))}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 4 }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  );
}
