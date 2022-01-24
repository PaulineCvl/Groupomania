import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import HandleComment from './HandleComment';

const Comments = (props) => {
    const [data, setData] = useState([]);
    const { id } = props;
    const urlAPI = `http://localhost:8080/api/posts/${id}/comment`;

    const [token, setToken] = useState();
  
    useEffect(() => {
        localforage.getItem('token')
        .then(token => {
          setToken(token);
        })
        .catch(error => console.log(error));

    }, []);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `token ${token}`;
        if(token) {
            getComments();
        }
      }, [token]);

    const getComments = () => {
        axios.get(urlAPI)
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