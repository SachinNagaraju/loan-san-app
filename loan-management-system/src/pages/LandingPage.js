import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  Security,
  Speed,
  CheckCircle,
  Star,
  Menu as MenuIcon,
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  ArrowForward,
  MonetizationOn,
  Assessment,
  VerifiedUser,
  Support,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import scHero1 from '../assets/images/sc-hero-1.jpg';
import Logo from '../components/Logo';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const features = [
    {
      icon: <Speed sx={{ fontSize: 40, color: '#0066CC' }} />,
      title: 'Quick Processing',
      description: 'Get your loan approved in just 24-48 hours with our streamlined digital process.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#0066CC' }} />,
      title: 'Secure & Safe',
      description: 'Bank-grade security with 256-bit SSL encryption to protect your personal information.',
    },
    {
      icon: <MonetizationOn sx={{ fontSize: 40, color: '#0066CC' }} />,
      title: 'Competitive Rates',
      description: 'Enjoy some of the lowest interest rates in the market starting from 8.5% per annum.',
    },
    {
      icon: <Assessment sx={{ fontSize: 40, color: '#0066CC' }} />,
      title: 'Smart Analytics',
      description: 'Advanced AI-powered risk assessment for better loan terms and faster approvals.',
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 40, color: '#0066CC' }} />,
      title: 'Verified Process',
      description: 'Multi-level verification system ensuring transparency and reliability.',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: '#0066CC' }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you throughout your loan journey.',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      avatar: 'R',
      rating: 5,
      comment: 'Excellent service! Got my business loan approved within 2 days. Highly recommended!',
    },
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      avatar: 'P',
      rating: 5,
      comment: 'The digital process is so smooth. Applied online and got approved without any hassle.',
    },
    {
      name: 'Amit Patel',
      role: 'Entrepreneur',
      avatar: 'A',
      rating: 5,
      comment: 'Best interest rates in the market. The team is very professional and helpful.',
    },
  ];

  const loanTypes = [
    { name: 'Personal Loan', rate: '10.5%', amount: '₹50K - ₹40L' },
    { name: 'Home Loan', rate: '8.5%', amount: '₹5L - ₹5Cr' },
    { name: 'Business Loan', rate: '12%', amount: '₹1L - ₹50L' },
    { name: 'Car Loan', rate: '9.5%', amount: '₹1L - ₹1Cr' },
  ];

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Navigation */}
      <AppBar position="fixed" sx={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        px: { xs: 2, md: 4 },
        py: 2
      }}>
        <Toolbar sx={{ minHeight: '100px !important', px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Logo size="small" showText={true} />
          </Box>
          
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Button color="inherit" sx={{ color: '#666' }}>Home</Button>
              <Button color="inherit" sx={{ color: '#666' }}>Loans</Button>
              <Button color="inherit" sx={{ color: '#666' }}>About</Button>
              <Button color="inherit" sx={{ color: '#666' }}>Contact</Button>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/login')}
                sx={{ 
                  color: '#0066CC', 
                  borderColor: '#0066CC',
                  '&:hover': {
                    borderColor: '#004499',
                    backgroundColor: 'rgba(0, 102, 204, 0.04)',
                  }
                }}
              >
                Login
              </Button>
              <Button 
                variant="contained" 
                onClick={() => navigate('/register')}
                sx={{ 
                  backgroundColor: '#00A651',
                  color: 'white',
                  fontWeight: 'bold',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0, 166, 81, 0.3)',
                  '&:hover': {
                    backgroundColor: '#007A3D',
                    boxShadow: '0 4px 12px rgba(0, 166, 81, 0.4)',
                  }
                }}
              >
                Register
              </Button>
            </Box>
          ) : (
            <IconButton onClick={handleMobileMenuOpen}>
              <MenuIcon sx={{ color: '#0066CC' }} />
            </IconButton>
          )}
          
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
          >
            <MenuItem onClick={handleMobileMenuClose}>Home</MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>Loans</MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>About</MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>Contact</MenuItem>
            <Divider />
            <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/login'); }}>Login</MenuItem>
            <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/register'); }}>Register</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)',
          color: 'white',
          pt: 20,
          pb: 12,
          minHeight: '90vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Curved Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60%',
            height: '100%',
            opacity: 0.1,
            overflow: 'hidden',
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d="M0,0 Q200,100 400,50 T800,100 L800,0 Z"
              fill="url(#curveGradient)"
            />
            <path
              d="M0,150 Q300,250 600,200 T800,250 L800,150 Z"
              fill="url(#curveGradient)"
            />
            <path
              d="M200,300 Q500,400 800,350 L800,300 Z"
              fill="url(#curveGradient)"
            />
          </svg>
        </Box>

        {/* Curved Lines Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '40%',
            height: '60%',
            opacity: 0.15,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 400 400">
            {[...Array(8)].map((_, i) => (
              <path
                key={i}
                d={`M0,${50 + i * 40} Q200,${30 + i * 40} 400,${50 + i * 40}`}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                fill="none"
              />
            ))}
          </svg>
        </Box>

        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 4, fontSize: { xs: '3.8rem', md: '5.5rem' }, lineHeight: 1.1 }}>
                  Here for{' '}
                  <Box component="span" sx={{ color: '#00A651' }}>
                    Good
                  </Box>
                </Typography>
                <Typography variant="h4" sx={{ mb: 5, opacity: 0.9, lineHeight: 1.6, fontSize: { xs: '1.4rem', md: '1.8rem' } }}>
                  Experience world-class banking with Standard Chartered. 
                  Get instant loan approvals with competitive rates and digital convenience.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    endIcon={<ArrowForward />}
                    sx={{
                      backgroundColor: '#00A651',
                      color: 'white',
                      fontWeight: 'bold',
                      py: 2.5,
                      px: 6,
                      fontSize: '1.2rem',
                      borderRadius: 3,
                      boxShadow: '0 4px 15px rgba(0, 166, 81, 0.3)',
                      '&:hover': {
                        backgroundColor: '#007A3D',
                        boxShadow: '0 6px 20px rgba(0, 166, 81, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      py: 2.5,
                      px: 6,
                      fontSize: '1.2rem',
                      borderRadius: 3,
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: '#00A651',
                        backgroundColor: 'rgba(0, 166, 81, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    textAlign: 'center',
                  }}
                >
                  {/* Curved Decorative Elements around Image */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '-20px',
                      left: '-20px',
                      width: '120%',
                      height: '120%',
                      opacity: 0.2,
                      zIndex: 0,
                    }}
                  >
                    <svg width="100%" height="100%" viewBox="0 0 600 400">
                      <defs>
                        <linearGradient id="imageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00A651" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M50,50 Q300,20 550,80 Q580,200 520,320 Q300,380 80,320 Q20,200 50,50 Z"
                        fill="url(#imageGradient)"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                      />
                      <circle cx="100" cy="100" r="3" fill="rgba(255,255,255,0.6)" />
                      <circle cx="500" cy="150" r="2" fill="rgba(255,255,255,0.4)" />
                      <circle cx="450" cy="300" r="4" fill="rgba(255,255,255,0.5)" />
                      <circle cx="150" cy="320" r="2" fill="rgba(255,255,255,0.3)" />
                    </svg>
                  </Box>
                  
                  <Box
                    component="img"
                    src={scHero1}
                    alt="Standard Chartered Banking"
                    sx={{
                      width: '100%',
                      maxWidth: 600,
                      height: 'auto',
                      borderRadius: 4,
                      boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                      position: 'relative',
                      zIndex: 1,
                      transform: 'perspective(1000px) rotateY(-5deg)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'perspective(1000px) rotateY(0deg) scale(1.02)',
                      },
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        
        {/* Curved Bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            overflow: 'hidden',
            lineHeight: 0,
          }}
        >
          <svg
            width="100%"
            height="80"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <path
              d="M0,80 C300,0 900,0 1200,80 L1200,80 L0,80 Z"
              fill="#f8fafc"
            />
          </svg>
        </Box>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8, mt: 4 }}>
        <Grid container spacing={4}>
          {[
            { number: '50K+', label: 'Happy Customers' },
            { number: '₹500Cr+', label: 'Loans Disbursed' },
            { number: '24hrs', label: 'Quick Approval' },
            { number: '8.5%', label: 'Starting Interest Rate' },
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)',
                    color: 'white',
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1">{stat.label}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Loan Types Section */}
      <Box sx={{ backgroundColor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 'bold', color: '#0066CC' }}>
            Loan Products
          </Typography>
          <Grid container spacing={4}>
            {loanTypes.map((loan, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        {loan.name}
                      </Typography>
                      <Chip
                        label={`From ${loan.rate}`}
                        color="primary"
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Amount: {loan.amount}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 'bold', color: '#0066CC' }}>
          Why Choose Standard Chartered?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 3,
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: '#f8fafc', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 'bold', color: '#1976d2' }}>
            What Our Customers Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card elevation={3} sx={{ height: '100%', borderRadius: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 2 }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} sx={{ color: '#ffd700', fontSize: 20 }} />
                        ))}
                      </Box>
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        "{testimonial.comment}"
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of satisfied customers who chose LoanPro for their financial needs.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                backgroundColor: '#ffd700',
                color: '#1976d2',
                fontWeight: 'bold',
                py: 1.5,
                px: 4,
                '&:hover': {
                  backgroundColor: '#ffed4e',
                },
              }}
            >
              Apply for Loan
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                py: 1.5,
                px: 4,
                '&:hover': {
                  borderColor: '#ffd700',
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                },
              }}
            >
              Login to Account
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#1a1a1a', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance sx={{ mr: 1, fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  LoanPro
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Your trusted partner for all financial needs. We provide quick, secure, and affordable loan solutions.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton sx={{ color: 'white' }}>
                  <Facebook />
                </IconButton>
                <IconButton sx={{ color: 'white' }}>
                  <Twitter />
                </IconButton>
                <IconButton sx={{ color: 'white' }}>
                  <LinkedIn />
                </IconButton>
                <IconButton sx={{ color: 'white' }}>
                  <Instagram />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Quick Links
              </Typography>
              <List dense>
                <ListItem disablePadding>
                  <ListItemText primary="Personal Loans" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Business Loans" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Home Loans" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Car Loans" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Contact Info
              </Typography>
              <List dense>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Phone sx={{ color: 'white', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary="+91 1800-123-4567" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Email sx={{ color: 'white', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary="support@sc.com" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <LocationOn sx={{ color: 'white', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary="Mumbai, Maharashtra, India" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
            © 2024 Standard Chartered Bank. All rights reserved. | Privacy Policy | Terms of Service
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;