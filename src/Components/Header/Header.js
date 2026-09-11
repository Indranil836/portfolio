import React, { useState } from 'react';
import { Container, Nav, Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../../assets/logo.svg';
import '../../styles/css/Components/Header.min.css';

function Header() {
  const [expanded, setExpanded] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <Navbar 
      expand="lg" 
      className='header_branding' 
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      sticky="top"
    >
      <Container>
        <NavbarBrand as={Link} to="/">
          <img src={Logo} alt="IR" className='img-fluid' />
        </NavbarBrand>
        
        <NavbarToggle 
          aria-controls="basic-navbar-nav" 
          className="hamburger"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </NavbarToggle>
        
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="ms-auto header_links align-items-center">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <a className="nav-link" href='#expertise' onClick={() => setExpanded(false)}>Portfolio</a>
            <a className="nav-link" href='#about' onClick={() => setExpanded(false)}>About Me</a>
            <a className="nav-link" href='#blog' onClick={() => setExpanded(false)}>Blog</a>
            <a className="nav-link" href='#contact' onClick={() => setExpanded(false)}>Contact</a>
            
            <Button
              variant="link"
              className="theme-toggle-btn ms-lg-3 my-2 my-lg-0"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <i className="bi bi-sun-fill theme-icon sun-icon"></i>
              ) : (
                <i className="bi bi-moon-stars-fill theme-icon moon-icon"></i>
              )}
            </Button>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}

export default Header;