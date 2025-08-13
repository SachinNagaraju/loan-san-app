import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Assignment,
  Notifications as NotificationsIcon,
  AccountBalance,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuOptions = [
    {
      title: 'Apply for Loan',
      description: 'Start a new loan application with our simple step-by-step process',
      icon: <Assignment sx={{ fontSize: 60, color: '#0066CC' }} />,
      path: '/customer/apply-loan',
      color: '#0066CC',
      bgColor: '#e8f4fd',
    },
    {
      title: 'Notifications',
      description: 'View updates and status changes for your loan applications',
      icon: <NotificationsIcon sx={{ fontSize: 60, color: '#00A651' }} />,
      path: '/customer/notifications',
      color: '#00A651',
      bgColor: '#e8f5e8',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                width: 80,
                height: 80,
                fontSize: '2rem',
                mr: 3,
              }}
            >
              {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                Welcome, {user?.firstName || user?.name || 'Customer'}!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Ready to apply for your loan? Let's get started.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <AccountBalance sx={{ mr: 2, fontSize: 30 }} />
            <Typography variant="h5">
              Your trusted financial partner
            </Typography>
          </Box>
        </Paper>
      </motion.div>

      {/* Main Menu Options */}
      <Grid container spacing={4}>
        {menuOptions.map((option, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                elevation={6}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                    transform: 'translateY(-4px)',
                  },
                }}
                onClick={() => navigate(option.path)}
              >
                <CardContent sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                  <Box
                    sx={{
                      backgroundColor: option.bgColor,
                      borderRadius: '50%',
                      width: 120,
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    {option.icon}
                  </Box>
                  
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: option.color,
                    }}
                  >
                    {option.title}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.6 }}
                  >
                    {option.description}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      backgroundColor: option.color,
                      fontWeight: 'bold',
                      py: 1.5,
                      px: 4,
                      borderRadius: 3,
                      '&:hover': {
                        backgroundColor: option.color,
                        opacity: 0.9,
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Quick Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Paper elevation={2} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
            Why Choose Our Loan Services?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                  Quick Processing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get your loan approved in 24-48 hours with our streamlined process
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                  Competitive Rates
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enjoy some of the lowest interest rates starting from 8.5% per annum
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                  Secure & Safe
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bank-grade security with 256-bit SSL encryption for your data
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default CustomerDashboard;