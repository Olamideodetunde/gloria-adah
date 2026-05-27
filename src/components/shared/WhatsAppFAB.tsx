import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export function WhatsAppFAB() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-3 w-64 bg-white border border-border shadow-xl rounded-lg p-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="text-sm font-semibold text-primary mb-2">
              Chat with us on WhatsApp
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Typically responds within an hour</span>
              </div>
              <div className="text-[11px] text-muted-foreground/70">
                Mon-Fri: 8:00 AM - 6:00 PM WAT
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-border transform rotate-45" />
          </div>
        )}

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/2347054588490"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 relative group"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          
          <FaWhatsapp className="h-8 w-8 relative z-10" />
          
          {/* Online indicator */}
          <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
        </a>
      </div>
    </div>
  );
}
