import React from 'react';
import { PageShell } from '../shared/PageShell';
import { CTABand } from '../shared/CTABand';

export function Disclaimer() {
  return (
    <>
      <PageShell title="Legal Disclaimer" breadcrumbs={[{ label: 'Disclaimer' }]}>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary">
              <h2>General Disclaimer</h2>
              <p>The information contained on this website is provided by Gloria Ondah & Associates for informational purposes only. It should not be construed as legal advice on any subject matter.</p>
              <p>No recipients of content from this site, clients or otherwise, should act or refrain from acting on the basis of any content included in the site without seeking the appropriate legal or other professional advice.</p>
              <h2>No Liability</h2>
              <p>Gloria Ondah & Associates expressly disclaims all liability in respect to actions taken or not taken based on any or all the contents of this Website.</p>
              <h2>Third-Party Links</h2>
              <p>Some links within the Website may lead to other web-sites. Gloria Ondah & Associates includes these links solely as a convenience to you, and the presence of such a link does not imply a responsibility for the linked site or an endorsement of the linked site, its operator, or its contents.</p>
            </div>
          </div>
        </section>
      </PageShell>
      <CTABand />
    </>
  );
}
