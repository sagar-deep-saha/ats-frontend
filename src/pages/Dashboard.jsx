import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PersonIcon from '@mui/icons-material/Person';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { resumeService } from '../services/api';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await resumeService.getUserResumes();
        const mapped = data.map((resume) => ({
          ...resume,
          score: resume.professionalityScore ?? resume.score,
          topField: resume.careerRecommendations?.[0]?.field ?? resume.topField,
          fieldScore: resume.careerRecommendations?.[0]?.score ?? resume.fieldScore,
        }));
        setResumes(mapped);
        setError(null);
      } catch (err) {
        setError('Failed to load resume history. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await resumeService.deleteResume(id);
      setResumes(resumes.filter(resume => resume.id !== id));
    } catch {
      setError('Failed to delete resume.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress size={40} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your dashboard...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Resume Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        View and manage all your previously analyzed resumes
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Resumes
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <UploadFileIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                <Typography variant="h3">{resumes.length}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AnalyticsIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                <Typography variant="h3">
                  {resumes.length > 0 
                    ? Math.round(resumes.reduce((acc, resume) => acc + (resume.score ?? 0), 0) / resumes.length) 
                    : 0}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Career Field
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">
                  {resumes.length > 0 
                    ? resumes.sort((a, b) => (b.fieldScore ?? 0) - (a.fieldScore ?? 0))[0].topField
                    : 'N/A'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          component={RouterLink} 
          to="/upload" 
          startIcon={<UploadFileIcon />}
        >
          Upload New Resume
        </Button>
      </Box>
      {resumes.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="resume history table">
            <TableHead>
              <TableRow>
                <TableCell>Resume Name</TableCell>
                <TableCell>Upload Date</TableCell>
                <TableCell>Professionality Score</TableCell>
                <TableCell>Best Career Match</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resumes.map((resume) => (
                <TableRow key={resume.id}>
                  <TableCell component="th" scope="row">
                    {resume.name}
                  </TableCell>
                  <TableCell>{resume.uploadDate}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 100, mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={resume.score ?? 0} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {resume.score ?? 0}/100
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={`${resume.topField ?? 'N/A'} (${resume.fieldScore ?? 0}%)`} 
                      color="primary" 
                      variant="outlined" 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={RouterLink}
                      to={`/results/${resume.id}`}
                      color="primary"
                      aria-label="view"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="download">
                      <FileDownloadIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      aria-label="delete"
                      onClick={() => handleDelete(resume.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No Resumes Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You haven't uploaded any resumes for analysis yet.
          </Typography>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/upload" 
            startIcon={<UploadFileIcon />}
          >
            Upload Your First Resume
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default Dashboard; 