import React, { useState } from 'react';
import localforage from 'localforage';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const navigate = useNavigate();
    const [invalidUser, setInvalidUser] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        axios.post('http://localhost:8080/api/auth/login', { user })
            .then(response => {
                const token = response.data.token;
                const userId = response.data.userId;
                localforage.setItem('token', token);
                localforage.setItem('userId', userId);
                navigate('/home');
            })
            .catch(error => setInvalidUser('Utilisateur ou mot de passe incorrect'));
    }

    return (
        <div className='connect-page'>
            <div className='connect'>
                <div>
                    <img src="./icon-left-font-monochrome-white.png" alt="Logo Groupomania" />
                </div>
                {invalidUser ? (
                    <div className='invalid'>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='email'>Email</label>
                            <input type='email' placeholder='Email' id='email' name='email' />
                            <label htmlFor='password'>Mot de passe</label>
                            <input type='password' placeholder='Mot de passe' id='password' name='password' />
                            <p className='invalid-message'>{invalidUser}</p>
                            <input type='submit' id='loginSubmit' value='Se connecter' />
                        </form>
                        <NavLink to="signup">S'inscrire</NavLink>
                    </div>
                ) : (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='email'>Email</label>
                            <input type='email' placeholder='Email' id='email' name='email' />
                            <label htmlFor='password'>Mot de passe</label>
                            <input type='password' placeholder='Mot de passe' id='password' name='password' />
                            <input type='submit' id='loginSubmit' value='Se connecter' />
                        </form>
                        <NavLink to="signup">S'inscrire</NavLink>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Login;