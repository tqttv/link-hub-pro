import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/types";

interface ProfileHeaderProps {
  profile: UserProfile;
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative"
      >
        {/* Glow effect behind avatar */}
        <div className="absolute inset-0 gradient-primary rounded-full blur-xl opacity-30 animate-pulse-glow" />
        
        <Avatar className="w-24 h-24 border-4 border-primary/30 relative">
          <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
          <AvatarFallback className="text-2xl font-bold gradient-primary text-primary-foreground">
            {profile.displayName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-2"
      >
        <h1 className="text-2xl font-bold font-heading text-foreground">
          {profile.displayName}
        </h1>
        <p className="text-muted-foreground text-sm">@{profile.username}</p>
        {profile.bio && (
          <p className="text-foreground/80 text-sm max-w-xs leading-relaxed">
            {profile.bio}
          </p>
        )}
      </motion.div>
    </div>
  );
};
