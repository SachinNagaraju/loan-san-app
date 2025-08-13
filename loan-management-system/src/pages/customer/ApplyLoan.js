import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormLabel,
  Input,
  Container,
} from '@mui/material';
import {
  Person,
  Work,
  AccountBalance,
  Assignment,
  People,
  CloudUpload,
  Delete,
  CheckCircle,
  Add,
  AttachFile,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLoan } from '../../context/LoanContext';
import { motion } from 'framer-motion';
import Logo from '../../components/Logo';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const steps = [
  'Personal Details',
  'Employment Details', 
  'Loan Details',
  'Existing Loans',
  'References',
  'Review & Submit'
];

const ApplyLoan = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createApplication } = useLoan();
  
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: user?.firstName || '',
    middleName: '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phone || '',
    email: user?.email || '',
    aadharNumber: '',
    panNumber: '',
    currentAddress: '',
    permanentAddress: '',
    maritalStatus: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    
    // Documents - Personal
    photograph: null,
    aadharCard: null,
    panCard: null,
    passport: null,
    drivingLicense: null,
    addressProof: null,
    
    // Employment Details
    occupationType: '', // salaried or self-employed
    companyName: '',
    designation: '',
    monthlySalary: '',
    officeAddress: '',
    
    // Documents - Employment
    paySlips: [],
    itrDocuments: [],
    bankStatements: [],
    employmentProof: null,
    offerLetter: null,
    idCard: null,
    hrLetter: null,
    businessProof: null,
    gstCertificate: null,
    businessLicense: null,
    businessAddressProof: null,
    
    // Loan Details
    loanType: '',
    loanAmount: '',
    loanDuration: '',
    loanPurpose: '',
    
    // Loan Documents
    saleAgreement: null,
    ecDocument: null,
    vehicleInvoice: null,
    vehicleQuotation: null,
    
    // Existing Loans
    existingLoans: [],
    
    // References
    references: [],
  });

  const [errors, setErrors] = useState({});
  
  // State for new loan and reference forms
  const [newLoan, setNewLoan] = useState({
    loanType: '',
    lender: '',
    outstandingAmount: '',
    emi: '',
    tenure: '',
    remaining: ''
  });
  
  const [newReference, setNewReference] = useState({
    name: '',
    relationship: '',
    contactNumber: '',
    address: ''
  });

  // Common TextField styling
  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&:hover fieldset': {
        borderColor: '#0066CC',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0066CC',
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: '#0066CC',
      },
    },
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    
    // Auto-calculate age from DOB
    if (field === 'dateOfBirth' && value) {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        setFormData(prev => ({ ...prev, age: (age - 1).toString() }));
      } else {
        setFormData(prev => ({ ...prev, age: age.toString() }));
      }
    }
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleArrayAdd = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], item]
    }));
  };

  const handleArrayRemove = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0: // Personal Details
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
        if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
        if (!formData.currentAddress) newErrors.currentAddress = 'Current address is required';
        if (!formData.permanentAddress) newErrors.permanentAddress = 'Permanent address is required';
        if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        break;
        
      case 1: // Employment Details
        if (!formData.occupationType) newErrors.occupationType = 'Occupation type is required';
        if (!formData.companyName) newErrors.companyName = 'Company/Business name is required';
        if (!formData.monthlySalary) newErrors.monthlySalary = 'Monthly salary is required';
        if (!formData.officeAddress) newErrors.officeAddress = 'Office address is required';
        break;
        
      case 2: // Loan Details
        if (!formData.loanType) newErrors.loanType = 'Loan type is required';
        if (!formData.loanAmount) newErrors.loanAmount = 'Loan amount is required';
        if (!formData.loanDuration) newErrors.loanDuration = 'Loan duration is required';
        if (!formData.loanPurpose) newErrors.loanPurpose = 'Loan purpose is required';
        break;
        
      case 4: // References
        if (formData.references.length < 2) {
          newErrors.references = 'At least 2 references are required';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // For references step, allow proceeding even if validation fails
    // but show warning
    if (activeStep === 4 && formData.references.length < 2) {
      const proceed = window.confirm(
        '📋 Reference Information\n\n' +
        'You have added ' + formData.references.length + ' reference(s).\n' +
        'At least 2 references are recommended for faster processing.\n\n' +
        '✅ You can continue with fewer references, but it may take longer to process your application.\n\n' +
        'Would you like to continue to the review step?'
      );
      if (proceed) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      return;
    }
    
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    // Validate all steps before submission
    let allValid = true;
    for (let i = 0; i < steps.length - 1; i++) {
      if (!validateStep(i)) {
        allValid = false;
        break;
      }
    }
    
    if (!allValid) {
      alert('Please complete all required fields in all sections before submitting.');
      return;
    }

    setLoading(true);
    
    try {
      const applicationData = {
        ...formData,
        userId: user?.id || 'guest',
        submittedAt: new Date().toISOString(),
        status: 'submitted',
        applicationId: 'APP' + Date.now(),
      };

      const result = await createApplication(applicationData);
      
      if (result.success) {
        alert('🎉 Congratulations! Your loan application has been submitted successfully!\n\n📋 Application ID: ' + applicationData.applicationId + '\n⏰ Expected Review Time: 24-48 hours\n📧 You will receive updates via email and SMS\n\nThank you for choosing Standard Chartered!');
        navigate('/customer');
      } else {
        alert('❌ Application Submission Failed\n\n' + (result.error || 'We encountered an issue while processing your application. Please try again or contact our support team.'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('❌ An error occurred while submitting your application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Personal Details Form
  const renderPersonalDetails = () => (
    <Box>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          borderRadius: 3
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Person sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Personal Information
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Please provide your personal details accurately as per your official documents
          </Typography>
        </Box>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#0066CC', fontWeight: 'bold' }}>
          Basic Details
        </Typography>
        <Grid container spacing={3}>
      
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="First Name *"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={textFieldStyle}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Middle Name"
              value={formData.middleName}
              onChange={(e) => handleInputChange('middleName', e.target.value)}
              sx={textFieldStyle}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Last Name *"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={textFieldStyle}
            />
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number *"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              sx={textFieldStyle}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email ID *"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={textFieldStyle}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={1} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#0066CC', fontWeight: 'bold' }}>
          Identity Information
        </Typography>
        <Grid container spacing={3}>
      
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Aadhar Card Number *"
              value={formData.aadharNumber}
              onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
              error={!!errors.aadharNumber}
              helperText={errors.aadharNumber}
              sx={textFieldStyle}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="PAN Card Number *"
              value={formData.panNumber}
              onChange={(e) => handleInputChange('panNumber', e.target.value)}
              error={!!errors.panNumber}
              helperText={errors.panNumber}
              sx={textFieldStyle}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Date of Birth *"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              sx={textFieldStyle}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Age"
              value={formData.age}
              InputProps={{ readOnly: true }}
              sx={textFieldStyle}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={!!errors.maritalStatus} sx={textFieldStyle}>
              <InputLabel>Marital Status *</InputLabel>
              <Select
                value={formData.maritalStatus}
                label="Marital Status *"
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="divorced">Divorced</MenuItem>
                <MenuItem value="widowed">Widowed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl component="fieldset" error={!!errors.gender} fullWidth>
              <FormLabel component="legend" sx={{ mb: 1, color: '#0066CC', fontWeight: 'bold' }}>Gender *</FormLabel>
              <RadioGroup
                row
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                sx={{ gap: 3, justifyContent: 'center' }}
              >
                <FormControlLabel 
                  value="male" 
                  control={<Radio color="primary" />} 
                  label="Male"
                />
                <FormControlLabel 
                  value="female" 
                  control={<Radio color="primary" />} 
                  label="Female"
                />
                <FormControlLabel 
                  value="other" 
                  control={<Radio color="primary" />} 
                  label="Other"
                />
              </RadioGroup>
              {errors.gender && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {errors.gender}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={1} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#0066CC', fontWeight: 'bold' }}>
          Address Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Address *"
              multiline
              rows={3}
              value={formData.currentAddress}
              onChange={(e) => handleInputChange('currentAddress', e.target.value)}
              error={!!errors.currentAddress}
              helperText={errors.currentAddress}
              sx={textFieldStyle}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Permanent Address *"
              multiline
              rows={3}
              value={formData.permanentAddress}
              onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
              error={!!errors.permanentAddress}
              helperText={errors.permanentAddress}
              sx={textFieldStyle}
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
          Document Upload
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please upload clear, readable copies of your documents (PDF, JPG, PNG - Max 5MB each)
        </Typography>
        <Grid container spacing={3}>
          {[
            { field: 'photograph', label: 'Photograph', required: true },
            { field: 'aadharCard', label: 'Aadhar Card', required: true },
            { field: 'panCard', label: 'PAN Card', required: true },
            { field: 'passport', label: 'Passport', required: false },
            { field: 'drivingLicense', label: 'Driving License', required: false },
            { field: 'addressProof', label: 'Address Proof', required: false },
          ].map((doc) => (
            <Grid item xs={12} sm={6} md={4} key={doc.field}>
          <Card 
            variant="outlined" 
            sx={{ 
              borderRadius: '12px',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderColor: '#1976d2',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                {doc.label} {doc.required && <span style={{ color: '#d32f2f' }}>*</span>}
              </Typography>
              <Box
                sx={{
                  border: '2px dashed #e0e0e0',
                  borderRadius: '8px',
                  p: 3,
                  textAlign: 'center',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: '#f8f9fa',
                  }
                }}
              >
                <CloudUpload sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload(doc.field, e.target.files[0])}
                  inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
                  sx={{ width: '100%', mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  PDF, JPG, PNG (Max 5MB)
                </Typography>
              </Box>
              {formData[doc.field] && (
                <Chip
                  label={formData[doc.field].name}
                  onDelete={() => handleFileUpload(doc.field, null)}
                  color="primary"
                  size="small"
                  sx={{ mt: 2 }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
            ))}
        </Grid>
      </Paper>
    </Box>
  );

  // Employment Details Form
  const renderEmploymentDetails = () => (
    <Box>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          borderRadius: 3
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Work sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Employment Information
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Tell us about your current employment or business details
          </Typography>
        </Box>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
          Employment Details
        </Typography>
        <Grid container spacing={3}>
      
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.occupationType} sx={textFieldStyle}>
              <InputLabel>Occupation Type *</InputLabel>
              <Select
                value={formData.occupationType}
                label="Occupation Type *"
                onChange={(e) => handleInputChange('occupationType', e.target.value)}
              >
                <MenuItem value="salaried">Salaried Employee</MenuItem>
                <MenuItem value="self-employed">Self Employed / Business Owner</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={formData.occupationType === 'salaried' ? 'Company Name *' : 'Business Name *'}
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              error={!!errors.companyName}
              helperText={errors.companyName}
              sx={textFieldStyle}
            />
          </Grid>
          
          {formData.occupationType === 'salaried' && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Designation / Job Title"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                sx={textFieldStyle}
              />
            </Grid>
          )}
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={formData.occupationType === 'salaried' ? 'Monthly Salary (Net) *' : 'Monthly Income (Net) *'}
              type="number"
              value={formData.monthlySalary}
              onChange={(e) => handleInputChange('monthlySalary', e.target.value)}
              error={!!errors.monthlySalary}
              helperText={errors.monthlySalary}
              InputProps={{
                startAdornment: '₹',
              }}
              sx={textFieldStyle}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Office/Business Address *"
              multiline
              rows={3}
              value={formData.officeAddress}
              onChange={(e) => handleInputChange('officeAddress', e.target.value)}
              error={!!errors.officeAddress}
              helperText={errors.officeAddress}
              sx={textFieldStyle}
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#0066CC', fontWeight: 'bold' }}>
          Employment Documents
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please upload the required employment documents (PDF, JPG, PNG - Max 5MB each)
        </Typography>
        <Grid container spacing={3}>
          {formData.occupationType === 'salaried' ? (
            <>
              {[
                { field: 'paySlips', label: 'Pay Slips (Last 3-6 months)', multiple: true, required: true },
                { field: 'itrDocuments', label: 'ITR Documents (Last 2-3 years)', multiple: true, required: true },
                { field: 'bankStatements', label: 'Bank Statements (Last 6 months)', multiple: true, required: true },
                { field: 'employmentProof', label: 'Employment Certificate', required: true },
                { field: 'offerLetter', label: 'Offer Letter', required: false },
                { field: 'idCard', label: 'Company ID Card', required: false },
              ].map((doc) => (
                <Grid item xs={12} sm={6} md={4} key={doc.field}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      borderRadius: '12px',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        borderColor: '#0066CC',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                        {doc.label} {doc.required && <span style={{ color: '#d32f2f' }}>*</span>}
                      </Typography>
                      <Box
                        sx={{
                          border: '2px dashed #e0e0e0',
                          borderRadius: '8px',
                          p: 3,
                          textAlign: 'center',
                          minHeight: '120px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          '&:hover': {
                            borderColor: '#0066CC',
                            backgroundColor: '#f8f9fa',
                          }
                        }}
                      >
                        <CloudUpload sx={{ fontSize: 40, color: '#0066CC', mb: 1 }} />
                        <Input
                          type="file"
                          multiple={doc.multiple}
                          onChange={(e) => {
                            if (doc.multiple) {
                              const files = Array.from(e.target.files);
                              setFormData(prev => ({
                                ...prev,
                                [doc.field]: [...prev[doc.field], ...files]
                              }));
                            } else {
                              handleFileUpload(doc.field, e.target.files[0]);
                            }
                          }}
                          inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
                          sx={{ width: '100%', mb: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          PDF, JPG, PNG (Max 5MB)
                        </Typography>
                      </Box>
                      {doc.multiple ? (
                        <Box sx={{ mt: 2 }}>
                          {formData[doc.field].map((file, index) => (
                            <Chip
                              key={index}
                              label={file.name}
                              onDelete={() => handleArrayRemove(doc.field, index)}
                              color="primary"
                              size="small"
                              sx={{ mt: 1, mr: 1 }}
                            />
                          ))}
                        </Box>
                      ) : (
                        formData[doc.field] && (
                          <Chip
                            label={formData[doc.field].name}
                            onDelete={() => handleFileUpload(doc.field, null)}
                            color="primary"
                            size="small"
                            sx={{ mt: 2 }}
                          />
                        )
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          ) : (
            <>
              {[
                { field: 'businessProof', label: 'Business Registration Certificate', required: true },
                { field: 'gstCertificate', label: 'GST Registration Certificate', required: true },
                { field: 'businessLicense', label: 'Business License', required: true },
                { field: 'itrDocuments', label: 'ITR Documents (Last 2-3 years)', multiple: true, required: true },
                { field: 'businessAddressProof', label: 'Business Address Proof', required: true },
                { field: 'bankStatements', label: 'Bank Statements (Last 6 months)', multiple: true, required: true },
              ].map((doc) => (
                <Grid item xs={12} sm={6} md={4} key={doc.field}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      borderRadius: '12px',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        borderColor: '#0066CC',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                        {doc.label} {doc.required && <span style={{ color: '#d32f2f' }}>*</span>}
                      </Typography>
                      <Box
                        sx={{
                          border: '2px dashed #e0e0e0',
                          borderRadius: '8px',
                          p: 3,
                          textAlign: 'center',
                          minHeight: '120px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          '&:hover': {
                            borderColor: '#0066CC',
                            backgroundColor: '#f8f9fa',
                          }
                        }}
                      >
                        <CloudUpload sx={{ fontSize: 40, color: '#0066CC', mb: 1 }} />
                        <Input
                          type="file"
                          multiple={doc.multiple}
                          onChange={(e) => {
                            if (doc.multiple) {
                              const files = Array.from(e.target.files);
                              setFormData(prev => ({
                                ...prev,
                                [doc.field]: [...prev[doc.field], ...files]
                              }));
                            } else {
                              handleFileUpload(doc.field, e.target.files[0]);
                            }
                          }}
                          inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
                          sx={{ width: '100%', mb: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          PDF, JPG, PNG (Max 5MB)
                        </Typography>
                      </Box>
                      {doc.multiple ? (
                        <Box sx={{ mt: 2 }}>
                          {formData[doc.field].map((file, index) => (
                            <Chip
                              key={index}
                              label={file.name}
                              onDelete={() => handleArrayRemove(doc.field, index)}
                              color="primary"
                              size="small"
                              sx={{ mt: 1, mr: 1 }}
                            />
                          ))}
                        </Box>
                      ) : (
                        formData[doc.field] && (
                          <Chip
                            label={formData[doc.field].name}
                            onDelete={() => handleFileUpload(doc.field, null)}
                        color="primary"
                        size="small"
                        sx={{ mt: 1 }}
                      />
                        )
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Paper>
    </Box>
  );

  // Loan Details Form
  const renderLoanDetails = () => (
    <Box>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)',
          color: 'white',
          borderRadius: 3
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <AccountBalance sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Loan Requirements
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Tell us about your loan requirements and intended purpose
          </Typography>
        </Box>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#0066CC', fontWeight: 'bold' }}>
          Loan Details
        </Typography>
        <Grid container spacing={3}>
      
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.loanType} sx={textFieldStyle}>
              <InputLabel>Loan Type *</InputLabel>
              <Select
                value={formData.loanType}
                label="Loan Type *"
                onChange={(e) => handleInputChange('loanType', e.target.value)}
              >
                <MenuItem value="home">Home Loan</MenuItem>
                <MenuItem value="personal">Personal Loan</MenuItem>
                <MenuItem value="vehicle">Vehicle Loan</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Loan Amount Required *"
              type="number"
              value={formData.loanAmount}
              onChange={(e) => handleInputChange('loanAmount', e.target.value)}
              error={!!errors.loanAmount}
              helperText={errors.loanAmount}
              InputProps={{
                startAdornment: '₹',
              }}
              sx={textFieldStyle}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Loan Duration (Years) *"
              type="number"
              value={formData.loanDuration}
              onChange={(e) => handleInputChange('loanDuration', e.target.value)}
              error={!!errors.loanDuration}
              helperText={errors.loanDuration}
              sx={textFieldStyle}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Purpose of Loan *"
              value={formData.loanPurpose}
              onChange={(e) => handleInputChange('loanPurpose', e.target.value)}
              error={!!errors.loanPurpose}
              helperText={errors.loanPurpose}
              sx={textFieldStyle}
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#0066CC', fontWeight: 'bold' }}>
          Loan Specific Documents
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please upload documents specific to your loan type
        </Typography>
        <Grid container spacing={3}>
      
      {formData.loanType === 'home' && (
        <>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Sale Agreement
                </Typography>
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload('saleAgreement', e.target.files[0])}
                  inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
                />
                {formData.saleAgreement && (
                  <Chip
                    label={formData.saleAgreement.name}
                    onDelete={() => handleFileUpload('saleAgreement', null)}
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  EC Document
                </Typography>
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload('ecDocument', e.target.files[0])}
                  inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
                />
                {formData.ecDocument && (
                  <Chip
                    label={formData.ecDocument.name}
                    onDelete={() => handleFileUpload('ecDocument', null)}
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
      
      {formData.loanType === 'vehicle' && (
        <>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Invoice from Dealer
                </Typography>
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload('vehicleInvoice', e.target.files[0])}
                  inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
                />
                {formData.vehicleInvoice && (
                  <Chip
                    label={formData.vehicleInvoice.name}
                    onDelete={() => handleFileUpload('vehicleInvoice', null)}
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Quotation
                </Typography>
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload('vehicleQuotation', e.target.files[0])}
                  inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
                />
                {formData.vehicleQuotation && (
                  <Chip
                    label={formData.vehicleQuotation.name}
                    onDelete={() => handleFileUpload('vehicleQuotation', null)}
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
      
          {formData.loanType === 'personal' && (
            <Grid item xs={12}>
              <Alert severity="info">
                For personal loans, please ensure you have uploaded PAN, Aadhar, Salary Slips, ITR, and Bank Statements in the previous sections.
              </Alert>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );

  // Existing Loans Form
  const renderExistingLoans = () => {
    const addLoan = () => {
      if (newLoan.loanType && newLoan.lender && newLoan.outstandingAmount) {
        handleArrayAdd('existingLoans', { ...newLoan });
        setNewLoan({
          loanType: '',
          lender: '',
          outstandingAmount: '',
          emi: '',
          tenure: '',
          remaining: ''
        });
      }
    };

    return (
      <Box>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            mb: 4, 
            background: 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)',
            color: 'white',
            borderRadius: 3
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Assignment sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Existing Loans & EMIs
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Please provide details of any existing loans or EMIs you currently have
            </Typography>
          </Box>
        </Paper>
        
        <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Add Existing Loan
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Loan Type"
                    value={newLoan.loanType}
                    onChange={(e) => setNewLoan(prev => ({ ...prev, loanType: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Lender"
                    value={newLoan.lender}
                    onChange={(e) => setNewLoan(prev => ({ ...prev, lender: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Outstanding Amount"
                    type="number"
                    value={newLoan.outstandingAmount}
                    onChange={(e) => setNewLoan(prev => ({ ...prev, outstandingAmount: e.target.value }))}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="EMI"
                    type="number"
                    value={newLoan.emi}
                    onChange={(e) => setNewLoan(prev => ({ ...prev, emi: e.target.value }))}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Tenure (Years)"
                    type="number"
                    value={newLoan.tenure}
                    onChange={(e) => setNewLoan(prev => ({ ...prev, tenure: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Remaining (Years)"
                    type="number"
                    value={newLoan.remaining}
                    onChange={(e) => setNewLoan(prev => ({ ...prev, remaining: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={addLoan}
                  >
                    Add Loan
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {formData.existingLoans.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Existing Loans List
            </Typography>
            <List>
              {formData.existingLoans.map((loan, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${loan.loanType} - ${loan.lender}`}
                    secondary={`Outstanding: ₹${loan.outstandingAmount} | EMI: ₹${loan.emi} | Remaining: ${loan.remaining} years`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleArrayRemove('existingLoans', index)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
        </Grid>
      </Box>
    );
  };

  // References Form
  const renderReferences = () => {
    const addReference = () => {
      if (newReference.name && newReference.relationship && newReference.contactNumber) {
        handleArrayAdd('references', { ...newReference });
        setNewReference({
          name: '',
          relationship: '',
          contactNumber: '',
          address: ''
        });
      }
    };

    return (
      <Box>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            mb: 4, 
            background: 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)',
            color: 'white',
            borderRadius: 3
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <People sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Personal References
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Please provide at least 2 references who can vouch for your character and reliability
            </Typography>
          </Box>
        </Paper>
        
        <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Add Reference
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={newReference.name}
                    onChange={(e) => setNewReference(prev => ({ ...prev, name: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Relationship"
                    value={newReference.relationship}
                    onChange={(e) => setNewReference(prev => ({ ...prev, relationship: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    value={newReference.contactNumber}
                    onChange={(e) => setNewReference(prev => ({ ...prev, contactNumber: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={newReference.address}
                    onChange={(e) => setNewReference(prev => ({ ...prev, address: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={addReference}
                  >
                    Add Reference
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {formData.references.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              References List
            </Typography>
            <List>
              {formData.references.map((reference, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${reference.name} - ${reference.relationship}`}
                    secondary={`Contact: ${reference.contactNumber} | Address: ${reference.address}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleArrayRemove('references', index)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
        
        {errors.references && (
          <Grid item xs={12}>
            <Alert severity="error">{errors.references}</Alert>
          </Grid>
        )}
        </Grid>
      </Box>
    );
  };

  // Review & Submit
  const renderReviewSubmit = () => (
    <Box>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
          Review Your Application
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please review all information before submitting your application
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
      
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Personal Details</Typography>
            <Typography><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</Typography>
            <Typography><strong>Email:</strong> {formData.email}</Typography>
            <Typography><strong>Phone:</strong> {formData.phoneNumber}</Typography>
            <Typography><strong>Aadhar:</strong> {formData.aadharNumber}</Typography>
            <Typography><strong>PAN:</strong> {formData.panNumber}</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Employment Details</Typography>
            <Typography><strong>Occupation:</strong> {formData.occupationType}</Typography>
            <Typography><strong>Company/Business:</strong> {formData.companyName}</Typography>
            <Typography><strong>Monthly Salary:</strong> ₹{formData.monthlySalary}</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Loan Details</Typography>
            <Typography><strong>Loan Type:</strong> {formData.loanType}</Typography>
            <Typography><strong>Amount:</strong> ₹{formData.loanAmount}</Typography>
            <Typography><strong>Duration:</strong> {formData.loanDuration} years</Typography>
            <Typography><strong>Purpose:</strong> {formData.loanPurpose}</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12}>
        <Alert severity="info">
          Please review all the information carefully before submitting. Once submitted, your application will be reviewed by our loan officers.
        </Alert>
      </Grid>
      </Grid>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderPersonalDetails();
      case 1:
        return renderEmploymentDetails();
      case 2:
        return renderLoanDetails();
      case 3:
        return renderExistingLoans();
      case 4:
        return renderReferences();
      case 5:
        return renderReviewSubmit();
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      <LoadingSpinner 
        open={loading} 
        message="Submitting your loan application..." 
        variant="backdrop"
      />
      
      <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              mb: 4, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #0066CC 0%, #00A651 100%)',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Logo size="large" showText={true} />
            </Box>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
              Loan Application Form
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Complete your loan application in {steps.length} simple steps
            </Typography>
          </Paper>

          {/* Main Form Container */}
          <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            {/* Progress Stepper */}
            <Box sx={{ p: 4, backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel 
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontSize: '0.9rem',
                          fontWeight: activeStep === index ? 'bold' : 'normal'
                        }
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Form Content */}
            <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, minHeight: '500px' }}>
              {getStepContent(activeStep)}
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mt: 4,
              pt: 3,
              borderTop: '1px solid #e0e0e0'
            }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem'
                }}
              >
                Back
              </Button>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Step {activeStep + 1} of {steps.length}
                </Typography>
              </Box>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #00A651 0%, #007A3D 100%)',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #007A3D 0%, #005A2D 100%)',
                    }
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  size="large"
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #004499 0%, #0066CC 100%)',
                    }
                  }}
                >
                  Next Step
                </Button>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
    </>
  );
};

export default ApplyLoan;