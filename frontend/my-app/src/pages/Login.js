import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = this.state;
        console.log(user);

        axios.post('http://localhost:8080/api/auth/login', { user })
            .then(() => {
                console.log('user connected');
                window.location = '/home'
            })
            .catch(error => { console.log(error) });
    }

    render() {
        return (
            <div>
                <Logo />
                <div className='connect'>
                    <h1>Bienvenue !</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type='email' placeholder='Email' name='email' onChange={this.handleChange} />
                        <input type='password' placeholder='Mot de passe' name='password' onChange={this.handleChange} />
                        <input type='submit' id='loginSubmit' value='Se connecter' />
                    </form>
                    <Link to="signup">Signup</Link>
                </div>
            </div>
        );
    }
};

export default Login;