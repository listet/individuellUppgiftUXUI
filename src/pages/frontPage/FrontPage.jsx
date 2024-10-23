import { section } from 'framer-motion/client'
import logo from '../../assets/logo.svg'
import './frontPage.css'
import { Link } from 'react-router-dom'

function FrontPage() {
    return (
        <section className='frontPage-wrapper'>
            <Link aria-label='Navigate to timePage' className='logo-wrapper' to='/TimerPage'>
                <img src={logo} alt="logo" />
                <p className='frontPage-text'>For all your timing needs</p>
            </Link>
        </section>
    )
}

export default FrontPage
