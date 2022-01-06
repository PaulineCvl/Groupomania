import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import Comments from '../components/Comments';
import Header from '../components/Header';
import Likes from '../components/Likes';

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateContent, setUpdateContent] = useState('');
    const [updateImage, setUpdateImage] = useState('');
    const urlAPI = `http://localhost:8080/api/posts/${id}`;
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        axios.get(urlAPI, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(response => setData(response.data))
            .catch(error => console.log(error));
    }, []);

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
            .then(() => setIsUpdating(false))
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

    return (
        <div>
            <Header />
            <div className='post'>
                <div className='post-container'>
                    <div className='post-content'>
                        {isUpdating ? (
                            <input type="file" accept='image/png, image/jpg, image/jpeg' onChange={(e) => setUpdateImage(e.target.files[0])} />
                        ) : (
                            <img id='postImage' src={updateImage ? updateImage : data.imageUrl} alt='Mon article' />
                        )}
                        {isUpdating ? (
                            <textarea autoFocus defaultValue={updateContent ? updateContent : data.description} onChange={(e) => setUpdateContent(e.target.value)}></textarea>
                        ) : (
                            <p>{updateContent ? updateContent : data.description}</p>
                        )}
                    </div>
                    <div className='post-button'>
                        {isUpdating ? (
                            <button className='button white' onClick={handleUpdate}>Valider</button>
                        ) : (
                            <button className='button white' onClick={() => setIsUpdating(true)}>Modifier le post</button>
                        )}
                        <button className='button red' onClick={handleDelete}>Supprimer le post</button>
                    </div>
                    <Likes id={id} />
                    <Comments id={id} />
                </div>
            </div>
        </div>
    );
};

export default Post;