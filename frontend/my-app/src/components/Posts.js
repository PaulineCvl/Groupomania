import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import FormPost from './FormPost';
import BeatLoader from "react-spinners/BeatLoader";
import localforage from 'localforage';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        localforage.getItem('token')
            .then(token => {
                setToken(token);
            })
            .catch(error => console.log(error));

        localforage.getItem('userId')
            .then(userId => {
                axios.get(`http://localhost:8080/api/auth/${userId}`)
                    .then(response => setUser(response.data))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));

    }, [token]);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `token ${token}`;
        if (token) {
            getDatas();
        }
    }, [token]);

    const getDatas = () => {
        axios.get('http://localhost:8080/api/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.log(error));
    }

    return (
        <div className='background'>
            {token ? (
                <div className='posts'>
                    <div className='container'>
                        <div className='welcome'>
                            <p>Bonjour {user ? (
                                <span>{user.firstName}</span>
                            ) : (
                                <span></span>
                            )} !</p>
                            <p>Donnez des nouvelles à vos collègues :</p>
                        </div>
                        <FormPost getDatas={getDatas} />
                    </div>
                    {posts.length > 0 ? (
                        <div className='home-content'>

                            <ul className='container posts-list'>
                                {posts.map((post) => (
                                    <Card post={post} key={post.id} />
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className='nopost'>Aucun post créé</p>
                    )}
                </div>
            ) : (
                <BeatLoader />
            )}
        </div>
    );
};

export default Posts;