import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  CircularProgress,
  Avatar,
  IconButton,
  Tooltip,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  Work,
  AccountBalance,
  Assignment,
  People,
  CheckCircle,
  Cancel,
  Comment,
  Visibility,
  Download,
  ArrowBack,
  TrendingUp,
  Warning,
  AttachFile,
  CreditScore,
  Timeline,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoan } from '../../context/LoanContext';
import { motion } from 'framer-motion';

const ApplicationReview = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { getApplication, approveByMaker, rejectByMaker, loading, APPLICATION_STATUS } = useLoan();
  
  const [application, setApplication] = useState(null);
  const [loadingApp, setLoadingApp] = useState(true);
  const [actionDialog, setActionDialog] = useState({ open: false, type: null });
  const [comments, setComments] = useState('');

  useEffect(() => {
    loadApplication();
  }, [applicationId]);

  const loadApplication = async () => {
    setLoadingApp(true);
    const result = await getApplication(applicationId);
    if (result.success) {
      setApplication(result.application);
    } else {
      alert('Application not found');
      navigate('/maker/applications');
    }
    setLoadingApp(false);
  };

  const handleAction = async (action) => {
    if (!comments.trim()) {
      alert('Please provide comments for your decision');
      return;
    }

    let result;
    if (action === 'approve') {
      result = await approveByMaker(application.id, comments);
    } else {
      result = await rejectByMaker(application.id, comments);
    }

    if (result.success) {
      alert(`Application ${action}d successfully`);
      setActionDialog({ open: false, type: null });
      setComments('');
      // Reload application to show updated status
      const updatedResult = await getApplication(applicationId);
      if (updatedResult.success) {
        setApplication(updatedResult.application);
      }
    } else {
      alert(result.error || `Failed to ${action} application`);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getCibilScoreColor = (score) => {
    if (score >= 750) return '#4caf50';
    if (score >= 650) return '#ff9800';
    return '#f44336';
  };

  const getCibilScoreLabel = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    return 'Poor';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case APPLICATION_STATUS.SUBMITTED:
        return '#2196f3';
      case APPLICATION_STATUS.MAKER_APPROVED:
        return '#4caf50';
      case APPLICATION_STATUS.MAKER_REJECTED:
        return '#f44336';
      default:
        return '#ff9800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case APPLICATION_STATUS.SUBMITTED:
        return 'New Application';
      case APPLICATION_STATUS.UNDER_MAKER_REVIEW:
        return 'Under Review';
      case APPLICATION_STATUS.MAKER_APPROVED:
        return 'Approved by Maker';
      case APPLICATION_STATUS.MAKER_REJECTED:
        return 'Rejected by Maker';
      default:
        return status;
    }
  };

  if (loadingApp) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!application) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">Application not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => navigate('/maker/applications')} sx={{ mr: 2 }}>
                <ArrowBack />
              </IconButton>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  Application Review
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {application.id}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={getStatusLabel(application.status)}
              sx={{
                backgroundColor: getStatusColor(application.status),
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                px: 2,
                py: 1,
              }}
            />
          </Box>
          
          {/* CIBIL Score */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CreditScore sx={{ color: getCibilScoreColor(application.cibilScore) }} />
              <Typography variant="h6">
                CIBIL Score: 
                <span style={{ color: getCibilScoreColor(application.cibilScore), fontWeight: 'bold', marginLeft: 8 }}>
                  {application.cibilScore} ({getCibilScoreLabel(application.cibilScore)})
                </span>
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(application.cibilScore / 850) * 100}
              sx={{
                width: 200,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getCibilScoreColor(application.cibilScore),
                },
              }}
            />
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Personal Details */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Person sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Personal Details
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Full Name:</strong> {application.firstName} {application.middleName} {application.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Email:</strong> {application.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Phone:</strong> {application.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Aadhar:</strong> {application.aadharNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>PAN:</strong> {application.panNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>DOB:</strong> {new Date(application.dateOfBirth).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Age:</strong> {application.age} years
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Gender:</strong> {application.gender}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Marital Status:</strong> {application.maritalStatus}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Current Address:</strong> {application.currentAddress}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Permanent Address:</strong> {application.permanentAddress}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Employment Details */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Work sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Employment Details
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Occupation Type:</strong> {application.occupationType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Company/Business:</strong> {application.companyName}
                    </Typography>
                  </Grid>
                  {application.designation && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Designation:</strong> {application.designation}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Monthly Salary:</strong> {formatCurrency(application.monthlySalary)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Office Address:</strong> {application.officeAddress}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Loan Details */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AccountBalance sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Loan Details
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Loan Type:</strong> {application.loanType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Amount:</strong> {formatCurrency(application.loanAmount)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Duration:</strong> {application.loanDuration} years
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Purpose:</strong> {application.loanPurpose}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Existing Loans */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Assignment sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Existing Loans
                  </Typography>
                </Box>
                
                {application.existingLoans && application.existingLoans.length > 0 ? (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell>Lender</TableCell>
                          <TableCell>Outstanding</TableCell>
                          <TableCell>EMI</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {application.existingLoans.map((loan, index) => (
                          <TableRow key={index}>
                            <TableCell>{loan.loanType}</TableCell>
                            <TableCell>{loan.lender}</TableCell>
                            <TableCell>{formatCurrency(loan.outstandingAmount)}</TableCell>
                            <TableCell>{formatCurrency(loan.emi)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography color="text.secondary">No existing loans</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* References */}
          <Grid item xs={12}>
            <Card elevation={3} sx={{ borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <People sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    References
                  </Typography>
                </Box>
                
                {application.references && application.references.length > 0 ? (
                  <Grid container spacing={2}>
                    {application.references.map((reference, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="body2">
                            <strong>{reference.name}</strong> - {reference.relationship}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Contact: {reference.contactNumber}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Address: {reference.address}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography color="text.secondary">No references provided</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Documents */}
          <Grid item xs={12}>
            <Card elevation={3} sx={{ borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AttachFile sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Documents Submitted
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                      Personal Documents
                    </Typography>
                    <List dense>
                      {application.documents?.personal && Object.entries(application.documents.personal).map(([key, value]) => (
                        value && (
                          <ListItem key={key} sx={{ py: 0.5 }}>
                            <ListItemIcon>
                              <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        )
                      ))}
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                      Employment Documents
                    </Typography>
                    <List dense>
                      {application.documents?.employment && Object.entries(application.documents.employment).map(([key, value]) => (
                        value && (Array.isArray(value) ? value.length > 0 : true) && (
                          <ListItem key={key} sx={{ py: 0.5 }}>
                            <ListItemIcon>
                              <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        )
                      ))}
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                      Loan Documents
                    </Typography>
                    <List dense>
                      {application.documents?.loan && Object.entries(application.documents.loan).map(([key, value]) => (
                        value && (
                          <ListItem key={key} sx={{ py: 0.5 }}>
                            <ListItemIcon>
                              <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        )
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Status History */}
          <Grid item xs={12}>
            <Card elevation={3} sx={{ borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Timeline sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Application Timeline
                  </Typography>
                </Box>
                
                <List>
                  {application.statusHistory?.map((history, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: getStatusColor(history.status), width: 32, height: 32 }}>
                          {index + 1}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={getStatusLabel(history.status)}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {history.comments}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(history.timestamp).toLocaleString()}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        {[APPLICATION_STATUS.SUBMITTED, APPLICATION_STATUS.UNDER_MAKER_REVIEW].includes(application.status) && (
          <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Maker Decision
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<CheckCircle />}
                onClick={() => setActionDialog({ open: true, type: 'approve' })}
                sx={{ px: 4, py: 1.5 }}
              >
                Approve Application
              </Button>
              <Button
                variant="contained"
                color="error"
                size="large"
                startIcon={<Cancel />}
                onClick={() => setActionDialog({ open: true, type: 'reject' })}
                sx={{ px: 4, py: 1.5 }}
              >
                Reject Application
              </Button>
            </Box>
          </Paper>
        )}

        {/* Action Dialog */}
        <Dialog
          open={actionDialog.open}
          onClose={() => setActionDialog({ open: false, type: null })}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {actionDialog.type === 'approve' ? 'Approve Application' : 'Reject Application'}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please provide comments for your decision:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter your comments here..."
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActionDialog({ open: false, type: null })}>
              Cancel
            </Button>
            <Button
              onClick={() => handleAction(actionDialog.type)}
              variant="contained"
              color={actionDialog.type === 'approve' ? 'success' : 'error'}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : 'Confirm'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default ApplicationReview;