import './alarmViewPage.css'
import AlarmIcon from '../../assets/alarm icon.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function AlarmViewPage() {
    return (
        <section className="alarmPage-wrapper">
            <article className='alarmIcon-container'>
                <motion.img
                    src={AlarmIcon}
                    alt="Alarm icon"
                    className="alarmIcon"
                    animate={{
                        rotate: [-20, 20, -10, 10, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                />
            </article>
            <motion.figure
                className="rings"
                initial={{
                    scale: 0.1,
                    opacity: 0
                }}
                animate={{
                    scale: 3,
                    opacity: 1
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
            <h1 className='alarmPage-text'>Times up!</h1>
            <Link
                aria-label='Navigate to setTimer'
                to="/TimerPage">
                <motion.button
                    className='newTimer-button'
                    whileHover={{ backgroundColor: '#ffffff99' }}
                    whileTap={{ scale: 0.95 }}
                >
                    SET NEW TIMER
                </motion.button>
            </Link>
        </section>
    )
}

export default AlarmViewPage
