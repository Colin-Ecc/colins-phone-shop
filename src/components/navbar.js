// src/components/Navbar.jsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  // null = “not yet checked” → render server’s default (Login only)
  // ''   = checked, but no user → still show Login
  // 'customer' or 'manager' → show respective links
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const raw = window.localStorage.getItem('user');
    console.log('🚀 raw user JSON:', raw);
    if (raw) {
      try {
        const { acc_type } = JSON.parse(raw);
        console.log('🔑 parsed acc_type:', acc_type);
        setUserType(acc_type);
      } catch (err) {
        console.error('❌ parse error:', err);
        setUserType('');
      }
    } else {
      setUserType('');
    }
  }, []);

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '20px',
  };

  // Initial render or no user → show only Login
  if (userType === null || userType === '') {
    return (
      <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
        <Link href="/login" style={linkStyle}>
          Login
        </Link>
      </nav>
    );
  }

  // Customer
  if (userType === 'customer') {
    return (
      <nav
        style={{
          backgroundColor: '#333',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/dashboard" style={linkStyle}>Products</Link>
        <Link href="/cart" style={linkStyle}>Cart</Link>
        <button
          onClick={() => {
            window.localStorage.removeItem('user');
            window.location.href = '/login';
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </nav>
    );
  }

  // Manager
  if (userType === 'manager') {
    return (
      <nav
        style={{
          backgroundColor: '#333',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/dashboard" style={linkStyle}>Products</Link>
        <Link href="/cart" style={linkStyle}>Cart</Link>
        <Link href="/order" style={linkStyle}>Orders</Link>
        <button
          onClick={() => {
            window.localStorage.removeItem('user');
            window.location.href = '/login';
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </nav>
    );
  }

  return null;
}
