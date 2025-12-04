import { motion } from "framer-motion";
import { UserLink } from "@/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Pencil, Trash2, BarChart2 } from "lucide-react";

interface LinkCardProps {
  link: UserLink;
  onToggle: (id: string) => void;
  onEdit: (link: UserLink) => void;
  onDelete: (id: string) => void;
}

export const LinkCard = ({ link, onToggle, onEdit, onDelete }: LinkCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`bg-card border border-border rounded-xl p-4 shadow-card transition-all duration-200 ${
        !link.isActive ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <button className="cursor-grab text-muted-foreground hover:text-foreground transition-colors">
          <GripVertical className="w-5 h-5" />
        </button>

        {/* Link Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{link.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{link.url}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <BarChart2 className="w-4 h-4" />
          <span className="text-sm">{link.clicks}</span>
        </div>

        {/* Toggle */}
        <Switch
          checked={link.isActive}
          onCheckedChange={() => onToggle(link.id)}
        />

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(link)}
            className="text-muted-foreground hover:text-primary"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(link.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
