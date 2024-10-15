import logo from '../../assets/logo.svg'
import './frontPage.css'
import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion';

function FrontPage() {
    return (
        <Link aria-label='Navigate to timePage' className='frontPage-wrapper' to='/TimerPage'>
            <img src={logo} alt="logo" />
            <p className='frontPage-text'>For all your timing needs</p>
        </Link>
    )
}

export default FrontPage

//  { <motion.h2
//         className='header'
//         initial={{
//             color: 'blue',
//         }}>hejsan</motion.h2> }