/** @format */
import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Chip,
  LinearProgress,
  FormControlLabel,
  Switch,
  InputAdornment,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { createBlogPost, updateBlogPost } from "../api/strapi";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const STRAPI_URL = "http://localhost:1337";

// Auto-generate a URL-safe slug from a title
function slugify(str) {
  return (str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export default function BlogPostForm({ open, initial, onClose, onSubmit }) {
  const isEdit = Boolean(initial?.documentId);

  const [form, setForm] = React.useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Remind Studio",
    readTime: 5,
    tags: "",
    featured: false,
    metaTitle: "",
    metaDescription: "",
  });

  const [coverFile, setCoverFile] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  // Load initial values when editing
  React.useEffect(() => {
    if (!open) return;
    if (initial) {
      setForm({
        title: initial.title || "",
        slug: initial.slug || "",
        excerpt: initial.excerpt || "",
        content: initial.content || "",
        author: initial.author || "Remind Studio",
        readTime: initial.readTime || 5,
        tags: initial.tags || "",
        featured: initial.featured || false,
        metaTitle: initial.metaTitle || "",
        metaDescription: initial.metaDescription || "",
      });
    } else {
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "Remind Studio",
        readTime: 5,
        tags: "",
        featured: false,
        metaTitle: "",
        metaDescription: "",
      });
    }
    setCoverFile(null);
    setError("");
  }, [open, initial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = { ...form, [name]: type === "checkbox" ? checked : value };

    // Auto-fill slug when title changes (create mode only)
    if (name === "title" && !isEdit) {
      next.slug = slugify(value);
    }
    setForm(next);
  };

  // ---------- Upload cover image ----------
  async function uploadCover(file) {
    const fd = new FormData();
    fd.append("files", file);
    const res = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      body: fd,
      headers: {
        // Send token so upload works when auth is required
        Authorization: `Bearer ${localStorage.getItem("strapi_token") || ""}`,
      },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Upload failed: ${res.status} — ${body}`);
    }
    const uploaded = await res.json();
    return uploaded[0]?.id;
  }

  // ---------- Submit ----------
  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || slugify(form.title),
        excerpt: form.excerpt,
        content: form.content,
        author: form.author,
        readTime: Number(form.readTime) || 0,
        tags: form.tags,
        featured: Boolean(form.featured),
        metaTitle: form.metaTitle || form.title,
        metaDescription: form.metaDescription || form.excerpt,
      };

      // Upload new cover if a file was chosen
      if (coverFile) {
        const coverId = await uploadCover(coverFile);
        if (coverId) payload.coverImage = coverId;
      }

      if (isEdit) {
        await updateBlogPost(initial.documentId, payload);
      } else {
        await createBlogPost(payload);
      }

      onSubmit?.();
    } catch (err) {
      console.error("Save failed:", err);
      const msg =
        err.response?.data?.error?.message || err.message || "Save failed";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>
        {isEdit ? "Edit Blog Post" : "Create Blog Post"}
      </DialogTitle>
      <DialogContent>
        {saving && <LinearProgress sx={{ mb: 2 }} />}
        {error && (
          <Box sx={{ mb: 2 }}>
            <Typography color='error' variant='body2'>
              {error}
            </Typography>
          </Box>
        )}

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              label='Title'
              name='title'
              value={form.title}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 255 }}
              helperText={`${form.title.length} / 255`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Slug'
              name='slug'
              value={form.slug}
              onChange={handleChange}
              fullWidth
              helperText='URL-friendly identifier'
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label='Excerpt'
              name='excerpt'
              value={form.excerpt}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
              helperText='Short summary shown on cards and in Google search'
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label='Content (HTML or Markdown)'
              name='content'
              value={form.content}
              onChange={handleChange}
              fullWidth
              multiline
              rows={12}
              helperText='Use HTML tags like <h2>, <p>, <ul> for structure'
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Author'
              name='author'
              value={form.author}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Read Time (minutes)'
              name='readTime'
              type='number'
              value={form.readTime}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Tags'
              name='tags'
              value={form.tags}
              onChange={handleChange}
              fullWidth
              helperText='Comma-separated: React, Strapi, Performance'
            />
          </Grid>

          {/* Cover image upload */}
          <Grid size={12}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              Cover Image
            </Typography>
            <Button
              component='label'
              variant='outlined'
              startIcon={<CloudUploadIcon />}>
              {coverFile ? "Change Image" : "Choose Image"}
              <VisuallyHiddenInput
                type='file'
                accept='image/*'
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
              />
            </Button>
            {coverFile && (
              <Chip
                label={coverFile.name}
                onDelete={() => setCoverFile(null)}
                sx={{ ml: 2 }}
                color='primary'
              />
            )}
            {!coverFile && initial?.coverImage?.url && (
              <Chip
                label={`${initial.coverImage.name || "Existing cover"} (saved)`}
                sx={{ ml: 2 }}
                color='success'
              />
            )}
          </Grid>

          {/* Featured toggle */}
          <Grid size={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.featured}
                  onChange={handleChange}
                  name='featured'
                />
              }
              label='Featured (show on home page)'
            />
          </Grid>

          {/* SEO fields */}
          <Grid size={12}>
            <Typography variant='subtitle2' sx={{ mt: 2, mb: 1 }}>
              SEO (optional)
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Meta Title'
              name='metaTitle'
              value={form.metaTitle}
              onChange={handleChange}
              fullWidth
              helperText='Defaults to the post title'
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Meta Description'
              name='metaDescription'
              value={form.metaDescription}
              onChange={handleChange}
              fullWidth
              helperText='Defaults to the excerpt'
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button variant='contained' onClick={handleSubmit} disabled={saving}>
          {saving ?
            "Saving..."
          : isEdit ?
            "Update"
          : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
