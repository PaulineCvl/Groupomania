import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import FormData from 'form-data';

const FormPost = (props) => {
    const [fileUploaded, setFileUploaded] = useState(null);
    const [message, setMessage] = useState('');
    const { getDatas } = props;
    const [token, setToken] = useState();
    const imagefile = document.querySelector('#file');

    useEffect(() => {
        localforage.getItem('token')
        .then(response => setToken(response))
        .catch(error => console.log(error));
    }, []);

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

        axios.post('http://localhost:8080/api/posts', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `token ${token}`
            }
        })
            .then(() => {
                getDatas(token);
                setFileUploaded(null);
                setMessage('');
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='formPost'>
            <form onSubmit={handleSubmit}>
                <textarea placeholder='Écrire un post' value={message} name='description' onChange={handleChangeText} />
                <div className='formPost--buttons'>
                    <label className='button blue' htmlFor='file'>Ajouter une image</label>
                    <input type='file' id='file' accept='image/png, image/jpg, image/jpeg' name='image' onChange={handleChangeFile} />
                    {fileUploaded ? (
                        <p className='imageUploaded'>Image ajoutée : <span>{fileUploaded}</span></p>
                    ) : (
                        <p className='imageUploaded'></p>
                    )}
                    <input type='submit' className='button red' value='Poster' />
                </div>
            </form>
        </div>
    );
};

export default FormPost;