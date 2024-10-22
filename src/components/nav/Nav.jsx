import NavIcon from '../../assets/navicon(1).png'
import NavIconWhite from '../../assets/navicon(2).png'
import './nav.css'
import timerStore from '../../../timerStore'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'

function Nav() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation();
    const intervalsEnabled = timerStore((state) => state.intervalsEnabled);
    const breakEnabled = timerStore((state) => state.breakEnabled)

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
            {(intervalsEnabled || breakEnabled) && (
                <div className="intervals-text">
                    <h2>Intervals</h2>
                </div>
            )}
            <AnimatePresence>
                {isNavOpen && (
                    <motion.nav
                        className='nav-menu'
                        initial={{
                            opacity: 0,
                            x: -200
                        }}
                        animate={{
                            opacity: 1,
                            x: 0
                        }}
                        exit={{
                            opacity: 0,
                            x: -200
                        }}
                        transition={{
                            duration: 0.5
                        }}
                    >
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
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}

export default Nav
