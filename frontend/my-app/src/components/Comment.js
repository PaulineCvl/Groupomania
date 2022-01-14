import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';

const Comment = (props) => {
    const [message, setMessage] = useState('');
    const { id } = props;
    const { getComments } = props;
    const urlAPI = `http://localhost:8080/api/posts/${id}/comment`;
    const [token, setToken] = useState();

    useEffect(() => {
        localforage.getItem('token')
        .then(response => setToken(response))
        .catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            message: e.target.comment.value
        }

        axios.post(urlAPI, newComment, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            getComments(token);
            setMessage('');
            console.log(response);
        })
        .catch(error => console.log(error));
    }

    return (
        <div className='comment-form'>
            <form onSubmit={handleSubmit}>
                <textarea placeholder='Écrire un commentaire' name='comment' value={message} onChange={handleChange} />
                <input type='submit' value='Commenter' className='button red' />
            </form>
        </div>
    );
};

export default Comment;