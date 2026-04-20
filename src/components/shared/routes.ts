import { Building2, FileText, Landmark, Scale, Shield, MapPin, Briefcase, Droplets } from 'lucide-react';

export const routes = {
  home: "#/",
  about: "#/about",
  practiceAreas: "#/practice-areas",
  attorney: "#/attorneys/gloria-ondah",
  insights: "#/insights",
  faq: "#/faq",
  contact: "#/contact",
  booking: "#/booking",
  privacy: "#/privacy",
  terms: "#/terms",
  disclaimer: "#/disclaimer",
  admin: "#/admin"
};

export const getPracticeRoute = (slug: string) => `#/practice/${slug}`;
export const getInsightRoute = (slug: string) => `#/insights/${slug}`;

export const practiceIcons = {
  "company-registration": Building2,
  "contracts": FileText,
  "compliance": Landmark,
  "litigation": Scale,
  "ip": Shield,
  "property": MapPin,
  "employment": Briefcase,
  "oil-gas": Droplets
};
