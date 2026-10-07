import { Routes, Route } from 'react-router-dom';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Home from './pages/Home'
import Dashboard from './pages/user/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/user/Profile';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

      </Routes>
    </div >
  )
}

export default App
