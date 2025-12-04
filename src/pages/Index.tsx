import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Link2, Sparkles, BarChart3, Palette, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const features = [
  {
    icon: Link2,
    title: "روابط غير محدودة",
    description: "أضف جميع روابطك في مكان واحد بسهولة تامة",
  },
  {
    icon: BarChart3,
    title: "إحصائيات متقدمة",
    description: "تتبع نقرات روابطك ومشاهدات صفحتك بالتفصيل",
  },
  {
    icon: Palette,
    title: "تخصيص كامل",
    description: "خصص مظهر صفحتك ليعكس شخصيتك الفريدة",
  },
];

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen gradient-hero" dir="rtl">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold font-heading text-gradient">LinkTree</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button variant="gradient">لوحة التحكم</Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost">تسجيل الدخول</Button>
                </Link>
                <Link to="/auth">
                  <Button variant="gradient">ابدأ الآن</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>أنشئ صفحتك مجاناً</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-heading text-foreground mb-6 leading-tight"
          >
            كل روابطك في
            <span className="text-gradient"> مكان واحد</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
          >
            أنشئ صفحة شخصية احترافية تجمع كل روابطك المهمة وشاركها مع جمهورك بسهولة
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button variant="gradient" size="xl" className="group">
                {user ? "لوحة التحكم" : "ابدأ الآن مجاناً"}
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
            كل ما تحتاجه للنجاح
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            أدوات قوية وسهلة الاستخدام لمساعدتك في بناء حضورك الرقمي
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-link-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gradient-primary rounded-3xl p-10 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-foreground mb-4">
            جاهز لإنشاء صفحتك؟
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            انضم لآلاف المبدعين الذين يستخدمون منصتنا لمشاركة روابطهم
          </p>
          <Link to={user ? "/dashboard" : "/auth"}>
            <Button 
              size="xl" 
              className="bg-background text-foreground hover:bg-background/90 font-semibold"
            >
              {user ? "افتح لوحة التحكم" : "أنشئ صفحتك الآن"}
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 LinkTree. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
