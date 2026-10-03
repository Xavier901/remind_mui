/** @format */
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getAboutPage } from "../api/strapi";
import emailjs from "@emailjs/browser";
console.log("EmailJS Config:", {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
});

export default function Contact() {
  const formRef = React.useRef();
  const [about, setAbout] = React.useState(null);
  const [status, setStatus] = React.useState({ type: "", message: "" });
  const [sending, setSending] = React.useState(false);

  // Fetch contact info from About Page (email, phone, address)
  React.useEffect(() => {
    getAboutPage()
      .then((res) => setAbout(res.data.data || null))
      .catch((err) =>
        console.warn("Could not load contact info:", err.message),
      );
  }, []);

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
      setStatus({
        type: "success",
        message: "Message sent! We'll reply within 24 hours.",
      });
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({
        type: "error",
        message: "Something went wrong. Please email us directly.",
      });
    } finally {
      setSending(false);
    }
  };

  const contactEmail = about?.email || "bapimahalik51@hotmail.com";
  const contactPhone = about?.phone || "+91 98300 00000";
  const contactAddress =
    about?.address || "Salt Lake Sector V, Kolkata, West Bengal 700091, India";

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          py: { xs: 6, md: 8 },
        }}>
        <Container maxWidth='md' sx={{ textAlign: "center" }}>
          <Typography
            variant='overline'
            sx={{ letterSpacing: ".2rem", opacity: 0.7 }}>
            Get in Touch
          </Typography>
          <Typography
            variant='h3'
            fontWeight={700}
            sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, mt: 1, mb: 2 }}>
            Let's talk about your project.
          </Typography>
          <Typography variant='h6' sx={{ opacity: 0.85, fontWeight: 400 }}>
            Tell us what you're building. We reply to every message within 24
            hours.
          </Typography>
        </Container>
      </Box>

      {/* Form + Info */}
      <Container maxWidth='lg' sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={5}>
          {/* Left: Contact info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant='h5' fontWeight={700} gutterBottom>
              Reach us directly
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 4 }}>
              Prefer email or a call? Here's how to get in touch without the
              form.
            </Typography>

            <Stack spacing={3}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <EmailIcon color='primary' />
                <Box>
                  <Typography variant='subtitle2' fontWeight={600}>
                    Email
                  </Typography>
                  <Typography
                    variant='body2'
                    component='a'
                    href={`mailto:${contactEmail}`}
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}>
                    {contactEmail}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <PhoneIcon color='primary' />
                <Box>
                  <Typography variant='subtitle2' fontWeight={600}>
                    Phone
                  </Typography>
                  <Typography
                    variant='body2'
                    component='a'
                    href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}>
                    {contactPhone}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <LocationOnIcon color='primary' />
                <Box>
                  <Typography variant='subtitle2' fontWeight={600}>
                    Office
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ whiteSpace: "pre-line" }}>
                    {contactAddress}
                  </Typography>
                </Box>
              </Box>
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Typography variant='body2' color='text.secondary'>
              <strong>Response time:</strong> Within 24 hours on business days.
              <br />
              <strong>Not sure it's a fit?</strong> We'll tell you honestly —
              even if the answer is no.
            </Typography>
          </Grid>

          {/* Right: Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card elevation={3} sx={{ p: 1 }}>
              <CardContent>
                <Typography variant='h6' fontWeight={700} gutterBottom>
                  Send us a message
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mb: 3 }}>
                  Fields marked * are required.
                </Typography>

                <Box
                  component='form'
                  ref={formRef}
                  onSubmit={sendEmail}
                  noValidate>
                  <Stack spacing={2.5}>
                    <TextField
                      label='Your Name *'
                      name='user_name'
                      required
                      fullWidth
                    />
                    <TextField
                      label='Your Email *'
                      name='user_email'
                      type='email'
                      required
                      fullWidth
                    />
                    <TextField label='Company' name='user_company' fullWidth />
                    <TextField
                      label='Project Budget'
                      name='user_budget'
                      placeholder='e.g., $5,000 – $10,000'
                      fullWidth
                    />
                    <TextField
                      label='Tell us about your project *'
                      name='message'
                      multiline
                      rows={5}
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
                      }
                      sx={{ py: 1.5, fontWeight: 600 }}>
                      {sending ? "Sending..." : "Send Message"}
                    </Button>
                  </Stack>

                  {status.message && (
                    <Alert severity={status.type} sx={{ mt: 3 }}>
                      {status.message}
                    </Alert>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
