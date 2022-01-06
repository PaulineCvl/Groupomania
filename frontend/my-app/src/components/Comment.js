import axios from 'axios';
import React, { useState } from 'react';

const Comment = (props) => {
    const [message, setMessage] = useState('');
    const { id } = props;
    const { getComments } = props;
    const urlAPI = `http://localhost:8080/api/posts/${id}/comment`;
    const token = sessionStorage.getItem('token');

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
            getComments();
            setMessage('');
            console.log(response);
        })
        .catch(error => console.log(error));
    }

    return (
        <div className='comment-form'>
            <form onSubmit={handleSubmit}>
                <textarea placeholder='Commenter' name='comment' value={message} onChange={handleChange} />
                <input type='submit' value='Commenter' className='button red' />
            </form>
        </div>
    );
};

export default Comment;