import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Card = (props) => {
    const { post } = props;
    const [user, setUser] = useState({});

    useEffect(() => {
        const getPost = (token) => {
            axios.get(`http://localhost:8080/api/auth/${post.userId}`, {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
                .then(response => setUser(response.data))
                .catch(error => console.log(error));
        }

        localforage.getItem('token')
            .then(response => getPost(response))
            .catch(error => console.log(error));
    }, []);

    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString('fr-FR', {
            month: "long",
            year: "numeric",
            day: "numeric"
        });
        return newDate;
    }

    return (
        <NavLink to={`/${post.id}`}>
            <div className='card'>
                <div className='header-element'>
                    <p className='header-element--username'>{user.firstName} {user.lastName}</p>
                    <p className='header-element--date'>Posté le {dateParser(post.createdAt)}</p>
                </div>
                <div className='card-image'>
                    <img src={post.imageUrl} alt={post.description} />
                </div>
                <div className='card-description'>
                    <p className='card--description'>{post.description}</p>
                </div>
            </div>
        </NavLink>
    );
};

export default Card;