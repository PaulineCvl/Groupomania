import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Likes = (props) => {
    const [data, setData] = useState([]);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const { id } = props;
    const urlAPI = `http://localhost:8080/api/posts/${id}/like`;
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        axios.get(urlAPI, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => setData(response.data))
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        let sum = 0;

        for (let i = 0; i < data.length; i++) {
            sum += data[i].like;
        }

        setLikes(sum);
    }, [data])

    const handleLike = () => {
        isLiked ? setIsLiked(false) : setIsLiked(true);
        axios.post(urlAPI, 1, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }


    return (
        <div className='post-likes'>
            {isLiked ? (
                <button onClick={handleLike}>Retirer mon like</button>
            ) : (
                <button onClick={handleLike}>Liker</button>
            )}
            <p>{likes} personne(s) ont aimé ce post</p>
        </div>
    );
};

export default Likes;