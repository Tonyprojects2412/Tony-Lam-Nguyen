
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CaseStudies from "./pages/CaseStudies";
import BusinessAnalyst from "./pages/BusinessAnalyst";
import AIProjects from "./pages/AIProjects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PagesList from "./pages/admin/PagesList";
import PageEditor from "./pages/admin/PageEditor";
import DynamicPage from "./pages/DynamicPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/business-analyst" element={<BusinessAnalyst />} />
            <Route path="/ai-projects" element={<AIProjects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />}>
              <Route index element={<AdminDashboard />} />
              <Route path="pages" element={<PagesList />} />
              <Route path="new-page" element={<PageEditor />} />
              <Route path="pages/:id" element={<PageEditor />} />
            </Route>
            
            {/* Dynamic Page Route - Must be before the catch-all */}
            <Route path="/:slug" element={<DynamicPage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
