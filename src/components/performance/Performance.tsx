import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Award
} from 'lucide-react';
import { cn } from '../../lib/utils';

const managerPerformanceData = [
  { name: 'Sarah M.', jobs: 12, revenue: 45000, rating: 4.8, efficiency: 94 },
  { name: 'Mike F.', jobs: 10, revenue: 38000, rating: 4.9, efficiency: 91 },
  { name: 'Alex W.', jobs: 15, revenue: 52000, rating: 4.6, efficiency: 88 },
  { name: 'John D.', jobs: 8, revenue: 24000, rating: 4.7, efficiency: 96 },
];

const projectStatusData = [
  { name: 'Ahead', value: 3, color: '#10b981' },
  { name: 'On Track', value: 8, color: '#3b82f6' },
  { name: 'Delayed', value: 2, color: '#f59e0b' },
  { name: 'Paused', value: 1, color: '#ef4444' },
];

const efficiencyTrend = [
  { month: 'Jan', efficiency: 88, target: 90 },
  { month: 'Feb', efficiency: 86, target: 90 },
  { month: 'Mar', efficiency: 92, target: 90 },
  { month: 'Apr', efficiency: 94, target: 90 },
  { month: 'May', efficiency: 91, target: 90 },
  { month: 'Jun', efficiency: 95, target: 90 },
];

export default function Performance() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-main tracking-tight">Performance Analytics</h1>
        <p className="text-text-muted text-sm font-medium">Real-time operational health and efficiency metrics.</p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Overall Efficiency', value: '92.4%', change: '+3.2%', up: true, icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg Client Rating', value: '4.85', change: '+0.1', up: true, icon: Star, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'On-Time Completion', value: '88%', change: '-2.4%', up: false, icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Upsell Conversion', value: '18.5%', change: '+1.2%', up: true, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-border-theme shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-xl", kpi.bg)}>
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
              <div className={cn("flex items-center text-xs font-bold", kpi.up ? "text-green-600" : "text-red-500")}>
                {kpi.up ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {kpi.change}
              </div>
            </div>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-text-main mt-1">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Efficiency Trend Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-border-theme shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-text-main">Efficiency Trend</h3>
              <p className="text-xs text-text-muted">Operational efficiency vs. 90% benchmark</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-[10px] font-bold text-text-muted uppercase">Actual</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="text-[10px] font-bold text-text-muted uppercase">Target</span>
              </div>
            </div>
          </div>
          
          <div className="w-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={efficiencyTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
                  dx={-10}
                  domain={[80, 100]}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="var(--color-primary)" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#e2e8f0" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Health Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-border-theme shadow-sm">
          <h3 className="text-lg font-bold text-text-main mb-2">Project Health</h3>
          <p className="text-xs text-text-muted mb-6">Current active job distribution</p>
          
          <div className="w-full relative">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center annotation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-4">
              <span className="text-2xl font-black text-text-main">14</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {projectStatusData.map(item => (
              <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-bold text-text-muted uppercase transition-colors">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-text-main">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="bg-white rounded-3xl border border-border-theme shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-theme flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-bold text-text-main">Management Leaderboard</h3>
          </div>
          <button className="text-xs font-bold text-primary uppercase tracking-wider hover:underline">View Detailed Rankings</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Manager</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Jobs (MTD)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right">Revenue Contrib.</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-center">Avg Rating</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Efficiency</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-theme">
              {managerPerformanceData.map((manager, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-200">
                        {manager.name.charAt(0)}
                      </div>
                      <span className="font-bold text-sm text-text-main">{manager.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-text-main">{manager.jobs}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="text-sm font-bold text-text-main">${manager.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-3 h-3 text-orange-400 fill-current" />
                      <span className="text-sm font-bold text-text-main">{manager.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            manager.efficiency > 90 ? "bg-green-500" : "bg-blue-500"
                          )} 
                          style={{ width: `${manager.efficiency}%` }} 
                        />
                      </div>
                      <span className="text-xs font-bold text-text-muted w-8">{manager.efficiency}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2 text-green-600 font-bold text-xs">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>{Math.floor(Math.random() * 8) + 2}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="px-2 py-1 bg-blue-500/20 rounded text-[10px] font-bold text-blue-400 uppercase tracking-widest border border-blue-500/30">
                AI Insight
              </div>
              <span className="text-xs font-medium text-slate-400 tracking-tighter italic font-mono underline underline-offset-4 decoration-slate-700">
                Performance optimization triggered
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-3 tracking-tight">Manager Upsell Opportunity</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Based on historical data, **Mike Foreman** has a high job site satisfaction but lower upsell conversion compared to your top earners. Training Mike on the **"Value-Added Services"** SOP could potentially increase your Q2 revenue by 12%.
            </p>
            <button className="px-6 py-3 bg-white text-slate-900 rounded-xl text-xs font-bold hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-white/5">
              Review Recommended Training
            </button>
          </div>
          
          <div className="hidden md:flex justify-end">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-[60px] opacity-20" />
              <div className="relative w-full h-full border-2 border-slate-800 rounded-full flex flex-col items-center justify-center space-y-2 p-4 bg-slate-900/50 backdrop-blur-sm">
                <div className="text-4xl font-black text-white">+$5.2k</div>
                <div className="text-[10px] font-bold text-blue-400 uppercase text-center tracking-widest">Potential Monthly Increase</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background purely aesthetic grid */}
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-5">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
      </div>
    </div>
  );
}
