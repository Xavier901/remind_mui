/** @format */
import * as React from "react";
import { Box, Container, Typography, Divider, Alert } from "@mui/material";
import Prose from "./Prose";

const LAST_UPDATED = "October 3, 2026";

export default function TermsOfService() {
  React.useEffect(() => {
    document.title = "Terms of Service — Remind Studio";
  }, []);

  return (
    <Box>
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
            Terms of Service
          </Typography>
          <Typography variant='body2' sx={{ opacity: 0.75 }}>
            Last updated: {LAST_UPDATED}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth='md' sx={{ py: { xs: 4, md: 6 } }}>
        <Alert severity='info' sx={{ mb: 4 }}>
          <strong>Plain English summary:</strong> We do great work, you pay
          fairly, and we each respect the other's intellectual property.
        </Alert>

        <Prose>
          <h2>1. Agreement</h2>
          <p>
            By using the Remind Studio website or engaging our services, you
            agree to these Terms of Service. If you do not agree, please do not
            use our site or services.
          </p>

          <h2>2. Services</h2>
          <p>
            We provide web development, design, and related consulting services.
            Specific deliverables, timelines, and pricing for each project are
            defined in a separate written agreement or Statement of Work (SOW).
          </p>

          <h2>3. Client Responsibilities</h2>
          <p>To deliver successfully, we need:</p>
          <ul>
            <li>Timely feedback and approvals</li>
            <li>Access to necessary accounts and systems</li>
            <li>Content, assets, and information as requested</li>
            <li>A designated point of contact for decisions</li>
          </ul>
          <p>
            Delays caused by missing inputs may extend project timelines and, in
            some cases, incur additional fees.
          </p>

          <h2>4. Payments</h2>
          <p>
            Unless otherwise agreed, standard payment terms are 50% up front and
            50% on delivery. Invoices are due within 14 days. Late payments may
            pause work and accrue interest at 1.5% per month.
          </p>
          <p>
            All prices are exclusive of applicable taxes unless stated
            otherwise.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            Upon full payment, you own the final deliverables we produce for you
            (code, designs, content) — with the following exceptions:
          </p>
          <ul>
            <li>
              <strong>Third-party assets</strong> (fonts, images, libraries)
              remain subject to their own licenses
            </li>
            <li>
              <strong>
                Our internal tools, frameworks, and reusable components
              </strong>{" "}
              remain our property
            </li>
            <li>
              <strong>Case study rights</strong> — we may feature the work in
              our portfolio, with attribution, unless you request otherwise in
              writing
            </li>
          </ul>

          <h2>6. Confidentiality</h2>
          <p>
            We treat all client information as confidential. We will not
            disclose your business details, source code, or credentials to third
            parties except as needed to complete your project (e.g., hosting
            providers).
          </p>

          <h2>7. Revisions and Scope</h2>
          <p>
            Each project includes the number of revision rounds specified in the
            SOW. Work beyond that scope is billed at our standard hourly rate.
            We will always confirm before doing out-of-scope work.
          </p>

          <h2>8. Warranties</h2>
          <p>
            We warrant that our work will be original and free from defects at
            the time of delivery. We provide 30 days of bug fixes after launch
            at no additional cost. This warranty does not cover:
          </p>
          <ul>
            <li>Issues caused by third-party services or hosting changes</li>
            <li>Modifications made by others after handoff</li>
            <li>New feature requests</li>
          </ul>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Remind Studio's total
            liability for any claim is limited to the total fees paid by you for
            the specific project. We are not liable for indirect, consequential,
            or incidental damages, including lost profits or lost data.
          </p>

          <h2>10. Termination</h2>
          <p>
            Either party may terminate a project with 14 days' written notice.
            You agree to pay for all work completed up to the termination date.
            We will deliver all completed work in progress.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes will be
            resolved in the courts of Kolkata, West Bengal.
          </p>

          <h2>12. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of our
            site or services after changes constitutes acceptance.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions? Email{" "}
            <a href='mailto:bapimahalik51@hotmail.com'>
              bapimahalik51@hotmail.com
            </a>
            .
          </p>
        </Prose>

        <Divider sx={{ my: 6 }} />
        <Typography variant='body2' color='text.secondary' textAlign='center'>
          This document is a template and does not constitute legal advice.
          Consult a qualified lawyer for your specific situation.
        </Typography>
      </Container>
    </Box>
  );
}
