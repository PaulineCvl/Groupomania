import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import axios from 'axios';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastName: '',
            firstName: '',
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = this.state;

        axios.post('http://localhost:8080/api/auth/signup', { user })
            .then(() => {
                console.log('user created');
                window.location = '/home'
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Logo />
                <div className='connect'>
                    <h1>Créer un compte</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' id='lastName' placeholder='Nom' name='lastName' value={this.state.lastName} onChange={this.handleChange} />
                        <input type='text' id='firstName' placeholder='Prénom' name='firstName' value={this.state.firstName} onChange={this.handleChange} />
                        <input type='email' id='email' placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} />
                        <input type='password' id='password' placeholder='Mot de passe' name='password' value={this.state.password} onChange={this.handleChange} />
                        <input type='submit' id='signupSubmit' value="S'inscrire" />
                    </form>
                    <Link to="/">Se connecter</Link>
                </div>
            </div>
        );
    }
};

export default Signup;