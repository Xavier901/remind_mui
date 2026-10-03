/** @format */
import * as React from "react";
import { Box, CircularProgress, Alert } from "@mui/material";

import HeroSection from "./landing/HeroSection";
import TrustedBySection from "./landing/TrustedBySection";
import ServicesPreview from "./landing/ServicesPreview";
import WhyUsSection from "./landing/WhyUsSection";
import ProcessSection from "./landing/ProcessSection";
import FeaturedWork from "./landing/FeaturedWork";
import TestimonialsSection from "./landing/TestimonialsSection";
import CTASection from "./landing/CTASection";

import {
  getSiteSettings,
  getFeaturedServices,
  getFeaturedTestimonials,
  getFeaturedCaseStudies,
  getClientLogos,
} from "../api/strapi";

// Helper: fetch safely — never throw, return null on error
async function safeFetch(fn) {
  try {
    const res = await fn();
    // Strapi single types return { data: {...} }; collections { data: [...] }
    return res?.data?.data ?? null;
  } catch (err) {
    console.warn(
      "Fetch failed:",
      err?.config?.url || "(unknown URL)",
      err?.response?.status,
      err?.message,
    );
    return null;
  }
}

export default function Home() {
  const [data, setData] = React.useState({
    settings: null,
    services: [],
    testimonials: [],
    caseStudies: [],
    logos: [],
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      const [settings, services, testimonials, caseStudies, logos] =
        await Promise.all([
          safeFetch(getSiteSettings),
          safeFetch(getFeaturedServices),
          safeFetch(getFeaturedTestimonials),
          safeFetch(getFeaturedCaseStudies),
          safeFetch(getClientLogos),
        ]);

      if (cancelled) return;

      setData({
        settings: settings || null,
        services: Array.isArray(services) ? services : [],
        testimonials: Array.isArray(testimonials) ? testimonials : [],
        caseStudies: Array.isArray(caseStudies) ? caseStudies : [],
        logos: Array.isArray(logos) ? logos : [],
      });
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <HeroSection settings={data.settings} />
      <TrustedBySection logos={data.logos} />
      <ServicesPreview services={data.services} />
      <WhyUsSection />
      <ProcessSection />
      <FeaturedWork caseStudies={data.caseStudies} />
      <TestimonialsSection testimonials={data.testimonials} />
      <CTASection settings={data.settings} />
    </Box>
  );
}
