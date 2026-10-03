/** @format */
import * as React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    text: "We learn your goals, users, and constraints.",
  },
  {
    num: "02",
    title: "Design",
    text: "Wireframes and prototypes before a line of code.",
  },
  {
    num: "03",
    title: "Build",
    text: "Weekly demos, clean code, and automated tests.",
  },
  {
    num: "04",
    title: "Launch",
    text: "Deploy, monitor, and iterate based on real usage.",
  },
];

export default function ProcessSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth='lg'>
        <Typography
          variant='overline'
          textAlign='center'
          display='block'
          sx={{ color: "primary.main", letterSpacing: ".15rem" }}>
          Our Process
        </Typography>
        <Typography
          variant='h3'
          fontWeight={700}
          textAlign='center'
          sx={{ mb: 5 }}>
          How we work
        </Typography>

        <Grid container spacing={3}>
          {STEPS.map((step) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={step.num}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}>
                <Typography
                  variant='h3'
                  sx={{
                    color: "primary.main",
                    fontWeight: 800,
                    opacity: 0.2,
                    mb: 1,
                  }}>
                  {step.num}
                </Typography>
                <Typography variant='h6' fontWeight={600} gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {step.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
