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
];

export const getThemeConfig = (themeId: string): ThemeConfig => {
  return themeConfigs.find((t) => t.id === themeId) || themeConfigs[0];
};
