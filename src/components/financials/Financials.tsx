import React from 'react';
import { useRole } from '../../context/RoleContext';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Filter,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '../../lib/utils';

const chartData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 34000 },
  { month: 'Mar', revenue: 48000, expenses: 31000 },
  { month: 'Apr', revenue: 61000, expenses: 38000 },
  { month: 'May', revenue: 55000, expenses: 35000 },
  { month: 'Jun', revenue: 67000, expenses: 40000 },
];

const categoryData = [
  { name: 'Labor', value: 45, color: '#2563eb' },
  { name: 'Materials', value: 30, color: '#10b981' },
  { name: 'Equipment', value: 15, color: '#f59e0b' },
  { name: 'Overhead', value: 10, color: '#6366f1' },
];

const invoices = [
  { id: 'INV-001', client: 'Sarah Johnson', project: 'Kitchen Remodel', amount: 8500, status: 'PAID', date: '2026-04-12' },
  { id: 'INV-002', client: 'Robert Smith', project: 'Deck Repair', amount: 3200, status: 'PENDING', date: '2026-04-15' },
  { id: 'INV-003', client: 'Alice Brown', project: 'Interior Painting', amount: 4800, status: 'OVERDUE', date: '2026-04-05' },
  { id: 'INV-004', client: 'James Wilson', project: 'Full Flooring', amount: 12400, status: 'PARTIAL', date: '2026-04-10' },
];

const statusStyles = {
  PAID: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle2 },
  PENDING: { bg: 'bg-amber-50', text: 'text-amber-700', icon: Clock },
  OVERDUE: { bg: 'bg-red-50', text: 'text-red-700', icon: AlertCircle },
  PARTIAL: { bg: 'bg-blue-50', text: 'text-blue-700', icon: TrendingUp },
};

