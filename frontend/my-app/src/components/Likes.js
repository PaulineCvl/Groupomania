import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaThumbsUp } from 'react-icons/fa';

const Likes = (props) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState();
    const [userId, setUserId] = useState();
    const { id } = props;
    const urlAPI = `http://localhost:8080/api/posts/${id}/like`;

    const [token, setToken] = useState();

    useEffect(() => {
        localforage.getItem('token')
            .then(token => {
                setToken(token);
            })
            .catch(error => console.log(error));

        localforage.getItem('userId')
            .then(userId => {
                setUserId(userId);
            })
            .catch(error => console.log(error));

    }, []);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `token ${token}`;
        if (token) {
            getLikes();
        }
    }, [token]);

    useEffect(() => {
        if (likes != 0) {
            likes.forEach(element => {
                if (userId === element.userId) {
                    setIsLiked(true);
                }
            })
        }
    }, [likes])

    const getLikes = () => {
        axios.get(urlAPI)
            .then(response => {
                setLikes(response.data);
            })
            .catch(error => console.log(error));
    }

    const handleLike = () => {
        axios.post(urlAPI, 1)
            .then(() => {
                getLikes();
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='likes'>
            {isLiked ? (
                <button className='liked' onClick={() => { handleLike(); setIsLiked(false) }}><FaThumbsUp />Aimer le post</button>
            ) : (
                <button onClick={() => { handleLike(); setIsLiked(true) }}><FaRegThumbsUp />Aimer le post</button>
            )}
            <p>{likes.length > 0 ? likes.length : 0} personne(s) ont aimé ce post</p>
        </div>
    );
};

export default Likes;