import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Paper,
  LinearProgress,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { resumeService } from '../services/api';

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files?.[0]) {
      const selectedFile = event.target.files[0];
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF or Word document');
        setFile(null);
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    try {
      const response = await resumeService.uploadResume(file);
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        navigate(`/results/${response.id}`);
      }, 500);
    } catch (err) {
      if (err && typeof err === 'object' && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to upload resume.');
      }
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Upload Your Resume
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Upload your resume in PDF or Word format to get AI-powered analysis and career recommendations.
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mt: 3, maxWidth: 600, mx: 'auto' }}>
        <form onSubmit={handleSubmit}>
          <Box 
            sx={{ 
              border: '2px dashed #ccc', 
              borderRadius: 2, 
              p: 4, 
              textAlign: 'center',
              mb: 3,
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
              }
            }}
            onClick={() => document.getElementById('resume-upload')?.click()}
          >
            {file ? (
              <>
                <UploadFileIcon sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  {file.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              </>
            ) : (
              <>
                <CloudUploadIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Drag & Drop or Click to Upload
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Supports PDF and Word documents (Max 5MB)
                </Typography>
              </>
            )}
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Box>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {isUploading && (
            <Box sx={{ mb: 3 }}>
              <LinearProgress variant="indeterminate" sx={{ mb: 1 }} />
              <Typography variant="body2" color="text.secondary" align="center">
                Uploading...
              </Typography>
            </Box>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!file || isUploading}
            startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : <UploadFileIcon />}
          >
            {isUploading ? 'Uploading...' : 'Analyze Resume'}
          </Button>
        </form>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary">
          By uploading a resume, you agree to our Terms of Service and Privacy Policy.
          Your data will be processed securely and used only for analysis purposes.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Upload; 