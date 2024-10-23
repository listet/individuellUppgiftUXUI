import Nav from "../../components/nav/Nav"
import './analogTimerPage.css'
import timerStore from "../../../timerStore";
import { motion, useMotionValue } from 'framer-motion';
import { useEffect } from "react";
import PauseView from "../../components/pauseView/PauseView";
import AbortButton from "../../components/abortButton/AbortButton";

function AnalogTimerPage() {

    const totalSeconds = timerStore((state) => state.getTotalTimeInSeconds());
    const isRunning = timerStore((state) => state.isRunning);
    const initialTime = timerStore((state) => state.initialTime);
    const secondDegrees = useMotionValue(0);
    const minuteDegrees = useMotionValue(0);

    //Räknar ut position för visarna om timern är igång
    useEffect(() => {
        if (isRunning) {
            const remainingSeconds = totalSeconds % 60;
            const totalElapsedSeconds = totalSeconds;

            secondDegrees.set(360 - (remainingSeconds / 60) * 360);
            minuteDegrees.set(360 - (totalElapsedSeconds / initialTime) * 360);
        }
    }, [totalSeconds, isRunning, secondDegrees, minuteDegrees]);

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
                                duration: 0.016,
                                repeat: Infinity,
                            }}
                        />
                        <motion.figure
                            className="minute"
                            style={{ rotate: minuteDegrees }}
                            transition={{
                                ease: 'linear',
                                duration: 0.1,
                            }}
                        />
                    </>
                )}
                <figure className="centercircle"></figure>
            </section>
            <PauseView />
            <AbortButton />
        </section>
    )
}

export default AnalogTimerPage