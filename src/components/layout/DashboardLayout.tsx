import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  LayoutDashboard, Calendar, Image, CreditCard, Users, ShieldCheck,
  Menu, X, LogOut, Sun, Moon, ChevronDown, Bell
} from 'lucide-react';

const userLinks = [
  { to: '/dashboard/user', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/user/events', label: 'Events', icon: Calendar },
  { to: '/dashboard/user/gallery', label: 'Gallery', icon: Image },
  { to: '/dashboard/user/subscription', label: 'Subscription', icon: CreditCard },
];

const adminLinks = [
  { to: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/admin/events', label: 'Event Moderation', icon: ShieldCheck },
  { to: '/dashboard/admin/users', label: 'Users', icon: Users },
];

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isAdmin = user?.role === 'admin';
  const links = isAdmin ? adminLinks : userLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between px-6 h-16 border-b border-sidebar-border">
          <span className="text-lg font-bold text-sidebar-foreground tracking-tight">EventHub</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={`sidebar-link ${isActive(link.to) ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-sidebar-border">
          <button onClick={handleLogout} className="sidebar-link sidebar-link-inactive w-full">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground p-1.5 rounded-lg hover:bg-muted">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <span className="hidden sm:block text-sm font-medium text-foreground">{user?.firstName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-slide-down">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
