import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CommentUser = (props) => {
    const { id } = props;
    const [user, setUser] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/auth/${id}`)
        .then(response => setUser(response.data))
        .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {user ? (
                <p className='comment-header--username'>{user.firstName} {user.lastName}</p>
            ) : (
                <p></p>
            )}

        </div>
    );
};

export default CommentUser;