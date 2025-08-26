import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IntroScreen />} />
            <Route path="/demo" element={<DemoHomeScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/user-form" element={<UserFormScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/buildings" element={<BuildingsScreen />} />
            <Route path="/sos" element={<SOSScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/edit-profile" element={<EditProfileScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;