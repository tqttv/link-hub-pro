import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/ProfileHeader";
import { LinkButton } from "@/components/LinkButton";
import { SocialIcons } from "@/components/SocialIcons";
import { mockProfile } from "@/data/mockData";
import { Sparkles } from "lucide-react";

const ProfilePage = () => {
  const profile = mockProfile;
  const activeLinks = profile.links.filter(link => link.isActive);

  const handleLinkClick = (linkId: string) => {
    console.log("Link clicked:", linkId);
    // Here you would track the click in your analytics
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto space-y-8"
        >
          {/* Profile Header */}
          <ProfileHeader profile={profile} />

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <SocialIcons socialLinks={profile.socialLinks} />
          </motion.div>

          {/* Links */}
          <div className="space-y-3">
            {activeLinks.map((link, index) => (
              <LinkButton 
                key={link.id} 
                link={link} 
                index={index} 
                onClickTrack={handleLinkClick}
              />
            ))}
          </div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="pt-8 text-center"
          >
            <a 
              href="/"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>صُنع بواسطة LinkTree Clone</span>
            </a>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
