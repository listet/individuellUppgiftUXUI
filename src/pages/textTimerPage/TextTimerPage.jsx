import Nav from '../../components/nav/Nav'
import timerStore from '../../../timerStore';
import { Link } from 'react-router-dom';
import './textTimerPage.css'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';

function TextTimerPage() {
    const time = timerStore((state) => state.time);
    const isRunning = timerStore((state) => state.isRunning);
    const [formattedTime, setFormattedTime] = useState('');

    const resetTimer = timerStore((state) => state.resetTimer);
    const abortTimer = () => {
        resetTimer(10); // Nollställ timern 
    };

    const numberToText = (number) => {
        const numbersInSwedish = [
            'NOLL', 'EN', 'TVÅ', 'TRE', 'FYRA', 'FEM', 'SEX',
            'SJU', 'ÅTTA', 'NIO', 'TIO', 'ELVA', 'TOLV',
            'TRETTON', 'FJORTON', 'FEMTON', 'SEXTON', 'SJUTTON',
            'ARTON', 'NITTON', 'TJUGO', 'TJUGOEN', 'TJUGOTVÅ',
            'TJUGOTRE', 'TJUGOFYRA', 'TJUGOFEM', 'TJUGOSEX',
            'TJUGOSJU', 'TJUGOÅTTA', 'TJUGONIO', 'TRETTIO',
            'TRETTIOEN', 'TRETTIOTVÅ', 'TRETTIOTRE', 'TRETTIOFYRA',
            'TRETTIOFEM', 'TRETTIOSEX', 'TRETTIOSJU', 'TRETTIOÅTTA',
            'TRETTIONIO', 'FYRTIO', 'FYRTIOEN', 'FYRTIOTVÅ',
            'FYRTIOTRE', 'FYRTIOFYRA', 'FYRTIOFEM', 'FYRTIOSEX',
            'FYRTIOSJU', 'FYRTIOÅTTA', 'FYRTIONIO', 'FEMTIO',
            'FEMTIOEN', 'FEMTIOTVÅ', 'FEMTIOTRE', 'FEMTIOFYRA',
            'FEMTIOFEM', 'FEMTIOSEX', 'FEMTIOSJU', 'FEMTIOÅTTA',
            'FEMTIONIO',
        ];

        return numbersInSwedish[number] || `${number}`;
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds);
        const seconds = Math.round((timeInSeconds % 1) * 60); // Runda sekunder
        return `${numberToText(minutes)} MINUTER OCH ${numberToText(seconds)} SEKUNDER KVAR`;
    };

    useEffect(() => {
        const newFormattedTime = formatTime(time);
        setFormattedTime(newFormattedTime);
    }, [time]);

    useEffect(() => {
        let timerInterval;

        if (isRunning) {
            timerInterval = setInterval(() => {
                timerStore.getState().setTime(time - 1);
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [isRunning, time]);

    return (
        <section className="analogTimerPage-wrapper">
            <Nav />
            {/* Gömmer timerdisplayen tills timern startas */}
            {isRunning && (
                <section className="textTimerDisplay">
                    <h5>{formattedTime}</h5>
                </section>
            )}
            <Link
                aria-label='Navigate to set timer'
                to="/TimerPage"
                onClick={abortTimer}>
                <motion.button
                    className='abort-button'
                    whileHover={{ backgroundColor: '#22222240' }}
                    whileTap={{ scale: 0.95 }}
                >ABORT TIMER
                </motion.button>
            </Link>
        </section>
    )
}


export default TextTimerPage





