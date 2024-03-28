import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home.tsx';
import Login from './pages/login.tsx';
import Posts from './pages/posts.tsx';
import Post from './pages/post.tsx';
import Profile from './pages/profile.tsx';

import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/:id" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
