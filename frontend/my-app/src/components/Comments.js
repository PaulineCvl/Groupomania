import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import HandleComment from './HandleComment';

const Comments = (props) => {
    const [data, setData] = useState([]);
    const { id } = props;
    const urlAPI = `http://localhost:8080/api/posts/${id}/comment`;

    useEffect(() => {
        localforage.getItem('token')
        .then(response => getComments(response))
        .catch(error => console.log(error));
    }, []);

    const getComments = (token) => {
        axios.get(urlAPI, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => setData(response.data))
        .catch(error => console.log(error));
    }

    return (
        <div className='comments'>
            <Comment id={id} getComments={getComments} />
            <ul className='comments-list'>
                {data.map((comment) => (
                <HandleComment key={comment.id} comment={comment} postId={id} getComments={getComments} />
                ))}
            </ul>
        </div>
    );
};

export default Comments;