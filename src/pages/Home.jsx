import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkIcon from '@mui/icons-material/Work';

const Home = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          mb: 6,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to ResumeAI Analyzer
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          AI-powered resume analysis and career recommendation system
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/upload"
          startIcon={<UploadFileIcon />}
          sx={{ mt: 2 }}
        >
          Upload Your Resume
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <UploadFileIcon color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
                Easy Upload
              </Typography>
              <Typography>
                Upload your resume in PDF or Word format and let our AI analyze it instantly.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/upload">
                Try Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <AssessmentIcon color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
                Smart Analysis
              </Typography>
              <Typography>
                Our AI evaluates your resume for professionalism and provides actionable feedback.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/upload">
                Get Analyzed
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <WorkIcon color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
                Career Match
              </Typography>
              <Typography>
                Discover which fields and roles are best suited for your skills and experience.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/upload">
                Find Your Match
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 