import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UserDashboard from "./pages/UserDashboard";
import UserEvents from "./pages/UserEvents";
import UserGallery from "./pages/UserGallery";
import UserSubscription from "./pages/UserSubscription";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AdminUsers from "./pages/AdminUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: 'user' | 'admin' }> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to={`/dashboard/${user?.role}`} replace />;
  return <>{children}</>;
};

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated) return <Navigate to={`/dashboard/${user?.role}`} replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
    <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    <Route path="/dashboard/user" element={<ProtectedRoute requiredRole="user"><DashboardLayout /></ProtectedRoute>}>
      <Route index element={<UserDashboard />} />
      <Route path="events" element={<UserEvents />} />
      <Route path="gallery" element={<UserGallery />} />
      <Route path="subscription" element={<UserSubscription />} />
    </Route>

    <Route path="/dashboard/admin" element={<ProtectedRoute requiredRole="admin"><DashboardLayout /></ProtectedRoute>}>
      <Route index element={<AdminDashboard />} />
      <Route path="events" element={<AdminEvents />} />
      <Route path="users" element={<AdminUsers />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
