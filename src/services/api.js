import axios from 'axios';
import { reports, stats, analyticsData } from '../data/reports';

// Placeholder for backend API URL
const API_URL = 'https://api.sadaksathi.gov.np/api/public';

/**
 * Mocking API calls with LocalStorage caching for low bandwidth support
 */
export const fetchReports = async (forceRefresh = false) => {
  const cacheKey = 'sadaksathi_reports';
  const cachedData = localStorage.getItem(cacheKey);

  if (!forceRefresh && cachedData) {
    console.log('Serving reports from cache');
    return JSON.parse(cachedData);
  }

  try {
    // Backend Integration Point:
    // const response = await axios.get(`${API_URL}/reports`);
    // const data = response.data;
    
    // Using mock data for now
    const data = reports;
    
    localStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    return cachedData ? JSON.parse(cachedData) : reports;
  }
};

export const fetchStats = async () => {
  try {
    // Backend Integration Point:
    // const response = await axios.get(`${API_URL}/stats`);
    // return response.data;
    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return stats;
  }
};

export const fetchAnalytics = async () => {
  try {
    // Backend Integration Point:
    // const response = await axios.get(`${API_URL}/analytics`);
    // return response.data;
    return analyticsData;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return analyticsData;
  }
};
