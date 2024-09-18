import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Contact from './components/Contact/Contact';
import Certifications from './components/Certifications/Certifications';
import Internroom from './components/InternRoom/Internroom';
import Quiz from './components/Quiz/Quiz';
import MainLayout from './components/MainLayout/MainLayout';
import { myContext } from './Context';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // Import ProtectedRoute component

function App() {
  const [user, setUser] = useState([]);

  return (
    <myContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          {/* Routes without sidebar */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Main layout with sidebar */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="certifications/:certification_id/quizes" element={<Internroom />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quizes/:quiz_id" element={<Quiz />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </myContext.Provider>
  );
}

export default App;
