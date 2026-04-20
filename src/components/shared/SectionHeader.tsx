import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from './motion';

export function SectionHeader({ eyebrow, title, description, align = 'left' }: { eyebrow: string, title: string, description?: string, align?: 'left' | 'center' }) {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center mx-auto' : ''}`}>
      <motion.h2 variants={fadeInUp} className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">
        {eyebrow}
      </motion.h2>
      <motion.h3 variants={fadeInUp} className="text-4xl md:text-5xl font-serif text-primary mb-6">
        {title}
      </motion.h3>
      {description && (
        <motion.p variants={fadeInUp} className={`text-muted-foreground text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </motion.p>
      )}
    </div>
  );
}
