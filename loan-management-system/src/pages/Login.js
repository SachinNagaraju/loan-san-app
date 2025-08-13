import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  InputAdornment,
  IconButton,
  Paper,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Person,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  AccountBalance,
  LockReset,
  Work,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import scHero1 from '../assets/images/sc-hero-1.jpg';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password || !formData.role) {
      setError('Please fill in all fields including role selection');
      return;
    }

    const result = await login({ 
      email: formData.username, 
      password: formData.password, 
      selectedRole: formData.role 
    });
    
    if (result.success) {
      // Navigate based on user role
      const userRole = result.user.role;
      switch (userRole) {
        case 'customer':
          navigate('/customer');
          break;
        case 'maker':
          navigate('/maker');
          break;
        case 'checker':
          navigate('/checker');
          break;
        default:
          navigate('/customer');
      }
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Full-screen background image with maximum clarity
        backgroundImage: `url(${scHero1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Ensure content is readable over image
        position: 'relative',
        p: { xs: 2, md: 4 },
      }}
   >
      {/* Optional very subtle global overlay for readability on very bright images */}
      {/* <Box sx={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)' }} /> */}

      {/* Centered Login Card */}
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={12}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)',
                color: 'white',
                p: 3,
                textAlign: 'center',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Logo size="large" showText={true} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                Secure Login
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Access your banking portal
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="role-select-label">Select Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={formData.role}
                    label="Select Role"
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <Work color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="customer">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip label="Customer" size="small" color="primary" />
                        <Typography>Customer</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="maker">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip label="Maker" size="small" color="info" />
                        <Typography>Loan Maker</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="checker">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip label="Checker" size="small" color="success" />
                        <Typography>Loan Checker</Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Username / Email"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  sx={{ mb: 4 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<LockReset />}
                    sx={{ 
                      color: '#0066CC',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 102, 204, 0.04)',
                      }
                    }}
                    onClick={() => alert('Forgot Password functionality will be implemented soon. Please contact support for password reset.')}
                  >
                    Forgot Password?
                  </Button>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={<LoginIcon />}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #004499 0%, #0066CC 100%)',
                    },
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <Link
                    to="/"
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                    }}
                  >
                    ← Back to Home
                  </Link>
                </Typography>
              </Box>
            </CardContent>

            {/* Footer */}
            <Box
              sx={{
                p: 2,
                backgroundColor: 'grey.50',
                textAlign: 'center',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                © 2024 Standard Chartered Bank. All rights reserved.
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;