// src/components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/bg.png")', // ✅ Use the image from public
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        paddingTop: '80px',  // space for navbar
        paddingBottom: '40px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.88)', // translucent white for readability
          borderRadius: '16px',
          margin: 'auto',
          padding: '2rem',
          maxWidth: '1000px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
