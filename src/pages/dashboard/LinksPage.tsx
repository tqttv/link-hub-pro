import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LinkCard } from "@/components/dashboard/LinkCard";
import { AddLinkDialog } from "@/components/dashboard/AddLinkDialog";
import { useLinks, Link } from "@/hooks/useLinks";
import { Plus, Link2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const LinksPage = () => {
  const { links, loading, addLink, updateLink, deleteLink, toggleLink, reorderLinks } = useLinks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    const reordered = arrayMove(links, oldIndex, newIndex).map((l, i) => ({ ...l, sort_order: i }));
    await reorderLinks(reordered);
    toast.success("تم تحديث ترتيب الروابط");
  };

  const handleToggle = async (id: string) => {
    const { error } = await toggleLink(id);
    if (error) {
      toast.error("حدث خطأ أثناء تحديث الرابط");
    } else {
      toast.success("تم تحديث حالة الرابط");
    }
  };

  const handleEdit = (link: Link) => {
    setEditingLink(link);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await deleteLink(id);
    if (error) {
      toast.error("حدث خطأ أثناء حذف الرابط");
    } else {
      toast.success("تم حذف الرابط");
    }
  };

  const handleSave = async (linkData: { title: string; url: string; isActive: boolean }) => {
    if (editingLink) {
      const { error } = await updateLink(editingLink.id, {
        title: linkData.title,
        url: linkData.url,
        is_active: linkData.isActive,
      });
      if (error) {
        toast.error("حدث خطأ أثناء تحديث الرابط");
      } else {
        toast.success("تم تحديث الرابط");
      }
    } else {
      const { error } = await addLink({
        title: linkData.title,
        url: linkData.url,
      });
      if (error) {
        toast.error("حدث خطأ أثناء إضافة الرابط");
      } else {
        toast.success("تم إضافة الرابط");
      }
    }
    setEditingLink(null);
    setDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setEditingLink(null);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
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

      {links.length > 0 ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              <AnimatePresence>
                {links.map((link) => (
                  <LinkCard
                    key={link.id}
                    link={{
                      id: link.id,
                      title: link.title,
                      url: link.url,
                      isActive: link.is_active,
                      clicks: link.clicks,
                      order: link.sort_order,
                    }}
                    onToggle={handleToggle}
                    onEdit={() => handleEdit(link)}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
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
          <p className="text-muted-foreground text-sm mb-4">ابدأ بإضافة روابطك الآن</p>
          <Button variant="gradient" onClick={handleOpenDialog}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة أول رابط
          </Button>
        </motion.div>
      )}

      <AddLinkDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        editLink={
          editingLink
            ? {
                id: editingLink.id,
                title: editingLink.title,
                url: editingLink.url,
                isActive: editingLink.is_active,
                clicks: editingLink.clicks,
                order: editingLink.sort_order,
              }
            : null
        }
      />
    </div>
  );
};

export default LinksPage;
