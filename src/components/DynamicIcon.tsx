import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
}

export default function DynamicIcon({ name, className = "w-6 h-6" }: DynamicIconProps) {
  // Safe lookup with typing
  const IconComponent = (LucideIcons as any)[name];
  
  if (!IconComponent) {
    // Fallback icon
    return <LucideIcons.HelpCircle className={className} />;
  }
  
  return <IconComponent className={className} />;
}
