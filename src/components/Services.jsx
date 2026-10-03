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
  CardActions,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeIcon from "@mui/icons-material/Code";
import { Link as RouterLink } from "react-router-dom";
import { getAllServices } from "../api/strapi";

function buildUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:1337${url}`;
}

export default function Services() {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getAllServices();
        if (!cancelled) {
          setServices(res.data.data || []);
          setError(null);
        }
      } catch (err) {
        console.error("Services fetch error:", err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 260, md: 340 },
          backgroundImage:
            "url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=600&fit=crop)",
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
            Our Services
          </Typography>
          <Typography variant='h6' sx={{ opacity: 0.9 }}>
            Web development services tailored to your goals
          </Typography>
        </Box>
      </Box>

      <Container maxWidth='lg' sx={{ mt: 6, mb: 6 }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity='error' sx={{ maxWidth: 600, mx: "auto" }}>
            Failed to load services: {error}
          </Alert>
        )}

        {!loading && !error && services.length === 0 && (
          <Alert severity='info' sx={{ maxWidth: 600, mx: "auto" }}>
            No services yet. Add one in Strapi to see it here.
          </Alert>
        )}

        {!loading && !error && services.length > 0 && (
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {services.map((service) => {
              const imgUrl = buildUrl(service.image?.url);

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                    }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: blue[600] }}>
                          <CodeIcon />
                        </Avatar>
                      }
                      title={service.title}
                      subheader={
                        service.basicPrice != null ?
                          `From $${service.basicPrice}`
                        : undefined
                      }
                      slotProps={{
                        title: {
                          sx: {
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            wordBreak: "break-word",
                            lineHeight: 1.3,
                            fontWeight: 600,
                          },
                        },
                      }}
                    />

                    {imgUrl ?
                      <CardMedia
                        component='img'
                        height='180'
                        image={imgUrl}
                        alt={service.title}
                        sx={{ objectFit: "cover" }}
                      />
                    : <Box sx={{ height: 180, bgcolor: "grey.100" }} />}

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant='body2' color='text.secondary'>
                        {service.shortDescription}
                      </Typography>
                    </CardContent>

                    <CardActions
                      sx={{
                        justifyContent: "space-between",
                        px: 2,
                        pb: 2,
                      }}>
                      {service.basicPrice != null && (
                        <Chip
                          label={`$${service.basicPrice}+`}
                          size='small'
                          color='primary'
                          variant='outlined'
                        />
                      )}
                      <Button
                        size='small'
                        endIcon={<ArrowForwardIcon />}
                        component={RouterLink}
                        to={`/services/${service.slug}`}>
                        Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
