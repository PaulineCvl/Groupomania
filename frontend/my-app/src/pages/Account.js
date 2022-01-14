import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import img from '../assets/img/user.png';

const Account = () => {
    const navigate = useNavigate();
    
    const [userId, setUserId] = useState();
    const [token, setToken] = useState();
    const [user, setUser] = useState();
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateImage, setUpdateImage] = useState('');
    const [updateFirstName, setUpdateFirstName] = useState('');
    const [updateLastName, setUpdateLastName] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [updatePassword, setUpdatePassword] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');

    const [imageUploaded, setImageUploaded] = useState(null);

    useEffect(() => {
        localforage.getItem('token')
        .then(token => {
            localforage.getItem('userId')
            .then(userId => {
                getUser(userId, token);
                setUserId(userId);
            })
            .catch(error => console.log(error));

            setToken(token);
        })
        .catch(error => console.log(error));
    }, []);

    const getUser = (userId, token) => {
        axios.get(`http://localhost:8080/api/auth/${userId}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(response => setUser(response.data))
            .catch(error => console.log(error));
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        let userForm = new FormData();
        userForm.append('image', updateImage ? updateImage : user.profilePicture);
        userForm.append('firstName', updateFirstName ? updateFirstName : e.target.firstName.value);
        userForm.append('lastName', updateLastName ? updateLastName : e.target.lastName.value);
        userForm.append('email', updateEmail ? updateEmail : e.target.email.value);
        if(updatePassword) {
            userForm.append('password', updatePassword);
        }
        userForm.append('description', updateDescription ? updateDescription : e.target.description.value);

        axios.put(`http://localhost:8080/api/auth/${userId}`, userForm, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `token ${token}`
            }
        })
            .then(() => {
                setIsUpdating(false);
                getUser(userId, token);
            })
            .catch(error => console.log({ message: 'erreur' }));
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/auth/${userId}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(() => {
                navigate('/');
                localforage.clear();
            })
            .catch(error => console.log(error));
    }

    const handleChangeFile = (e) => {
        setImageUploaded(e.target.files[0].name);
        setUpdateImage(e.target.files[0]);
    }

    return (
        <div className='account'>
            <Header />
            <div className='background'>
                {user ? (
                    <div className='container'>
                        {isUpdating ? (
                            <div className='content'>
                                <form onSubmit={handleUpdate}>
                                    <div className='content-left user-account'>
                                        <img src={user.profilePicture ? user.profilePicture : img} alt='utilisateur' />
                                        <div className='update-image'>
                                            <label htmlFor='profilePicture' className='button blue'>Choisir une image</label>
                                            <input type='file' id='profilePicture' onChange={handleChangeFile} />
                                            {imageUploaded ? (
                                                <p className='imageUploaded'>Image ajoutée : <span>{imageUploaded}</span></p>
                                            ) : (
                                                <p className='imageUploaded'></p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='content-right user-account update-infos'>
                                        <div className='fullname'>
                                            <input type='text' className='firstName' name='firstName' defaultValue={updateFirstName ? updateFirstName : user.firstName} onChange={(e) => setUpdateFirstName(e.target.value)} />
                                            <input type='text' className='lastName' name='lastName' defaultValue={updateLastName ? updateLastName : user.lastName} onChange={(e) => setUpdateLastName(e.target.value)} />
                                        </div>
                                        <label>Email :</label>
                                        <input type='email' name='email' defaultValue={updateEmail ? updateEmail : user.email} onChange={(e) => setUpdateEmail(e.target.value)} />
                                        <label>Mot de passe :</label>
                                        <input type='password' name='password' defaultValue={updatePassword ? updatePassword : user.password} onChange={(e) => setUpdatePassword(e.target.value)} />
                                        <label>Description :</label>
                                        <input type='text' name='description' className='description' defaultValue={updateDescription ? updateDescription : user.description} onChange={(e) => setUpdateDescription(e.target.value)} />
                                        <input type='submit' value='Valider' className='button blue' />
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className='content'>
                                <div className='content-left user-account'>
                                    <img src={user.profilePicture ? user.profilePicture : img} alt='utilisateur' />
                                </div>
                                <div className='content-right user-account'>
                                    <form>
                                        <div className='fullname'>
                                            <p className='firstName'>{user.firstName}</p>
                                            <p className='lastName'>{user.lastName}</p>
                                        </div>
                                        <label>Email :</label>
                                        <input type='email' readOnly name='email' defaultValue={user.email} />
                                        <label>Mot de passe :</label>
                                        <input type='password' readOnly name='password' defaultValue={user.password} />
                                        <label>Description :</label>
                                        <input type='text' placeholder='Ajouter une description' readOnly defaultValue={user.description} className='infos--description' />
                                    </form>
                                    <div className='user-account--button'>
                                        <button className='button blue' onClick={() => setIsUpdating(true)}>Modifier</button>
                                        <button className='button red' onClick={handleDelete}>Supprimer</button>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                ) : (
                    <p>User Not Found</p>
                )}
            </div>
        </div >
    );
};

export default Account;