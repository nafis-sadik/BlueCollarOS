import React from 'react';
import { useRole, RoleProvider } from './context/RoleContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function AppContent() {
  const { isLoggedIn } = useRole();

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default function App() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}
