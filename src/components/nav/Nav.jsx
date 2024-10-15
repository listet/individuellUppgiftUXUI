import NavIcon from '../../assets/navicon(1).png'
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
                <img src={NavIcon} alt="navicon" />
            </button>

            {isNavOpen && (
                <nav className='nav-menu'>
                    <ul>
                        <li className={isActive('/')}>
                            <h1>home</h1>  {/* <Link to="/">Home</Link> */}
                        </li>
                        <li className={isActive('/')}>
                            <h1>home</h1>   {/* <Link to="/about">About</Link> */}
                        </li>
                        <li className={isActive('/')}>
                            <h1>home</h1>  {/* <Link to="/contact">Contact</Link> */}
                        </li>
                    </ul>
                </nav>
            )}
        </>
    )
}

export default Nav
