import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Layout from './components/Layout';
import LeadList from './components/LeadList';
import LeadForm from './components/LeadForm';
import LeadDetails from './components/LeadDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <Layout>
                <LeadList />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/add" element={
            <PrivateRoute>
              <Layout>
                <LeadForm />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/leads/:id" element={
            <PrivateRoute>
              <Layout>
                <LeadDetails />
              </Layout>
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
