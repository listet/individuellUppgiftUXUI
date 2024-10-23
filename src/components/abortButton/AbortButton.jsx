import './abortButton.css'
import timerStore from "../../../timerStore";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function AbortButton() {

    // Nollställ timern 
    const resetTimer = timerStore((state) => state.resetTimer);
    const abortTimer = () => {
        resetTimer(10);
    };

    return (
        <Link
            aria-label='Navigate to set timer'
            to="/TimerPage"
            onClick={abortTimer}>
            <motion.button
                className='abort-button'
                whileHover={{ backgroundColor: '#22222240' }}
                whileTap={{
                    scale: 0.95,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
                    transition: { duration: 0.05 }
                }}
            >ABORT TIMER
            </motion.button>
        </Link>
    )
}

export default AbortButton
