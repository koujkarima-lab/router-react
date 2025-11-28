// src/components/Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className="bg-light py-3 mt-5">
    <div className="container text-center">
      <small>© {new Date().getFullYear()} MyProject </small>
    </div>
  </footer>
);

export default Footer;
