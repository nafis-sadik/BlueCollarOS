import React, { useState } from 'react';
import { 
  Truck, 
  Settings, 
  Search, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  MapPin,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface EquipmentAsset {
  id: string;
  name: string;
  type: 'VEHICLE' | 'HEAVY_MACHINERY' | 'POWER_TOOL';
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'OUT_OF_ORDER';
  lastService: string;
  location: string;
  assignedTo?: string;
}

const mockEquipment: EquipmentAsset[] = [
  { id: 'E1', name: 'Ford F-150 (Unit 102)', type: 'VEHICLE', status: 'IN_USE', lastService: '2026-03-01', location: '42 Maple St', assignedTo: 'Adam Robinson' },
  { id: 'E2', name: 'Bobcat T76 Compact Loader', type: 'HEAVY_MACHINERY', status: 'AVAILABLE', lastService: '2026-02-15', location: 'Main Warehouse' },
  { id: 'E3', name: 'Dewalt 20V Drill Set (Kit A)', type: 'POWER_TOOL', status: 'MAINTENANCE', lastService: '2026-04-10', location: 'Shop Bench' },
  { id: 'E4', name: 'Chevy Silverado (Unit 105)', type: 'VEHICLE', status: 'AVAILABLE', lastService: '2026-01-20', location: 'Main Warehouse' },
];

const statusConfig = {
  AVAILABLE: { label: 'Available', bg: 'bg-green-50 text-green-700', icon: CheckCircle2 },
  IN_USE: { label: 'In Use', bg: 'bg-blue-50 text-blue-700', icon: MapPin },
  MAINTENANCE: { label: 'Maintenance', bg: 'bg-amber-50 text-amber-700', icon: Settings },
  OUT_OF_ORDER: { label: 'Out of Order', bg: 'bg-red-50 text-red-700', icon: AlertTriangle },
};

export default function Equipment() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockEquipment.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Fleet & Equipment</h1>
          <p className="text-text-muted text-sm mt-1">Track assets, scheduling maintenance, and field assignments.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-border-theme rounded-lg text-sm font-medium text-text-main hover:bg-gray-50 transition-colors">
            Maintenance Log
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-opacity-90 shadow-sm transition-all active:scale-95">
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Assets', value: '42', icon: Truck, color: 'text-blue-600' },
          { label: 'In Field', value: '28', icon: MapPin, color: 'text-green-600' },
          { label: 'Due for Service', value: '3', icon: AlertTriangle, color: 'text-amber-600' },
          { label: 'Idle / Shop', value: '11', icon: Clock, color: 'text-slate-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-border-theme shadow-sm">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl font-bold text-text-main">{stat.value}</p>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border-theme shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/50 border-b border-border-theme">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search assets by name, tag, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border-theme rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/20">
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Asset Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Location / Assignee</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider sr-only">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-theme">
              {filtered.map(asset => {
                const config = statusConfig[asset.status];
                return (
                  <tr key={asset.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-text-main">{asset.name}</p>
                      <p className="text-[10px] text-text-muted font-mono">{asset.id}</p>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">
                      {asset.type.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold", config.bg)}>
                        <config.icon className="w-3 h-3 mr-1.5" />
                        {config.label}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-text-main">{asset.location}</p>
                      {asset.assignedTo && <p className="text-[11px] text-primary font-bold">{asset.assignedTo}</p>}
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
