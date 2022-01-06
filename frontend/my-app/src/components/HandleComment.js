import axios from 'axios';
import React, { useState } from 'react';

const HandleComment = (props) => {
    const { postId } = props;
    const { comment } = props;
    const { getComments } = props;
    const token = sessionStorage.getItem('token');
    const urlAPI = `http://localhost:8080/api/posts/${postId}/comment/${comment.id}`;

    const [isUpdating, setIsUpdating] = useState(false);
    const [updateContent, setUpdateContent] = useState('');

    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString('fr-FR', {
            month: "long",
            year: "numeric",
            day: "numeric"
        });
        return newDate;
    }

    const handleChange = (e) => {
        const commentUpdated = {
            message: updateContent
        }

        axios.put(urlAPI, commentUpdated, {
            headers: {
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
        .then(() => getComments())
        .catch(error => console.log(error));
    }

    return (
        <div key={comment.id} className='comment' >
            <div className='comment-header'>
                <p>Posté le {dateParser(comment.createdAt)}</p>
            </div>
            {isUpdating ? (
                <textarea autoFocus defaultValue={updateContent ? updateContent : comment.message} onChange={(e) => setUpdateContent(e.target.value)} />
            ) : (
                <p>{updateContent ? updateContent : comment.message}</p>
            )}
            <div className='comment-footer'>
                {isUpdating ? (
                    <button onClick={handleChange}>Valider</button>
                ) : (
                    <button onClick={() => setIsUpdating(true)}>Modifier</button>
                )}
                <button onClick={handleDelete} className='delete'>Supprimer</button>
            </div>
        </div>
    );
};

export default HandleComment;