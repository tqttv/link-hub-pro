import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/ProfileHeader";
import { SocialIcons } from "@/components/SocialIcons";
import { useProfileByUsername } from "@/hooks/useProfile";
import { useLinksByUserId } from "@/hooks/useLinks";
import { useSocialLinksByUserId } from "@/hooks/useSocialLinks";
import { Sparkles, Loader2, ExternalLink } from "lucide-react";
import { getThemeConfig } from "@/lib/themes";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { profile, loading: profileLoading } = useProfileByUsername(username || "");
  const { links, loading: linksLoading, incrementClick } = useLinksByUserId(profile?.user_id || "");
  const { socialLinks, loading: socialLoading } = useSocialLinksByUserId(profile?.user_id || "");

  const theme = getThemeConfig(profile?.theme || "dark");

  const handleLinkClick = async (linkId: string, url: string) => {
    await incrementClick(linkId);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">الصفحة غير موجودة</h1>
          <p className="text-muted-foreground mb-4">المستخدم "{username}" غير موجود</p>
          <a href="/" className="text-primary hover:underline">العودة للصفحة الرئيسية</a>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.pageBg}`}>
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-96 h-96 ${theme.bgDecoration1} rounded-full blur-3xl`} />
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${theme.bgDecoration2} rounded-full blur-3xl`} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-10" dir="rtl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto space-y-8"
        >
          {/* Profile Header - themed */}
          <div className="flex flex-col items-center gap-4 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.glowColor} rounded-full blur-xl opacity-40 animate-pulse`} />
              <div className={`w-24 h-24 rounded-full ${theme.avatarBorder} border-4 overflow-hidden relative`}>
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.display_name} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-r ${theme.glowColor} text-white text-2xl font-bold`}>
                    {profile.display_name.charAt(0)}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-2"
            >
              <h1 className={`text-2xl font-bold font-heading ${theme.pageTextColor}`}>
                {profile.display_name}
              </h1>
              <p className={`text-sm ${theme.pageSubTextColor}`}>@{profile.username}</p>
              {profile.bio && (
                <p className={`text-sm max-w-xs leading-relaxed ${theme.pageSubTextColor}`}>
                  {profile.bio}
                </p>
              )}
            </motion.div>
          </div>

          {/* Social Links */}
          {!socialLoading && socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex justify-center gap-3"
            >
              {socialLinks.map((sl) => (
                <a
                  key={sl.id}
                  href={sl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full ${theme.cardBg} ${theme.cardBorder} border flex items-center justify-center ${theme.pageSubTextColor} hover:scale-110 transition-all`}
                >
                  <span className="text-xs font-bold uppercase">{sl.platform.charAt(0)}</span>
                </a>
              ))}
            </motion.div>
          )}

          {/* Links */}
          {linksLoading ? (
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : links.length > 0 ? (
            <div className="space-y-3">
              {links.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLinkClick(link.id, link.url)}
                  className={`w-full group relative overflow-hidden rounded-xl ${theme.cardBg} border ${theme.cardBorder} ${theme.cardHoverBorder} ${theme.linkShadow} ${theme.linkHoverShadow} transition-all duration-300`}
                >
                  <div className={`relative w-full h-14 px-6 flex items-center justify-center gap-3 ${theme.cardTextColor} font-medium`}>
                    <span className="relative z-10 text-base">{link.title}</span>
                    <ExternalLink className={`w-4 h-4 absolute left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme.pageSubTextColor}`} />
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className={theme.pageSubTextColor}>لا توجد روابط بعد</p>
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
              className={`inline-flex items-center gap-2 text-xs ${theme.footerColor} hover:opacity-80 transition-opacity`}
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
