import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Link2, 
  BarChart3, 
  Palette, 
  Settings, 
  Eye,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", href: "/dashboard" },
  { icon: Link2, label: "الروابط", href: "/dashboard/links" },
  { icon: BarChart3, label: "الإحصائيات", href: "/dashboard/analytics" },
  { icon: Palette, label: "المظهر", href: "/dashboard/appearance" },
  { icon: Settings, label: "الإعدادات", href: "/dashboard/settings" },
];

export const DashboardSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-card border-l border-border p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-xl font-bold font-heading text-gradient">
          🔗 LinkTree
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/dashboard"}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground"
            )}
            activeClassName="bg-primary/10 text-primary font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Preview & Logout */}
      <div className="space-y-2 pt-4 border-t border-border">
        <NavLink
          to="/preview"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground"
        >
          <Eye className="w-5 h-5" />
          <span>معاينة</span>
        </NavLink>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};
