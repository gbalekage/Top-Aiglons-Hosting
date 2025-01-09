import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footter from "./components/Navigation/Footter";
import Header from "./components/Navigation/Header";
import RegisterPage from "./pages/authentication/RegisterPage";
import LoginPage from "./pages/authentication/LoginPage";
import ForgotPasswordPage from "./pages/authentication/ForgotPasswordPage";
import ResetPasswordPage from "./pages/authentication/ResetPasswordPage";
import VerifyEmail from "./pages/authentication/VerifyEmail";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/user/Dashboard";
import MyHosting from "./pages/user/MyHosting";
import Settings from "./pages/user/Settings";
import HostingPage from "./pages/services/HostingPage";
import AboutPage from "./pages/AboutPage";
import MyDomains from "./pages/user/MyDomains";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import DomainPage from "./pages/services/DomainPage";
import SuccessPage from "./pages/payments/SuccessPage";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import Conditions from "./pages/privacy/Conditions";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth, user } = useAuthStore();

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div>Chargement...</div>;
  }

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth();
    }
  }, [isAuthenticated, checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen gap-4">
        <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
        <p>Veuillez patienter...</p>
      </div>
    );
  }

  console.log("isAuthenticated", isAuthenticated);
  console.log("User", user);

  const location = useLocation();

  const excludedRoutes = [
    "/register",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/dashboard",
    "/my-hosting",
    "/accout-settings",
    "/my-domains",
  ];

  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  return (
    <main className="">
      {!isExcludedRoute && <Header />}
      <Routes>
        {/* Auth routes */}
        <Route
          path="/register"
          element={
            <RedirectUser>
              <RegisterPage />
            </RedirectUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectUser>
              <LoginPage />
            </RedirectUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectUser>
              <ForgotPasswordPage />
            </RedirectUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectUser>
              <ResetPasswordPage />
            </RedirectUser>
          }
        />
        <Route
          path="/verify-email"
          element={
            <RedirectUser>
              <VerifyEmail />
            </RedirectUser>
          }
        />

        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-hosting"
          element={
            <ProtectedRoute>
              <MyHosting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-domains"
          element={
            <ProtectedRoute>
              <MyDomains />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accout-settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/hosting" element={<HostingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/domains" element={<DomainPage />} />
        <Route path="/pricacy" element={<PrivacyPolicy />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route
          path="/checkout/success"
          element={
            <ProtectedRoute>
              <SuccessPage />
            </ProtectedRoute>
          }
        />

        {/* Error page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {!isExcludedRoute && <Footter />}
      <Toaster />
    </main>
  );
}

export default App;
