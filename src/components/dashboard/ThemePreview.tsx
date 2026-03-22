import { motion } from "framer-motion";
import { getThemeConfig } from "@/lib/themes";
import { ExternalLink, Globe } from "lucide-react";

interface ThemePreviewProps {
  themeId: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
}

const ThemePreview = ({ themeId, displayName, bio, avatarUrl }: ThemePreviewProps) => {
  const theme = getThemeConfig(themeId);

  return (
    <div className={`relative rounded-2xl overflow-hidden ${theme.pageBg} p-6 min-h-[420px]`}>
      {/* Background decorations */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${theme.bgDecoration1} blur-3xl -translate-y-1/2 translate-x-1/2`} />
      <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full ${theme.bgDecoration2} blur-3xl translate-y-1/2 -translate-x-1/2`} />

      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Avatar */}
        <div className={`w-16 h-16 rounded-full border-[3px] ${theme.avatarBorder} overflow-hidden bg-gray-300`}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${theme.cardBg} ${theme.cardTextColor} text-xl font-bold`}>
              {displayName?.charAt(0) || "م"}
            </div>
          )}
        </div>

        {/* Name & Bio */}
        <div className="text-center space-y-1">
          <h3 className={`text-base font-bold ${theme.pageTextColor}`}>
            {displayName || "الاسم المعروض"}
          </h3>
          <p className={`text-xs ${theme.pageSubTextColor} max-w-[200px] line-clamp-2`}>
            {bio || "النبذة التعريفية تظهر هنا"}
          </p>
        </div>

        {/* Fake links */}
        <div className="w-full space-y-2.5 mt-1">
          {["الرابط الأول", "الرابط الثاني", "الرابط الثالث"].map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`w-full px-4 py-2.5 rounded-xl border ${theme.cardBg} ${theme.cardBorder} ${theme.linkShadow} flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <Globe className={`w-3.5 h-3.5 ${theme.cardTextColor} opacity-60`} />
                <span className={`text-xs font-medium ${theme.cardTextColor}`}>{label}</span>
              </div>
              <ExternalLink className={`w-3 h-3 ${theme.cardTextColor} opacity-40`} />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <p className={`text-[10px] mt-3 ${theme.footerColor}`}>
          صُنع بواسطة Linke One
        </p>
      </div>
    </div>
  );
};

export default ThemePreview;
