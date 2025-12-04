import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/ProfileHeader";
import { LinkButton } from "@/components/LinkButton";
import { SocialIcons } from "@/components/SocialIcons";
import { useProfileByUsername } from "@/hooks/useProfile";
import { useLinksByUserId } from "@/hooks/useLinks";
import { useSocialLinksByUserId } from "@/hooks/useSocialLinks";
import { Sparkles, Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { profile, loading: profileLoading } = useProfileByUsername(username || "");
  const { links, loading: linksLoading, incrementClick } = useLinksByUserId(profile?.user_id || "");
  const { socialLinks, loading: socialLoading } = useSocialLinksByUserId(profile?.user_id || "");

  const handleLinkClick = async (linkId: string) => {
    await incrementClick(linkId);
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">الصفحة غير موجودة</h1>
          <p className="text-muted-foreground mb-4">المستخدم "{username}" غير موجود</p>
          <a href="/" className="text-primary hover:underline">العودة للصفحة الرئيسية</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-10" dir="rtl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto space-y-8"
        >
          {/* Profile Header */}
          <ProfileHeader profile={{
            id: profile.id,
            username: profile.username,
            displayName: profile.display_name,
            bio: profile.bio,
            avatarUrl: profile.avatar_url,
            theme: profile.theme as 'light' | 'dark' | 'gradient',
            links: [],
            socialLinks: [],
          }} />

          {/* Social Links */}
          {!socialLoading && socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <SocialIcons socialLinks={socialLinks.map(sl => ({
                id: sl.id,
                platform: sl.platform as any,
                url: sl.url,
              }))} />
            </motion.div>
          )}

          {/* Links */}
          {linksLoading ? (
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : links.length > 0 ? (
            <div className="space-y-3">
              {links.map((link, index) => (
                <LinkButton 
                  key={link.id} 
                  link={{
                    id: link.id,
                    title: link.title,
                    url: link.url,
                    isActive: link.is_active,
                    clicks: link.clicks,
                    order: link.sort_order,
                  }}
                  index={index} 
                  onClickTrack={handleLinkClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">لا توجد روابط بعد</p>
            </div>
          )}

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
              <span>صُنع بواسطة LinkTree</span>
            </a>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
