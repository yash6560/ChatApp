import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

function App() {

  const {isCheckAuth, checkAuth} = useAuthStore();


  useEffect(() => {
    checkAuth(); 
  }, [checkAuth]);

  if(isCheckAuth){
    return(
      <div className=' h-screen flex items-center'>Loading...</div>
    )
  }  

  return (
    <>
    <Navbar/>
      
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      
      <Footer/>
    </>
  )
}

export default App
