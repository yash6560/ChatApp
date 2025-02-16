import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAuthStore} from '../store/useAuthStore';

const Signup = () => {
  const {userSignup, isuserSignin} = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname : '',
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
    const res = await userSignup(formData);
    if(res?.success) {
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={setFormData.fullname}
            name="fullname"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={setFormData.email}
            name="email"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={setFormData.password}
            name="password"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isuserSignin ? "Loading..." : "Signup"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
