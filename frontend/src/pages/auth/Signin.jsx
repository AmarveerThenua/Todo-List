import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resMessage, setResMessage] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setResMessage('')

    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/login',
        {
          email,
          password
        }
      )

      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("token", response.data.token)

      setResMessage(response.data.message)
      setEmail('')
      setPassword('')

      navigate('/dashboard')

    } catch (error) {
      setResMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-blue-600"
          >
            TodoApp
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition"
            >
              <FontAwesomeIcon icon={faHouse} /> Home
            </button>

            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Sign Up
            </button>

          </div>

        </div>
      </nav>


      {/* Signin Form */}
      <div className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Sign in to your account
          </p>

          {resMessage && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {resMessage}
            </p>
          )}

          <form
            onSubmit={submitHandler}
            className="space-y-5"
          >

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>


            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 active:scale-98 cursor-pointer"
            >
              Login
            </button>

          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Signin;