import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const token = localStorage.getItem('token');
  
  // 특정 경로에 접근할 때만 토큰 검사를 수행합니다.
  const isAuthPath = window.location.pathname === '/projects';

  if (!isAuthPath && token) {
    // `/projects` 이외의 경로에 접근하려고 하면서 토큰이 있는 경우
    return <Navigate to="/projects" />;
  }

  if (isAuthPath && !token) {
    // `/projects` 경로에 접근하려고 하면서 토큰이 없는 경우
    return <Navigate to="/" />;
  }

  return <Element />;
};

export default PrivateRoute;
