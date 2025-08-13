import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  Send,
  Support,
  QuestionAnswer,
  Feedback,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Phone sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Phone',
      details: ['+91 98765 43210', '+91 98765 43211'],
      description: 'Call us for immediate assistance'
    },
    {
      icon: <Email sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Email',
      details: ['info@sc.com', 'support@sc.com'],
      description: 'Send us your queries anytime'
    },
    {
      icon: <LocationOn sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Address',
      details: ['LoanEase Financial Services', 'Mumbai, Maharashtra 400001'],
      description: 'Visit our office for personal consultation'
    },
    {
      icon: <Schedule sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM'],
      description: 'We are here to help during business hours'
    }
  ];

  const supportOptions = [
    {
      icon: <Support sx={{ fontSize: 50, color: '#4caf50' }} />,
      title: 'Customer Support',
      description: 'Get help with your existing loans and applications',
      contact: 'Call: +91 98765 43210'
    },
    {
      icon: <QuestionAnswer sx={{ fontSize: 50, color: '#4caf50' }} />,
      title: 'Loan Enquiry',
      description: 'Have questions about our loan products?',
      contact: 'Email: loans@sc.com'
    },
    {
      icon: <Feedback sx={{ fontSize: 50, color: '#4caf50' }} />,
      title: 'Feedback',
      description: 'Share your experience and suggestions with us',
      contact: 'Email: feedback@sc.com'
    }
  ];

  const branches = [
    {
      city: 'Mumbai',
      address: 'Standard Chartered Tower, Bandra Kurla Complex, Mumbai - 400051',
      phone: '+91 98765 43210',
      email: 'mumbai@sc.com'
    },
    {
      city: 'Delhi',
      address: 'Standard Chartered Plaza, Connaught Place, New Delhi - 110001',
      phone: '+91 98765 43211',
      email: 'delhi@sc.com'
    },
    {
      city: 'Bangalore',
      address: 'LoanEase Center, MG Road, Bangalore - 560001',
      phone: '+91 98765 43212',
      email: 'bangalore@sc.com'
    },
    {
      city: 'Chennai',
      address: 'LoanEase Building, Anna Salai, Chennai - 600002',
      phone: '+91 98765 43213',
      email: 'chennai@sc.com'
    }
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
              Contact Us
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
              We're here to help you with all your loan requirements. Get in touch with our expert team today.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Information */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Get In Touch
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666', maxWidth: 600, mx: 'auto' }}>
            Multiple ways to reach us for all your queries and support needs
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {contactInfo.map((info, index) => (
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
                      {info.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      {info.title}
                    </Typography>
                    {info.details.map((detail, idx) => (
                      <Typography key={idx} variant="body1" sx={{ mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
                        {detail}
                      </Typography>
                    ))}
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      {info.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                    Send us a Message
                  </Typography>
                  
                  {submitted && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      Thank you for your message! We'll get back to you within 24 hours.
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          multiline
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                          variant="outlined"
                          placeholder="Please describe your query or requirement in detail..."
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading}
                          endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                        >
                          {loading ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                  Support Options
                </Typography>
                
                {supportOptions.map((option, index) => (
                  <Paper key={index} elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {option.icon}
                      <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>
                        {option.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                      {option.description}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      {option.contact}
                    </Typography>
                  </Paper>
                ))}
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Branch Locations */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Our Branches
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666' }}>
            Visit us at any of our branch locations across India
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {branches.map((branch, index) => (
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
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
                      {branch.city}
                    </Typography>
                    <List dense>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <LocationOn sx={{ color: '#666', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={branch.address}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Phone sx={{ color: '#666', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={branch.phone}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Email sx={{ color: '#666', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={branch.email}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Map Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
              Find Us
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666' }}>
              Our head office location in Mumbai
            </Typography>
          </motion.div>

          <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', height: 400 }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.95)' }}>
                  <LocationOn sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    LoanEase Head Office
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mumbai, Maharashtra, India
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Quick Help
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666' }}>
            Common questions and quick answers
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Business Hours
              </Typography>
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="Monday - Friday"
                    secondary="9:00 AM - 6:00 PM"
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="Saturday"
                    secondary="9:00 AM - 2:00 PM"
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="Sunday"
                    secondary="Closed"
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Emergency Contact
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                For urgent loan-related queries outside business hours:
              </Typography>
              <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
                +91 98765 43299
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Available 24/7 for existing customers
              </Typography>
              <Typography variant="body1">
                Email: emergency@loanease.com
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;