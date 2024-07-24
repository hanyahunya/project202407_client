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
      return;
    }

    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/projects', { 
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        setProjects(response.data.projects);
      } catch (err) {
        console.error(err);
        setError('프로젝트를 가져오는 중 오류가 발생했습니다.');
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
