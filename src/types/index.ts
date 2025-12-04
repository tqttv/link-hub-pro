export interface UserLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  isActive: boolean;
  clicks: number;
  order: number;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  theme: 'light' | 'dark' | 'gradient';
  links: UserLink[];
  socialLinks: SocialLink[];
}

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'twitter' | 'youtube' | 'tiktok' | 'facebook' | 'linkedin' | 'github' | 'snapchat' | 'whatsapp' | 'telegram';
  url: string;
}

export type ThemeOption = {
  id: string;
  name: string;
  background: string;
  cardBg: string;
  textColor: string;
  accentColor: string;
}
