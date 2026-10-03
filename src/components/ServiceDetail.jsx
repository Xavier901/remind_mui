/** @format */
import * as React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Chip,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { getServiceBySlug } from "../api/strapi";
import PayPalCheckout from "./PayPalCheckout";

function buildUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:1337${url}`;
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showPayment, setShowPayment] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getServiceBySlug(slug);
        const items = res.data.data || [];
        if (!cancelled) {
          setService(items[0] || null);
          setError(items.length === 0 ? "Service not found" : null);
        }
      } catch (err) {
        console.error("Service fetch error:", err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !service) {
    return (
      <Container maxWidth='md' sx={{ py: 8, textAlign: "center" }}>
        <Typography variant='h5' gutterBottom>
          {error || "Service not found"}
        </Typography>
        <Button
          component={RouterLink}
          to='/services'
          startIcon={<ArrowBackIcon />}>
          Back to Services
        </Button>
      </Container>
    );
  }

  const imageUrl = buildUrl(service.image?.url);

  // Split features text into lines, then into 3 groups
  const allFeatures =
    service.features ?
      service.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  const third = Math.ceil(allFeatures.length / 3);
  const tiers = [
    {
      name: "Basic",
      price: service.basicPrice,
      features: allFeatures.slice(0, third),
      highlighted: false,
    },
    {
      name: "Standard",
      price: service.standardPrice,
      features: allFeatures.slice(third, third * 2),
      highlighted: true,
    },
    {
      name: "Premium",
      price: service.premiumPrice,
      features: allFeatures.slice(third * 2),
      highlighted: false,
    },
  ];

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 280, md: 400 },
          backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
          backgroundColor: "grey.900",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              imageUrl ?
                "linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.85) 100%)"
              : "none",
          },
        }}>
        <Container
          maxWidth='lg'
          sx={{ position: "relative", pb: 4, color: "white" }}>
          <Button
            component={RouterLink}
            to='/services'
            startIcon={<ArrowBackIcon />}
            variant='outlined'
            sx={{
              mb: 2,
              color: "white",
              borderColor: "rgba(255,255,255,0.6)",
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}>
            Back to Services
          </Button>
          <Typography variant='h3' fontWeight={700} gutterBottom>
            {service.title}
          </Typography>
          {service.basicPrice != null && (
            <Chip
              label={`From $${service.basicPrice}`}
              color='primary'
              sx={{ fontWeight: 600 }}
            />
          )}
        </Container>
      </Box>

      {/* Description */}
      <Container maxWidth='md' sx={{ mt: 5, mb: 4 }}>
        <Typography variant='h5' fontWeight={600} gutterBottom>
          About this service
        </Typography>
        <Typography
          variant='body1'
          sx={{
            whiteSpace: "pre-line",
            color: "text.secondary",
            lineHeight: 1.8,
          }}>
          {service.details ||
            service.shortDescription ||
            "No description available."}
        </Typography>
      </Container>

      {/* Pricing */}
      {(service.basicPrice ||
        service.standardPrice ||
        service.premiumPrice) && (
        <Container maxWidth='lg' sx={{ mb: 8 }}>
          <Divider sx={{ mb: 4 }} />
          <Typography
            variant='h4'
            fontWeight={700}
            textAlign='center'
            gutterBottom>
            Pricing
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            textAlign='center'
            sx={{ mb: 4 }}>
            Transparent pricing — pick the tier that fits your scope.
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{ justifyContent: "center", alignItems: "stretch" }}>
            {tiers.map((tier) =>
              tier.price != null ?
                <Card
                  key={tier.name}
                  sx={{
                    flex: 1,
                    maxWidth: { xs: "100%", md: 340 },
                    mx: "auto",
                    display: "flex",
                    flexDirection: "column",
                    border: tier.highlighted ? "2px solid" : "1px solid",
                    borderColor: tier.highlighted ? "primary.main" : "divider",
                    position: "relative",
                    transform: {
                      md: tier.highlighted ? "scale(1.04)" : "none",
                    },
                  }}>
                  {tier.highlighted && (
                    <Chip
                      label='Most Popular'
                      color='primary'
                      size='small'
                      sx={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontWeight: 600,
                      }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant='h6'
                      fontWeight={700}
                      textAlign='center'
                      gutterBottom>
                      {tier.name}
                    </Typography>
                    <Typography
                      variant='h4'
                      fontWeight={800}
                      textAlign='center'
                      color={tier.highlighted ? "primary.main" : "text.primary"}
                      gutterBottom>
                      ${tier.price}
                    </Typography>
                    <Typography
                      variant='caption'
                      textAlign='center'
                      display='block'
                      color='text.secondary'
                      sx={{ mb: 2 }}>
                      Starting price • USD
                    </Typography>
                    {tier.features.length > 0 && (
                      <>
                        <Divider sx={{ mb: 2 }} />
                        <Stack spacing={1}>
                          {tier.features.map((f) => (
                            <Stack
                              key={f}
                              direction='row'
                              spacing={1}
                              sx={{ alignItems: "flex-start" }}>
                              <CheckCircleOutlineIcon
                                fontSize='small'
                                color={tier.highlighted ? "primary" : "action"}
                                sx={{ mt: "2px" }}
                              />
                              <Typography variant='body2'>{f}</Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </>
                    )}
                  </CardContent>
                  <CardActions sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant={tier.highlighted ? "contained" : "outlined"}
                      onClick={() => setShowPayment(tier.price)}>
                      Proceed to Pay ${tier.price}
                    </Button>
                  </CardActions>
                </Card>
              : null,
            )}
          </Stack>
        </Container>
      )}

      {showPayment && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "white",
            p: 3,
            boxShadow: 6,
            zIndex: 1300,
            borderTop: "2px solid",
            borderColor: "primary.main",
          }}>
          <PayPalCheckout
            amount={showPayment}
            onSuccess={(details) => {
              alert("Payment successful! Transaction ID: " + details.id);
              setShowPayment(false);
            }}
          />
          <Button
            onClick={() => setShowPayment(false)}
            sx={{ mt: 1 }}
            size='small'>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
}
