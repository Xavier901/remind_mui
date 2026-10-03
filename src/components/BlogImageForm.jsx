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
  Typography,
  ImageList,
  ImageListItem,
  Chip,
  LinearProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

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

export default function BlogImageForm({ open, initial, onClose, onSubmit }) {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    comment: "",
  });
  const [imageFiles, setImageFiles] = React.useState([]);
  const [downloadFile, setDownloadFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);

  // Existing images (edit mode) — read from lowercase key `mediafile`
  const existingImages = React.useMemo(() => {
    const m = initial?.mediafile;
    if (!m) return [];
    return Array.isArray(m) ? m : [m];
  }, [initial]);

  // Existing download files (edit mode) — read from camelCase `downloadFile`
  const existingDownloads = React.useMemo(() => {
    const m = initial?.downloadFile;
    if (!m) return [];
    return Array.isArray(m) ? m : [m];
  }, [initial]);

  // Reset form when dialog opens
  React.useEffect(() => {
    if (open) {
      setForm({
        title: initial?.title || "",
        description: initial?.description || "",
        comment: initial?.comment || "",
      });
      setImageFiles([]);
      setDownloadFile(null);
      setUploading(false);
    }
  }, [open, initial]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function uploadFiles(files) {
    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));
    const res = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Upload failed: ${res.status} — ${body}`);
    }
    return res.json();
  }

  const handleSubmit = async () => {
    try {
      setUploading(true);

      // 1. Upload new images
      let newImageIds = [];
      if (imageFiles.length > 0) {
        const uploaded = await uploadFiles(imageFiles);
        newImageIds = uploaded.map((f) => f.id);
      }

      // 2. Upload download file
      let newDownloadIds = [];
      if (downloadFile) {
        const uploaded = await uploadFiles([downloadFile]);
        newDownloadIds = uploaded.map((f) => f.id);
      }

      // 3. Build payload with EXACT Strapi keys
      const payload = {
        title: form.title,
        description: form.description,
        comment: form.comment,
      };

      // mediafile — always an array
      if (newImageIds.length > 0) {
        payload.mediafile = newImageIds;
      } else if (existingImages.length > 0) {
        payload.mediafile = existingImages.map((i) => i.id);
      }

      // downloadFile — always an array too
      if (newDownloadIds.length > 0) {
        payload.downloadFile = newDownloadIds;
      } else if (existingDownloads.length > 0) {
        payload.downloadFile = existingDownloads.map((i) => i.id);
      }

      console.log("=== PAYLOAD BEING SENT ===");
      console.log(JSON.stringify(payload, null, 2));

      onSubmit(payload, initial?.documentId);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>
        {initial ? "Edit Blog Image" : "Create Blog Image"}
      </DialogTitle>
      <DialogContent>
        {uploading && <LinearProgress sx={{ mb: 2 }} />}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label='Title'
            name='title'
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ maxLength: 255 }}
            error={form.title.length >= 255}
            helperText={
              <span
                style={{ color: form.title.length >= 255 ? "red" : "inherit" }}>
                {form.title.length} / 255
              </span>
            }
            onPaste={(e) => {
              const pasted = e.clipboardData.getData("text");
              const remaining = 255 - form.title.length;
              if (pasted.length > remaining) {
                e.preventDefault();
                setForm((prev) => ({
                  ...prev,
                  title: (prev.title + pasted).slice(0, 255),
                }));
              }
            }}
          />
          <TextField
            label='Description'
            name='description'
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label='Comment'
            name='comment'
            value={form.comment}
            onChange={handleChange}
            multiline
            rows={2}
            fullWidth
          />

          {/* Image upload */}
          <Box>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              Images (multiple allowed)
            </Typography>
            <Button
              component='label'
              variant='outlined'
              startIcon={<CloudUploadIcon />}>
              Choose Images
              <VisuallyHiddenInput
                type='file'
                accept='image/*'
                multiple
                onChange={(e) =>
                  setImageFiles(Array.from(e.target.files || []))
                }
              />
            </Button>

            {(existingImages.length > 0 || imageFiles.length > 0) && (
              <ImageList sx={{ mt: 1 }} cols={4} rowHeight={100}>
                {existingImages.map((img, i) => (
                  <ImageListItem key={`ex-${i}`}>
                    <img
                      src={`${STRAPI_URL}${img.url}`}
                      alt={img.name}
                      loading='lazy'
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                    <Chip
                      label='saved'
                      size='small'
                      color='success'
                      sx={{ position: "absolute", top: 4, left: 4 }}
                    />
                  </ImageListItem>
                ))}
                {imageFiles.map((f, i) => (
                  <ImageListItem key={`new-${i}`}>
                    <img
                      src={URL.createObjectURL(f)}
                      alt={f.name}
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                    <Chip
                      label='new'
                      size='small'
                      color='primary'
                      sx={{ position: "absolute", top: 4, left: 4 }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Box>

          {/* Download file upload */}
          <Box>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              Download File (single)
            </Typography>
            <Button
              component='label'
              variant='outlined'
              startIcon={<CloudUploadIcon />}>
              Choose File
              <VisuallyHiddenInput
                type='file'
                onChange={(e) => setDownloadFile(e.target.files?.[0] || null)}
              />
            </Button>
            {downloadFile && (
              <Chip
                label={downloadFile.name}
                onDelete={() => setDownloadFile(null)}
                sx={{ ml: 2 }}
                color='primary'
              />
            )}
            {!downloadFile && existingDownloads.length > 0 && (
              <Chip
                label={`${existingDownloads[0].name} (saved)`}
                sx={{ ml: 2 }}
                color='success'
              />
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>
          Cancel
        </Button>
        <Button variant='contained' onClick={handleSubmit} disabled={uploading}>
          {uploading ?
            "Uploading..."
          : initial ?
            "Update"
          : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
