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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../context/AuthContext";

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

export default function BlogPostCard({ post, onEdit, onDelete }) {
  const [expanded, setExpanded] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const { isAuthenticated } = useAuth();

  const handleExpandClick = () => setExpanded(!expanded);
  const handleCloseMenu = () => setMenuAnchor(null);

  // Exact keys from your blog-posts API
  const title = post.title || "Untitled";
  const description = post.description || "";
  const comment = post.comment || "";

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
      }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='author'>
            {authorName.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          // ✅ Only render the ⋯ menu button when authenticated
          isAuthenticated ?
            <>
              <IconButton
                aria-label='settings'
                onClick={(e) => setMenuAnchor(e.currentTarget)}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleCloseMenu} // ✅ real handler, no "..."
              >
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    onEdit?.(post);
                  }}>
                  <EditIcon fontSize='small' sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    onDelete?.(post);
                  }}>
                  <DeleteIcon fontSize='small' sx={{ mr: 1 }} color='error' />{" "}
                  Delete
                </MenuItem>
              </Menu>
            </>
          : null
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

      <CardContent sx={{ flexGrow: 1, minHeight: 90 }}>
        <Typography variant='body2' sx={{ color: "text.secondary" }}>
          {description ?
            description.substring(0, 140) +
            (description.length > 140 ? "..." : "")
          : "No description"}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography variant='subtitle2' sx={{ mb: 1 }}>
            Comment:
          </Typography>
          <Typography variant='body2'>{comment || "No comment"}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
