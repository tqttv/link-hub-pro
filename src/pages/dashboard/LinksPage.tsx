import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LinkCard } from "@/components/dashboard/LinkCard";
import { AddLinkDialog } from "@/components/dashboard/AddLinkDialog";
import { mockProfile } from "@/data/mockData";
import { UserLink } from "@/types";
import { Plus, Link2 } from "lucide-react";
import { toast } from "sonner";

const LinksPage = () => {
  const [links, setLinks] = useState<UserLink[]>(mockProfile.links);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<UserLink | null>(null);

  const handleToggle = (id: string) => {
    setLinks(prev =>
      prev.map(link =>
        link.id === id ? { ...link, isActive: !link.isActive } : link
      )
    );
    toast.success("تم تحديث حالة الرابط");
  };

  const handleEdit = (link: UserLink) => {
    setEditingLink(link);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
    toast.success("تم حذف الرابط");
  };

  const handleSave = (linkData: Omit<UserLink, "id" | "clicks" | "order">) => {
    if (editingLink) {
      setLinks(prev =>
        prev.map(link =>
          link.id === editingLink.id
            ? { ...link, ...linkData }
            : link
        )
      );
      toast.success("تم تحديث الرابط");
    } else {
      const newLink: UserLink = {
        ...linkData,
        id: Date.now().toString(),
        clicks: 0,
        order: links.length + 1,
      };
      setLinks(prev => [...prev, newLink]);
      toast.success("تم إضافة الرابط");
    }
    setEditingLink(null);
  };

  const handleOpenDialog = () => {
    setEditingLink(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">الروابط</h1>
          <p className="text-muted-foreground">أضف وأدر روابطك هنا</p>
        </div>
        <Button variant="gradient" onClick={handleOpenDialog}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة رابط
        </Button>
      </div>

      {/* Links List */}
      {links.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {links.map(link => (
              <LinkCard
                key={link.id}
                link={link}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Link2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">لا توجد روابط</h3>
          <p className="text-muted-foreground text-sm mb-4">
            ابدأ بإضافة روابطك الآن
          </p>
          <Button variant="gradient" onClick={handleOpenDialog}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة أول رابط
          </Button>
        </motion.div>
      )}

      {/* Dialog */}
      <AddLinkDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        editLink={editingLink}
      />
    </div>
  );
};

export default LinksPage;
