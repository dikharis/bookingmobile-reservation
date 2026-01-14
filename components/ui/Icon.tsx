import React from 'react';
import { Map, Car, Ship, Anchor, ChevronLeft, Save, FileText, CheckCircle, Calendar, Users, Phone, Mic, Sparkles, X, Plus, Minus, Search } from 'lucide-react';

export const Icons = {
  Map, Car, Ship, Anchor, ChevronLeft, Save, FileText, CheckCircle, Calendar, Users, Phone, Mic, Sparkles, X, Plus, Minus, Search
};

export type IconName = keyof typeof Icons;

interface IconProps {
  name: string; // relax type for dynamic usage
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 24 }) => {
  const IconComponent = Icons[name as IconName];
  if (!IconComponent) return null;
  return <IconComponent className={className} size={size} />;
};