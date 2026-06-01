import React from 'react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';

export function Privacy() {
  return (
    <>
      <PageShell title="Privacy Policy" breadcrumbs={[{ label: 'Privacy Policy' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary">
              <p className="text-sm text-muted-foreground mb-8">Last Updated: October 1, 2023</p>
              <h2>1. Introduction</h2>
              <p>Gloria Ondah & Associates ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or engage our legal services, in compliance with the Nigeria Data Protection Regulation (NDPR) and other applicable laws.</p>
              <h2>2. Information We Collect</h2>
              <p>We may collect and process the following data:</p>
              <ul>
                <li><strong>Identity Data:</strong> First name, last name, title, company name.</li>
                <li><strong>Contact Data:</strong> Email address, telephone numbers, billing address.</li>
                <li><strong>Case Data:</strong> Information relevant to your legal inquiries or cases provided via our booking or contact forms.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, time zone setting, and operating system.</li>
              </ul>
              <h2>3. How We Use Your Data</h2>
              <ul>
                <li>Provide legal advisory and representation.</li>
                <li>Process consultation bookings and payments.</li>
                <li>Communicate with you regarding your matters.</li>
                <li>Comply with our legal and regulatory obligations.</li>
              </ul>
              <h2>4. Attorney-Client Privilege</h2>
              <p>Information provided to us for the purpose of seeking legal advice is subject to strict attorney-client privilege and confidentiality rules governed by the Rules of Professional Conduct for Legal Practitioners in Nigeria.</p>
              <h2>5. Data Security</h2>
              <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.</p>
              <h2>6. Your Legal Rights</h2>
              <p>Under the NDPR, you have the right to request access, correction, or deletion of your personal data. To exercise these rights, please contact us at info@gloriaondahlaw.com.</p>
            </div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
