/** @format */
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";

export default function TestimonialsSection({ testimonials = [] }) {
  if (!testimonials.length) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth='lg'>
        <Typography
          variant='overline'
          textAlign='center'
          display='block'
          sx={{ color: "primary.main", letterSpacing: ".15rem" }}>
          Testimonials
        </Typography>
        <Typography
          variant='h3'
          fontWeight={700}
          textAlign='center'
          sx={{ mb: 1 }}>
          What clients say
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          textAlign='center'
          sx={{ mb: 5, maxWidth: 600, mx: "auto" }}>
          Trusted by founders and product teams around the world.
        </Typography>

        <Grid container spacing={3}>
          {testimonials.slice(0, 3).map((t) => {
            const photoUrl =
              t.authorPhoto?.url ?
                `http://localhost:1337${t.authorPhoto.url}`
              : null;

            return (
              <Grid size={{ xs: 12, md: 4 }} key={t.id}>
                <Card sx={{ height: "100%", p: 1 }}>
                  <CardContent>
                    <Rating value={t.rating || 5} readOnly size='small' />
                    {t.resultMetric && (
                      <Chip
                        label={t.resultMetric}
                        size='small'
                        color='success'
                        variant='outlined'
                        sx={{ ml: 1, fontWeight: 600 }}
                      />
                    )}
                    <Typography
                      variant='body1'
                      sx={{ my: 2, fontStyle: "italic", lineHeight: 1.7 }}>
                      "{t.quote}"
                    </Typography>
                    <Stack
                      direction='row'
                      spacing={1.5}
                      sx={{ alignItems: "center", mt: 3 }}>
                      <Avatar src={photoUrl} alt={t.authorName}>
                        {t.authorName?.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant='subtitle2' fontWeight={600}>
                          {t.authorName}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {t.authorRole}
                          {t.authorCompany ? `, ${t.authorCompany}` : ""}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Link to full testimonials page */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            component={RouterLink}
            to='/testimonials'
            endIcon={<ArrowForwardIcon />}
            size='large'>
            Read all testimonials
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
