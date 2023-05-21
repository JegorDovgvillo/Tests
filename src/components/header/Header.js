import { NavLink } from 'react-router-dom'

import Union from '../../images/Union.svg'

import './header.scss'
import './headerAdaptate.scss'

const Header = () => {

    return (
        <div className="header">
            <div className="header__logo">
                <img src={Union} alt='logo'/>
                <h1>Jobored</h1>
            </div>
            <div className='header__nav'>
                <NavLink to='/' style={({ isActive }) => ({ color: isActive ? '#5E96FC' : '#232134' })}>Поиск вакансий </NavLink>
                <NavLink to='/favorites' style={({ isActive }) => ({ color: isActive ? '#5E96FC' : '#232134' })}>Избранное</NavLink>
            </div>
        </div>
    )
}

export default Header;