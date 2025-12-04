import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserLink } from "@/types";

interface AddLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (link: Omit<UserLink, "id" | "clicks" | "order">) => void;
  editLink?: UserLink | null;
}

export const AddLinkDialog = ({ open, onOpenChange, onSave, editLink }: AddLinkDialogProps) => {
  const [title, setTitle] = useState(editLink?.title || "");
  const [url, setUrl] = useState(editLink?.url || "");

  const handleSave = () => {
    if (!title.trim() || !url.trim()) return;
    
    onSave({
      title: title.trim(),
      url: url.trim(),
      isActive: editLink?.isActive ?? true,
    });
    
    setTitle("");
    setUrl("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {editLink ? "تعديل الرابط" : "إضافة رابط جديد"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">العنوان</Label>
            <Input
              id="title"
              placeholder="مثال: قناتي على يوتيوب"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">الرابط</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              dir="ltr"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button variant="gradient" onClick={handleSave}>
            {editLink ? "حفظ التعديلات" : "إضافة"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
