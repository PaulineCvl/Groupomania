import { Routes, Route } from 'react-router-dom';
import './App.css';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Post from './pages/Post';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />} />
        <Route path="account" element={<Account />} />
        <Route path="admin" element={<Admin />} />
        <Route path=":id" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
