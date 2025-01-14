"use client"
import React, { useState } from 'react';
import { TextField, Button, Alert, Container, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import 'tailwindcss/tailwind.css';

const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validatePassword = (password: string) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasNumber.test(password) &&
      hasSpecialChar.test(password)
    );
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(generatedPassword);
    setConfirmPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validatePassword(newPassword)) {
      setErrorMessage('Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to change password.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Box className="p-8 bg-white shadow-2xl rounded-xl">
        <Typography variant="h4" className="text-center mb-6 font-extrabold text-blue-700">
          เปลี่ยนรหัสผ่าน
        </Typography>
        {errorMessage && <Alert severity="error" className="mb-4">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success" className="mb-4">{successMessage}</Alert>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Current Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            variant="outlined"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Password Length"
            type="number"
            fullWidth
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
            variant="outlined"
          />
          <Button variant="outlined" onClick={generatePassword} fullWidth>Generate Password</Button>
          <TextField
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={copyToClipboard}>
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button variant="contained" color="secondary" type="submit" fullWidth className="mt-4">
            ยืนยัน เปลี่ยนรหัสผ่าน
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePasswordPage;
