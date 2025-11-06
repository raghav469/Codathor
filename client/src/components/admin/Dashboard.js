import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CompetitionForm from './CompetitionForm';
import CompetitionsList from './CompetitionsList';
import SubmissionsList from './SubmissionsList';
import EnrollmentsList from './EnrollmentsList';
import api from '../../services/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Active Competitions</h3>
          <p>{stats.activeCompetitions || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Participants</h3>
          <p>{stats.totalParticipants || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Submissions</h3>
          <p>{stats.pendingSubmissions || 0}</p>
        </div>
      </div>

      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList>
          <Tab>Competitions</Tab>
          <Tab>Add Competition</Tab>
          <Tab>Submissions</Tab>
          <Tab>Enrollments</Tab>
        </TabList>

        <TabPanel>
          <CompetitionsList />
        </TabPanel>
        <TabPanel>
          <CompetitionForm />
        </TabPanel>
        <TabPanel>
          <SubmissionsList />
        </TabPanel>
        <TabPanel>
          <EnrollmentsList />
        </TabPanel>
      </Tabs>
    </div>
  );
}