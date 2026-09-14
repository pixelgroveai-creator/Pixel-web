export type ProjectCategory = 'all' | 'web' | 'mobile' | 'media' | 'brand';

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  category: 'web' | 'mobile' | 'media' | 'brand';
  badge: string;
  badgeColor: string;
  stat: string;
  statLabel: string;
  imageUrl: string;
  imageAlt: string;
  summary: string;
  techStack: string[];
  fullDetails?: {
    overview: string;
    challenge: string;
    solution: string;
    impactMetrics: { label: string; value: string; detail: string }[];
    clientQuote: string;
    clientAuthor: string;
    clientRole: string;
  };
}

export interface ServiceVector {
  vectorNumber: string;
  title: string;
  description: string;
  features: string[];
  tags: string[];
  accentColor: string;
  iconName: string;
}

export interface ProjectInquiry {
  name: string;
  email: string;
  phone?: string;
  company: string;
  services: string[];
  budget: string;
  projectDetails: string;
  location?: string;
  timestamp: string;
}

export interface RestaurantServiceItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  tier: 'FOH' | 'BOH' | 'CLOSED_LOOP';
  painPoints: string[];
  capabilities: string[];
  metrics: string;
}

export interface IndustryPlaybookItem {
  id: string;
  segment: string;
  icon: string;
  primaryPainPoint: string;
  suggestedLeadAngle: string;
  keyMetric: string;
  scenario: string;
}

