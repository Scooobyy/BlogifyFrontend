import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import About from "./components/About";
import CreateBlog from "./components/CreateBlog";
import EditBlog from './components/EditBlog';
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import Landingpage from "./components/Landingpage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import './App.css';
import { Home } from "lucide-react";

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Landingpage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/create-blog/:id" element={<CreateBlog />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/view-blog/:id" element={<BlogDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit/:id" element={<EditBlog />} />
            </Routes>
          </div>
        </BlogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
