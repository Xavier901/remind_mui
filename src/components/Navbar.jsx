/** @format */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import AdbIcon from "@mui/icons-material/Adb";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useThemeMode } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const pages = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Blog", path: "/blog" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const { mode, toggleMode } = useThemeMode();

  const handleSignOut = () => {
    signOut();
    handleCloseUserMenu();
    navigate("/");
  };

  const isActive = (path) =>
    path === "/" ?
      location.pathname === "/"
    : location.pathname.startsWith(path);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        px: { xs: 1.5, sm: 3 },
        pt: 1.5,
      }}>
      <AppBar
        position='static'
        elevation={4}
        sx={{
          borderRadius: 3,
          bgcolor: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(10px)",
          color: "white",
        }}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            {/* Desktop logo */}
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              component={RouterLink}
              to='/'
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              REMIND
            </Typography>

            {/* Mobile hamburger */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size='large'
                aria-label='open navigation'
                onClick={handleOpenNavMenu}
                color='inherit'>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}>
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    component={RouterLink}
                    to={page.path}
                    selected={isActive(page.path)}
                    onClick={handleCloseNavMenu}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: isActive(page.path) ? 700 : 400,
                      }}>
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile logo */}
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component={RouterLink}
              to='/'
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              REMIND
            </Typography>

            {/* Desktop nav — right aligned */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                gap: 0.5,
              }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={RouterLink}
                  to={page.path}
                  sx={{
                    my: 1,
                    color: "white",
                    fontWeight: isActive(page.path) ? 700 : 400,
                    textTransform: "none",
                    fontSize: "0.95rem",
                    px: 2,
                    borderRadius: 2,
                    bgcolor:
                      isActive(page.path) ?
                        "rgba(255,255,255,0.15)"
                      : "transparent",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                  }}>
                  {page.label}
                </Button>
              ))}
            </Box>

            {/* ===== User area ===== */}
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <IconButton
                onClick={toggleMode}
                color='inherit'
                aria-label='toggle dark mode'
                sx={{ ml: 1 }}>
                {mode === "dark" ?
                  <LightModeIcon />
                : <DarkModeIcon />}
              </IconButton>
              {
                isAuthenticated ?
                  // Logged in → show avatar + dropdown
                  <>
                    <Tooltip title={user?.username || "Account"}>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={user?.username || "User"}
                          src={
                            user?.avatar?.url ?
                              `http://localhost:1337${user.avatar.url}`
                            : ""
                          }
                          sx={{ bgcolor: "primary.main" }}>
                          {user?.username?.charAt(0).toUpperCase() || "U"}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      anchorEl={anchorElUser}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      keepMounted
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}>
                      <MenuItem disabled sx={{ opacity: 1 }}>
                        <Typography variant='caption' color='text.secondary'>
                          Signed in as
                        </Typography>
                      </MenuItem>
                      <MenuItem disabled sx={{ opacity: 1 }}>
                        <Typography variant='body2' fontWeight={600}>
                          {user?.email || user?.username}
                        </Typography>
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        component={RouterLink}
                        to='/'
                        onClick={handleCloseUserMenu}>
                        <PersonIcon fontSize='small' sx={{ mr: 1.5 }} /> Profile
                      </MenuItem>
                      <MenuItem
                        component={RouterLink}
                        to='/'
                        onClick={handleCloseUserMenu}>
                        <DashboardIcon fontSize='small' sx={{ mr: 1.5 }} />{" "}
                        Dashboard
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleSignOut}>
                        <LogoutIcon fontSize='small' sx={{ mr: 1.5 }} /> Logout
                      </MenuItem>
                    </Menu>
                  </>
                  // Logged out → show Login button
                : <Button
                    component={RouterLink}
                    to='/login'
                    startIcon={<LoginIcon />}
                    variant='outlined'
                    sx={{
                      color: "white",
                      borderColor: "rgba(255,255,255,0.4)",
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255,255,255,0.08)",
                      },
                    }}>
                    Login
                  </Button>

              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
