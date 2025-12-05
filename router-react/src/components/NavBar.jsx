// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div className="container">
      <NavLink className="navbar-brand fw-bold" to="/">MyProject</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="nav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/services">Services</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/projects">Projects</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/users">Users</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/UserPut">UserPut</NavLink></li>

        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
