import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Globe,
  Mail,
  ShoppingBag,
  Send,
  MessageCircle,
  Camera,
  Pin,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

const platforms = [
  { id: "tiktok", name: "تيك توك", icon: "🎵", color: "hsl(0,0%,10%)" },
  { id: "whatsapp", name: "واتساب", icon: MessageCircle, color: "hsl(142,70%,45%)" },
  { id: "snapchat", name: "سناب شات", icon: Camera, color: "hsl(50,100%,50%)" },
  { id: "instagram", name: "انستغرام", icon: Instagram, color: "hsl(326,70%,55%)" },
  { id: "twitter", name: "تويتر (X)", icon: Twitter, color: "hsl(0,0%,10%)" },
  { id: "youtube", name: "يوتيوب", icon: Youtube, color: "hsl(0,80%,50%)" },
  { id: "email", name: "البريد الإلكتروني", icon: Mail, color: "hsl(210,60%,50%)" },
  { id: "website", name: "موقع إلكتروني", icon: Globe, color: "hsl(210,50%,45%)" },
  { id: "pinterest", name: "بينتيرست", icon: Pin, color: "hsl(0,70%,45%)" },
  { id: "telegram", name: "تليجرام", icon: Send, color: "hsl(200,70%,50%)" },
  { id: "facebook", name: "فيسبوك", icon: Facebook, color: "hsl(220,70%,45%)" },
  { id: "store", name: "المتجر الإلكتروني", icon: ShoppingBag, color: "hsl(260,50%,50%)" },
];

interface AddLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (link: { title: string; url: string; isActive: boolean }) => void;
  editLink?: {
    id: string;
    title: string;
    url: string;
    isActive: boolean;
    clicks: number;
    order: number;
  } | null;
}

export const AddLinkDialog = ({ open, onOpenChange, onSave, editLink }: AddLinkDialogProps) => {
  const [step, setStep] = useState<"platforms" | "details">(editLink ? "details" : "platforms");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (editLink) {
      setTitle(editLink.title);
      setUrl(editLink.url);
      setStep("details");
      setSelectedPlatform(null);
    } else {
      setTitle("");
      setUrl("");
      setStep("platforms");
      setSelectedPlatform(null);
    }
  }, [editLink, open]);

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId === selectedPlatform ? null : platformId);
  };

  const handleNext = () => {
    if (!selectedPlatform) return;
    const platform = platforms.find((p) => p.id === selectedPlatform);
    if (platform) {
      setTitle(platform.name);
      setUrl("");
    }
    setStep("details");
  };

  const handleBack = () => {
    setStep("platforms");
  };

  const handleSave = () => {
    if (!title.trim() || !url.trim()) return;
    onSave({
      title: title.trim(),
      url: url.trim(),
      isActive: editLink?.isActive ?? true,
    });
    setTitle("");
    setUrl("");
    setSelectedPlatform(null);
  };

  const getPlaceholderUrl = () => {
    switch (selectedPlatform) {
      case "tiktok": return "https://tiktok.com/@username";
      case "whatsapp": return "https://wa.me/966xxxxxxxxx";
      case "snapchat": return "https://snapchat.com/add/username";
      case "instagram": return "https://instagram.com/username";
      case "twitter": return "https://x.com/username";
      case "youtube": return "https://youtube.com/@channel";
      case "email": return "mailto:example@email.com";
      case "website": return "https://example.com";
      case "pinterest": return "https://pinterest.com/username";
      case "telegram": return "https://t.me/username";
      case "facebook": return "https://facebook.com/username";
      case "store": return "https://store.example.com";
      default: return "https://example.com";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-heading text-center">
            {editLink
              ? "تعديل الرابط"
              : step === "platforms"
              ? "اختر المنصة"
              : "أدخل تفاصيل الرابط"}
          </DialogTitle>
          {step === "platforms" && !editLink && (
            <p className="text-sm text-muted-foreground text-center mt-1">
              اختر المنصة التي تريد إضافة رابطها إلى صفحتك
            </p>
          )}
        </DialogHeader>

        {step === "platforms" && !editLink ? (
          <div className="py-4 space-y-5">
            <div className="grid grid-cols-3 gap-3">
              {platforms.map((platform, i) => {
                const isSelected = selectedPlatform === platform.id;
                const IconComponent = typeof platform.icon === "string" ? null : platform.icon;
                return (
                  <motion.button
                    key={platform.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => handlePlatformSelect(platform.id)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md scale-[1.03]"
                        : "border-border bg-card hover:border-muted-foreground/30 hover:bg-accent/50"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
                    )}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${platform.color}`, opacity: 0.15 }}>
                      {IconComponent ? (
                        <IconComponent className="w-5 h-5" style={{ color: platform.color }} />
                      ) : (
                        <span className="text-xl">{platform.icon as string}</span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-foreground">{platform.name}</span>
                  </motion.button>
                );
              })}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              لا تقلق، ستتمكن من إضافة المزيد من لوحة التحكم لاحقاً
            </p>

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                إلغاء
              </Button>
              <Button
                variant="gradient"
                onClick={handleNext}
                disabled={!selectedPlatform}
              >
                التالي
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
            </div>
          </div>
        ) : (
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
                placeholder={getPlaceholderUrl()}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                dir="ltr"
              />
            </div>

            <div className="flex gap-3 justify-between pt-2">
              {!editLink && (
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowRight className="w-4 h-4 ml-1" />
                  رجوع
                </Button>
              )}
              <div className="flex gap-3 mr-auto">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  إلغاء
                </Button>
                <Button variant="gradient" onClick={handleSave}>
                  {editLink ? "حفظ التعديلات" : "إضافة"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
