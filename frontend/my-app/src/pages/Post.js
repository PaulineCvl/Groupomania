import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import Header from '../components/Header';
import Likes from '../components/Likes';
import Modal from '../components/Modal';

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [allowUpdate, setAllowUpdate] = useState();
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateContent, setUpdateContent] = useState('');
    const [updateImage, setUpdateImage] = useState('');
    const [imageUploaded, setImageUploaded] = useState();
    const [showModal, setShowModal] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState();

    const urlAPI = `http://localhost:8080/api/posts/${id}`;

    const [token, setToken] = useState();

    useEffect(() => {
        localforage.getItem('userId')
            .then(userId => {
                setUserId(userId);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        localforage.getItem('token')
            .then(token => {
                setToken(token);
            })
            .catch(error => console.log(error));

    }, []);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `token ${token}`;
        if (token) {
            getPost();
        }
    }, [token]);

    useEffect(() => {
        if (data.userId === userId) {
            setAllowUpdate(true);
        } else {
            setAllowUpdate(false);
        }
    }, [data, userId]);

    const getPost = () => {
        axios.get(urlAPI)
            .then(response => {
                setData(response.data);
                getUser(response.data.userId);
            })
            .catch(error => console.log(error));
    }

    const getUser = (userId) => {
        axios.get(`http://localhost:8080/api/auth/${userId}`)
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
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                getPost();
                setIsUpdating(false)
            })
            .catch(error => console.log(error));
    }

    const handleDelete = () => {
        axios.delete(urlAPI)
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
                <div className='container-background'>
                    <div className='container'>
                        <div className='content'>
                            <div className='content-left'>
                                <div className='post-header'>
                                    {user ? (
                                        <p className='post-header--username' onClick={() => setShowModal(true)}>{user.firstName} {user.lastName}</p>
                                    ) : (
                                        <p></p>
                                    )}
                                    <p className='post-header--date'>{dateParser(data.createdAt)}</p>
                                </div>
                                {isUpdating ? (
                                    <div className='post-content--image'>
                                        <img id='postImage' src={data.imageUrl} alt='Mon article' />
                                        <div className='add-image'>
                                            <label htmlFor='content-file' className='button blue round'><FaRegImage /></label>
                                            <input type="file" id='content-file' accept='image/png, image/jpg, image/jpeg' onChange={handleChangeFile} />
                                            {imageUploaded ? (
                                                <p className='imageUploaded'>Image ajoutée : <span>{imageUploaded}</span></p>
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
                                {allowUpdate ? (
                                    <div className='post-content--button'>
                                        {isUpdating ? (
                                            <button className='button blue' onClick={handleUpdate}>Valider</button>
                                        ) : (
                                            <button className='button blue' onClick={() => setIsUpdating(true)}>Modifier le post</button>
                                        )}
                                        <button className='button red' onClick={() => setShowDeleteModal(true)}>Supprimer le post</button>
                                    </div>
                                ) : (
                                    null
                                )}
                                {showDeleteModal ? (
                                    <div className='modal'>
                                        <div className='modal-content'>
                                            <p>Êtes-vous sûr(e) de supprimer le post ?</p>
                                            <button className='button blue' onClick={handleDelete}>Oui</button>
                                            <button className='button red' onClick={() => setShowDeleteModal(false)}>Non</button>
                                        </div>
                                    </div>
                                ) : (
                                    null
                                )}
                            </div>
                            <div className='content-right'>
                                <Likes id={id} />
                                <Comments id={id} />
                            </div>
                        </div>
                    </div>
                </div>
                {showModal ? (
                    <Modal setShowModal={setShowModal} user={user} />
                ) : (
                    null
                )}

            </div>
        </div >
    );
};

export default Post;