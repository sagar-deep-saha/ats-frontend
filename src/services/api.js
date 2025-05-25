import axios from 'axios';

const backendApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL || 'https://ats-backend-teal.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const mlApi = axios.create({
  baseURL: process.env.REACT_APP_ML_API_URL || 'https://ats-ml-service.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const resumeService = {
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await backendApi.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getResumeAnalysis: async (id) => {
    const response = await mlApi.get(`/analyze/${id}`);
    return response.data;
  },
  getUserResumes: async () => {
    const response = await backendApi.get('/resumes');
    return response.data;
  },
  deleteResume: async (id) => {
    const response = await backendApi.delete(`/resumes/${id}`);
    return response.data;
  },
};

export default { backendApi, mlApi };