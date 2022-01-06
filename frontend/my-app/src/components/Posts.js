import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import FormPost from './FormPost';

const Posts = () => {
    const [data, setData] = useState([]);
    const token = sessionStorage.getItem('token');
    

    const getDatas = function() {
        axios.get('http://localhost:8080/api/posts', {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            const postData = response.data;
            setData(postData);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getDatas();
    }, []);

    return (
        <div className='posts'>
            <div className='posts-container'>
            <FormPost getDatas={getDatas} />
            <ul className='posts-list'>
                {data.map((post) => (
                    <Card post={post} key={post.id}/>
                ))}
            </ul>
            </div>

        </div>
    );
};

export default Posts;