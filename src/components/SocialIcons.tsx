import { motion } from "framer-motion";
import { SocialLink } from "@/types";
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook, 
  Linkedin, 
  Github,
  MessageCircle
} from "lucide-react";

interface SocialIconsProps {
  socialLinks: SocialLink[];
}

const iconMap = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  facebook: Facebook,
  linkedin: Linkedin,
  github: Github,
  tiktok: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ),
  snapchat: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301a.989.989 0 0 1 .45-.105c.27 0 .5.09.66.226.186.165.254.393.254.554 0 .09-.015.166-.045.236a1.67 1.67 0 0 1-.704.7c-.69.405-1.51.495-1.545.495-.03 0-.06-.005-.09-.015a.363.363 0 0 0-.135-.03c-.105 0-.255.06-.345.24-.135.27-.255.585-.39.885-.345.75-.755 1.605-1.59 2.206-.36.255-.72.435-1.095.555-.225.075-.39.105-.615.105h-.03c-.225 0-.39-.03-.615-.105a3.28 3.28 0 0 1-1.095-.555c-.84-.6-1.245-1.455-1.59-2.206-.135-.3-.255-.615-.39-.885-.09-.18-.24-.24-.345-.24a.363.363 0 0 0-.135.03c-.03.01-.06.015-.09.015-.03 0-.855-.09-1.545-.495a1.67 1.67 0 0 1-.704-.7.516.516 0 0 1-.045-.236c0-.16.07-.39.254-.554.16-.135.39-.226.66-.226.165 0 .315.03.45.105.375.18.735.285 1.035.3.195 0 .325-.045.4-.09a19.56 19.56 0 0 1-.03-.51l-.002-.06c-.105-1.628-.23-3.654.3-4.847C6.648 1.07 10.005.793 10.994.793h1.212z"/>
    </svg>
  ),
  whatsapp: MessageCircle,
  telegram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
};

export const SocialIcons = ({ socialLinks }: SocialIconsProps) => {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {socialLinks.map((social, index) => {
        const Icon = iconMap[social.platform];
        return (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300 shadow-card"
          >
            {typeof Icon === 'function' && Icon.prototype ? <Icon className="w-5 h-5" /> : <Icon />}
          </motion.a>
        );
      })}
    </div>
  );
};
