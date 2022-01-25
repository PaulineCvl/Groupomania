import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const Signup = () => {
    const navigate = useNavigate();
    const [userCreated, setUserCreated] = useState();
    const [visible, setVisible] = useState();
    const [validLength, setValidLength] = useState();
    const [validUppercase, setValidUppercase] = useState();
    const [validLowercase, setValidLowercase] = useState();
    const [validDigit, setValidDigit] = useState();
    const [validPassword, setValidPassword] = useState();
    const [strongPassword, setStrongPassword] = useState(true);

    const length = /[a-zA-Z0-9]{8,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const digit = /[0-9]/;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validPassword) {
            setStrongPassword(false);
        } else {
            const user = {
                lastName: e.target.lastName.value,
                firstName: e.target.firstName.value,
                email: e.target.email.value,
                password: e.target.password.value
            }
    
            axios.post('http://localhost:8080/api/auth/signup', { user })
                .then(() => {
                    setUserCreated(true);
                })
                .catch(error => console.log(error));
        }
    }

    const handleChange = (e) => {
        const password = e.target.value;

        if (length.test(password)) {
            setValidLength(true);
        } else {
            setValidLength(false);
        }

        if (uppercase.test(password)) {
            setValidUppercase(true);
        } else {
            setValidUppercase(false);
        }

        if (lowercase.test(password)) {
            setValidLowercase(true);
        } else {
            setValidLowercase(false);
        }

        if (digit.test(password)) {
            setValidDigit(true);
        } else {
            setValidDigit(false);
        }
    }

    const handleCheckPassword = () => {
        if (validLength && validUppercase && validLowercase && validDigit) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }
    }

    return (
        <div className='connect-page'>
            <div className='connect'>
                <img src="./icon-left-font-monochrome-white.png" alt="Logo Groupomania" />
                <form onSubmit={handleSubmit}>
                    <label htmlFor='lastName'>Nom</label>
                    <input type='text' id='lastName' placeholder='Nom' name='lastName' />
                    <label htmlFor='firstName'>Prénom</label>
                    <input type='text' id='firstName' placeholder='Prénom' name='firstName' />
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' placeholder='Email' name='email' />
                    <label htmlFor='password'>Mot de passe</label>
                    <input type='password' id='password' placeholder='Mot de passe' name='password' onChange={handleChange} onFocus={() => setVisible(true)} onBlur={handleCheckPassword} />
                    {visible ? (
                        strongPassword ? (
                            <div className='password'>
                                {validPassword ? (<p className='password-strong'>Mot de passe correct :</p>) : (<p>Mot de passe correct :</p>)}
                                {validLength ? (<p className='password-strong'><FaCheck /> Minimum 8 caractères</p>) : (<p><FaTimes /> Minimum 8 caractères</p>)}
                                {validUppercase ? (<p className='password-strong'><FaCheck /> Minimum 1 lettre majuscule</p>) : (<p><FaTimes /> Minimum 1 lettre majuscule</p>)}
                                {validLowercase ? (<p className='password-strong'><FaCheck /> Minimum 1 lettre minuscule</p>) : (<p><FaTimes /> Minimum 1 lettre minuscule</p>)}
                                {validDigit ? (<p className='password-strong'><FaCheck /> Minimum 1 chiffre</p>) : (<p><FaTimes /> Minimum 1 chiffre</p>)}
                            </div>
                        ) : (
                            <div className='password incorrect'>
                                {validPassword ? (<p className='password-strong'>Mot de passe correct :</p>) : (<p>Mot de passe correct :</p>)}
                                {validLength ? (<p className='password-strong'><FaCheck /> Minimum 8 caractères</p>) : (<p><FaTimes /> Minimum 8 caractères</p>)}
                                {validUppercase ? (<p className='password-strong'><FaCheck /> Minimum 1 lettre majuscule</p>) : (<p><FaTimes /> Minimum 1 lettre majuscule</p>)}
                                {validLowercase ? (<p className='password-strong'><FaCheck /> Minimum 1 lettre minuscule</p>) : (<p><FaTimes /> Minimum 1 lettre minuscule</p>)}
                                {validDigit ? (<p className='password-strong'><FaCheck /> Minimum 1 chiffre</p>) : (<p><FaTimes /> Minimum 1 chiffre</p>)}
                            </div>
                        )
                    ) : null}
                    <input type='submit' id='signupSubmit' value="S'inscrire" />
                </form>
                <NavLink to="/">Se connecter</NavLink>
                {userCreated ? (
                    <div className='modal'>
                        <div className='modal-content'>
                            <p>Votre compte a bien été créé !</p>
                            <button className='button blue' onClick={() => navigate('/')}>Me connecter</button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Signup;