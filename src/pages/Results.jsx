import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Divider,
  Grid,
  Chip,
  LinearProgress,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Alert,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import EngineeringIcon from '@mui/icons-material/Engineering';
import MemoryIcon from '@mui/icons-material/Memory';
import { resumeService } from '../services/api';

const Results = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!id) throw new Error('No ID provided');
        const data = await resumeService.getResumeAnalysis(id);
        setAnalysis(data);
        setError(null);
      } catch (err) {
        setError('Failed to load resume analysis. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Analyzing your resume...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Our AI is processing your document to provide detailed insights
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
        <Button variant="contained" href="/upload">
          Try Again
        </Button>
      </Box>
    );
  }

  if (!analysis) {
    return null;
  }

  // Icon mapping for demo
  const iconMap = {
    'Software Engineering': <CodeIcon />,
    'System Engineering': <EngineeringIcon />,
    'Data Science': <MemoryIcon />,
  };

  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Resume Analysis Results
      </Typography>
      <Grid container spacing={4}>
        {/* Professionality Score */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Professionality Score
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={analysis.professionalityScore}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="h6" color="text.secondary">
                  {analysis.professionalityScore}/100
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {analysis.professionalityScore >= 80
                ? 'Excellent! Your resume appears very professional.'
                : analysis.professionalityScore >= 60
                ? 'Good resume with some areas for improvement.'
                : 'Your resume needs significant improvements.'}
            </Typography>
          </Paper>
        </Grid>
        {/* Career Recommendations */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Career Field Recommendations
            </Typography>
            <List>
              {analysis.careerRecommendations.map((career, index) => (
                <ListItem key={career.field + index} sx={{ pl: 0 }}>
                  <ListItemIcon>
                    {iconMap[career.field] || <WorkIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={career.field}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Box sx={{ width: '100%', mr: 1, maxWidth: 150 }}>
                          <LinearProgress
                            variant="determinate"
                            value={career.score}
                            sx={{ height: 6, borderRadius: 3 }}
                            color="secondary"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {career.score}% Match
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        {/* Strengths */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Strengths
            </Typography>
            <List dense>
              {analysis.strengthPoints.map((point, index) => (
                <ListItem key={point + index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        {/* Improvement Areas */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Areas for Improvement
            </Typography>
            <List dense>
              {analysis.improvementPoints.map((point, index) => (
                <ListItem key={point + index}>
                  <ListItemIcon>
                    <ErrorIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        {/* Skills Identified */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Skills Identified
            </Typography>
            <Box sx={{ mt: 2 }}>
              {analysis.skillsIdentified.map((skill, index) => (
                <Chip
                  key={skill + index}
                  label={skill}
                  color="primary"
                  variant="outlined"
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" href="/upload" sx={{ mr: 2 }}>
          Upload Another Resume
        </Button>
        <Button variant="outlined" href="/dashboard">
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default Results; 