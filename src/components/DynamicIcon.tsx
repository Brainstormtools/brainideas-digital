import React from 'react';
import {
  Layers,
  Paintbrush,
  Wrench,
  Smartphone,
  FileText,
  RefreshCw,
  Scissors,
  Stethoscope,
  Utensils,
  Dumbbell,
  GraduationCap,
  Scale,
  Construction,
  Calendar,
  ShoppingBag,
  Hotel,
  Shield,
  HelpCircle,
  FileCode2,
  Terminal,
  Database,
  Sparkles,
  MapPin,
  Search,
  MessageSquareCode,
  Building
} from 'lucide-react';

const ICONS = {
  Layers,
  Paintbrush,
  Wrench,
  Smartphone,
  FileText,
  RefreshCw,
  Scissors,
  Stethoscope,
  Utensils,
  Dumbbell,
  GraduationCap,
  Scale,
  Construction,
  Calendar,
  ShoppingBag,
  Hotel,
  Shield,
  HelpCircle,
  FileCode2,
  Terminal,
  Database,
  Sparkles,
  MapPin,
  Search,
  MessageSquareCode,
  Building
} as const;

interface DynamicIconProps {
  name: string;
  className?: string;
}

export default function DynamicIcon({ name, className = "w-6 h-6" }: DynamicIconProps) {
  const IconComponent = ICONS[name as keyof typeof ICONS] || HelpCircle;
  return <IconComponent className={className} />;
}
