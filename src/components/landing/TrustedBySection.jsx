/** @format */
import * as React from "react";
import { Box, Container, Typography, Stack } from "@mui/material";

export default function TrustedBySection({ logos = [] }) {
  if (!logos.length) return null;

  return (
    <Box
      sx={{
        py: 4,
        bgcolor: "grey.50",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}>
      <Container maxWidth='lg'>
        <Typography
          variant='overline'
          textAlign='center'
          display='block'
          sx={{ color: "text.secondary", letterSpacing: ".15rem", mb: 2 }}>
          Trusted by teams at
        </Typography>
        <Stack
          direction='row'
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
          useFlexGap>
          {logos.map((logo) => (
            <Box
              key={logo.id}
              component='img'
              src={`http://localhost:1337${logo.logo?.url}`}
              alt={logo.name}
              sx={{
                height: 40,
                opacity: 0.6,
                filter: "grayscale(100%)",
                transition: "all 0.3s",
                "&:hover": { opacity: 1, filter: "grayscale(0%)" },
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
