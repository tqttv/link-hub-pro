import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { useLinks } from "@/hooks/useLinks";
import { Eye, MousePointer, Link2, TrendingUp, Loader2 } from "lucide-react";

const DashboardHome = () => {
  const { profile, loading: profileLoading } = useProfile();
  const { links, loading: linksLoading } = useLinks();

  const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
  const activeLinks = links.filter(l => l.is_active).length;

  const stats = [
    {
      title: "مشاهدات الصفحة",
      value: "0",
      change: "جديد",
      icon: Eye,
      color: "text-primary",
    },
    {
      title: "نقرات الروابط",
      value: totalClicks.toLocaleString(),
      change: "إجمالي",
      icon: MousePointer,
      color: "text-secondary",
    },
    {
      title: "عدد الروابط",
      value: links.length.toString(),
      change: `${activeLinks} نشط`,
      icon: Link2,
      color: "text-green-500",
    },
    {
      title: "معدل النقر",
      value: "0%",
      change: "قريباً",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  if (profileLoading || linksLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">
          مرحباً، {profile?.display_name || "مستخدم"} 👋
        </h1>
        <p className="text-muted-foreground">
          إليك نظرة عامة على أداء صفحتك
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-card hover:shadow-link-hover transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">{stat.change}</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top Links */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading">الروابط الأكثر نقراً</CardTitle>
        </CardHeader>
        <CardContent>
          {links.length > 0 ? (
            <div className="space-y-4">
              {links
                .filter(l => l.is_active)
                .sort((a, b) => b.clicks - a.clicks)
                .slice(0, 5)
                .map((link, index) => (
                  <div key={link.id} className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-muted-foreground w-8">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{link.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-foreground">{link.clicks}</p>
                      <p className="text-xs text-muted-foreground">نقرة</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              لا توجد روابط بعد. أضف روابطك الأولى!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
