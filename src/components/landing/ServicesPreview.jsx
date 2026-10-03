/** @format */
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function ServicesPreview({ services = [] }) {
  if (!services.length) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth='lg'>
        <Typography
          variant='overline'
          textAlign='center'
          display='block'
          sx={{ color: "primary.main", letterSpacing: ".15rem" }}>
          What We Do
        </Typography>
        <Typography
          variant='h3'
          fontWeight={700}
          textAlign='center'
          sx={{ mb: 1 }}>
          Services that deliver
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          textAlign='center'
          sx={{ mb: 5, maxWidth: 600, mx: "auto" }}>
          From concept to launch — we cover the full product lifecycle.
        </Typography>

        {/* ✅ No justifyContent/alignItems as Grid props */}
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {services.map((service) => {
            const imgUrl =
              service.icon?.url ?
                `http://localhost:1337${service.icon.url}`
              : null;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}>
                  {imgUrl && (
                    <CardMedia
                      component='img'
                      height='160'
                      image={imgUrl}
                      alt={service.title}
                      sx={{ objectFit: "cover" }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant='h6' fontWeight={600} gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {service.shortDescription}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      href={`/services/${service.slug}`}
                      size='small'>
                      Learn more
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
