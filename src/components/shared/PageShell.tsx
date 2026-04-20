import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { routes } from './routes';

export function PageShell({ title, breadcrumbs, children }: { title: string, breadcrumbs: { label: string, href?: string }[], children: React.ReactNode }) {
  return (
    <div className="pt-32">
      <div className="bg-muted py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-primary mb-6"
          >
            {title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center text-sm font-medium text-muted-foreground uppercase tracking-wider"
          >
            <a href={routes.home} className="hover:text-primary transition-colors">Home</a>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <ChevronRight className="h-4 w-4 mx-2" />
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-primary transition-colors">{crumb.label}</a>
                ) : (
                  <span className="text-primary">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="min-h-[50vh]">
        {children}
      </div>
    </div>
  );
}
