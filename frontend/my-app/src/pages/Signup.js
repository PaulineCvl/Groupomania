import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = (props) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            lastName: e.target.lastName.value,
            firstName: e.target.firstName.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        axios.post('http://localhost:8080/api/auth/signup', { user })
            .then(() => {
                console.log('user created');
                navigate('/home')
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='connect-page'>
            <div className='connect'>
                <img src="./icon-left-font-monochrome-white.png" alt="Logo Groupomania"/>
                <form onSubmit={handleSubmit}>
                    <input type='text' id='lastName' placeholder='Nom' name='lastName' />
                    <input type='text' id='firstName' placeholder='Prénom' name='firstName' />
                    <input type='email' id='email' placeholder='Email' name='email' />
                    <input type='password' id='password' placeholder='Mot de passe' name='password' />
                    <input type='submit' id='signupSubmit' value="S'inscrire" />
                </form>
                <NavLink to="/">Se connecter</NavLink>
            </div>
        </div>
    );
};

export default Signup;