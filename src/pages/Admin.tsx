
import { useEffect, useState } from 'react';
import { Navigate, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Home, LogOut } from 'lucide-react';

const Admin = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile header */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">CMS Dashboard</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar (desktop always visible, mobile conditionally) */}
        <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block bg-gray-900 text-white w-full md:w-64 flex-shrink-0`}>
          <div className="p-4 hidden md:block">
            <h1 className="font-bold text-xl">CMS Dashboard</h1>
          </div>
          <div className="p-2">
            <p className="px-4 py-2 text-sm text-gray-400">Logged in as: {user.email}</p>
          </div>
          <nav className="mt-2">
            <ul className="space-y-1">
              <li>
                <Button
                  variant={isActive('/admin') && !isActive('/admin/pages') && !isActive('/admin/new-page') ? "secondary" : "ghost"}
                  className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
                  asChild
                >
                  <Link to="/admin">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  variant={isActive('/admin/pages') ? "secondary" : "ghost"}
                  className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
                  asChild
                >
                  <Link to="/admin/pages">
                    <FileText className="mr-2 h-4 w-4" />
                    Pages
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  variant={isActive('/admin/new-page') ? "secondary" : "ghost"}
                  className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
                  asChild
                >
                  <Link to="/admin/new-page">
                    <Plus className="mr-2 h-4 w-4" />
                    New Page
                  </Link>
                </Button>
              </li>
              <li className="mt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
