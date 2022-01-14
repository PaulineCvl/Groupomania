import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState();

    useEffect(() => {
        localforage.getItem('token')
        .then(token => {
            localforage.getItem('userId')
            .then(userId => getUser(userId, token))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }, []);

    const getUser = (userId, token) => {
        axios.get(`http://localhost:8080/api/auth/${userId}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => setIsAdmin(response.data.admin))
        .catch(error => console.log(error));
    }

    return (
        <div className='header'>
            <div className='header-content'>
                <img src="../icon-left-font-monochrome-black.png" alt="Logo Groupomania" />
                <div className='navigation'>
                    <NavLink to='/home'>Accueil</NavLink>
                    <NavLink to='/account'>Mon compte</NavLink>
                    {isAdmin ? (
                        <NavLink to='/admin'>Administration</NavLink>
                    ) : null}
                    <NavLink to='/' onClick={() => localforage.clear()}>Déconnexion</NavLink>
                </div>
            </div>
            <div className='line'>
                <hr />
            </div>
        </div>
    );
};

export default Header;