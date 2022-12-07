import React from 'react'
import './Header.css';
import Logo from '../../assets/logo_uepets_black.png';
import { useNavigate } 		    from 'react-router-dom';

const HeaderComponent = (props) => {
    const history = useNavigate();
    const path = props?.path;

    return (
        <header className="header">
            <img src={Logo} alt="UePets Logo" className='header__logo' onClick={() => history('/')}/>
            <button className="header__login" onClick={() => history(path)}>{props.text}</button>
        </header>
    )
}

export default HeaderComponent