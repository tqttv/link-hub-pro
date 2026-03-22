import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Pencil, Trash2, BarChart2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface LinkCardProps {
  link: {
    id: string;
    title: string;
    url: string;
    isActive: boolean;
    clicks: number;
    order: number;
  };
  onToggle: (id: string) => void;
  onEdit: (link: any) => void;
  onDelete: (id: string) => void;
}

export const LinkCard = ({ link, onToggle, onEdit, onDelete }: LinkCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
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
          <button
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors touch-none"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{link.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{link.url}</p>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <BarChart2 className="w-4 h-4" />
            <span className="text-sm">{link.clicks}</span>
          </div>

          <Switch
            checked={link.isActive}
            onCheckedChange={() => onToggle(link.id)}
          />

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
    </div>
  );
};