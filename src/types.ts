export interface ComingSoonProduct {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  category: 'juice' | 'dessert' | 'catering';
  categoryLabel: string;
  tag: string;
}

export interface FeatureCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'whatsapp';
  handle: string;
  url: string;
}
