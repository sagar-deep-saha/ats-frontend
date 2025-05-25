import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <WorkIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              flexGrow: 1,
            }}
          >
            ResumeAI Analyzer
          </Typography>
          <Box>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/upload"
            >
              Upload Resume
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/dashboard"
            >
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 