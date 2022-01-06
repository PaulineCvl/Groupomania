import axios from 'axios';
import React, { useState } from 'react';
import FormData from 'form-data';

const FormPost = (props) => {
    const [fileUploaded, setFileUploaded] = useState(null);
    const [message, setMessage] = useState('');
    const {getDatas} = props;
    const token = sessionStorage.getItem('token');
    const imagefile = document.querySelector('#file');

    const handleChangeFile = () => {
        setFileUploaded(imagefile.files[0].name);
    }

    const handleChangeText = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append('description', e.target.description.value);
        form.append('image', imagefile.files[0]);

         axios({
            method: "post",
            url: 'http://localhost:8080/api/posts',
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            getDatas();
            setFileUploaded(null);
            setMessage('');
            console.log(response)
        })
        .catch(error => console.log(error)); 
    }

    return (
        <div className='formPost'>
            <form onSubmit={handleSubmit}>
                <textarea placeholder='Écrire un post' value={message} name='description' onChange={handleChangeText} />
                <label htmlFor='file'>Ajouter une image</label>
                <input type='file' id='file' accept='image/png, image/jpg, image/jpeg' name='image' onChange={handleChangeFile} />
                {fileUploaded ? (
                    <p className='formPost-imageUploaded'>Image ajoutée : <span>{fileUploaded}</span></p>
                ) : (
                    <p className='formPost-imageUploaded'></p>
                )}
                <input type='submit' id='submitpost' value='Poster' />
            </form>
        </div>
    );
};

export default FormPost;