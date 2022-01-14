import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';

const CommentUser = (props) => {
    const { id } = props;
    const [user, setUser] = useState();

    useEffect(() => {
        localforage.getItem('token')
        .then(response => getUser(response))
        .catch(error => console.log(error));
    }, []);

    const getUser = (token) => {
        axios.get(`http://localhost:8080/api/auth/${id}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(response => setUser(response.data))
            .catch(error => console.log(error));
    }

    return (
        <div>
            {user ? (
                <p className='header-element--username'>{user.firstName} {user.lastName}</p>
            ) : (
                <p></p>
            )}

        </div>
    );
};

export default CommentUser;