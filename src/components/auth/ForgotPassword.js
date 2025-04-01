import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EmailEntry from './forgot-password/EmailEntry';
import VerifyCode from './forgot-password/VerifyCode';
import PasswordReset from './forgot-password/PasswordReset';
import Success from './forgot-password/Success';

const ForgotPassword = () => {
  return (
    <Routes>
      <Route path="/" element={<EmailEntry />} />
      <Route path="/verify" element={<VerifyCode />} />
      <Route path="/reset" element={<PasswordReset />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<Navigate to="/forgot-password" replace />} />
    </Routes>
  );
};

export default ForgotPassword;
