import React from 'react';
import StatCard from './StatCard';
import { 
  Users, 
  Briefcase, 
  AlertCircle, 
  DollarSign, 
  TrendingUp,
  Clock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';

const data = [
  { name: 'Mon', revenue: 4000, jobs: 24 },
  { name: 'Tue', revenue: 3000, jobs: 13 },
  { name: 'Wed', revenue: 2000, jobs: 98 },
  { name: 'Thu', revenue: 2780, jobs: 39 },
  { name: 'Fri', revenue: 1890, jobs: 48 },
  { name: 'Sat', revenue: 2390, jobs: 38 },
  { name: 'Sun', revenue: 3490, jobs: 43 },
];

export default function OwnerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Business Overview</h2>
        <p className="text-gray-500 font-medium">Real-time health of your company operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Active Jobs" 
          value={12} 
          icon={Briefcase} 
          trend={{ value: 8, isUp: true }}
          subtext="4 starting tomorrow"
          color="text-blue-600"
        />
        <StatCard 
          label="Field Crew" 
          value={34} 
          icon={Users} 
          subtext="85% attendance today"
          color="text-green-600"
        />
        <StatCard 
          label="Delayed Jobs" 
          value={2} 
          icon={AlertCircle} 
          trend={{ value: 50, isUp: false }}
          subtext="Action required"
          color="text-red-600"
        />
        <StatCard 
          label="Revenue (MTD)" 
          value="$142,500" 
          icon={DollarSign} 
          trend={{ value: 12, isUp: true }}
          color="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Revenue Growth</h3>
              <p className="text-sm text-gray-500">Weekly financial performance</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 text-xs font-bold bg-primary text-white rounded-lg">Revenue</button>
              <button className="px-3 py-1.5 text-xs font-bold bg-gray-100 text-gray-500 rounded-lg">Jobs</button>
            </div>
          </div>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Unread Manager Reports</h3>
          <div className="space-y-4">
            {[
              { id: 1, name: 'Mike Robinson', job: '42 Maple St', time: '2h ago', status: 'CRITICAL' },
              { id: 2, name: 'Sarah Chen', job: '81 Pine Ave', time: '4h ago', status: 'NORMAL' },
              { id: 3, name: 'Dave Wilson', job: '17 Main St', time: '6h ago', status: 'NOTICE' },
            ].map(report => (
              <div key={report.id} className="flex items-start space-x-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className={cn(
                  "mt-1 w-2 h-2 rounded-full",
                  report.status === 'CRITICAL' ? "bg-red-500" : report.status === 'NOTICE' ? "bg-orange-500" : "bg-blue-500"
                )}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{report.name}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-tighter font-semibold">{report.job}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-bold">{report.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors">
            View All Reports
          </button>
        </div>
      </div>
    </div>
  );
}
