/** @format */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const CARD_IMAGE_HEIGHT = 200;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    { props: ({ expand }) => !expand, style: { transform: "rotate(0deg)" } },
    { props: ({ expand }) => !!expand, style: { transform: "rotate(180deg)" } },
  ],
}));

// Normalize media (array, single object, or wrapped in .data)
function normalizeMedia(media) {
  if (!media) return [];
  if (media.data) {
    const d = media.data;
    return Array.isArray(d) ? d.map(unwrap) : [unwrap(d)];
  }
  if (Array.isArray(media)) return media.map(unwrap);
  return [unwrap(media)];
}
function unwrap(m) {
  if (m?.attributes) return { ...m.attributes, id: m.id };
  return m;
}

// Build absolute URL, handling both relative and already-absolute URLs
function toFullUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:1337${url.startsWith("/") ? "" : "/"}${url}`;
}

export default function BlogImageCard({ post, onEdit, onDelete }) {
  const [expanded, setExpanded] = React.useState(false);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [imgError, setImgError] = React.useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  // ✅ EXACT KEYS from your API response
  const title = post.title || "Untitled";
  const description = post.description || "";
  const comment = post.comment || "";

  const images = React.useMemo(
    () => normalizeMedia(post.mediafile),
    [post.mediafile],
  );
  const downloads = React.useMemo(
    () => normalizeMedia(post.downloadFile),
    [post.downloadFile],
  );

  // Auto-slide images
  React.useEffect(() => {
    if (images.length <= 1) return;

    const t = setInterval(() => {
      setSlideIndex((i) => (i + 1) % images.length);
    }, 3000);

    return () => clearInterval(t);
  }, [images.length]); // ✅ only depends on length, not the whole array
  const current = images[slideIndex];
  const imageUrl = toFullUrl(current?.url);

  React.useEffect(() => {
    setImgError(false);
  }, [imageUrl]);

  const createdDate = new Date(
    post.publishedAt || post.createdAt || Date.now(),
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const authorName = post.createdBy || "Anonymous";

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='author'>
            {authorName.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <>
            <IconButton
              aria-label='settings'
              onClick={(e) => setMenuAnchor(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
            {/* ...Menu... */}
          </>
        }
        title={title}
        subheader={createdDate}
        slotProps={{
          title: {
            sx: {
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              wordBreak: "break-word",
              lineHeight: 1.3,
            },
          },
        }}
      />

      {/* Fixed-height image area */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: CARD_IMAGE_HEIGHT,
          flexShrink: 0,
          overflow: "hidden",
          bgcolor: "grey.100",
        }}>
        {imageUrl && !imgError ?
          <Box
            component='img'
            src={imageUrl}
            alt={title}
            onError={() => {
              console.warn("Image failed to load:", imageUrl);
              setImgError(true);
            }}
            sx={{
              position: "absolute",
              inset: 0,
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
            <Typography variant='caption' color='text.secondary'>
              {imgError ? "Image failed to load" : "No image"}
            </Typography>
          </Box>
        }

        {images.length > 1 && !imgError && (
          <>
            <IconButton
              size='small'
              onClick={() =>
                setSlideIndex((i) => (i - 1 + images.length) % images.length)
              }
              sx={{
                position: "absolute",
                top: "50%",
                left: 6,
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.85)",
                "&:hover": { bgcolor: "white" },
              }}>
              <ChevronLeftIcon fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              onClick={() => setSlideIndex((i) => (i + 1) % images.length)}
              sx={{
                position: "absolute",
                top: "50%",
                right: 6,
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.85)",
                "&:hover": { bgcolor: "white" },
              }}>
              <ChevronRightIcon fontSize='small' />
            </IconButton>
            <Chip
              label={`${slideIndex + 1} / ${images.length}`}
              size='small'
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
              }}
            />
          </>
        )}
      </Box>

      {/* Description */}
      <CardContent sx={{ flexGrow: 1, minHeight: 90 }}>
        <Typography variant='body2' sx={{ color: "text.secondary" }}>
          {description ?
            description.substring(0, 140) +
            (description.length > 140 ? "..." : "")
          : "No description"}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label='share'
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title, url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
            }
          }}>
          <ShareIcon />
        </IconButton>
        {downloads.length > 0 && (
          <IconButton
            aria-label='download'
            component='a'
            href={toFullUrl(downloads[0]?.url) || "#"}
            target='_blank'
            rel='noopener noreferrer'
            download>
            <DownloadIcon />
          </IconButton>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      {/* Expandable content */}
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography variant='subtitle2' sx={{ mb: 1 }}>
            Comment:
          </Typography>
          <Typography variant='body2' sx={{ mb: 2 }}>
            {comment || "No comment"}
          </Typography>

          {downloads.length > 0 && (
            <>
              <Typography variant='subtitle2' sx={{ mb: 1 }}>
                Attachments:
              </Typography>
              {downloads.map((d, i) => (
                <Box key={i} sx={{ mb: 0.5 }}>
                  <a
                    href={toFullUrl(d.url)}
                    target='_blank'
                    rel='noopener noreferrer'
                    download
                    style={{
                      color: blue[700],
                      textDecoration: "none",
                      fontSize: 14,
                    }}>
                    📎 {d.name || d.url.split("/").pop()}
                  </a>
                </Box>
              ))}
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
