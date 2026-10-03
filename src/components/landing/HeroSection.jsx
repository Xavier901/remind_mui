/** @format */
import * as React from "react";
import { Box, Container, Typography, Button, Grid, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function HeroSection({ settings }) {
  const heroImageUrl =
    settings?.heroImage?.url ?
      `http://localhost:1337${settings.heroImage.url}`
    : null;

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}>
      <Container maxWidth='lg'>
        {/* ✅ alignItems moved into sx */}
        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          {/* Text column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant='overline'
              sx={{ letterSpacing: ".2rem", opacity: 0.7 }}>
              {settings?.companyName || "Remind Studio"}
            </Typography>

            <Typography
              variant='h2'
              fontWeight={800}
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem" },
                lineHeight: 1.1,
                mt: 1,
                mb: 2,
              }}>
              {settings?.heroTitle ||
                "We build web apps that move your business forward."}
            </Typography>

            <Typography
              variant='h6'
              sx={{ opacity: 0.8, mb: 4, fontWeight: 400, maxWidth: 520 }}>
              {settings?.heroSubtitle ||
                "Modern, fast, and reliable — from strategy to launch."}
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant='contained'
                size='large'
                endIcon={<ArrowForwardIcon />}
                href={settings?.primaryCTALink || "/contact"}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": { bgcolor: "grey.100" },
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                }}>
                {settings?.primaryCTA || "Start a Project"}
              </Button>
              <Button
                variant='outlined'
                size='large'
                startIcon={<PlayArrowIcon />}
                href={settings?.secondaryCTALink || "/portfolio"}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.4)",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                  px: 3,
                  py: 1.5,
                }}>
                {settings?.secondaryCTA || "See Our Work"}
              </Button>
            </Stack>
          </Grid>

          {/* Image column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                aspectRatio: "4 / 3",
                bgcolor: "rgba(255,255,255,0.05)",
              }}>
              {heroImageUrl ?
                <Box
                  component='img'
                  src={heroImageUrl}
                  alt='Hero'
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              : <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.4)",
                  }}>
                  <Typography variant='caption'>Hero image</Typography>
                </Box>
              }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
