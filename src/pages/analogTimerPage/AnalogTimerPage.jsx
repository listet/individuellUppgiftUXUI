import Nav from "../../components/nav/Nav"
import './analogTimerPage.css'
import timerStore from "../../../timerStore";
import { Link } from "react-router-dom";
import { motion, useMotionValue } from 'framer-motion';
import { useEffect } from "react";
import PauseView from "../../components/pauseView/PauseView";

function AnalogTimerPage() {

    const time = timerStore((state) => state.time);
    const totalSeconds = timerStore((state) => state.getTotalTimeInSeconds());
    const isRunning = timerStore((state) => state.isRunning);
    const initialTime = timerStore((state) => state.initialTime);
    // Använd motion value för att hålla koll på visarnas grader
    const secondDegrees = useMotionValue(0);
    const minuteDegrees = useMotionValue(0);

    useEffect(() => {
        if (isRunning) {
            const remainingSeconds = totalSeconds % 60;
            const totalElapsedSeconds = totalSeconds;

            secondDegrees.set(360 - (remainingSeconds / 60) * 360);
            minuteDegrees.set(360 - (totalElapsedSeconds / initialTime) * 360);
        }
    }, [totalSeconds, isRunning, secondDegrees, minuteDegrees, time]);

    const resetTimer = timerStore((state) => state.resetTimer);
    const abortTimer = () => {
        resetTimer(10); // Nollställ timern 
    };

    //Uppdaterar grafiken varje sekund
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
            <section className="stopwatch-container">
                {isRunning && (
                    <>
                        <motion.figure
                            className="second"
                            style={{ rotate: secondDegrees }}
                            transition={{
                                ease: 'linear',
                                duration: 1, // Justera för att styra hastigheten på sekunder
                                repeat: Infinity,
                            }}
                        />
                        <motion.figure
                            className="minute"
                            style={{ rotate: minuteDegrees }}
                            transition={{
                                ease: 'linear',
                                duration: 0.1, // Total tid för minutvisaren
                            }}
                        />
                    </>
                )}
                <figure className="centercircle"></figure>
            </section>
            <PauseView />
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

export default AnalogTimerPage