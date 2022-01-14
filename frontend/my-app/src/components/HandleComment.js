import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';

const HandleComment = (props) => {
    const { postId } = props;
    const { comment } = props;
    const { getComments } = props;
    const urlAPI = `http://localhost:8080/api/posts/${postId}/comment/${comment.id}`;

    const [token, setToken] = useState();
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateContent, setUpdateContent] = useState('');
    const [user, setUser] = useState();
    const [isReported, setIsReported] = useState();

    useEffect(() => {
        localforage.getItem('token')
        .then(response => setToken(response))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/auth/${comment.userId}`)
        .then(response => {
            const userData = response.data;
            setUser(userData.firstName + ' ' + userData.lastName);
        })
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if(comment.isReported) {
            setIsReported(true);
        }else{
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
        .then(() => getComments(token))
        .catch(error => console.log(error));
    }

    const handleReport = () => {
        const commentReported = {
            isReported: true
        }

        axios.put(urlAPI, commentReported, {
            headers: {
                'Authorization': `token ${token}`
            }
        }).then(() => setIsReported(true))
        .catch(error => console.log(error));
    }

    return (
        <div key={comment.id} className='comment' >
            <div className='header-element'>
                <p className='header-element--username'>{user}</p>
                <p className='header-element--date'>Posté le {dateParser(comment.createdAt)}</p>
            </div>
            <div className='comment--message'>
            {isUpdating ? (
                <textarea autoFocus defaultValue={updateContent ? updateContent : comment.message} onChange={(e) => setUpdateContent(e.target.value)} />
            ) : (
                <p>{updateContent ? updateContent : comment.message}</p>
            )}
            </div>
            <div className='comment--footer'>
                {isUpdating ? (
                    <button onClick={handleChange}>Valider</button>
                ) : (
                    <button onClick={() => setIsUpdating(true)}>Modifier</button>
                )}
                <button onClick={handleDelete} className='delete'>Supprimer</button>
                {isReported ? (
                    <button>Commentaire signalé</button>
                ) : (
                    <button onClick={handleReport}>Signaler</button>
                )}
            </div>
        </div>
    );
};

export default HandleComment;