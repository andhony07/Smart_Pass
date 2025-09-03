import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import RoleBasedDashboardLanding from './pages/role-based-dashboard-landing';
import MultiRoleAuthenticationLogin from './pages/multi-role-authentication-login';
import ForgotPasswordRecovery from './pages/forgot-password-recovery';
import StudentOutpassRequestForm from './pages/student-outpass-request-form';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ForgotPasswordRecovery />} />
        <Route path="/role-based-dashboard-landing" element={<RoleBasedDashboardLanding />} />
        <Route path="/multi-role-authentication-login" element={<MultiRoleAuthenticationLogin />} />
        <Route path="/forgot-password-recovery" element={<ForgotPasswordRecovery />} />
        <Route path="/student-outpass-request-form" element={<StudentOutpassRequestForm />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;