import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { UserProvider } from "./contexts/UserContext";
import IntroScreen from "./pages/IntroScreen";
import DemoHomeScreen from "./pages/DemoHomeScreen";
import SignUpScreen from "./pages/SignUpScreen";
import UserFormScreen from "./pages/UserFormScreen";
import HomeScreen from "./pages/HomeScreen";
import BuildingsScreen from "./pages/BuildingsScreen";
import SOSScreen from "./pages/SOSScreen";
import ProfileScreen from "./pages/ProfileScreen";
import EditProfileScreen from "./pages/EditProfileScreen";
import HistoryScreen from "./pages/HistoryScreen";
import AnalyticsScreen from "./pages/AnalyticsScreen";
import NavigationDemo from "./pages/NavigationDemo";
import HealthInfoScreen from "./pages/HealthInfoScreen";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  
  // Don't show navigation on intro and demo screens
  const showNavigation = !['/', '/demo', '/signup', '/user-form'].includes(location.pathname);
  
  return (
    <>
      <TransitionGroup className="route-wrapper">
        <CSSTransition key={location.pathname} classNames="route-fade" timeout={400}>
          <Routes location={location}>
            <Route path="/" element={<IntroScreen />} />
            <Route path="/demo" element={<DemoHomeScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/user-form" element={<UserFormScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/buildings" element={<BuildingsScreen />} />
            <Route path="/sos" element={<SOSScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/edit-profile" element={<EditProfileScreen />} />
            <Route path="/history" element={<HistoryScreen />} />
            <Route path="/analytics" element={<AnalyticsScreen />} />
            <Route path="/nav-demo" element={<NavigationDemo />} />
            <Route path="/health-info" element={<HealthInfoScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      
      {/* Global Navigation - outside of page transitions */}
      {showNavigation && <Navigation />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;