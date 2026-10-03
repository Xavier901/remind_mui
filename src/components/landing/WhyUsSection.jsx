/** @format */
import * as React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const REASONS = [
  {
    icon: <SpeedIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    title: "Fast Delivery",
    text: "We ship on schedule — sprints, reviews, and demos keep you informed every week.",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    title: "Production Quality",
    text: "Accessibility, performance, and security are baked in from day one — not afterthoughts.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    title: "Long-Term Support",
    text: "We stay with you after launch — monitoring, fixes, and features as you grow.",
  },
];

export default function WhyUsSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "grey.50" }}>
      <Container maxWidth='lg'>
        <Typography
          variant='overline'
          textAlign='center'
          display='block'
          sx={{ color: "primary.main", letterSpacing: ".15rem" }}>
          Why Choose Us
        </Typography>
        <Typography
          variant='h3'
          fontWeight={700}
          textAlign='center'
          sx={{ mb: 5 }}>
          Built to deliver
        </Typography>

        <Grid container spacing={4}>
          {REASONS.map((reason) => (
            <Grid size={{ xs: 12, md: 4 }} key={reason.title}>
              <Box sx={{ textAlign: "center", px: 2 }}>
                <Box sx={{ mb: 2 }}>{reason.icon}</Box>
                <Typography variant='h6' fontWeight={600} gutterBottom>
                  {reason.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {reason.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
