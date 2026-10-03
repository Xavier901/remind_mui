/** @format */
import * as React from "react";
import { Box, Fade } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const location = useLocation();

  // Re-mount on route change → Fade restarts
  return (
    <Fade in timeout={350} key={location.pathname}>
      <Box>{children}</Box>
    </Fade>
  );
}
