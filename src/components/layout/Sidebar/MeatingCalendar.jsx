import React from 'react';

const MeetingCalendar = ({ projectId }) => {
  localStorage.setItem('prevPage', projectId);
  // Use projectId to fetch meetings or events specific to the selected project
  return (
    <div>
      <h2>Meeting Calendar for Project {projectId}</h2>
      {/* Render calendar or meetings/events specific to the projectId */}
    </div>
  );
};

export default MeetingCalendar;
