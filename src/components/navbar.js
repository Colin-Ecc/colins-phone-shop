'use client';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '1rem',
      display: 'flex',
      gap: '20px'
    }}>
      <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
      <a href="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</a>
      <a href="/shoppingcart" style={{ color: 'white', textDecoration: 'none' }}>Cart</a>
      <a href="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</a>
    </nav>
  );
}
