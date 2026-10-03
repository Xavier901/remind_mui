/** @format */
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Stack,
  Chip,
  CircularProgress,
  Alert,
  Link,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { getAllTestimonials } from "../api/strapi";

function buildUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:1337${url}`;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getAllTestimonials();
        if (!cancelled) {
          setTestimonials(res.data.data || []);
          setError(null);
        }
      } catch (err) {
        console.error("Testimonials fetch error:", err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box>
      {/* ---------- Hero ---------- */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 260, md: 340 },
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=600&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(15, 23, 42, 0.72)",
          },
        }}>
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            color: "white",
            px: 2,
          }}>
          <Typography
            variant='overline'
            sx={{ letterSpacing: ".2rem", opacity: 0.7 }}>
            Social Proof
          </Typography>
          <Typography variant='h3' fontWeight={700} gutterBottom sx={{ mt: 1 }}>
            What Clients Say
          </Typography>
          <Typography
            variant='h6'
            sx={{ opacity: 0.9, maxWidth: 640, mx: "auto" }}>
            Real words from real clients — the people who trusted us to build
            their products.
          </Typography>
        </Box>
      </Box>

      {/* ---------- Grid of testimonials ---------- */}
      <Container maxWidth='lg' sx={{ mt: 6, mb: 8 }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity='error' sx={{ maxWidth: 600, mx: "auto" }}>
            Failed to load testimonials: {error}
          </Alert>
        )}

        {!loading && !error && testimonials.length === 0 && (
          <Alert severity='info' sx={{ maxWidth: 600, mx: "auto" }}>
            No testimonials yet. Add one in Strapi to see it here.
          </Alert>
        )}

        {!loading && !error && testimonials.length > 0 && (
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {testimonials.map((t) => {
              const photoUrl = buildUrl(t.authorPhoto?.url);

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={t.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      p: 1,
                      position: "relative",
                      transition: "transform 0.25s, box-shadow 0.25s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      },
                    }}>
                    {/* Big quote mark in the corner */}
                    <FormatQuoteIcon
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        fontSize: 48,
                        color: "primary.main",
                        opacity: 0.15,
                      }}
                    />

                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Star rating */}
                      <Rating
                        value={t.rating || 5}
                        readOnly
                        size='small'
                        sx={{ mb: 1.5 }}
                      />

                      {/* Optional result metric */}
                      {t.resultMetric && (
                        <Chip
                          label={t.resultMetric}
                          size='small'
                          color='success'
                          variant='outlined'
                          sx={{ mb: 1.5, fontWeight: 600 }}
                        />
                      )}

                      {/* Quote */}
                      <Typography
                        variant='body1'
                        sx={{
                          my: 2,
                          fontStyle: "italic",
                          lineHeight: 1.7,
                          color: "text.primary",
                        }}>
                        "{t.quote}"
                      </Typography>

                      {/* Optional project type */}
                      {t.projectType && (
                        <Typography
                          variant='caption'
                          sx={{
                            display: "block",
                            mb: 2,
                            color: "text.secondary",
                          }}>
                          Project: {t.projectType}
                        </Typography>
                      )}

                      {/* Author */}
                      <Stack
                        direction='row'
                        spacing={1.5}
                        sx={{ alignItems: "center", mt: 2 }}>
                        <Avatar
                          src={photoUrl}
                          alt={t.authorName}
                          sx={{ width: 48, height: 48 }}>
                          {t.authorName?.charAt(0)}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant='subtitle2' fontWeight={600}>
                            {t.authorName}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {t.authorRole}
                            {t.authorCompany ? `, ${t.authorCompany}` : ""}
                          </Typography>
                          {t.authorLocation && (
                            <Typography
                              variant='caption'
                              color='text.secondary'
                              display='block'>
                              {t.authorLocation}
                            </Typography>
                          )}
                        </Box>
                        {/* Optional links */}
                        {t.authorLinkedin && (
                          <IconButton
                            size='small'
                            component='a'
                            href={t.authorLinkedin}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='LinkedIn'>
                            <LinkedInIcon fontSize='small' />
                          </IconButton>
                        )}
                        {t.authorWebsite && (
                          <IconButton
                            size='small'
                            component='a'
                            href={t.authorWebsite}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='Website'>
                            <LanguageIcon fontSize='small' />
                          </IconButton>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Bottom CTA */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant='h5' fontWeight={600} gutterBottom>
            Ready to be our next success story?
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
            Let's talk about your project.
          </Typography>
          <Link
            href='/contact'
            underline='none'
            sx={{
              display: "inline-block",
              px: 4,
              py: 1.5,
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 2,
              fontWeight: 600,
              "&:hover": { bgcolor: "primary.dark" },
            }}>
            Start a Project
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
