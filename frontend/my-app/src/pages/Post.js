import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import Header from '../components/Header';
import Likes from '../components/Likes';

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateContent, setUpdateContent] = useState('');
    const [updateImage, setUpdateImage] = useState('');
    const [imageUploaded, setImageUploaded] = useState();
    const [token, setToken] = useState();

    const urlAPI = `http://localhost:8080/api/posts/${id}`;
    const userId = localforage.getItem('userId');

    useEffect(() => {
        localforage.getItem('token')
            .then(token => {
                getPost(token);
                setToken(token);
            })
            .catch(error => console.log(error));
    }, []);

    const getPost = (token) => {
        axios.get(urlAPI, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(response => {
                setData(response.data);
                getUser(response.data.userId);
            })
            .catch(error => console.log(error));
    }

    const getUser = (userId) => {
        axios.get(`http://localhost:8080/api/auth/${userId}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(response => setUser(response.data))
            .catch(error => console.log(error));
    }

    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString('fr-FR', {
            month: "long",
            year: "numeric",
            day: "numeric"
        });
        return newDate;
    }

    const handleUpdate = (e) => {
        let form = new FormData();
        form.append('image', updateImage);
        form.append('description', updateContent ? updateContent : data.description);

        axios.put(urlAPI, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `token ${token}`
            }
        })
            .then(() => {
                getPost(token);
                setIsUpdating(false)
            })
            .catch(error => console.log(error));
    }

    const handleDelete = () => {
        axios.delete(urlAPI, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(() => navigate('/home'))
            .catch(error => console.log(error));
    }

    const handleChangeFile = (e) => {
        setImageUploaded(e.target.files[0].name);
        setUpdateImage(e.target.files[0])
    }

    return (
        <div>
            <Header />
            <div className='background'>
                <div className='container post'>
                    <div className='content'>
                        <div className='content-left'>
                            <div className='header-element'>
                                {user ? (
                                    <p className='header-element--username'>{user.firstName} {user.lastName}</p>
                                ) : (
                                    <p></p>
                                )}
                                <p className='header-element--date'>{dateParser(data.createdAt)}</p>
                            </div>
                            {isUpdating ? (
                                <div className='post-content--image'>
                                    <img id='postImage' src={data.imageUrl} alt='Mon article' />
                                    <div className='form-input add-image'>
                                        <label htmlFor='content-file' className='button blue'>Choisir une image</label>
                                        <input type="file" id='content-file' accept='image/png, image/jpg, image/jpeg' onChange={handleChangeFile} />
                                        {imageUploaded ? (
                                            <p className='formPost-imageUploaded'>Image ajoutée : <span>{imageUploaded}</span></p>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className='post-content--image'>
                                    <img id='postImage' src={data.imageUrl} alt='Mon article' />
                                </div>
                            )}
                            <div className='post-content--description'>
                                {isUpdating ? (
                                    <textarea autoFocus defaultValue={updateContent ? updateContent : data.description} onChange={(e) => setUpdateContent(e.target.value)}></textarea>
                                ) : (
                                    <p>{data.description}</p>
                                )}
                            </div>
                            <div className='post-content--button'>
                                {isUpdating ? (
                                    <button className='button blue' onClick={handleUpdate}>Valider</button>
                                ) : (
                                    <button className='button blue' onClick={() => setIsUpdating(true)}>Modifier le post</button>
                                )}
                                <button className='button red' onClick={handleDelete}>Supprimer le post</button>
                            </div>
                        </div>
                        <div className='content-right'>
                            <Likes id={id} />
                            <Comments id={id} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Post;