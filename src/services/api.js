import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://ats-back-end.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const resumeService = {
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getResumeAnalysis: async (id) => {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
  },
  getUserResumes: async () => {
    const response = await api.get('/resumes');
    return response.data;
  },
  deleteResume: async (id) => {
    const response = await api.delete(`/resumes/${id}`);
    return response.data;
  },
};

export default api; 