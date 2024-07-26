import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Layout } from '../components/layout'; // 경로 업데이트

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [sidebarWidth, setSidebarWidth] = useState(290); // 사이드바 기본 너비 설정

  useEffect(() => {
    const savedWidth = localStorage.getItem('sidebarWidth');
    
    if (savedWidth) {
      setSidebarWidth(Number(savedWidth));
    }
    
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('유효한 사용자 ID가 없습니다.');
      localStorage.removeItem('token');
      return;
    }
    
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/projects', { 
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        
        if(response.status === 400 || response.status === 403) {
          localStorage.removeItem('token');
          window.location.href = '/'; // 클라이언트 사이드 리디렉션
        } else {
          setProjects(response.data.projects);
        }
      } catch (err) {
        if (err.response) {
          // 서버가 응답을 보냈지만 상태 코드가 2xx가 아닌 경우
          if (err.response.status === 403) {
            alert('접근 권한이 없습니다. 로그인 상태를 확인하세요.');
            localStorage.removeItem('token');
            window.location.href = '/'; // 클라이언트 사이드 리디렉션
          } else {
            setError('프로젝트를 가져오는 중 오류가 발생했습니다.');
          }
        } else {
          // 네트워크 오류 또는 서버가 응답을 보내지 않은 경우
          setError('서버와의 연결에 문제가 발생했습니다.');
        }
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Layout sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth} projects={projects}>
      {/* 추가적인 페이지 콘텐츠가 여기에 들어갈 수 있습니다 */}
    </Layout>
  );
}

export default Projects;
