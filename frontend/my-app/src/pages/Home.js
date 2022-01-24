import React from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import localforage from 'localforage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

const Home = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    localforage.getItem('token')
      .then(token => {
        setToken(token);
      })
      .catch(error => console.log(error));

    localforage.getItem('userId')
      .then(userId => {
        setUserId(userId);
      })
      .catch(error => console.log(error));
  }, []);


  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `token ${token}`
  }, [token]);

  return (
    <div className='home'>
      <Header />
      {token ? (
        <Posts userId={userId} />
      ) : (
        <BeatLoader />
      )}
    </div>
  );
};

export default Home;