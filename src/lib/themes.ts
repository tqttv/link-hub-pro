export interface ThemeConfig {
  id: string;
  name: string;
  // Preview in dashboard
  previewBg: string;
  previewAccent: string;
  // Applied styles on profile page
  pageBg: string;
  pageTextColor: string;
  pageSubTextColor: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardTextColor: string;
  avatarBorder: string;
  glowColor: string;
  linkShadow: string;
  linkHoverShadow: string;
  bgDecoration1: string;
  bgDecoration2: string;
  footerColor: string;
}

export const themeConfigs: ThemeConfig[] = [
  {
    id: "dark",
    name: "داكن",
    previewBg: "bg-[hsl(224,71%,4%)]",
    previewAccent: "bg-[hsl(187,94%,43%)]",
    pageBg: "bg-[hsl(224,71%,4%)]",
    pageTextColor: "text-[hsl(213,31%,91%)]",
    pageSubTextColor: "text-[hsl(215,20%,65%)]",
    cardBg: "bg-[hsl(224,71%,8%)]",
    cardBorder: "border-[hsl(216,34%,17%)]",
    cardHoverBorder: "hover:border-[hsl(187,94%,43%,0.5)]",
    cardTextColor: "text-[hsl(213,31%,91%)]",
    avatarBorder: "border-[hsl(187,94%,43%,0.3)]",
    glowColor: "from-[hsl(187,94%,43%)] to-[hsl(270,67%,47%)]",
    linkShadow: "shadow-[0_2px_12px_-2px_hsl(187,94%,43%,0.3)]",
    linkHoverShadow: "hover:shadow-[0_8px_30px_-4px_hsl(187,94%,43%,0.5)]",
    bgDecoration1: "bg-[hsl(187,94%,43%,0.08)]",
    bgDecoration2: "bg-[hsl(270,67%,47%,0.08)]",
    footerColor: "text-[hsl(215,20%,65%)]",
  },
  {
    id: "light",
    name: "فاتح",
    previewBg: "bg-white",
    previewAccent: "bg-[hsl(270,67%,47%)]",
    pageBg: "bg-[hsl(0,0%,98%)]",
    pageTextColor: "text-[hsl(222,47%,11%)]",
    pageSubTextColor: "text-[hsl(220,9%,46%)]",
    cardBg: "bg-white",
    cardBorder: "border-[hsl(220,13%,91%)]",
    cardHoverBorder: "hover:border-[hsl(270,67%,47%,0.5)]",
    cardTextColor: "text-[hsl(222,47%,11%)]",
    avatarBorder: "border-[hsl(270,67%,47%,0.3)]",
    glowColor: "from-[hsl(270,67%,47%)] to-[hsl(187,94%,43%)]",
    linkShadow: "shadow-[0_2px_12px_-2px_hsl(220,13%,70%,0.3)]",
    linkHoverShadow: "hover:shadow-[0_8px_30px_-4px_hsl(270,67%,47%,0.3)]",
    bgDecoration1: "bg-[hsl(270,67%,47%,0.05)]",
    bgDecoration2: "bg-[hsl(187,94%,43%,0.05)]",
    footerColor: "text-[hsl(220,9%,46%)]",
  },
  {
    id: "gradient",
    name: "متدرج",
    previewBg: "bg-gradient-to-br from-[hsl(187,94%,43%)] to-[hsl(270,67%,47%)]",
    previewAccent: "bg-white",
    pageBg: "bg-gradient-to-br from-[hsl(187,94%,35%)] via-[hsl(230,60%,40%)] to-[hsl(270,67%,40%)]",
    pageTextColor: "text-white",
    pageSubTextColor: "text-white/70",
    cardBg: "bg-white/15 backdrop-blur-md",
    cardBorder: "border-white/20",
    cardHoverBorder: "hover:border-white/40",
    cardTextColor: "text-white",
    avatarBorder: "border-white/40",
    glowColor: "from-white/30 to-white/10",
    linkShadow: "shadow-[0_2px_12px_-2px_hsl(0,0%,100%,0.15)]",
    linkHoverShadow: "hover:shadow-[0_8px_30px_-4px_hsl(0,0%,100%,0.25)]",
    bgDecoration1: "bg-white/5",
    bgDecoration2: "bg-white/5",
    footerColor: "text-white/50",
  },
  {
    id: "minimal",
    name: "بسيط",
    previewBg: "bg-[hsl(220,14%,96%)]",
    previewAccent: "bg-[hsl(222,47%,11%)]",
    pageBg: "bg-[hsl(0,0%,100%)]",
    pageTextColor: "text-[hsl(222,47%,11%)]",
    pageSubTextColor: "text-[hsl(220,9%,46%)]",
    cardBg: "bg-transparent",
    cardBorder: "border-[hsl(222,47%,11%)]",
    cardHoverBorder: "hover:border-[hsl(222,47%,11%)]",
    cardTextColor: "text-[hsl(222,47%,11%)]",
    avatarBorder: "border-[hsl(222,47%,11%,0.2)]",
    glowColor: "from-[hsl(222,47%,11%,0.1)] to-[hsl(222,47%,11%,0.05)]",
    linkShadow: "shadow-none",
    linkHoverShadow: "hover:shadow-[0_4px_12px_-2px_hsl(222,47%,11%,0.15)]",
    bgDecoration1: "bg-transparent",
    bgDecoration2: "bg-transparent",
    footerColor: "text-[hsl(220,9%,46%)]",
  },
  {
    id: "neon",
    name: "نيون",
    previewBg: "bg-[hsl(260,20%,8%)]",
    previewAccent: "bg-[hsl(140,100%,50%)]",
    pageBg: "bg-[hsl(260,20%,6%)]",
    pageTextColor: "text-[hsl(140,100%,85%)]",
    pageSubTextColor: "text-[hsl(140,40%,55%)]",
    cardBg: "bg-[hsl(260,20%,10%)]",
    cardBorder: "border-[hsl(140,100%,50%,0.3)]",
    cardHoverBorder: "hover:border-[hsl(140,100%,50%,0.7)]",
    cardTextColor: "text-[hsl(140,100%,90%)]",
    avatarBorder: "border-[hsl(140,100%,50%,0.5)]",
    glowColor: "from-[hsl(140,100%,50%)] to-[hsl(280,100%,60%)]",
    linkShadow: "shadow-[0_2px_16px_-2px_hsl(140,100%,50%,0.4)]",
    linkHoverShadow: "hover:shadow-[0_8px_40px_-4px_hsl(140,100%,50%,0.6)]",
    bgDecoration1: "bg-[hsl(140,100%,50%,0.06)]",
    bgDecoration2: "bg-[hsl(280,100%,60%,0.06)]",
    footerColor: "text-[hsl(140,40%,45%)]",
  },
  {
    id: "classic",
    name: "كلاسيكي",
    previewBg: "bg-[hsl(35,30%,92%)]",
    previewAccent: "bg-[hsl(25,60%,35%)]",
    pageBg: "bg-[hsl(35,30%,90%)]",
    pageTextColor: "text-[hsl(25,40%,18%)]",
    pageSubTextColor: "text-[hsl(25,25%,42%)]",
    cardBg: "bg-[hsl(35,35%,95%)]",
    cardBorder: "border-[hsl(25,30%,75%)]",
    cardHoverBorder: "hover:border-[hsl(25,60%,45%,0.6)]",
    cardTextColor: "text-[hsl(25,40%,18%)]",
    avatarBorder: "border-[hsl(25,60%,45%,0.4)]",
    glowColor: "from-[hsl(25,60%,45%)] to-[hsl(35,50%,55%)]",
    linkShadow: "shadow-[0_2px_12px_-2px_hsl(25,30%,50%,0.2)]",
    linkHoverShadow: "hover:shadow-[0_8px_24px_-4px_hsl(25,60%,45%,0.3)]",
    bgDecoration1: "bg-[hsl(25,60%,45%,0.06)]",
    bgDecoration2: "bg-[hsl(35,50%,55%,0.06)]",
    footerColor: "text-[hsl(25,25%,50%)]",
  },
  {
    id: "nature",
    name: "طبيعي",
    previewBg: "bg-[hsl(150,25%,18%)]",
    previewAccent: "bg-[hsl(90,50%,55%)]",
    pageBg: "bg-[hsl(150,25%,14%)]",
    pageTextColor: "text-[hsl(90,30%,88%)]",
    pageSubTextColor: "text-[hsl(120,15%,60%)]",
    cardBg: "bg-[hsl(150,20%,20%)]",
    cardBorder: "border-[hsl(120,25%,30%)]",
    cardHoverBorder: "hover:border-[hsl(90,50%,55%,0.6)]",
    cardTextColor: "text-[hsl(90,30%,90%)]",
    avatarBorder: "border-[hsl(90,50%,55%,0.4)]",
    glowColor: "from-[hsl(90,50%,55%)] to-[hsl(160,40%,45%)]",
    linkShadow: "shadow-[0_2px_12px_-2px_hsl(90,50%,55%,0.25)]",
    linkHoverShadow: "hover:shadow-[0_8px_30px_-4px_hsl(90,50%,55%,0.4)]",
    bgDecoration1: "bg-[hsl(90,50%,55%,0.07)]",
    bgDecoration2: "bg-[hsl(160,40%,45%,0.07)]",
    footerColor: "text-[hsl(120,15%,50%)]",
  },
];

export const getThemeConfig = (themeId: string): ThemeConfig => {
  return themeConfigs.find((t) => t.id === themeId) || themeConfigs[0];
};
