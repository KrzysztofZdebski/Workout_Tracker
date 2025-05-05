import React, { useState, useEffect, use } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import api from '../utils/api';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
                setButton(false);
        } else {
                setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        api.get('/auth/login')
        .then((response) => {
            setAuthenticated(true);
        })
        .catch((error) => {
            setAuthenticated(false);
        });
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                Workout Tracker
                {/* <i class='fab fa-typo3' /> */}
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                </Link>
                </li>
                <li className='nav-item'>
                <Link
                    to='/calorie_counter'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Calorie Counter
                </Link>
                </li>
                <li className='nav-item'>
                <Link
                    to='/workout'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Workout Tracker
                </Link>   
                </li>
                <li className='nav-item'>
                <Link
                    to='/login'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    {authenticated ? 'Account' : 'Login'}
                </Link>
                </li>
            </ul>
            {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
            </div>
        </nav>
        </>
    );
}

export default Navbar;