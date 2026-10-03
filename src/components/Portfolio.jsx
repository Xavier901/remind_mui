/** @format */
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";
import { getAllCaseStudies } from "../api/strapi";

// Normalize Strapi's media shapes → array of {url}
function normalizeMedia(media) {
  if (!media) return [];
  if (Array.isArray(media)) return media;
  if (media.data) {
    const d = media.data;
    return Array.isArray(d) ? d : [d];
  }
  return [media];
}

function buildUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:1337${url}`;
}

export default function Portfolio() {
  const [caseStudies, setCaseStudies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getAllCaseStudies();
        if (!cancelled) {
          setCaseStudies(res.data.data || []);
          setError(null);
        }
      } catch (err) {
        console.error("Portfolio fetch error:", err);
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
            "url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=600&fit=crop)",
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
            Our Work
          </Typography>
          <Typography variant='h3' fontWeight={700} gutterBottom sx={{ mt: 1 }}>
            Portfolio
          </Typography>
          <Typography
            variant='h6'
            sx={{ opacity: 0.9, maxWidth: 640, mx: "auto" }}>
            Real projects, real outcomes. See how we've helped ambitious teams
            ship faster and grow.
          </Typography>
        </Box>
      </Box>

      {/* ---------- Grid ---------- */}
      <Container maxWidth='lg' sx={{ mt: 6, mb: 8 }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity='error' sx={{ maxWidth: 600, mx: "auto" }}>
            Failed to load projects: {error}
          </Alert>
        )}

        {!loading && !error && caseStudies.length === 0 && (
          <Alert severity='info' sx={{ maxWidth: 600, mx: "auto" }}>
            No case studies yet. Add one in Strapi to see it here.
          </Alert>
        )}

        {!loading && !error && caseStudies.length > 0 && (
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {caseStudies.map((cs) => {
              const cover = normalizeMedia(cs.coverImage)[0];
              const coverUrl = cover ? buildUrl(cover.url) : null;

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cs.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.25s, box-shadow 0.25s",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: 6,
                      },
                    }}>
                    {coverUrl ?
                      <CardMedia
                        component='img'
                        height='220'
                        image={coverUrl}
                        alt={cs.title}
                        sx={{ objectFit: "cover" }}
                      />
                    : <Box sx={{ height: 220, bgcolor: "grey.200" }} />}

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Stack direction='row' spacing={1} sx={{ mb: 1 }}>
                        {cs.client && (
                          <Chip
                            label={cs.client}
                            size='small'
                            color='primary'
                          />
                        )}
                        {cs.industry && (
                          <Chip
                            label={cs.industry}
                            size='small'
                            variant='outlined'
                          />
                        )}
                      </Stack>

                      <Typography
                        variant='h6'
                        fontWeight={600}
                        gutterBottom
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                        {cs.title}
                      </Typography>

                      <Typography variant='body2' color='text.secondary'>
                        {cs.shortSummary}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Button
                        size='small'
                        endIcon={<ArrowForwardIcon />}
                        component={RouterLink}
                        to={`/portfolio/${cs.slug}`}>
                        View case study
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
