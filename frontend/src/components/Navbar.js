import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { BsBoxArrowInLeft } from "react-icons/bs";


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [token, setToken] =useState('')

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const logout=()=>{
    localStorage.removeItem('accessToken')
    window.location.href = '/'
  }

  useEffect(() => {
    showButton();
    setToken(localStorage.getItem('accessToken'))
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar navbar-light bg-light'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            TRANSPORTATION
           
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link
                to='/services'
                className="btn btn-outline-light"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li> */}
            {
              token ? (
                <li className='nav-item'>
              <Link
                to='/vehicle'
                className="nav-links"
                onClick={closeMobileMenu}>
                  Add Vehicle With Us
                </Link> </li> ) : (
                  <></>
                )
            }
            {
              token? (
                <li className='nav-item'>
              <Link
                to='/UserHome'
                className="nav-links"
                onClick={closeMobileMenu}
                >
                  Users
                </Link>
                </li>):(
                  <></>
                )
            }
            
          
            {
              !token ? (
                <li className='nav-item'>
              <Link
                to='/sign-up'
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Sign In
                <BsBoxArrowInLeft/>
              </Link>
            </li>
              )  : (<li>
                <Link className='nav-links' onClick={logout}>Logout <BsBoxArrowInLeft/></Link>
              </li>)
            }
            
          </ul>
          {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
