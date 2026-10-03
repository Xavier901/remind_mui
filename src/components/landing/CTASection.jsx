/** @format */
import * as React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CTASection({ settings }) {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
      }}>
      <Container maxWidth='md' sx={{ textAlign: "center" }}>
        <Typography variant='h3' fontWeight={700} gutterBottom>
          Ready to start your project?
        </Typography>
        <Typography variant='h6' sx={{ opacity: 0.8, mb: 4, fontWeight: 400 }}>
          Let's turn your idea into something people love to use.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent='center'>
          <Button
            variant='contained'
            size='large'
            endIcon={<ArrowForwardIcon />}
            href='/contact'
            sx={{
              bgcolor: "white",
              color: "primary.main",
              "&:hover": { bgcolor: "grey.100" },
              px: 4,
              py: 1.5,
              fontWeight: 600,
            }}>
            Get in Touch
          </Button>
          <Button
            variant='outlined'
            size='large'
            href={`mailto:${settings?.email || "bapimahalik51@hotmail.com"}`}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.4)",
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.05)",
              },
              px: 4,
              py: 1.5,
            }}>
            Email Us
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
