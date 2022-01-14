import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';

const Likes = (props) => {
    const [data, setData] = useState(0);
    const [isLiked, setIsLiked] = useState();
    const { id } = props;
    const urlAPI = `http://localhost:8080/api/posts/${id}/like`;
    const [token, setToken] = useState();

    useEffect(() => {
        localforage.getItem('token')
        .then(token => {
            getLikes(token);
            setToken(token);
        })
        .catch(error => console.log(error));
    }, []);

    const getLikes = (token) => {
        axios.get(urlAPI, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(response => {
                setData(response.data);

                localforage.getItem('userId')
                .then(userId => userLiked(response.data, userId))
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }

    const userLiked = (data, userId) => {
        data.forEach(element => {
            if(userId === element.userId) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        })
    }

    const handleLike = () => {
        axios.post(urlAPI, 1, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(() => {
                getLikes(token);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='likes'>
            {isLiked ? (
                <button onClick={() => {handleLike(); setIsLiked(false)}}><i className="fas fa-thumbs-up liked" /></button>
            ) : (
                <button onClick={() => {handleLike(); setIsLiked(true)}}><i className="far fa-thumbs-up" /></button>
            )}
            <p>{data.length > 0 ? data.length : 0} personne(s) ont aimé ce post</p>
        </div>
    );
};

export default Likes;