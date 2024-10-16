import NavIcon from '../../assets/navicon(1).png'
import NavIconWhite from '../../assets/navicon(2).png'
import './nav.css'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react';

function Nav() {
    const [isNavOpen, setIsNavOpen] = useState(false); // State för att toggla nav

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'nav-item-active' : '';
    };

    const openNav = () => {
        setIsNavOpen(!isNavOpen);

    }

    return (
        <>
            <button className='navIcon'
                onClick={openNav} >
                <img src={isNavOpen ? NavIconWhite : NavIcon} alt="navicon" />
            </button>

            {isNavOpen && (
                <nav className='nav-menu'>
                    <Link
                        aria-label='Navigate to analog timer'
                        className={`nav-item ${isActive('/AnalogTimerPage')}`}
                        to="/AnalogTimerPage">
                        <h1>ANALOG TIMER</h1>
                    </Link>
                    <Link
                        aria-label='Navigate to digital timer'
                        className={`nav-item ${isActive('/DigitalTimerPage')}`}
                        to="/DigitalTimerPage">
                        <h1>DIGITAL TIMER</h1>
                    </Link>
                    <Link
                        aria-label='Navigate to text timer'
                        className={`nav-item ${isActive('/TextTimerPage')}`}
                        to="/TextTimerPage">
                        <h1>TEXT TIMER</h1>
                    </Link>
                </nav>
            )}
        </>
    )
}

export default Nav
