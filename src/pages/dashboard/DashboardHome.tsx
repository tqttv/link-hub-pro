import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProfile } from "@/data/mockData";
import { Eye, MousePointer, Link2, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "مشاهدات الصفحة",
    value: "2,847",
    change: "+12.5%",
    icon: Eye,
    color: "text-primary",
  },
  {
    title: "نقرات الروابط",
    value: "5,097",
    change: "+8.2%",
    icon: MousePointer,
    color: "text-secondary",
  },
  {
    title: "عدد الروابط",
    value: mockProfile.links.length.toString(),
    change: "نشط",
    icon: Link2,
    color: "text-green-500",
  },
  {
    title: "معدل النقر",
    value: "18.3%",
    change: "+3.1%",
    icon: TrendingUp,
    color: "text-orange-500",
  },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">
          مرحباً، {mockProfile.displayName} 👋
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
                  <span className="text-green-500">{stat.change}</span> من الشهر الماضي
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
          <div className="space-y-4">
            {mockProfile.links
              .filter(l => l.isActive)
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
