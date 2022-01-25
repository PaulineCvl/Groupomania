import axios from 'axios';
import React, { useState } from 'react';
import FormData from 'form-data';
import { FaRegImage } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa';

const FormPost = (props) => {
    const [fileUploaded, setFileUploaded] = useState(null);
    const [message, setMessage] = useState('');
    const { getDatas } = props;
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

        axios.post('http://localhost:8080/api/posts', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(() => {
                getDatas();
                setFileUploaded(null);
                setMessage('');
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='formPost'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='description'>Écrire un post</label>
                <textarea id='description' placeholder='Écrire un post' value={message} name='description' onChange={handleChangeText} tabIndex="0" />
                <div className='formPost--buttons'>
                    {fileUploaded ? (
                        <p className='imageUploaded'>Image ajoutée : <span>{fileUploaded}</span></p>
                    ) : (
                        <p className='imageUploaded'></p>
                    )}
                    <label className='button blue round' htmlFor='file'><FaRegImage />Ajouter une image</label>
                    <input type='file' id='file' accept='image/png, image/jpg, image/jpeg' name='image' onChange={handleChangeFile} />
                    <label htmlFor='submitPost' className='button red round'><FaPaperPlane />Poster</label>
                    <input type='submit' id='submitPost' value='Poster' />
                </div>
            </form>
        </div>
    );
};

export default FormPost;