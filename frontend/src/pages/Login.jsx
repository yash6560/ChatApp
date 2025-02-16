import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useAuthStore} from '../store/useAuthStore';

const Login = () => {
  const {userLogin, isuserLogin, checkAuth} = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email : '',
    password : '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev , [e.target.name] : e.target.value
    }));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await userLogin(formData);
    if(res?.success) {
      await checkAuth();
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={setFormData.email} 
            name='email'
            onChange={handleChange} 
            required 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={setFormData.password} 
            onChange={handleChange} 
            name='password'
            required 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            {isuserLogin ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Do not have an account? <Link to='/signup' className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login