export default function Financials() {
  const { role } = useRole();

  const getPageConfig = () => {
    switch (role) {
      case 'OWNER':
        return {
          title: 'Financial Overview',
          subtitle: 'Real-time revenue, expense tracking, and profitability analysis.',
          primaryAction: 'Create Invoice',
          secondaryAction: 'Export CSV'
        };
      case 'MANAGER':
        return {
          title: 'Job Cost Analysis',
          subtitle: 'Monitor project budgets, labor distributions, and variance.',
          primaryAction: 'Review Budgets',
          secondaryAction: 'Cost Report'
        };
      case 'CREW_LEAD':
        return {
          title: 'Expense Management',
          subtitle: 'Track field spending, materials procurement, and fuel receipts.',
          primaryAction: 'Add Expense',
          secondaryAction: 'My Receipts'
        };
      case 'CLIENT':
        return {
          title: 'Billing & Invoices',
          subtitle: 'View your project billing history and pending payments.',
          primaryAction: 'Make Payment',
          secondaryAction: 'Tax Receipts'
        };
      default:
        return {
          title: 'Financials',
          subtitle: 'Accounting and financial oversight.',
          primaryAction: 'Report',
          secondaryAction: 'Export'
        };
    }
  };

  const config = getPageConfig();

  const getStats = () => {
    if (role === 'CLIENT') {
      return [
        { label: 'Total Billed', value: '$24,500', trend: 'Project Target', isPositive: true, icon: DollarSign },
        { label: 'Paid to Date', value: '$12,400', trend: '51%', isPositive: true, icon: CheckCircle2 },
        { label: 'Pending Payment', value: '$12,100', trend: 'Due in 5d', isPositive: false, icon: Clock },
      ];
    }
    if (role === 'CREW_LEAD') {
      return [
        { label: 'This Month', value: '$2,450', trend: 'Field Spend', isPositive: true, icon: DollarSign },
        { label: 'Pending Review', value: '$420', trend: '3 receipts', isPositive: false, icon: Clock },
        { label: 'Approved', value: '$2,030', trend: 'Processed', isPositive: true, icon: CheckCircle2 },
      ];
    }
    return [
      { label: 'Total Revenue', value: '$328,000', trend: '+12.5%', isPositive: true, icon: DollarSign },
      { label: 'Est. Net Profit', value: '$82,400', trend: '+8.2%', isPositive: true, icon: TrendingUp },
      { label: 'Accounts Receivable', value: '$45,200', trend: '-2.4%', isPositive: false, icon: Clock },
      { label: 'Monthly Burn', value: '$32,000', trend: '+3.1%', isPositive: false, icon: ArrowDownRight },
    ];
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">{config.title}</h1>
          <p className="text-text-muted text-sm mt-1">{config.subtitle}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-border-theme rounded-lg text-sm font-medium text-text-main hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2 text-text-muted" />
            {config.secondaryAction}
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-opacity-90 shadow-sm transition-all active:scale-95">
            {config.primaryAction}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={cn(
        "grid grid-cols-1 gap-6",
        role === 'OWNER' || role === 'MANAGER' ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
      )}>
        {getStats().map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className={cn("bg-white p-6 rounded-2xl border border-border-theme shadow-sm", role === 'CLIENT' ? "lg:col-span-3" : "lg:col-span-2")}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-text-main flex items-center">
              {role === 'CLIENT' ? 'Payment & Billing History' : 'Revenue vs Expenses'}
              <span className="ml-2 px-2 py-0.5 bg-slate-100 rounded text-[10px] text-text-muted uppercase tracking-wider">L6M</span>
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-text-muted">
                <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                {role === 'CLIENT' ? 'Total Billed' : 'Revenue'}
              </div>
              {role !== 'CLIENT' && (
                <div className="flex items-center text-xs text-text-muted">
                  <div className="w-2 h-2 rounded-full bg-red-400 mr-2" />
                  Expenses
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, '']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
                {role !== 'CLIENT' && (
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#f87171" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="transparent" 
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Categories - Hidden for Client */}
        {role !== 'CLIENT' && (
          <div className="bg-white p-6 rounded-2xl border border-border-theme shadow-sm">
            <h3 className="font-bold text-text-main mb-6">Expense Distribution</h3>
            <div className="space-y-5">
              {categoryData.map(cat => (
                <div key={cat.name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-bold text-text-main">{cat.name || 'Materials'}</span>
                    <span className="text-text-muted">{cat.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${cat.value}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-6 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Efficiency Insight</p>
                <p className="text-sm text-text-main leading-relaxed">
                  <span className="text-primary font-bold">Labor</span> costs are down 5% vs last month due to better crew scheduling.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white rounded-2xl border border-border-theme shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-theme flex items-center justify-between">
          <h3 className="font-bold text-text-main">
            {role === 'CLIENT' ? 'My Billing History' : 'Recent Invoices'}
          </h3>
          <button className="text-xs font-bold text-primary uppercase tracking-wider flex items-center hover:underline">
            View All Invoices
            <ChevronRight className="w-3 h-3 ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Client / Project</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider sr-only">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-theme">
              {invoices.map((inv) => {
                const style = statusStyles[inv.status as keyof typeof statusStyles];
                return (
                  <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono text-text-muted">{inv.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-text-main">{inv.client}</p>
                      <p className="text-xs text-text-muted">{inv.project}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-text-main">${inv.amount.toLocaleString()}</p>
                      <p className="text-[10px] text-text-muted">{inv.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-tight",
                        style.bg,
                        style.text
                      )}>
                        <style.icon className="w-3 h-3 mr-1.5" />
                        {inv.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-text-muted hover:text-text-main hover:bg-white rounded-lg transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, isPositive, icon: Icon }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-border-theme shadow-sm relative overflow-hidden group">
      <div className="flex items-center justify-between relative z-10">
        <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-primary transition-colors duration-300">
          <Icon className="w-5 h-5 text-text-muted group-hover:text-white transition-colors" />
        </div>
        <div className={cn(
          "flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold",
          isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
          {trend}
        </div>
      </div>
      <div className="mt-4 relative z-10">
        <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-text-main mt-1 tracking-tight">{value}</p>
      </div>
      {/* Subtle background decoration */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full opacity-50 group-hover:bg-primary/5 transition-all duration-300 pointer-events-none" />
    </div>
  );
}
