// src/app/order/page.js
'use client';
import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

export default function OrderPage() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch('/api/getCart')            // or '/api/orders' if that's your endpoint
      .then(r => r.json())
      .then(data => setItems(data))
      .catch(err => {
        console.error(err);
        setItems([]);               // on error, treat as empty
      });
  }, []);

  if (items === null) {
    return <p>Loading your order…</p>;
  }
  if (items.length === 0) {
    return <p>No items in your order.</p>;
  }



  const totalOrders = items.length > 0 ? 1 : 0;

  const totalPrice = items.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          Total Orders Placed: {totalOrders}
        </Typography>
        <Typography variant="h6">
          Total Price: €{totalPrice.toFixed(2)}
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow key={item._id}>
                <TableCell>{item.pname}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
