import { LucideIcon } from 'lucide-react';

export type Language = 'zh' | 'en';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PricingItem {
  title: string;
  description: string;
  price: string;
  isStartingPrice?: boolean;
}