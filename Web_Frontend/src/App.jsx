import { Routes, Route } from "react-router";
import { HomeLayout } from "./pages/HomeLayout";
import { ContactUs } from "./pages/ContactUs";
import { AboutUs } from "./pages/AboutUs";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { PlatformInfo} from "./pages/PlatformInfo";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import { CalendarPage } from "./pages/CalendarPage";
import { AccountsPage } from "./pages/AccountsPage";
import { PostingSchedule } from "./pages/PostingSchedule";
import { PostPage } from "./pages/PostPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AnalyticsDashboard } from "./pages/AnalyticsDashboard";
import { CreatePostPage } from "./pages/CreatePostPage";
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
          <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/connect-account" element={<PlatformInfo />} />
          <Route path="/post-calendar" element={<CalendarPage />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/posting-schedule" element={<PostingSchedule />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/create-page" element={<CreatePostPage />} />
          </Route> 
      </Routes>
      <Toaster />
      </AgentContextProvider>
    </AuthContextProvider>
    </>
  );
}

export default App;