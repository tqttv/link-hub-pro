import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Camera, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

const themes = [
  { id: "dark", name: "داكن", bg: "bg-gray-900", accent: "bg-cyan-500" },
  { id: "light", name: "فاتح", bg: "bg-white border", accent: "bg-purple-500" },
  { id: "gradient", name: "متدرج", bg: "bg-gradient-to-br from-cyan-500 to-purple-500", accent: "bg-white" },
  { id: "minimal", name: "بسيط", bg: "bg-gray-100", accent: "bg-gray-900" },
];

const AppearancePage = () => {
  const { profile, loading, updateProfile } = useProfile();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name);
      setUsername(profile.username);
      setBio(profile.bio || "");
      setSelectedTheme(profile.theme || "dark");
    }
  }, [profile]);

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await updateProfile({
      display_name: displayName,
      bio,
      theme: selectedTheme,
    });
    setIsSaving(false);

    if (error) {
      toast.error("حدث خطأ أثناء حفظ التغييرات");
    } else {
      toast.success("تم حفظ التغييرات بنجاح");
    }
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">المظهر</h1>
        <p className="text-muted-foreground">خصص مظهر صفحتك الشخصية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading">معلومات الملف الشخصي</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-primary/30">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="text-2xl font-bold">
                      {displayName?.charAt(0) || "م"}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>الاسم المعروض</Label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>اسم المستخدم</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-r-none rounded-lg border border-l-0 border-input bg-muted text-muted-foreground text-sm">
                      linktr.ee/
                    </span>
                    <Input
                      value={username}
                      disabled
                      className="rounded-r-none"
                      dir="ltr"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">لا يمكن تغيير اسم المستخدم</p>
                </div>

                <div className="space-y-2">
                  <Label>النبذة التعريفية</Label>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <Button 
                variant="gradient" 
                className="w-full" 
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Theme Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading">اختر المظهر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`relative p-4 rounded-xl transition-all ${
                      selectedTheme === theme.id 
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                        : "hover:scale-105"
                    }`}
                  >
                    <div className={`h-32 rounded-lg ${theme.bg} flex flex-col items-center justify-center gap-2 p-4`}>
                      <div className="w-10 h-10 rounded-full bg-gray-400" />
                      <div className={`w-full h-3 rounded ${theme.accent}`} />
                      <div className={`w-full h-3 rounded ${theme.accent} opacity-60`} />
                    </div>
                    <p className="text-sm font-medium text-foreground mt-2">{theme.name}</p>
                    {selectedTheme === theme.id && (
                      <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AppearancePage;
