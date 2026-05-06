import axios from 'axios';

// Placeholder for API Base URL
const API_URL = '/api/auth';

/**
 * Authentication Service
 */
export const login = async (email, password, role) => {
  try {
    // In a real application, this would be an actual API call
    // const response = await axios.post(`${API_URL}/login`, { email, password, role });
    
    // Mocking the API response for demonstration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@sadaksathi.gov.np' && password === 'password123') {
          const mockResponse = {
            data: {
              token: "jwt_token_sample_12345",
              role: role,
              user: {
                name: "John Doe",
                email: email
              }
            }
          };
          
          // Store token in localStorage
          localStorage.setItem('token', mockResponse.data.token);
          localStorage.setItem('user', JSON.stringify(mockResponse.data.user));
          localStorage.setItem('role', mockResponse.data.role);
          
          resolve(mockResponse.data);
        } else {
          // Reject for other credentials
          reject(new Error('Invalid email or password. Please use admin@sadaksathi.gov.np and password123 for demo.'));
        }
      }, 1500);
    });
  } catch (error) {
    throw error.response?.data?.message || 'Authentication failed. Please try again.';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
