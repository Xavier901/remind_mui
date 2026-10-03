/** @format */
import * as React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Stack,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Prose from "./Prose";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getBlogPostBySlug, getAllBlogPosts } from "../api/strapi";

function buildUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:1337${url}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostDetail() {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);
  const [related, setRelated] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Fetch post by slug
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getBlogPostBySlug(slug);
        const items = res.data.data || [];
        if (!cancelled) {
          setPost(items[0] || null);
          setError(items.length === 0 ? "Post not found" : null);
        }
      } catch (err) {
        console.error("Post fetch error:", err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Fetch related posts
  React.useEffect(() => {
    if (!post) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await getAllBlogPosts();
        if (!cancelled) {
          const others = (res.data.data || [])
            .filter((p) => p.slug !== post.slug)
            .slice(0, 3);
          setRelated(others);
        }
      } catch (err) {
        console.error("Related fetch error:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [post]);

  // Update document.title for SEO
  React.useEffect(() => {
    if (post) {
      document.title = post.metaTitle || post.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && (post.metaDescription || post.excerpt)) {
        metaDesc.setAttribute("content", post.metaDescription || post.excerpt);
      }
    }
  }, [post]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Container maxWidth='md' sx={{ py: 8, textAlign: "center" }}>
        <Typography variant='h5' gutterBottom>
          {error || "Post not found"}
        </Typography>
        <Button component={RouterLink} to='/blog' startIcon={<ArrowBackIcon />}>
          Back to Blog
        </Button>
      </Container>
    );
  }

  const coverUrl = buildUrl(post.coverImage?.url);
  const authorPhotoUrl = buildUrl(post.authorPhoto?.url);
  const tags = (post.tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <Box>
      {/* ---------- Article Header ---------- */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          pt: { xs: 6, md: 10 },
          pb: { xs: 6, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}>
        <Container maxWidth='md' sx={{ position: "relative" }}>
          <Button
            component={RouterLink}
            to='/blog'
            startIcon={<ArrowBackIcon />}
            sx={{
              mb: 3,
              color: "white",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}>
            Back to Blog
          </Button>

          {tags.length > 0 && (
            <Stack
              direction='row'
              spacing={1}
              sx={{ mb: 3, flexWrap: "wrap" }}
              useFlexGap>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size='small'
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    color: "white",
                    fontWeight: 500,
                  }}
                />
              ))}
            </Stack>
          )}

          <Typography
            variant='h1'
            fontWeight={800}
            sx={{
              fontSize: { xs: "2rem", md: "3.2rem" },
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              mb: 3,
            }}>
            {post.title}
          </Typography>

          {post.excerpt && (
            <Typography
              variant='h6'
              sx={{
                opacity: 0.8,
                fontWeight: 400,
                mb: 5,
                lineHeight: 1.6,
                maxWidth: 720,
              }}>
              {post.excerpt}
            </Typography>
          )}

          {/* Author row */}
          <Stack direction='row' spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              src={authorPhotoUrl}
              alt={post.author}
              sx={{ width: 48, height: 48 }}>
              {post.author?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant='subtitle2' fontWeight={600}>
                {post.author || "Remind Studio"}
              </Typography>
              <Typography variant='caption' sx={{ opacity: 0.75 }}>
                {formatDate(post.publishedDate || post.publishedAt)}
                {post.readTime && ` • ${post.readTime} min read`}
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* ---------- Cover Image (overlapping) ---------- */}
      {coverUrl && (
        <Container
          maxWidth='md'
          sx={{
            mt: { xs: -4, md: -6 },
            mb: 6,
            position: "relative",
            zIndex: 1,
          }}>
          <Box
            component='img'
            src={coverUrl}
            alt={post.title}
            sx={{
              width: "100%",
              maxHeight: 520,
              objectFit: "cover",
              borderRadius: 3,
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              display: "block",
            }}
          />
          {post.coverImage?.caption && (
            <Typography
              variant='caption'
              sx={{
                display: "block",
                textAlign: "center",
                mt: 1.5,
                color: "text.secondary",
                fontStyle: "italic",
              }}>
              {post.coverImage.caption}
            </Typography>
          )}
        </Container>
      )}
      {/* ---------- Article Body ---------- */}
      <Container maxWidth='md' sx={{ mb: 8 }}>
        {/* Optional: Table of contents placeholder (future enhancement) */}

        <Prose>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content || ""}
          </ReactMarkdown>
        </Prose>

        <Divider sx={{ my: 5 }} />

        {/* Tags + CTA */}
        {tags.length > 0 && (
          <Stack
            direction='row'
            spacing={1}
            sx={{ flexWrap: "wrap", mb: 4 }}
            useFlexGap>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} variant='outlined' size='small' />
            ))}
          </Stack>
        )}

        {/* <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography variant='h6' fontWeight={600} gutterBottom>
            Have a project in mind?
          </Typography>
          <Button
            component={RouterLink}
            to='/contact'
            variant='contained'
            size='large'
            sx={{ mt: 1 }}>
            Start a Project
          </Button>
        </Box> */}
      </Container>

      {/* ---------- Related Posts ---------- */}
      {related.length > 0 && (
        <Container maxWidth='lg' sx={{ mb: 8 }}>
          <Divider sx={{ mb: 4 }} />
          <Typography variant='h5' fontWeight={700} gutterBottom sx={{ mb: 3 }}>
            Related Articles
          </Typography>
          <Grid container spacing={3}>
            {related.map((r) => {
              const rCover = buildUrl(r.coverImage?.url);
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={r.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}>
                    {rCover ?
                      <Box
                        component='img'
                        src={rCover}
                        alt={r.title}
                        sx={{
                          width: "100%",
                          height: 180,
                          objectFit: "cover",
                        }}
                      />
                    : <Box sx={{ height: 180, bgcolor: "grey.200" }} />}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant='subtitle1'
                        fontWeight={600}
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                        {r.title}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {formatDate(r.publishedDate || r.publishedAt)}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Button
                        size='small'
                        endIcon={<ArrowForwardIcon />}
                        component={RouterLink}
                        to={`/blog/${r.slug}`}>
                        Read
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}
    </Box>
  );
}
