import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Link2, Mail, Lock, User, AtSign } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل").max(20, "اسم المستخدم يجب أن يكون أقل من 20 حرف").regex(/^[a-zA-Z0-9_]+$/, "اسم المستخدم يجب أن يحتوي على أحرف إنجليزية وأرقام فقط"),
  displayName: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(50, "الاسم يجب أن يكون أقل من 50 حرف"),
});

const signInSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const validation = signInSchema.safeParse({ email, password });
        if (!validation.success) {
          toast.error(validation.error.errors[0].message);
          setIsLoading(false);
          return;
        }

        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
          } else {
            toast.error("حدث خطأ أثناء تسجيل الدخول");
          }
        } else {
          toast.success("تم تسجيل الدخول بنجاح!");
          navigate("/dashboard");
        }
      } else {
        const validation = signUpSchema.safeParse({ email, password, username, displayName });
        if (!validation.success) {
          toast.error(validation.error.errors[0].message);
          setIsLoading(false);
          return;
        }

        // Check if username is already taken
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("id")
          .eq("username", username)
          .maybeSingle();

        if (existingProfile) {
          toast.error("اسم المستخدم مستخدم بالفعل، اختر اسمًا آخر");
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password, username, displayName);
        if (error) {
          if (error.message.includes("User already registered")) {
            toast.error("البريد الإلكتروني مسجل مسبقاً");
          } else {
            toast.error("حدث خطأ أثناء إنشاء الحساب: " + error.message);
          }
        } else {
          toast.success("تم إنشاء الحساب بنجاح!");
          navigate("/dashboard");
        }
      }
    } catch (err) {
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4" dir="rtl">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Link2 className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold font-heading text-gradient">Linke One</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-foreground">
            {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? "مرحباً بعودتك!" : "انضم إلينا اليوم"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="displayName">الاسم المعروض</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="أحمد محمد"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">اسم المستخدم</Label>
                  <div className="relative">
                    <AtSign className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="ahmed_dev"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pr-10"
                      dir="ltr"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    سيظهر في رابط صفحتك: linkeone.com/{username || "username"}
                  </p>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  dir="ltr"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="gradient" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "جاري التحميل..." : (isLogin ? "تسجيل الدخول" : "إنشاء حساب")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? (
                <>ليس لديك حساب؟ <span className="text-primary font-medium">أنشئ حساباً</span></>
              ) : (
                <>لديك حساب بالفعل؟ <span className="text-primary font-medium">سجل دخولك</span></>
              )}
            </button>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← العودة للصفحة الرئيسية
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
