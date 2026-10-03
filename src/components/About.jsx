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
  Button,
  Chip,
  Stack,
  Divider,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link as RouterLink } from "react-router-dom";
import {
  getAboutPage,
  getTeamMembers,
  getCompanyStats,
  getOfficeLocations,
} from "../api/strapi";

function buildUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:1337${url}`;
}

export default function About() {
  const [data, setData] = React.useState({
    about: null,
    team: [],
    stats: [],
    offices: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const safe = async (fn) => {
        try {
          const res = await fn();
          return res.data.data;
        } catch (err) {
          console.warn("Fetch failed:", err.config?.url, err.message);
          return null;
        }
      };

      const [about, team, stats, offices] = await Promise.all([
        safe(getAboutPage),
        safe(getTeamMembers),
        safe(getCompanyStats),
        safe(getOfficeLocations),
      ]);

      if (!cancelled) {
        setData({
          about: about || null,
          team: Array.isArray(team) ? team : [],
          stats: Array.isArray(stats) ? stats : [],
          offices: Array.isArray(offices) ? offices : [],
        });
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const { about, team, stats, offices } = data;

  return (
    <Box>
      {/* ---------- 1. HERO ---------- */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 380, md: 480 },
          backgroundImage:
            about?.heroImage?.url ?
              `url(${buildUrl(about.heroImage.url)})`
            : "url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=800&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.85) 100%)",
          },
        }}>
        <Container
          maxWidth='md'
          sx={{
            position: "relative",
            textAlign: "center",
            color: "white",
            px: 2,
          }}>
          <Typography
            variant='overline'
            sx={{ letterSpacing: ".25rem", opacity: 0.75 }}>
            About Us
          </Typography>
          <Typography
            variant='h2'
            fontWeight={800}
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.15,
              mt: 2,
              mb: 2,
            }}>
            {about?.heroTitle ||
              "We build web products that ambitious teams rely on."}
          </Typography>
          <Typography
            variant='h6'
            sx={{ opacity: 0.85, fontWeight: 400, maxWidth: 640, mx: "auto" }}>
            {about?.heroSubtitle ||
              "A small, senior team that ships production-grade software from strategy to launch."}
          </Typography>
        </Container>
      </Box>

      {/* ---------- 2. STATS STRIP ---------- */}
      {stats.length > 0 && (
        <Container
          maxWidth='lg'
          sx={{ mt: { xs: -4, md: -6 }, position: "relative", zIndex: 1 }}>
          <Paper elevation={4} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
            <Grid container spacing={3}>
              {stats.map((s) => (
                <Grid size={{ xs: 6, md: 3 }} key={s.id}>
                  <Box sx={{ textAlign: "center" }}>
                    {s.icon && (
                      <Typography sx={{ fontSize: 32, mb: 0.5 }}>
                        {s.icon}
                      </Typography>
                    )}
                    <Typography
                      variant='h4'
                      fontWeight={800}
                      color='primary.main'
                      sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" } }}>
                      {s.value}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {s.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      )}

      {/* ---------- 3. STORY ---------- */}
      <Container maxWidth='lg' sx={{ mt: { xs: 6, md: 10 }, mb: 6 }}>
        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant='overline'
              sx={{ color: "primary.main", letterSpacing: ".15rem" }}>
              Our Story
            </Typography>
            <Typography
              variant='h3'
              fontWeight={700}
              sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, mt: 1, mb: 3 }}>
              {about?.storyTitle || "Built to do things properly."}
            </Typography>
            <Box
              sx={{
                "& p": { mb: 2, lineHeight: 1.85, fontSize: "1.05rem" },
                "& strong": { color: "text.primary" },
                color: "text.secondary",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  about?.story ||
                  `<p>Remind Studio was founded on a simple frustration: too many web projects are shipped broken, late, or without the craft they deserve.</p>
                   <p>We wanted to change that. So we built a small, senior team that works directly with clients — no account managers, no handoffs, no diluted vision. Just the people doing the work, working with you.</p>
                   <p>Today we partner with founders and product teams around the world to design, build, and ship web products they're proud of.</p>`,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                aspectRatio: "4 / 3",
                bgcolor: "grey.100",
              }}>
              {about?.storyImage?.url ?
                <Box
                  component='img'
                  src={buildUrl(about.storyImage.url)}
                  alt='Our story'
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              : <Box
                  component='img'
                  src='https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop'
                  alt='Our story'
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              }
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* ---------- 4. VALUES ---------- */}
      <Box sx={{ bgcolor: "grey.50", py: { xs: 6, md: 10 } }}>
        <Container maxWidth='lg'>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant='overline'
              sx={{ color: "primary.main", letterSpacing: ".15rem" }}>
              What We Believe
            </Typography>
            <Typography
              variant='h3'
              fontWeight={700}
              sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, mt: 1, mb: 1 }}>
              {about?.valuesTitle || "Principles we work by."}
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ maxWidth: 640, mx: "auto" }}>
              {about?.valuesSubtitle ||
                "Not slogans — the rules that decide what we build, how we build it, and who we say no to."}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              {
                title: "Craft over shortcuts",
                body: "We write tests, review each other's code, and choose the boring reliable option when it's right. Speed matters — correctness matters more.",
              },
              {
                title: "Clients as partners",
                body: "We say no to bad ideas, push back when scope is unrealistic, and celebrate your wins as if they were ours. That's what a real partnership looks like.",
              },
              {
                title: "Transparent always",
                body: "Weekly demos, shared repositories, open estimates. You'll always know what we're working on, what it costs, and what's next.",
              },
              {
                title: "Long-term thinking",
                body: "We optimize for the code that will still be running in three years, not the demo that looks impressive next week.",
              },
            ].map((value) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={value.title}>
                <Card
                  sx={{
                    height: "100%",
                    p: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "none",
                    transition: "all 0.25s",
                    "&:hover": {
                      boxShadow: 4,
                      borderColor: "primary.main",
                    },
                  }}>
                  <CardContent>
                    <Typography variant='h6' fontWeight={600} gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {value.body}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ---------- 5. TEAM ---------- */}
      {team.length > 0 && (
        <Container maxWidth='lg' sx={{ py: { xs: 6, md: 10 } }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant='overline'
              sx={{ color: "primary.main", letterSpacing: ".15rem" }}>
              The Team
            </Typography>
            <Typography
              variant='h3'
              fontWeight={700}
              sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, mt: 1, mb: 1 }}>
              The people behind the work.
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ maxWidth: 640, mx: "auto" }}>
              A small, senior team. No middle layers, no account managers — you
              work directly with the people building your product.
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {team.map((member) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    transition: "transform 0.25s, box-shadow 0.25s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}>
                  {/* Photo */}
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      bgcolor: "grey.100",
                    }}>
                    {member.photo?.url ?
                      <Box
                        component='img'
                        src={buildUrl(member.photo.url)}
                        alt={member.name}
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
                        }}>
                        <Avatar sx={{ width: 80, height: 80, fontSize: 32 }}>
                          {member.name?.charAt(0)}
                        </Avatar>
                      </Box>
                    }
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    {member.leadership && (
                      <Chip
                        label='Leadership'
                        size='small'
                        color='primary'
                        sx={{ mb: 1 }}
                      />
                    )}
                    <Typography variant='h6' fontWeight={600}>
                      {member.name}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='primary.main'
                      fontWeight={500}
                      gutterBottom>
                      {member.role}
                    </Typography>
                    {member.bio && (
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ mt: 1.5, lineHeight: 1.6 }}>
                        {member.bio}
                      </Typography>
                    )}

                    {/* Socials */}
                    <Stack
                      direction='row'
                      spacing={0.5}
                      sx={{ justifyContent: "center", mt: 2 }}>
                      {member.linkedin && (
                        <IconButton
                          size='small'
                          component='a'
                          href={member.linkedin}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label='LinkedIn'>
                          <LinkedInIcon fontSize='small' />
                        </IconButton>
                      )}
                      {member.github && (
                        <IconButton
                          size='small'
                          component='a'
                          href={member.github}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label='GitHub'>
                          <GitHubIcon fontSize='small' />
                        </IconButton>
                      )}
                      {member.twitter && (
                        <IconButton
                          size='small'
                          component='a'
                          href={member.twitter}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label='Twitter'>
                          <TwitterIcon fontSize='small' />
                        </IconButton>
                      )}
                      {member.email && (
                        <IconButton
                          size='small'
                          component='a'
                          href={`mailto:${member.email}`}
                          aria-label='Email'>
                          <EmailIcon fontSize='small' />
                        </IconButton>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* ---------- 6. LOCATIONS ---------- */}
      {offices.length > 0 && (
        <Box sx={{ bgcolor: "grey.50", py: { xs: 6, md: 10 } }}>
          <Container maxWidth='lg'>
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Typography
                variant='overline'
                sx={{ color: "primary.main", letterSpacing: ".15rem" }}>
                Where We Are
              </Typography>
              <Typography
                variant='h3'
                fontWeight={700}
                sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, mt: 1 }}>
                Offices & timezones
              </Typography>
            </Box>

            <Grid container spacing={3} sx={{ justifyContent: "center" }}>
              {offices.map((office) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={office.id}>
                  <Card sx={{ height: "100%", p: 1 }}>
                    <CardContent>
                      <Stack
                        direction='row'
                        spacing={1}
                        sx={{ mb: 1, alignItems: "center" }}>
                        <LocationOnIcon color='primary' />
                        <Typography variant='h6' fontWeight={600}>
                          {office.city}
                        </Typography>
                        {office.isHQ && (
                          <Chip label='HQ' size='small' color='primary' />
                        )}
                      </Stack>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ whiteSpace: "pre-line", mb: 1 }}>
                        {office.address}
                      </Typography>
                      {office.timezone && (
                        <Typography variant='caption' color='text.secondary'>
                          {office.timezone}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* ---------- 7. FINAL CTA ---------- */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
        }}>
        <Container maxWidth='md' sx={{ textAlign: "center" }}>
          <Typography
            variant='h3'
            fontWeight={700}
            sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, mb: 2 }}>
            {about?.ctaTitle || "Ready to build something together?"}
          </Typography>
          <Typography
            variant='h6'
            sx={{ opacity: 0.85, mb: 4, fontWeight: 400 }}>
            {about?.ctaSubtitle ||
              "Tell us about your project. We'll reply within 24 hours."}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "center" }}>
            <Button
              component={RouterLink}
              to='/contact'
              variant='contained'
              size='large'
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": { bgcolor: "grey.100" },
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}>
              Start a Project
            </Button>
            <Button
              variant='outlined'
              size='large'
              href={`mailto:${about?.email || "bapimahalik51@hotmail.com"}`}
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

          {(about?.email || about?.phone || about?.address) && (
            <>
              <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 4 }}
                sx={{
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.75)",
                }}>
                {about?.email && (
                  <Typography variant='body2'>✉ {about.email}</Typography>
                )}
                {about?.phone && (
                  <Typography variant='body2'>☎ {about.phone}</Typography>
                )}
                {about?.address && (
                  <Typography variant='body2'>⌂ {about.address}</Typography>
                )}
              </Stack>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}
