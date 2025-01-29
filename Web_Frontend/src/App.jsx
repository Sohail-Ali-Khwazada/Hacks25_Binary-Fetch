import { Routes, Route } from "react-router";
import { HomeLayout } from "./pages/HomeLayout";
import { Landing } from "./pages/Landing";
import { ContactUs } from "./pages/ContactUs";
import { AboutUs } from "./pages/AboutUs";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import { CalendarPage } from "./pages/CalendarPage";
import { AccountsPage } from "./pages/AccountsPage";
import { PostingSchedule } from "./pages/PostingSchedule";
import { PostPage } from "./pages/PostPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AnalyticsDashboard } from "./pages/AnalyticsDashboard";
import { CreatePostPage } from "./pages/CreatePostPage";


function App() {
  return (
    <>
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Landing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-calendar" element={<CalendarPage />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/posting-schedule" element={<PostingSchedule />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/create-page" element={<CreatePostPage />} />
          </Route> 
      </Routes>

      <Toaster />
    </AuthContextProvider>
    </>
  );
}

export default App;