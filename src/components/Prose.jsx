/** @format */
import { Box } from "@mui/material";

/**
 * Prose — wraps article HTML and applies readable typography.
 * Drop this around any dangerouslySetInnerHTML content.
 */
export default function Prose({ children, sx = {} }) {
  return (
    <Box
      sx={{
        // ---- Base text ----
        fontSize: { xs: "1.05rem", md: "1.15rem" },
        lineHeight: 1.85,
        color: "text.primary",
        letterSpacing: "0.005em",

        // ---- Paragraphs ----
        "& p": {
          mb: 3,
          mt: 0,
        },

        // ---- Headings ----
        "& h1, & h2, & h3, & h4": {
          fontWeight: 700,
          lineHeight: 1.3,
          color: "text.primary",
          scrollMarginTop: "100px", // for anchor links
        },
        "& h2": {
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          mt: 6,
          mb: 2,
          pb: 1,
          borderBottom: "2px solid",
          borderColor: "divider",
        },
        "& h3": {
          fontSize: { xs: "1.25rem", md: "1.4rem" },
          mt: 4,
          mb: 2,
        },
        "& h4": {
          fontSize: "1.15rem",
          mt: 3,
          mb: 1.5,
        },

        // ---- Lists ----
        "& ul, & ol": {
          pl: 3,
          mb: 3,
          mt: 0,
        },
        "& li": {
          mb: 1,
          lineHeight: 1.75,
        },
        "& li > p": {
          mb: 1,
        },

        // ---- Blockquotes ----
        "& blockquote": {
          borderLeft: "4px solid",
          borderColor: "primary.main",
          pl: 3,
          py: 1,
          my: 4,
          ml: 0,
          bgcolor: "grey.50",
          fontStyle: "italic",
          fontSize: "1.05rem",
          color: "text.secondary",
          borderRadius: "0 8px 8px 0",
          "& p": { mb: 0 },
        },

        // ---- Inline code ----
        "& code": {
          bgcolor: "grey.100",
          px: 0.75,
          py: 0.25,
          borderRadius: 1,
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
          fontSize: "0.9em",
          color: "primary.dark",
        },

        // ---- Code blocks ----
        "& pre": {
          bgcolor: "#0f172a",
          color: "#e2e8f0",
          p: 3,
          borderRadius: 2,
          overflowX: "auto",
          my: 4,
          fontSize: "0.9rem",
          lineHeight: 1.6,
          "& code": {
            bgcolor: "transparent",
            color: "inherit",
            p: 0,
            fontSize: "inherit",
          },
        },

        // ---- Links ----
        "& a": {
          color: "primary.main",
          textDecoration: "none",
          borderBottom: "1px solid",
          borderColor: "primary.main",
          transition: "opacity 0.2s",
          "&:hover": {
            opacity: 0.75,
          },
        },

        // ---- Images ----
        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: 2,
          my: 4,
          display: "block",
          mx: "auto",
          boxShadow: 2,
        },

        // ---- Horizontal rules ----
        "& hr": {
          border: "none",
          borderTop: "1px solid",
          borderColor: "divider",
          my: 5,
        },

        // ---- Tables ----
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          my: 4,
          fontSize: "0.95rem",
        },
        "& th, & td": {
          border: "1px solid",
          borderColor: "divider",
          p: 1.5,
          textAlign: "left",
        },
        "& th": {
          bgcolor: "grey.100",
          fontWeight: 600,
        },

        // ---- Strong / em ----
        "& strong": { fontWeight: 700 },
        "& em": { fontStyle: "italic" },

        // ---- First paragraph emphasis (drop cap style, optional) ----
        "& > p:first-of-type": {
          fontSize: "1.2rem",
          lineHeight: 1.7,
          color: "text.secondary",
        },

        ...sx,
      }}>
      {children}
    </Box>
  );
}
