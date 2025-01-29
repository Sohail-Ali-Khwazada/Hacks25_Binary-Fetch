import { Routes, Route } from "react-router";
import { HomeLayout } from "./pages/HomeLayout";
import { ContactUs } from "./pages/ContactUs";
import { AboutUs } from "./pages/AboutUs";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { PlatformInfo} from "./pages/PlatformInfo";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import {AnalyticsDashboard} from "./pages/AnalyticsDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AgentContextProvider } from "./context/AgentContext";


function App() {
  return (
    <>
    <AuthContextProvider>
      <AgentContextProvider>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
            <Route path="/connect-account" element={<ProtectedRoute><PlatformInfo /></ProtectedRoute>} />
        </Route> 
      </Routes>
      <Toaster />
      </AgentContextProvider>
    </AuthContextProvider>
    </>
  );
}

export default App;