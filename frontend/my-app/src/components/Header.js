import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState();
    const [visible, setVisible] = useState();

    useEffect(() => {
        localforage.getItem('userId')
            .then(userId => {
                axios.get(`http://localhost:8080/api/auth/${userId}`)
                    .then(response => setIsAdmin(response.data.admin))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className='header'>
            <div className='header-content'>
                <div className='header-image'>
                    <NavLink to="/home" tabIndex="0" ><img src="../icon-left-font-monochrome-black.png" alt="Logo Groupomania" /></NavLink>
                </div>
                {visible ? (
                    <div className='navigation'>
                        <div tabIndex="0" className='menu' onClick={() => setVisible(false)}>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        <div className='link'>
                            <NavLink to='/home'>Accueil</NavLink>
                            <NavLink to='/account'>Mon compte</NavLink>
                            {isAdmin ? (
                                <NavLink to='/admin'>Administration</NavLink>
                            ) : null}
                            <NavLink to='/' onClick={() => localforage.clear()}>Déconnexion</NavLink>
                        </div>
                    </div>
                ) : (
                    <div className='navigation'>
                        <div tabIndex="0" className='menu' onClick={() => setVisible(true)}>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                    </div>
                )}

            </div>
            <div className='line'>
                <hr />
            </div>
        </div>
    );
};

export default Header;