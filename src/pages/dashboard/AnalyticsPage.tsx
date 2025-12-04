import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const clicksData = [
  { day: "السبت", clicks: 120 },
  { day: "الأحد", clicks: 150 },
  { day: "الإثنين", clicks: 200 },
  { day: "الثلاثاء", clicks: 180 },
  { day: "الأربعاء", clicks: 220 },
  { day: "الخميس", clicks: 190 },
  { day: "الجمعة", clicks: 250 },
];

const viewsData = [
  { day: "السبت", views: 450 },
  { day: "الأحد", views: 520 },
  { day: "الإثنين", views: 680 },
  { day: "الثلاثاء", views: 620 },
  { day: "الأربعاء", views: 750 },
  { day: "الخميس", views: 590 },
  { day: "الجمعة", views: 820 },
];

const deviceData = [
  { name: "موبايل", value: 68, color: "hsl(187, 94%, 43%)" },
  { name: "كمبيوتر", value: 25, color: "hsl(270, 67%, 47%)" },
  { name: "تابلت", value: 7, color: "hsl(142, 76%, 36%)" },
];

const locationData = [
  { country: "السعودية", visits: 1250 },
  { country: "مصر", visits: 890 },
  { country: "الإمارات", visits: 650 },
  { country: "الكويت", visits: 420 },
  { country: "المغرب", visits: 380 },
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">الإحصائيات</h1>
        <p className="text-muted-foreground">تتبع أداء روابطك وصفحتك</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading">نقرات الروابط (آخر 7 أيام)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={clicksData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      background: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="clicks" fill="hsl(187, 94%, 43%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Views Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading">مشاهدات الصفحة (آخر 7 أيام)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      background: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="hsl(270, 67%, 47%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(270, 67%, 47%)", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Device Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading">نوع الجهاز</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {deviceData.map((device) => (
                  <div key={device.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ background: device.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {device.name} ({device.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading">أهم المواقع الجغرافية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationData.map((loc, index) => (
                  <div key={loc.country} className="flex items-center gap-4">
                    <span className="text-lg font-bold text-muted-foreground w-6">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-foreground">{loc.country}</span>
                        <span className="text-muted-foreground">{loc.visits}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-primary rounded-full"
                          style={{ width: `${(loc.visits / locationData[0].visits) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
