import React from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import localforage from 'localforage';
import { useEffect, useState } from 'react';

const Home = () => {
  const [userId, setUserId] = useState();

  useEffect(() => {
    localforage.getItem('userId')
      .then(userId => {
        setUserId(userId);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='home'>
      <Header />
      <Posts userId={userId} />
    </div>
  );
};

export default Home;