/** @format */
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function FeaturedWork({ caseStudies = [] }) {
  if (!caseStudies.length) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "grey.50" }}>
      <Container maxWidth='lg'>
        <Typography
          variant='overline'
          textAlign='center'
          display='block'
          sx={{ color: "primary.main", letterSpacing: ".15rem" }}>
          Featured Work
        </Typography>
        <Typography
          variant='h3'
          fontWeight={700}
          textAlign='center'
          sx={{ mb: 5 }}>
          Recent projects
        </Typography>

        <Grid container spacing={3}>
          {caseStudies.map((cs) => {
            const imgUrl =
              cs.coverImage?.url ?
                `http://localhost:1337${cs.coverImage.url}`
              : null;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cs.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  {imgUrl ?
                    <CardMedia
                      component='img'
                      height='200'
                      image={imgUrl}
                      alt={cs.title}
                      sx={{ objectFit: "cover" }}
                    />
                  : <Box sx={{ height: 200, bgcolor: "grey.200" }} />}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Chip label={cs.client} size='small' sx={{ mb: 1 }} />
                    <Typography variant='h6' fontWeight={600} gutterBottom>
                      {cs.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {cs.shortSummary}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size='small'
                      endIcon={<ArrowForwardIcon />}
                      href={`/portfolio/${cs.slug}`}>
                      View case study
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
