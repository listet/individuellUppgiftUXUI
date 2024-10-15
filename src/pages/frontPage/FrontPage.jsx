import logo from '../../assets/logo.svg'
import './frontPage.css'
// import { motion } from 'framer-motion';

function FrontPage() {
    return (
        <section className='frontPage-wrapper'>
            <img src={logo} alt="logo" />
            <p className='frontPage-text'>For all your timing needs</p>
        </section>
    )
}

export default FrontPage

//  { <motion.h2
//         className='header'
//         initial={{
//             color: 'blue',
//         }}>hejsan</motion.h2> }