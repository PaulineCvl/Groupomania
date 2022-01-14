import React from 'react';
import localforage from 'localforage';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const navigate = useNavigate();

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
            .catch(error => { console.log(error) });
    }

    return (
        <div className='connect-page'>
            <div className='connect'>
                <div>
                    <img src="./icon-left-font-monochrome-white.png" alt="Logo Groupomania" />
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type='email' placeholder='Email' name='email' />
                        <input type='password' placeholder='Mot de passe' name='password' />
                        <input type='submit' id='loginSubmit' value='Se connecter' />
                    </form>
                    <NavLink to="signup">S'inscrire</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;