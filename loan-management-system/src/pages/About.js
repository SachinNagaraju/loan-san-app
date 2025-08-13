import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  AccountBalance,
  Security,
  Speed,
  Support,
  CheckCircle,
  TrendingUp,
  People,
  Star,
  EmojiEvents,
  Shield,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const About = () => {
  const stats = [
    { number: '50,000+', label: 'Happy Customers', icon: <People sx={{ fontSize: 40, color: '#1976d2' }} /> },
    { number: '₹500 Cr+', label: 'Loans Disbursed', icon: <TrendingUp sx={{ fontSize: 40, color: '#1976d2' }} /> },
    { number: '15+', label: 'Years Experience', icon: <EmojiEvents sx={{ fontSize: 40, color: '#1976d2' }} /> },
    { number: '99.8%', label: 'Customer Satisfaction', icon: <Star sx={{ fontSize: 40, color: '#1976d2' }} /> },
  ];

  const values = [
    {
      title: 'Transparency',
      description: 'We believe in complete transparency in all our dealings with clear terms and no hidden charges.',
      icon: <Shield sx={{ fontSize: 50, color: '#4caf50' }} />
    },
    {
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We prioritize their needs and satisfaction.',
      icon: <People sx={{ fontSize: 50, color: '#4caf50' }} />
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate to provide the best digital lending experience to our customers.',
      icon: <TrendingUp sx={{ fontSize: 50, color: '#4caf50' }} />
    },
    {
      title: 'Reliability',
      description: 'We are committed to being a reliable partner in your financial journey with consistent service.',
      icon: <CheckCircle sx={{ fontSize: 50, color: '#4caf50' }} />
    }
  ];

  const team = [
    {
      name: 'Rajesh Sharma',
      role: 'Chief Executive Officer',
      experience: '20+ years in Banking & Finance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Priya Patel',
      role: 'Chief Technology Officer',
      experience: '15+ years in FinTech',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Amit Kumar',
      role: 'Head of Operations',
      experience: '18+ years in Loan Operations',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
    }
  ];

  const milestones = [
    { year: '2009', event: 'LoanEase founded with a vision to democratize lending' },
    { year: '2012', event: 'Launched digital loan application platform' },
    { year: '2015', event: 'Reached 10,000 satisfied customers milestone' },
    { year: '2018', event: 'Introduced AI-powered risk assessment' },
    { year: '2020', event: 'Achieved ₹100 Cr+ in loan disbursements' },
    { year: '2022', event: 'Expanded to serve 50+ cities across India' },
    { year: '2024', event: 'Launched next-gen loan management system' }
  ];

  return (
    <Box sx={{ pt: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
              <Logo size="large" showText={true} />
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              About Standard Chartered
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
              Empowering dreams through innovative financial solutions. We are committed to making loans accessible, 
              transparent, and hassle-free for everyone.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Story Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                  Our Story
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Founded in 2009, LoanEase began with a simple yet powerful vision: to make financial services 
                  accessible to everyone. We recognized that traditional lending processes were often complex, 
                  time-consuming, and intimidating for many people.
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Over the years, we have evolved from a small startup to a leading digital lending platform, 
                  serving thousands of customers across India. Our commitment to innovation, transparency, 
                  and customer satisfaction has been the driving force behind our success.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Today, we continue to leverage cutting-edge technology to provide seamless, secure, and 
                  personalized loan solutions that help our customers achieve their dreams and goals.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Our Story"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 3,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Values Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Our Values
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666', maxWidth: 600, mx: 'auto' }}>
            The principles that guide us in everything we do
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 3 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Leadership Team Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
              Leadership Team
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666', maxWidth: 600, mx: 'auto' }}>
              Meet the experienced professionals leading LoanEase
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Avatar
                        src={member.avatar}
                        sx={{
                          width: 120,
                          height: 120,
                          mx: 'auto',
                          mb: 3,
                          border: '4px solid #1976d2'
                        }}
                      />
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}>
                        {member.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.experience}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Our Journey
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666', maxWidth: 600, mx: 'auto' }}>
            Key milestones in our growth story
          </Typography>
        </motion.div>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <List>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ListItem sx={{ py: 2 }}>
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        bgcolor: '#1976d2',
                        color: 'white',
                        fontWeight: 'bold',
                        width: 60,
                        height: 60
                      }}
                    >
                      {milestone.year}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={milestone.event}
                    primaryTypographyProps={{
                      variant: 'h6',
                      fontWeight: 'bold',
                      sx: { ml: 2 }
                    }}
                  />
                </ListItem>
                {index < milestones.length - 1 && <Divider />}
              </motion.div>
            ))}
          </List>
        </Paper>
      </Container>

      {/* Mission & Vision Section */}
      <Box sx={{ backgroundColor: '#1976d2', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Paper
                  sx={{
                    p: 4,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 3
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'white' }}>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'white' }}>
                    To democratize access to financial services by providing innovative, transparent, and 
                    customer-centric loan solutions that empower individuals and businesses to achieve 
                    their goals and dreams.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Paper
                  sx={{
                    p: 4,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 3
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'white' }}>
                    Our Vision
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'white' }}>
                    To become India's most trusted and preferred digital lending platform, known for our 
                    commitment to excellence, innovation, and customer satisfaction in the financial 
                    services industry.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;