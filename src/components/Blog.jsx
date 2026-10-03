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
  Avatar,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllBlogPosts, deleteBlogPost } from "../api/strapi";
import BlogPostForm from "./BlogPostForm";
import { Skeleton } from "@mui/material";

function buildUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:1337${url}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function BlogSkeletonCard() {
  return (
    <Card sx={{ height: "100%" }}>
      <Skeleton variant='rectangular' height={200} />
      <CardContent>
        <Skeleton variant='text' width='40%' height={20} />
        <Skeleton variant='text' width='90%' height={32} />
        <Skeleton variant='text' width='100%' />
        <Skeleton variant='text' width='80%' />
        <Stack direction='row' spacing={1} sx={{ mt: 2, alignItems: "center" }}>
          <Skeleton variant='circular' width={32} height={32} />
          <Skeleton variant='text' width={100} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function Blog() {
  const { isAuthenticated } = useAuth();

  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [activeTag, setActiveTag] = React.useState("All");

  // Form dialog state
  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [deleting, setDeleting] = React.useState(false);

  // ---------- Fetch ----------
  const fetchPosts = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllBlogPosts();
      setPosts(res.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Blog fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ---------- Delete ----------
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteBlogPost(deleteTarget.documentId);
      setDeleteTarget(null);
      fetchPosts();
    } catch (err) {
      console.error("Delete failed:", err);
      alert(
        err.response?.data?.error?.message ||
          "Delete failed. Check console for details.",
      );
    } finally {
      setDeleting(false);
    }
  };

  // ---------- Filter ----------
  const allTags = React.useMemo(() => {
    const tags = new Set();
    posts.forEach((p) => {
      if (p.tags) {
        p.tags.split(",").forEach((t) => {
          const trimmed = t.trim();
          if (trimmed) tags.add(trimmed);
        });
      }
    });
    return ["All", ...Array.from(tags)];
  }, [posts]);

  const filtered = posts.filter((p) => {
    const matchesTag =
      activeTag === "All" ||
      (p.tags || "")
        .split(",")
        .map((t) => t.trim())
        .includes(activeTag);
    const matchesSearch =
      !search ||
      (p.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt || "").toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 260, md: 340 },
          backgroundImage:
            "url(https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&h=600&fit=crop)",
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
            Insights & Ideas
          </Typography>
          <Typography variant='h3' fontWeight={700} gutterBottom sx={{ mt: 1 }}>
            Blog
          </Typography>
          <Typography
            variant='h6'
            sx={{ opacity: 0.9, maxWidth: 640, mx: "auto" }}>
            Notes on web development, design, and building products clients
            love.
          </Typography>
        </Box>
      </Box>

      {/* Admin toolbar — only when logged in */}
      {isAuthenticated && (
        <Container maxWidth='lg' sx={{ mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              bgcolor: "primary.50",
              borderRadius: 2,
              border: "1px dashed",
              borderColor: "primary.main",
            }}>
            <Typography variant='body2' color='primary.main' fontWeight={600}>
              🔓 Admin mode — you can create, edit, and delete blog posts
            </Typography>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}>
              Create Blog Post
            </Button>
          </Box>
        </Container>
      )}

      {/* Filters */}
      <Container maxWidth='lg' sx={{ mt: 4 }}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack
              direction='row'
              spacing={1}
              sx={{ flexWrap: "wrap" }}
              useFlexGap>
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => setActiveTag(tag)}
                  color={activeTag === tag ? "primary" : "default"}
                  variant={activeTag === tag ? "filled" : "outlined"}
                  size='small'
                />
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size='small'
              placeholder='Search posts...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon fontSize='small' />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Grid */}
      <Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            {/* <CircularProgress /> */}
            <BlogSkeletonCard />
          </Box>
        )}

        {error && (
          <Alert severity='error' sx={{ maxWidth: 600, mx: "auto" }}>
            Failed to load posts: {error}
          </Alert>
        )}

        {!loading && !error && filtered.length === 0 && (
          <Alert severity='info' sx={{ maxWidth: 600, mx: "auto" }}>
            {search || activeTag !== "All" ?
              "No posts match your filter."
            : isAuthenticated ?
              "No blog posts yet. Click 'Create Blog Post' to write your first."
            : "No blog posts yet."}
          </Alert>
        )}

        {!loading && !error && filtered.length > 0 && (
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {filtered.map((post) => {
              const coverUrl = buildUrl(post.coverImage?.url);
              const tags = (post.tags || "")
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
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
                      position: "relative",
                    }}>
                    {/* Admin action bar on the card — only when logged in */}
                    {isAuthenticated && (
                      <Stack
                        direction='row'
                        spacing={0.5}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          zIndex: 2,
                          bgcolor: "rgba(255,255,255,0.95)",
                          borderRadius: 1,
                          p: 0.25,
                          boxShadow: 1,
                        }}>
                        <IconButton
                          size='small'
                          color='primary'
                          onClick={() => {
                            setEditing(post);
                            setFormOpen(true);
                          }}
                          aria-label='Edit post'>
                          <EditIcon fontSize='small' />
                        </IconButton>
                        <IconButton
                          size='small'
                          color='error'
                          onClick={() => setDeleteTarget(post)}
                          aria-label='Delete post'>
                          <DeleteIcon fontSize='small' />
                        </IconButton>
                      </Stack>
                    )}

                    {coverUrl ?
                      <CardMedia
                        component='img'
                        height='200'
                        image={coverUrl}
                        alt={post.title}
                        sx={{ objectFit: "cover" }}
                      />
                    : <Box sx={{ height: 200, bgcolor: "grey.200" }} />}

                    <CardContent sx={{ flexGrow: 1 }}>
                      {tags.length > 0 && (
                        <Stack
                          direction='row'
                          spacing={0.5}
                          sx={{ mb: 1, flexWrap: "wrap" }}
                          useFlexGap>
                          {tags.slice(0, 2).map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size='small'
                              variant='outlined'
                            />
                          ))}
                        </Stack>
                      )}

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
                        {post.title}
                      </Typography>

                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                        {post.excerpt}
                      </Typography>

                      <Stack
                        direction='row'
                        spacing={1}
                        sx={{ alignItems: "center", mt: 2 }}>
                        <Avatar
                          src={buildUrl(post.authorPhoto?.url)}
                          alt={post.author}
                          sx={{ width: 32, height: 32 }}>
                          {post.author?.charAt(0)}
                        </Avatar>
                        <Typography variant='caption' color='text.secondary'>
                          {post.author || "Remind Studio"}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          • {formatDate(post.publishedDate || post.publishedAt)}
                        </Typography>
                        {post.readTime && (
                          <Typography variant='caption' color='text.secondary'>
                            • {post.readTime} min read
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>

                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Button
                        size='small'
                        endIcon={<ArrowForwardIcon />}
                        component={RouterLink}
                        to={`/blog/${post.slug}`}>
                        Read article
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>

      {/* Create / Edit dialog */}
      <BlogPostForm
        open={formOpen}
        initial={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={() => {
          setFormOpen(false);
          setEditing(null);
          fetchPosts();
        }}
      />

      {/* Delete confirmation */}
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete this post?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{deleteTarget?.title}"? This cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color='error'
            variant='contained'
            disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
