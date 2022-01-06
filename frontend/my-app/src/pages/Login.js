import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
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
                sessionStorage.setItem('token', token);
                navigate('/home')
            })
            .catch(error => { console.log(error) });
    }

        return (
            <div>
                <Logo />
                <div className='connect'>
                    <h1>Bienvenue !</h1>
                    <form onSubmit={handleSubmit}>
                        <input type='email' placeholder='Email' name='email'/>
                        <input type='password' placeholder='Mot de passe' name='password'/>
                        <input type='submit' id='loginSubmit' value='Se connecter' />
                    </form>
                    <NavLink to="signup">Signup</NavLink>
                </div>
            </div>
        );
};

export default Login;