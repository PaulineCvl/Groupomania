import React from 'react';
import { NavLink } from 'react-router-dom';

const Card = (props) => {
    const { post } = props;
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
                <div className='card-header'>
                    <p>Posté le {dateParser(post.createdAt)}</p>
                </div>
                <img src={post.imageUrl} alt={post.description} />
                <p>{post.description}</p>
            </div>
        </NavLink>
    );
};

export default Card;