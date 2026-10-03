/** @format */
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import ServiceDetail from "./components/ServiceDetail";
import Portfolio from "./components/Portfolio"; // ✅ FIX — import
import CaseStudyDetail from "./components/CaseStudyDetail"; // ✅ FIX — import
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import BlogPostDetail from "./components/BlogPostDetail";
import Contact from "./components/Contact";
import Login from "./components/Login";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import PageTransition from "./components/PageTransition";
// Placeholder pages — only the ones you haven't built yet
const BlogPage = () => (
  <Box sx={{ p: 6, textAlign: "center" }}>Blog page coming soon</Box>
);
const NotFound = () => (
  <Box sx={{ p: 6, textAlign: "center" }}>404 — Page not found</Box>
);

function Layout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      {/* Spacer for floating AppBar */}
      <Box sx={{ height: { xs: 80, md: 88 } }} />
      <Box sx={{ flexGrow: 1 }}>
        <PageTransition>{children}</PageTransition>
      </Box>
      <Footer />
    </Box>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/services' element={<Services />} />
            <Route path='/services/:slug' element={<ServiceDetail />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/portfolio/:slug' element={<CaseStudyDetail />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:slug' element={<BlogPostDetail />} />
            <Route path='/testimonials' element={<Testimonials />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/privacy' element={<PrivacyPolicy />} />
            <Route path='/terms' element={<TermsOfService />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
