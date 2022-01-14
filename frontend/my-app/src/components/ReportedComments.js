import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentUser from './CommentUser';

const ReportedComments = () => {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateContent, setUpdateContent] = useState('');
    const [token, setToken] = useState();

    useEffect(() => {
        localforage.getItem('token')
        .then(token => {
            getComments(token);
            setToken(token);
        })
    }, []);

    const getComments = (token) => {
        axios.get('http://localhost:8080/api/comment', {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(response => {
                setComments(response.data);
            })
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

    const handleChange = (e) => {
        const updateCommentId = e.target.closest('.comment').id;
        const post = e.target.closest('.comment--footer').id;
        const commentContent = document.querySelector('textarea').value;

        const commentUpdated = {
            message: updateContent ? updateContent : commentContent
        }

        axios.put(`http://localhost:8080/api/posts/${post}/comment/${updateCommentId}`, commentUpdated, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(() => setIsUpdating(false))
            .catch(error => console.log(error));
    }

    const handleDelete = (e) => {
        const deleteCommentId = e.target.closest('.comment').id;
        const postId = e.target.closest('.comment--footer').id;

        axios.delete(`http://localhost:8080/api/posts/${postId}/comment/${deleteCommentId}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(() => getComments(token))
            .catch(error => console.log(error));
    }

    const handleModerate = (e) => {
        const updateCommentId = e.target.closest('.comment').id;
        const post = e.target.closest('.comment--footer').id;

        const commentUpdated = {
            isReported: false
        }

        axios.put(`http://localhost:8080/api/posts/${post}/comment/${updateCommentId}`, commentUpdated, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(() => getComments(token))
            .catch(error => console.log(error));
    }

    return (
        <div className='background'>
            <div className='container'>
                {comments.length > 0 ? (
                    <div className='admin-content'>
                        <h2>Commentaires signalés :</h2>
                        <ul>
                            {comments.map((comment) => (
                                <div key={comment.id} id={comment.id} className='comment' >
                                    <div className='header-element'>
                                        <CommentUser id={comment.userId} />
                                        <p className='header-element--date'>Posté le {dateParser(comment.createdAt)}</p>
                                    </div>
                                    <div className='comment--message'>
                                    {isUpdating ? (
                                        <textarea autoFocus defaultValue={updateContent ? updateContent : comment.message} onChange={(e) => setUpdateContent(e.target.value)} />
                                    ) : (
                                        <p>{updateContent ? updateContent : comment.message}</p>
                                    )}
                                    </div>
                                    <div id={comment.postId} className='comment--footer'>
                                        <button onClick={() => navigate(`/${comment.postId}`)}>Voir le post associé</button>
                                        {isUpdating ? (
                                            <button onClick={handleChange}>Valider</button>
                                        ) : (
                                            <button onClick={() => setIsUpdating(true)}>Modifier</button>
                                        )}
                                        <button onClick={handleDelete} className='delete'>Supprimer</button>
                                        <button onClick={handleModerate}>Ne pas signaler</button>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className='admin-content'>
                        <p className='no-reported-comments'>Pas de commentaires signalés</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportedComments;