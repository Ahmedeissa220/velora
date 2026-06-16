import { useState, useEffect } from "react";
import { Loader2, TrendingUp, DollarSign, Users, ShoppingCart, RefreshCw } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend,
  LineChart, Line,
  PieChart, Pie, Cell
} from "recharts";

import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let unsubscribeOrders;
    let unsubscribeUsers;

    const fetchData = () => {
      let ordersData = [];
      let usersData = [];

      let ordersLoaded = false;
      let usersLoaded = false;

      const computeAnalytics = () => {
        if (!ordersLoaded || !usersLoaded) return;

        const totalRevenue = ordersData.reduce((acc, order) => acc + (Number(order.total) || 0), 0);
        const totalOrders = ordersData.length;
        const activeUsers = usersData.filter((u) => u.status === "Active").length;
        
        // Mock historical data blended with real current data
        const revenueData = [
          { name: 'Jan', revenue: 4000 },
          { name: 'Feb', revenue: 3000 },
          { name: 'Mar', revenue: 5000 },
          { name: 'Apr', revenue: 4500 },
          { name: 'May', revenue: 6000 },
          { name: 'Jun', revenue: 7000 },
          { name: 'Jul (Current)', revenue: Math.max(8500, totalRevenue) },
        ];

        // Aggregate category data from actual ordered items
        const categoryMap = {};
        ordersData.forEach(order => {
          if (order.items) {
            order.items.forEach(item => {
              // We'll use title/name as pseudo-category if category isn't on the item
              const cat = item.category || "General";
              categoryMap[cat] = (categoryMap[cat] || 0) + (Number(item.price) * (item.qty || 1));
            });
          }
        });
        
        let categoryData = Object.keys(categoryMap).map(key => ({
          name: key,
          sales: categoryMap[key]
        }));

        if (categoryData.length === 0) {
          categoryData = [
            { name: 'Electronics', sales: 4000 },
            { name: 'Clothing', sales: 3000 },
            { name: 'Home & Garden', sales: 2000 },
            { name: 'Sports', sales: 2780 },
          ];
        }

        const userGrowthData = [
          { name: 'Week 1', users: 100 },
          { name: 'Week 2', users: 150 },
          { name: 'Week 3', users: 220 },
          { name: 'Week 4', users: 310 },
          { name: 'Week 5 (Current)', users: Math.max(450, usersData.length) },
        ];

        const deviceData = [
          { name: 'Mobile', value: 55 },
          { name: 'Desktop', value: 35 },
          { name: 'Tablet', value: 10 },
        ];

        setData({
          revenueData,
          categoryData,
          userGrowthData,
          deviceData,
          kpis: {
            totalRevenue: `$${totalRevenue.toLocaleString()}`,
            totalOrders: totalOrders.toLocaleString(),
            activeUsers: activeUsers.toLocaleString(),
            conversionRate: "3.2%"
          }
        });
        setLoading(false);
      };

      unsubscribeOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
        ordersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        ordersLoaded = true;
        computeAnalytics();
      });

      unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
        usersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        usersLoaded = true;
        computeAnalytics();
      });
    };

    fetchData();

    return () => {
      if (unsubscribeOrders) unsubscribeOrders();
      if (unsubscribeUsers) unsubscribeUsers();
    };
  }, []);

  const fetchAnalyticsData = (isRefresh = false) => {
    // We already use real-time listeners, so manual refresh just triggers a slight UI loader effect
    if (isRefresh) {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Gathering analytics data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Analytics Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Detailed insights into your store's performance.</p>
        </div>
        <button 
          onClick={() => fetchAnalyticsData(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
        >
          <RefreshCw size={18} className="text-blue-500" />
          <span className="font-medium text-slate-700 dark:text-slate-200">Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
          <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-500/10 shadow-inner">
            <DollarSign size={24} className="text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Revenue</p>
            <h2 className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">{data?.kpis.totalRevenue}</h2>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
          <div className="p-4 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 shadow-inner">
            <ShoppingCart size={24} className="text-indigo-500 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Orders</p>
            <h2 className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">{data?.kpis.totalOrders}</h2>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
          <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 shadow-inner">
            <Users size={24} className="text-emerald-500 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Users</p>
            <h2 className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">{data?.kpis.activeUsers}</h2>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
          <div className="p-4 rounded-2xl bg-purple-100 dark:bg-purple-500/10 shadow-inner">
            <TrendingUp size={24} className="text-purple-500 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Conversion Rate</p>
            <h2 className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">{data?.kpis.conversionRate}</h2>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Area Chart */}
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Revenue Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <AreaChart data={data?.revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category Bar Chart */}
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Sales by Category</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={data?.categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#8b5cf6' }}
                  cursor={{fill: 'rgba(148, 163, 184, 0.1)'}}
                />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Growth Line Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">New User Registration Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <LineChart data={data?.userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Pie Chart */}
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Traffic Source by Device</h3>
          <div className="h-[250px] w-full flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <PieChart>
                <Pie
                  data={data?.deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data?.deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
