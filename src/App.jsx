import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute 파일의 경로를 맞춰 주세요

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute element={Home} />} />
        <Route path="/projects" element={<PrivateRoute element={Projects} />} />
        <Route path="/login" element={<PrivateRoute element={Login} />} />
        <Route path="/signup" element={<PrivateRoute element={SignUp} />} />
      </Routes>
    </Router>
  );
}

export default App;
