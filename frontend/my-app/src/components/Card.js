import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaMinusCircle } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';

const Card = (props) => {
    const { post } = props;
    const [user, setUser] = useState({});
    const [infosVisible, setInfosVisible] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/auth/${post.userId}`)
            .then(response => setUser(response.data))
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
        infosVisible ? (
        <div className='post-card'>
            <NavLink to={`/${post.id}`} tabIndex="0" >
                <div className='card'>
                    <div className='card-image'>
                        <img src={post.imageUrl} alt={post.description} />
                    </div>
                    <div className='card-infos--visible'>
                        <div className='header-element'>
                            <p className='header-element--date'>Posté le <span>{dateParser(post.createdAt)}</span></p>
                            <p className='header-element--username'>par <span>{user.firstName} {user.lastName}</span></p>
                        </div>
                        <div className='card-description'>
                            <p className='card--description'>{post.description}</p>
                        </div>
                    </div>
                </div>
            </NavLink>
            <FaMinusCircle onClick={() => setInfosVisible(false)} />
        </div>
        ) : (
            <div className='post-card'>
            <NavLink to={`/${post.id}`} tabIndex="0" >
                <div className='card'>
                    <div className='card-image'>
                        <img src={post.imageUrl} alt={post.description} />
                    </div>
                    <div className='card-infos'>
                        <div className='header-element'>
                            <p className='header-element--date'>Posté le <span>{dateParser(post.createdAt)}</span></p>
                            <p className='header-element--username'>par <span>{user.firstName} {user.lastName}</span></p>
                        </div>
                        <div className='card-description'>
                            <p className='card--description'>{post.description}</p>
                        </div>
                    </div>
                </div>
            </NavLink>
            <FaPlusCircle onClick={() => setInfosVisible(true)} />
        </div> 
        )
    );
};

export default Card;