export interface CompanyInfo {
  officialName: string;
  shortName: string;
  positioning: string;
  tagline: string;
  overview: string;
  address: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  country: string;
  phone: string;
  whatsapp: string;
  whatsappUrl: string;
  email: string;
  instagram: string;
  instagramUrl: string;
}

export type ServiceCategory = 
  | 'development'
  | 'solutions'
  | 'consulting'
  | 'outsourcing'
  | 'media';

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  deliverables: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  shortDesc: string;
  fullDesc: string;
  scope: string[];
  tags: string[];
  highlightBadge?: string;
  imagePlaceholderText: string;
}

export interface CoreValue {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface CompanyStrength {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  isActive: boolean;
}
