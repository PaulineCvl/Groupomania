import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import HandleComment from './HandleComment';

const Comments = (props) => {
    const [data, setData] = useState([]);
    const { id } = props;
    const urlAPI = `http://localhost:8080/api/posts/${id}/comment`;
    const token = sessionStorage.getItem('token');

    const getComments = function() {
        axios.get(urlAPI, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => setData(response.data))
        .catch(error => console.log(error));
    }


    useEffect(() => {
        getComments();
    }, [])

    return (
        <div className='comments'>
            <ul className='comments-list'>
                {data.map((comment) => (
                <HandleComment key={comment.id} comment={comment} postId={id} getComments={getComments} />
                ))}
            </ul>
            <Comment id={id} getComments={getComments} />
        </div>
    );
};

export default Comments;