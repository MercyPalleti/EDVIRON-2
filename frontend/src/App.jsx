import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SchoolTransactions from './pages/SchoolTransactions'
import StatusCheck from './pages/StatusCheck'
import CreatePayment from './pages/CreatePayment'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/by-school" element={<ProtectedRoute><SchoolTransactions /></ProtectedRoute>} />
      <Route path="/check-status" element={<ProtectedRoute><StatusCheck /></ProtectedRoute>} />
      <Route path="/create-payment" element={<ProtectedRoute><CreatePayment /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
