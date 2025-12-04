import { UserProfile } from "@/types";

export const mockProfile: UserProfile = {
  id: "1",
  username: "ahmed_dev",
  displayName: "أحمد المطور",
  bio: "مطور ويب ومصمم | أشارك محتوى تقني وإبداعي 🚀",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  theme: "dark",
  links: [
    {
      id: "1",
      title: "🎬 قناتي على يوتيوب",
      url: "https://youtube.com",
      isActive: true,
      clicks: 1234,
      order: 1,
    },
    {
      id: "2", 
      title: "💼 ملفي الشخصي",
      url: "https://portfolio.com",
      isActive: true,
      clicks: 856,
      order: 2,
    },
    {
      id: "3",
      title: "📚 دوراتي التعليمية",
      url: "https://courses.com",
      isActive: true,
      clicks: 2341,
      order: 3,
    },
    {
      id: "4",
      title: "🛒 متجري الإلكتروني",
      url: "https://shop.com",
      isActive: true,
      clicks: 543,
      order: 4,
    },
    {
      id: "5",
      title: "📱 تطبيقي الجديد",
      url: "https://app.com",
      isActive: false,
      clicks: 123,
      order: 5,
    },
  ],
  socialLinks: [
    { id: "1", platform: "instagram", url: "https://instagram.com" },
    { id: "2", platform: "twitter", url: "https://twitter.com" },
    { id: "3", platform: "youtube", url: "https://youtube.com" },
    { id: "4", platform: "tiktok", url: "https://tiktok.com" },
    { id: "5", platform: "github", url: "https://github.com" },
  ],
};
