/** @format */
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  Alert,
} from "@mui/material";
import Prose from "./Prose";

const LAST_UPDATED = "October 3, 2026";

export default function PrivacyPolicy() {
  React.useEffect(() => {
    document.title = "Privacy Policy — Remind Studio";
  }, []);

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          py: { xs: 6, md: 8 },
        }}>
        <Container maxWidth='md'>
          <Typography
            variant='overline'
            sx={{ letterSpacing: ".2rem", opacity: 0.7 }}>
            Legal
          </Typography>
          <Typography
            variant='h3'
            fontWeight={700}
            sx={{ mt: 1, mb: 1, fontSize: { xs: "1.75rem", md: "2.5rem" } }}>
            Privacy Policy
          </Typography>
          <Typography variant='body2' sx={{ opacity: 0.75 }}>
            Last updated: {LAST_UPDATED}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth='md' sx={{ py: { xs: 4, md: 6 } }}>
        <Alert severity='info' sx={{ mb: 4 }}>
          <strong>Plain English summary:</strong> We collect minimal data, use
          it only to run our business, never sell it, and you can request
          deletion at any time.
        </Alert>

        <Prose>
          <h2>1. Who We Are</h2>
          <p>
            Remind Studio ("we", "us", "our") is a web development studio based
            in Kolkata, India. This Privacy Policy explains how we collect, use,
            and protect your information when you visit our website or use our
            services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect information in three ways:</p>
          <ul>
            <li>
              <strong>Information you give us.</strong> When you fill out a
              contact form, subscribe to updates, or email us, we collect your
              name, email address, company name, and any details you share about
              your project.
            </li>
            <li>
              <strong>Information collected automatically.</strong> When you
              visit our site, we may collect your IP address, browser type,
              device type, pages visited, and time spent on the site.
            </li>
            <li>
              <strong>Information from third parties.</strong> If you contact us
              through LinkedIn, GitHub, or similar platforms, we may receive
              your public profile information.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Respond to your inquiries and provide our services</li>
            <li>Send invoices, contracts, and project updates</li>
            <li>Improve our website and services</li>
            <li>Comply with legal and tax obligations</li>
            <li>Protect against fraud and abuse</li>
          </ul>
          <p>
            We <strong>do not sell</strong>, rent, or share your personal
            information with third parties for marketing purposes.
          </p>

          <h2>4. Cookies and Analytics</h2>
          <p>
            We may use cookies and analytics tools (such as privacy-friendly
            analytics that do not track individual users) to understand how
            people use our site. You can disable cookies in your browser
            settings at any time.
          </p>

          <h2>5. How We Protect Your Information</h2>
          <p>
            We use industry-standard practices to protect your data, including
            encrypted HTTPS connections, restricted access to internal systems,
            and regular security updates. However, no method of transmission
            over the internet is 100% secure.
          </p>

          <h2>6. Sharing Your Information</h2>
          <p>
            We only share your information with third parties when necessary to
            run our business:
          </p>
          <ul>
            <li>
              <strong>Payment processors</strong> (e.g., PayPal, Stripe) to
              handle transactions
            </li>
            <li>
              <strong>Email services</strong> (e.g., EmailJS, Gmail) to send
              communications
            </li>
            <li>
              <strong>Hosting providers</strong> (e.g., Vercel, Railway) to run
              our infrastructure
            </li>
            <li>
              <strong>Legal authorities</strong> if required by law
            </li>
          </ul>

          <h2>7. Your Rights</h2>
          <p>Depending on where you live, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request a copy of your data in a portable format</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{" "}
            <a href='mailto:bapimahalik51@hotmail.com'>
              bapimahalik51@hotmail.com
            </a>
            .
          </p>

          <h2>8. Data Retention</h2>
          <p>
            We keep your information only as long as necessary for the purposes
            described above, or as required by law. Contact form submissions are
            typically kept for 24 months.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not directed to anyone under the age of 16. We do
            not knowingly collect personal information from children.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post
            the new version on this page with a new "Last updated" date.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            Questions about this policy? Reach out at{" "}
            <a href='mailto:bapimahalik51@hotmail.com'>
              bapimahalik51@hotmail.com
            </a>
            .
          </p>
        </Prose>

        <Divider sx={{ my: 6 }} />
        <Stack
          spacing={1}
          sx={{ textAlign: "center", color: "text.secondary" }}>
          <Typography variant='body2'>
            This document is a template and does not constitute legal advice.
            Consult a qualified lawyer for your specific situation.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
