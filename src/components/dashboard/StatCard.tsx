import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: string;
}

export default function StatCard({ label, value, subtext, icon: Icon, trend, color }: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 rounded-xl border border-border-theme shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div 
          className={cn("p-2 rounded-lg bg-slate-50", color)}
        >
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={cn(
            "text-[11px] font-bold",
            trend.isUp ? "text-accent-green" : "text-red-500"
          )}>
            {trend.isUp ? '+' : '-'}{trend.value}%
          </div>
        )}
      </div>
      <div>
        <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-text-main tracking-tight">{value}</h3>
        {subtext && <p className="text-xs text-text-muted mt-2 font-medium">{subtext}</p>}
      </div>
    </motion.div>
  );
}
