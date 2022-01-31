import axios from 'axios';
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Comment = (props) => {
    const [message, setMessage] = useState('');
    const { id } = props;
    const { getComments } = props;
    const urlAPI = `http://localhost:8080/api/posts/${id}/comment`;

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            message: message
        }

        axios.post(urlAPI, newComment)
        .then(() => {
            getComments();
            setMessage('');
        })
        .catch(error => console.log(error));
    }

    return (
        <div className='comment-form'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='create-comment'>Écrire un commentaire</label>
                <textarea placeholder='Écrire un commentaire' id='create-comment' name='comment' value={message} onChange={handleChange} tabIndex='0' />
                <label htmlFor='comment' className='button red round' tabIndex='0'><FaPaperPlane />Commenter</label>
                <input type='submit' id='comment' value='Commenter' />
            </form>
        </div>
    );
};

export default Comment;