/** @format */
import * as React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid,
  Divider,
  Stack,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LaunchIcon from "@mui/icons-material/Launch";
import { getCaseStudyBySlug } from "../api/strapi";

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

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getCaseStudyBySlug(slug);
        const items = res.data.data || [];
        if (!cancelled) {
          setCaseStudy(items[0] || null);
          setError(items.length === 0 ? "Case study not found" : null);
        }
      } catch (err) {
        console.error("Case study fetch error:", err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !caseStudy) {
    return (
      <Container maxWidth='md' sx={{ py: 8, textAlign: "center" }}>
        <Typography variant='h5' gutterBottom>
          {error || "Case study not found"}
        </Typography>
        <Button
          component={RouterLink}
          to='/portfolio'
          startIcon={<ArrowBackIcon />}>
          Back to Portfolio
        </Button>
      </Container>
    );
  }

  const cover = normalizeMedia(caseStudy.coverImage)[0];
  const coverUrl = cover ? buildUrl(cover.url) : null;

  const gallery = normalizeMedia(caseStudy.gallery).map((g) => ({
    ...g,
    fullUrl: buildUrl(g.url),
  }));

  const techStack =
    caseStudy.techStack ?
      caseStudy.techStack.split(",").map((t) => t.trim())
    : [];

  return (
    <Box>
      {/* ---------- Hero with cover ---------- */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 300, md: 460 },
          backgroundImage: coverUrl ? `url(${coverUrl})` : "none",
          backgroundColor: "grey.900",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              coverUrl ?
                "linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.85) 100%)"
              : "none",
          },
        }}>
        <Container
          maxWidth='lg'
          sx={{ position: "relative", pb: 4, color: "white" }}>
          <Button
            component={RouterLink}
            to='/portfolio'
            startIcon={<ArrowBackIcon />}
            variant='outlined'
            sx={{
              mb: 3,
              color: "white",
              borderColor: "rgba(255,255,255,0.5)",
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}>
            Back to Portfolio
          </Button>

          <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
            {caseStudy.client && (
              <Chip
                label={caseStudy.client}
                color='primary'
                sx={{ fontWeight: 600 }}
              />
            )}
            {caseStudy.industry && (
              <Chip
                label={caseStudy.industry}
                variant='outlined'
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}
              />
            )}
          </Stack>

          <Typography
            variant='h3'
            fontWeight={700}
            sx={{ fontSize: { xs: "1.75rem", md: "2.75rem" }, mb: 1 }}>
            {caseStudy.title}
          </Typography>

          {caseStudy.shortSummary && (
            <Typography variant='h6' sx={{ opacity: 0.85, fontWeight: 400 }}>
              {caseStudy.shortSummary}
            </Typography>
          )}
        </Container>
      </Box>

      {/* ---------- Metrics strip ---------- */}
      {Array.isArray(caseStudy.metrics) && caseStudy.metrics.length > 0 && (
        <Container
          maxWidth='lg'
          sx={{ mt: -4, position: "relative", zIndex: 1 }}>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 3,
            }}>
            <Grid container spacing={3}>
              {caseStudy.metrics.map((m, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant='h4'
                      fontWeight={800}
                      color='primary.main'>
                      {m.value}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {m.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      )}

      {/* ---------- Problem / Solution / Result ---------- */}
      <Container maxWidth='md' sx={{ mt: 6, mb: 8 }}>
        {caseStudy.problem && (
          <Box sx={{ mb: 5 }}>
            <Typography
              variant='overline'
              color='primary.main'
              fontWeight={700}>
              The Problem
            </Typography>
            <Typography
              variant='body1'
              sx={{ whiteSpace: "pre-line", lineHeight: 1.8, mt: 1 }}>
              {caseStudy.problem}
            </Typography>
          </Box>
        )}

        {caseStudy.solution && (
          <Box sx={{ mb: 5 }}>
            <Typography
              variant='overline'
              color='primary.main'
              fontWeight={700}>
              Our Solution
            </Typography>
            <Typography
              variant='body1'
              sx={{ whiteSpace: "pre-line", lineHeight: 1.8, mt: 1 }}>
              {caseStudy.solution}
            </Typography>
          </Box>
        )}

        {caseStudy.result && (
          <Box sx={{ mb: 5 }}>
            <Typography
              variant='overline'
              color='primary.main'
              fontWeight={700}>
              The Result
            </Typography>
            <Typography
              variant='body1'
              sx={{ whiteSpace: "pre-line", lineHeight: 1.8, mt: 1 }}>
              {caseStudy.result}
            </Typography>
          </Box>
        )}

        {/* Tech stack */}
        {techStack.length > 0 && (
          <>
            <Divider sx={{ my: 4 }} />
            <Typography variant='h6' fontWeight={600} gutterBottom>
              Tech Stack
            </Typography>
            <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
              {techStack.map((tech) => (
                <Chip key={tech} label={tech} variant='outlined' />
              ))}
            </Stack>
          </>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <>
            <Divider sx={{ my: 4 }} />
            <Typography variant='h6' fontWeight={600} gutterBottom>
              Screenshots
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {gallery.map((img, i) => (
                <Grid size={{ xs: 12, sm: 6 }} key={i}>
                  <Box
                    component='img'
                    src={img.fullUrl}
                    alt={`${caseStudy.title} screenshot ${i + 1}`}
                    sx={{
                      width: "100%",
                      height: 240,
                      objectFit: "cover",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Live link */}
        {caseStudy.liveUrl && (
          <>
            <Divider sx={{ my: 4 }} />
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant='contained'
                size='large'
                endIcon={<LaunchIcon />}
                href={caseStudy.liveUrl}
                target='_blank'
                rel='noopener noreferrer'>
                Visit Live Site
              </Button>
            </Box>
          </>
        )}

        {/* CTA */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Button
            component={RouterLink}
            to='/contact'
            variant='contained'
            size='large'>
            Start Your Project
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
