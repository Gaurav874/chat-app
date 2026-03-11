import './App.css'
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import {Route , Routes , Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import  ProfilePage from './pages/ProfilePage'


function App() {
  const {authUser,checkAuth} = useAuthStore()

  useEffect(() => {
  checkAuth();
}, []);

console.log({ authUser });

  return (
    <div>
      <Navbar/>

      <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
