import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <img src="./icon-left-font-monochrome-black.png" alt="Logo Groupomania" />
            <div className='navigation'>
                <NavLink to='/home'>Accueil</NavLink>
                <NavLink to='/account'>Mon compte</NavLink>
                <NavLink to='/'>Déconnexion</NavLink>
            </div>
        </div>
    );
};

export default Header;