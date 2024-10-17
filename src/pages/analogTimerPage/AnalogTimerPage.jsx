import Nav from "../../components/nav/Nav"
import './analogTimerPage.css'
import timerStore from "../../../timerStore";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'

// useTime och useTransform går att använda för det

function AnalogTimerPage() {
    const time = timerStore((state) => state.time);
    const totalSeconds = timerStore((state) => state.getTotalTimeInSeconds());
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    // Beräkna rotationen i grader
    const secondDegrees = 360 - (remainingSeconds / 60) * 360; // Invertera för medurs rörelse
    const minuteDegrees = 360 - (totalSeconds / (time * 60)) * 360; // Roterar ett varv under total tid


    const resetTimer = timerStore((state) => state.resetTimer);
    const abortTimer = () => {
        resetTimer(0); // Nollställ timern till 0
    };
    // KOlla upp tween 

    return (
        <section className="analogTimerPage-wrapper">
            <Nav />
            <section className="stopwatch-container">
                <motion.figure
                    className="second"
                    initial={{
                        rotate: "0deg",
                    }}
                    animate={{
                        rotate: "360deg",
                    }}
                    transition={{
                        ease: 'linear',
                        duration: 60,
                        repeat: Infinity
                    }}
                />
                <motion.figure
                    className="minute"
                    initial={{
                        rotate: "0deg",
                    }}
                    animate={{
                        rotate: "360deg",
                    }}
                    transition={{
                        ease: 'linear',
                        duration: time * 60,
                    }}
                />
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