import Nav from "../../components/nav/Nav"
import './analogTimerPage.css'
import timerStore from "../../../timerStore";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from "react";
// useTime och useTransform går att använda för det

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
            console.log("Total Seconds: ", totalElapsedSeconds, "Total Timer Seconds: ", time);

            secondDegrees.set(360 - (remainingSeconds / 60) * 360);
            minuteDegrees.set(360 - (totalElapsedSeconds / initialTime) * 360);
        }
    }, [totalSeconds, isRunning, secondDegrees, minuteDegrees, time]);

    const resetTimer = timerStore((state) => state.resetTimer);
    const abortTimer = () => {
        resetTimer(10); // Nollställ timern 
    };

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
                                duration: totalSeconds * 60, // Total tid för minutvisaren
                            }}
                        />
                    </>
                )}
                <figure className="centercircle"></figure>
            </section>
            <Link
                aria-label='Navigate to set timer'
                to="/TimerPage"
                onClick={abortTimer}>
                <button className='abort-button'>ABORT TIMER</button>
            </Link>
        </section>
    )
}

export default AnalogTimerPage