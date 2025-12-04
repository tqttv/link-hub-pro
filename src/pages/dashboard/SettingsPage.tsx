import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Shield, Bell, Globe, Trash2 } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const handleSave = () => {
    toast.success("تم حفظ الإعدادات");
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">الإعدادات</h1>
        <p className="text-muted-foreground">أدر إعدادات حسابك وصفحتك</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <CardTitle className="font-heading">إعدادات الحساب</CardTitle>
                  <CardDescription>تحكم في معلومات حسابك الأساسية</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input type="email" defaultValue="ahmed@example.com" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>كلمة المرور</Label>
                <Input type="password" defaultValue="********" dir="ltr" />
              </div>
              <Button variant="outline" onClick={handleSave}>
                تحديث الحساب
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <CardTitle className="font-heading">الإشعارات</CardTitle>
                  <CardDescription>تحكم في طريقة تلقي الإشعارات</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">تقارير أسبوعية</p>
                  <p className="text-sm text-muted-foreground">استلم تقريراً أسبوعياً عن أداء صفحتك</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">نقرات جديدة</p>
                  <p className="text-sm text-muted-foreground">إشعار عند كل 100 نقرة جديدة</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">تحديثات المنتج</p>
                  <p className="text-sm text-muted-foreground">أخبار عن الميزات الجديدة</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <CardTitle className="font-heading">الخصوصية</CardTitle>
                  <CardDescription>تحكم في خصوصية صفحتك</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">صفحة عامة</p>
                  <p className="text-sm text-muted-foreground">اجعل صفحتك مرئية للجميع</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">إخفاء الإحصائيات</p>
                  <p className="text-sm text-muted-foreground">أخفِ عدد النقرات من الزوار</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-card border-destructive/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-destructive" />
                <div>
                  <CardTitle className="font-heading text-destructive">منطقة الخطر</CardTitle>
                  <CardDescription>إجراءات لا يمكن التراجع عنها</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">
                حذف الحساب نهائياً
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
