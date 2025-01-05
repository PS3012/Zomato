import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './store/auth.slice';
import './App.css'
import Home from './pages/Home'
import Layout from './layouts/Layout'
import Login from './pages/Login'
import VerifyMail from './pages/VerifyMail';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  return (
    <>

      <Routes>
        <Route path="/verify-email" element={<VerifyMail />} />
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />

    </>
  )
}

export default App
