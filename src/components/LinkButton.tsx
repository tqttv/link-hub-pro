import { motion } from "framer-motion";
import { UserLink } from "@/types";
import { ExternalLink } from "lucide-react";

interface LinkButtonProps {
  link: UserLink;
  index: number;
  onClickTrack?: (linkId: string) => void;
}

export const LinkButton = ({ link, index, onClickTrack }: LinkButtonProps) => {
  const handleClick = () => {
    if (onClickTrack) {
      onClickTrack(link.id);
    }
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="w-full group relative overflow-hidden"
    >
      <div className="relative w-full h-14 px-6 rounded-xl bg-card border border-border flex items-center justify-center gap-3 text-foreground font-medium shadow-card transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-link-hover">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 gradient-primary transition-opacity duration-300 rounded-xl" />
        
        <span className="relative z-10 text-base">{link.title}</span>
        
        <ExternalLink className="w-4 h-4 absolute right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary" />
      </div>
    </motion.button>
  );
};
