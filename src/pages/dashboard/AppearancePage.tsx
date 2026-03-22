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
import { Camera, Check, Loader2, Eye } from "lucide-react";
import { toast } from "sonner";
import { themeConfigs } from "@/lib/themes";
import ThemePreview from "@/components/dashboard/ThemePreview";

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
      setAvatarUrl(profile.avatar_url || "");
    }
  }, [profile]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("يرجى اختيار ملف صورة");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم الصورة يجب أن يكون أقل من 2 ميجابايت");
      return;
    }

    setIsUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("حدث خطأ أثناء رفع الصورة");
      setIsUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const newUrl = `${publicUrl}?t=${Date.now()}`;
    const { error: updateError } = await updateProfile({ avatar_url: newUrl });

    if (updateError) {
      toast.error("حدث خطأ أثناء تحديث الصورة");
    } else {
      setAvatarUrl(newUrl);
      toast.success("تم تحديث الصورة بنجاح");
    }
    setIsUploading(false);
  };

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
      toast.success("تم حفظ التغييرات بنجاح — سيتم تطبيق المظهر على صفحتك الشخصية");
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">المظهر</h1>
          <p className="text-muted-foreground">خصص مظهر صفحتك الشخصية</p>
        </div>
        {username && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`/${username}`, "_blank")}
          >
            <Eye className="w-4 h-4 ml-2" />
            معاينة الصفحة
          </Button>
        )}
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
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="text-2xl font-bold">
                      {displayName?.charAt(0) || "م"}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
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
              <p className="text-sm text-muted-foreground">المظهر المختار سيُطبق على صفحتك الشخصية العامة</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {themeConfigs.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`relative p-3 rounded-xl transition-all duration-200 ${
                      selectedTheme === theme.id
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]"
                        : "hover:scale-105 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className={`h-36 rounded-lg ${theme.previewBg} flex flex-col items-center justify-center gap-2 p-4 overflow-hidden relative`}>
                      {/* Mini preview of the theme */}
                      <div className={`w-10 h-10 rounded-full ${theme.previewAccent} opacity-80`} />
                      <div className={`w-3/4 h-3 rounded-full ${theme.previewAccent}`} />
                      <div className={`w-3/4 h-3 rounded-full ${theme.previewAccent} opacity-60`} />
                      <div className={`w-3/4 h-3 rounded-full ${theme.previewAccent} opacity-40`} />
                    </div>
                    <p className="text-sm font-medium text-foreground mt-2">{theme.name}</p>
                    {selectedTheme === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading">معاينة حية</CardTitle>
              <p className="text-sm text-muted-foreground">هكذا ستبدو صفحتك الشخصية بالمظهر المختار</p>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-sm">
                <ThemePreview
                  themeId={selectedTheme}
                  displayName={displayName}
                  bio={bio}
                  avatarUrl={avatarUrl}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AppearancePage;
