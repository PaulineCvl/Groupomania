import React from 'react';
import img from '../assets/img/user.png';
import { FaTimesCircle } from 'react-icons/fa';

const Modal = (props) => {
    const { setShowModal } = props;
    const { user } = props;

    return (
        <div className='modal'>
            <div className='modal-content'>
                <FaTimesCircle onClick={() => setShowModal(false)} />
                <p className='modal-username'>{user.firstName} {user.lastName}</p>
                <img src={user.profilePicture ? user.profilePicture : img} alt='utilisateur' />
                <p>{user.description}</p>
            </div>
        </div>
    );
};

export default Modal;