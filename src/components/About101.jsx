/** @format */
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import GroupsIcon from "@mui/icons-material/Groups";
import emailjs from "@emailjs/browser";

// ---- Team data (replace with your own) ----
const TEAM_MEMBERS = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    name: "Sarah Chen",
    role: "Lead Developer",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "Marcus Johnson",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
];

// ---- Company info ----
const COMPANY_INFO = [
  {
    icon: <LocationOnIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Location",
    text: "Kolkata, West Bengal, India",
  },
  {
    icon: <FlagIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Objective",
    text: "Build clean, accessible web experiences with modern React and MUI.",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Team",
    text: "A small, focused group of makers passionate about good design.",
  },
];

export default function About() {
  const formRef = React.useRef();
  const [status, setStatus] = React.useState({ type: "", message: "" });
  const [sending, setSending] = React.useState(false);

  // ---- EmailJS send handler ----
  const sendEmail = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", message: "" });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus({ type: "success", message: "Message sent successfully!" });
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({
        type: "error",
        message: "Failed to send. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Box>
      {/* ---------- Hero Section with background image ---------- */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 260, md: 360 },
          backgroundImage:
            "url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=600&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.55)",
          },
        }}>
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            color: "white",
            px: 2,
          }}>
          <Typography variant='h3' fontWeight={700} gutterBottom>
            About Us
          </Typography>
          <Typography variant='h6' sx={{ opacity: 0.9 }}>
            Get to know the team and the mission behind Remind MUI
          </Typography>
        </Box>
      </Box>

      {/* ---------- Company Info Cards ---------- */}
      <Container maxWidth='lg' sx={{ mt: 6 }}>
        <Grid container spacing={4} justifyContent='center'>
          {COMPANY_INFO.map((info, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Card
                variant='outlined'
                sx={{ textAlign: "center", p: 2, height: "100%" }}>
                <Box sx={{ mb: 1 }}>{info.icon}</Box>
                <Typography variant='h6' fontWeight={600}>
                  {info.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {info.text}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ---------- Team Section ---------- */}
      <Container maxWidth='lg' sx={{ mt: 8, mb: 6 }}>
        <Typography
          variant='h4'
          fontWeight={700}
          textAlign='center'
          gutterBottom>
          Meet the Team
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          textAlign='center'
          sx={{ mb: 4 }}>
          The people behind the project.
        </Typography>

        <Grid container spacing={3} justifyContent='center'>
          {TEAM_MEMBERS.map((member) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.name}>
              {/* Uses the SAME Card style as BlogImageCard */}
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }}>
                      {member.name.charAt(0)}
                    </Avatar>
                  }
                  title={member.name}
                  subheader={member.role}
                />
                <CardMedia
                  component='img'
                  height='200'
                  image={member.image}
                  alt={member.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={member.role}
                    size='small'
                    color='primary'
                    variant='outlined'
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ---------- Contact Form ---------- */}
      <Container maxWidth='sm' sx={{ mb: 8 }}>
        <Divider sx={{ mb: 4 }} />
        <Typography
          variant='h4'
          fontWeight={700}
          textAlign='center'
          gutterBottom>
          Get in Touch
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          textAlign='center'
          sx={{ mb: 3 }}>
          Have a question? Send us a message and we&apos;ll reply to your email.
        </Typography>

        <Box component='form' ref={formRef} onSubmit={sendEmail}>
          <Stack spacing={2}>
            <TextField label='Your Name' name='user_name' required fullWidth />
            <TextField
              label='Your Email'
              name='user_email'
              type='email'
              required
              fullWidth
            />
            <TextField
              label='Message'
              name='message'
              multiline
              rows={4}
              required
              fullWidth
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              disabled={sending}
              startIcon={
                sending ?
                  <CircularProgress size={20} color='inherit' />
                : <SendIcon />
              }>
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </Stack>

          {status.message && (
            <Alert severity={status.type} sx={{ mt: 2 }}>
              {status.message}
            </Alert>
          )}
        </Box>
      </Container>
    </Box>
  );
}
