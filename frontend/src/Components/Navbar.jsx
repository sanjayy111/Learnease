import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../src/assets/logo.png';
import menu_icon from '../assets/menu-icon.png';

import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // ❌ Disable scroll effect on login page
    if (location.pathname === "/login") {
      setSticky(true); // keep navbar dark always
      return;
    }

    const handleScroll = () => {
      setSticky(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, [location.pathname]);

  return (
    <nav 
      className={`container ${
        location.pathname === "/login" 
          ? "dark-nav"        // always dark on login page
          : sticky ? "dark-nav" : ""
      }`}
    >
      <img src={logo} alt="" className='logo' />

      <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>

        <li><ScrollLink to='hero' smooth={true} offset={0} duration={500}>Home</ScrollLink></li>
        <li><ScrollLink to='program' smooth={true} offset={-260} duration={500}>Program</ScrollLink></li>
        <li><ScrollLink to='about' smooth={true} offset={-150} duration={500}>About us</ScrollLink></li>
        <li><ScrollLink to='campus' smooth={true} offset={-260} duration={500}>Features</ScrollLink></li>
        <li><ScrollLink to='testimonials' smooth={true} offset={-260} duration={500}>Testimonials</ScrollLink></li>

        <li>
          <RouterLink to="/login" className="btn">Login</RouterLink>
        </li>

      </ul>

      <img src={menu_icon} alt="" className='menu-icon' onClick={() => setMobileMenu(!mobileMenu)} />
    </nav>
  );
};

export default Navbar;


