import React from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';

const Home = (props) => {
    return (
        <div className='home'>
            <Header />
            <Posts />
        </div>
    );
};

export default Home;