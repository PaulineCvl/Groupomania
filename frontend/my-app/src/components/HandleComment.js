import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { FaExclamationTriangle } from 'react-icons/fa';

const HandleComment = (props) => {
    const { postId } = props;
    const { comment } = props;
    const { getComments } = props;
    const urlAPI = `http://localhost:8080/api/posts/${postId}/comment/${comment.id}`;

    const [isUpdating, setIsUpdating] = useState(false);
    const [updateContent, setUpdateContent] = useState('');
    const [user, setUser] = useState();
    const [userId, setUserId] = useState();
    const [isReported, setIsReported] = useState();
    const [allowUpdate, setAllowUpdate] = useState();
    const [showModal, setShowModal] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [showReportModal, setShowReportModal] = useState();

    useEffect(() => {
        localforage.getItem('userId')
            .then(userId => setUserId(userId))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (userId === comment.userId) {
            setAllowUpdate(true);
        } else {
            setAllowUpdate(false);
        }
    }, [userId])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/auth/${comment.userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (comment.isReported) {
            setIsReported(true);
        } else {
            setIsReported(false);
        }
    }, []);

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
            message: updateContent ? updateContent : comment.message
        }

        axios.put(urlAPI, commentUpdated)
            .then(() => setIsUpdating(false))
            .catch(error => console.log(error));
    }

    const handleDelete = () => {
        axios.delete(urlAPI)
            .then(() => getComments())
            .catch(error => console.log(error));
    }

    const handleReport = () => {
        const commentReported = {
            isReported: true
        }

        axios.put(urlAPI, commentReported)
            .then(() => setIsReported(true))
            .catch(error => console.log(error));
    }

    return (
        <div key={comment.id} className='comment' >
            {user ? (
                <div className='comment-header'>
                    <p className='comment-header--username' onClick={() => setShowModal(true)}>{user.firstName} {user.lastName}</p>
                    <p className='comment-header--date'>Posté le {dateParser(comment.createdAt)}</p>
                </div>
            ) : (
                null
            )}

            <div className='comment--message'>
                {isUpdating ? (
                    <textarea autoFocus defaultValue={updateContent ? updateContent : comment.message} onChange={(e) => setUpdateContent(e.target.value)} />
                ) : (
                    <p>{updateContent ? updateContent : comment.message}</p>
                )}
            </div>
            {allowUpdate ? (
                <div className='comment--footer allowed'>
                    <div>
                        {isUpdating ? (
                            <button onClick={handleChange}>Valider</button>
                        ) : (
                            <button onClick={() => setIsUpdating(true)}>Modifier</button>
                        )}
                        <button onClick={() => setShowDeleteModal(true)} className='delete'>Supprimer</button>
                        {showDeleteModal ? (
                            <div className='modal'>
                                <div className='modal-content'>
                                    <p>Supprimer le commentaire ?</p>
                                    <button className='button blue' onClick={handleDelete}>Oui</button>
                                    <button className='button red' onClick={() => setShowDeleteModal(false)}>Non</button>
                                </div>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                    {isReported ? (
                        <button className='report-button reported'><FaExclamationTriangle />Signaler le commentaire</button>
                    ) : (
                        <div className='report'>
                            <button className='report-button' onClick={() => setShowReportModal(true)}><FaExclamationTriangle />Signaler le commentaire</button>
                            {showReportModal ? (
                                <div className='report-modal'>
                                    <p>Signaler ce commentaire ?</p>
                                    <button className='button blue' onClick={handleReport}>Oui</button>
                                    <button className='button red' onClick={() => setShowReportModal(false)}>Non</button>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            ) : (
                <div className='comment--footer'>
                    {isReported ? (
                        <button className='report-button reported'><FaExclamationTriangle />Signaler le commentaire</button>
                    ) : (
                        <button className='report-button' onClick={handleReport}><FaExclamationTriangle />Signaler le commentaire</button>
                    )}
                </div>
            )}
            {showModal ? (
                <Modal setShowModal={setShowModal} user={user} />
            ) : (
                null
            )}
        </div>
    );
};

export default HandleComment;