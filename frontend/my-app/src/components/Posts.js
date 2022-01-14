import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import FormPost from './FormPost';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState();

    useEffect(() => {
        localforage.getItem('token')
            .then(response => {
                getDatas(response);
                setToken(response);
            })
            .catch(error => console.log(error));
    }, []);

    const getDatas = (token) => {
        axios.get('http://localhost:8080/api/posts', {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(response => setPosts(response.data))
            .catch(error => console.log(error));
    }

    return (
        <div className='background'>
            {token ? (
            <div className='container posts'>
                <FormPost getDatas={getDatas} />
                {posts.length > 0 ? (
                    <ul className='posts-list'>
                        {posts.map((post) => (
                            <Card post={post} key={post.id} />
                        ))}
                    </ul>
                ) : (
                    <p className='nopost'>Aucun post créé</p>
                )}
            </div>
            ) : (
                <div>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default Posts;