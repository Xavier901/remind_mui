/** @format */
import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

// Footer link groups — easy to edit
const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Blog Images", href: "#" },
      { label: "Blog Posts", href: "/blog" },
      { label: "Pricing", href: "/services" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/contact" },
      { label: "Press", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy", internal: true },
      { label: "Terms of Service", href: "/terms", internal: true },
      { label: "Cookies", href: "#" },
      { label: "License", href: "#" },
    ],
  },
];

// Social links
const SOCIALS = [
  { icon: <GitHubIcon />, href: "https://github.com", label: "GitHub" },
  { icon: <TwitterIcon />, href: "https://twitter.com", label: "Twitter" },
  { icon: <LinkedInIcon />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <EmailIcon />, href: "mailto:hello@example.com", label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component='footer'
      sx={{
        mt: 6,
        py: 4,
        bgcolor: "grey.900",
        color: "grey.300",
      }}>
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          {/* Brand column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant='h6'
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "white",
                mb: 1,
              }}>
              REMIND MUI
            </Typography>
            <Typography variant='body2' sx={{ mb: 2, maxWidth: 320 }}>
              A React + MUI frontend powered by a Strapi backend. Built for
              learning, designed for real projects.
            </Typography>
            <Stack direction='row' spacing={1}>
              {SOCIALS.map((s) => (
                <IconButton
                  key={s.label}
                  href={s.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={s.label}
                  sx={{
                    color: "grey.400",
                    "&:hover": { color: "white" },
                  }}>
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <Grid size={{ xs: 6, sm: 3, md: 2 }} key={section.title}>
              <Typography
                variant='subtitle2'
                sx={{ color: "white", mb: 1, fontWeight: 600 }}>
                {section.title}
              </Typography>
              <Stack spacing={0.75}>
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    underline='hover'
                    sx={{
                      color: "grey.400",
                      fontSize: 14,
                      "&:hover": { color: "white" },
                    }}>
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3, borderColor: "grey.800" }} />

        {/* Bottom bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
          spacing={1}>
          <Typography variant='caption' sx={{ color: "grey.500" }}>
            © {year} Remind MUI. All rights reserved.
          </Typography>
          <Typography variant='caption' sx={{ color: "grey.500" }}>
            Built with React, MUI &amp; Strapi
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
