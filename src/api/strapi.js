/** @format */
// Centralized axios instance + all API calls in one place.
import axios from "axios";

const BASE_URL = "http://localhost:1337/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// ---------- Auth token management ----------
export const TOKEN_KEY = "strapi_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (jwt) => localStorage.setItem(TOKEN_KEY, jwt);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------- Auth endpoints ----------
export const login = (identifier, password) =>
  api.post("/auth/local", { identifier, password });

export const getMe = () => api.get("/users/me?populate=role");

// ============================================================
// BLOG POSTS
// ============================================================
// // Keep the existing CRUD helpers
// export const createBlogPost = (data) => api.post("/blog-posts", { data });
// export const updateBlogPost = (documentId, data) =>
//   api.put(`/blog-posts/${documentId}`, { data });
// export const deleteBlogPost = (documentId) =>
//   api.delete(`/blog-posts/${documentId}`);

// ============================================================
// BLOG IMAGES
// ============================================================
export const getBlogImgs = () => api.get("/blog-imgs?populate=*");
export const createBlogImg = (data) => api.post("/blog-imgs", { data });
export const updateBlogImg = (documentId, data) =>
  api.put(`/blog-imgs/${documentId}`, { data });
export const deleteBlogImg = (documentId) =>
  api.delete(`/blog-imgs/${documentId}`);

// ============================================================
// LANDING PAGE / COMPANY SITE
// ============================================================

// ---------- Site Settings (Single Type) ----------
export const getSiteSettings = () => api.get("/site-setting?populate=*");

// ---------- Services ----------
export const getAllServices = () =>
  api.get("/services?sort=order:asc&populate=*");

export const getFeaturedServices = () =>
  api.get("/services?filters[featured][$eq]=true&sort=order:asc&populate=*");

export const getServiceBySlug = (slug) =>
  api.get(`/services?filters[slug][$eq]=${slug}&populate=*`);
// ---------- Testimonials ----------
export const getAllTestimonials = () =>
  api.get("/testimonials?sort=order:asc&populate=*");

export const getFeaturedTestimonials = () =>
  api.get(
    "/testimonials?filters[featured][$eq]=true&sort=order:asc&populate=*",
  );

// ---------- Case Studies (Portfolio) ----------
export const getAllCaseStudies = () =>
  api.get("/case-studies?sort=order:asc&populate=*");

export const getFeaturedCaseStudies = () =>
  api.get(
    "/case-studies?filters[featured][$eq]=true&sort=order:asc&populate=*",
  );

export const getCaseStudyBySlug = (slug) =>
  api.get(`/case-studies?filters[slug][$eq]=${slug}&populate=*`);

// ---------- Client Logos ----------
export const getClientLogos = () =>
  api.get("/client-logos?sort=order:asc&populate=*");

// ---------- Blog Posts ----------
export const getAllBlogPosts = () =>
  api.get("/blog-posts?sort=publishedDate:desc&populate=*");

export const getFeaturedBlogPosts = () =>
  api.get(
    "/blog-posts?filters[featured][$eq]=true&sort=publishedDate:desc&populate=*&pagination[limit]=3",
  );

export const getBlogPostBySlug = (slug) =>
  api.get(`/blog-posts?filters[slug][$eq]=${slug}&populate=*`);

export const createBlogPost = (data) => api.post("/blog-posts", { data });
export const updateBlogPost = (documentId, data) =>
  api.put(`/blog-posts/${documentId}`, { data });
export const deleteBlogPost = (documentId) =>
  api.delete(`/blog-posts/${documentId}`);
export const buildMediaUrl = (url) =>
  url ? `http://localhost:1337${url}` : "";

// ---------- About Page ----------
export const getAboutPage = () => api.get("/about-page?populate=*");

export const getTeamMembers = () =>
  api.get("/team-members?sort=order:asc&populate=*");

export const getCompanyStats = () =>
  api.get("/company-stats?sort=order:asc&populate=*");

export const getOfficeLocations = () =>
  api.get("/office-locations?sort=order:asc&populate=*");
// ============================================================
// HELPERS
// ============================================================
// export const buildMediaUrl = (url) =>
//   url ? `http://localhost:1337${url}` : "";

export default api;
