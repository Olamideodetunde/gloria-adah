import React from 'react';
import { PageShell } from '../_shared/PageShell';
import { CTABand } from '../_shared/CTABand';

export function Terms() {
  return (
    <>
      <PageShell title="Terms of Use" breadcrumbs={[{ label: 'Terms of Use' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary">
              <p className="text-sm text-muted-foreground mb-8">Last Updated: October 1, 2023</p>
              
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the website of Gloria Ondah & Associates, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our website.
              </p>

              <h2>2. No Attorney-Client Relationship</h2>
              <p>
                Transmission of information from this website or any communication with us via email, WhatsApp, or contact forms does not create an attorney-client relationship between you and Gloria Ondah & Associates. Such a relationship is only established upon the execution of a formal engagement letter or retainer agreement.
              </p>

              <h2>3. Informational Purposes Only</h2>
              <p>
                The materials on this website, including blog posts, FAQs, and practice area descriptions, are provided for general informational purposes only and do not constitute legal advice. You should not act upon any information on this site without seeking professional legal counsel.
              </p>

              <h2>4. Booking and Consultations</h2>
              <p>
                Consultations booked through our website are subject to availability. Fees paid for consultations are non-refundable unless the firm cancels the appointment and an alternative time cannot be agreed upon.
              </p>

              <h2>5. Intellectual Property</h2>
              <p>
                All content, branding, logos, and materials on this website are the intellectual property of Gloria Ondah & Associates and may not be reproduced without prior written consent.
              </p>

              <h2>6. Governing Law</h2>
              <p>
                These Terms of Use shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
              </p>
            </div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
