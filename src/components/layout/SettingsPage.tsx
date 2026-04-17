import React from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Shield, 
  Smartphone,
  CreditCard,
  ChevronRight
} from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Personal Information', desc: 'Update your name, email, and phone.' },
        { label: 'Login & Security', desc: 'Passwords and two-factor authentication.' },
      ]
    },
    {
      title: 'App Preferences',
      icon: Bell,
      items: [
        { label: 'Notifications', desc: 'Control alerts for jobs and messages.' },
        { label: 'Display & Language', desc: 'Dark mode and localization settings.' },
      ]
    },
    {
      title: 'Subscription',
      icon: CreditCard,
      items: [
        { label: 'Pricing Plan', desc: 'Current: Enterprise Demo Tier.' },
        { label: 'Billing History', desc: 'View and download previous invoices.' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Settings</h1>
        <p className="text-text-muted text-sm mt-1">Manage your account and platform preferences.</p>
      </div>

      <div className="space-y-6">
        {sections.map(section => (
          <div key={section.title} className="bg-white rounded-2xl border border-border-theme shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50/50 border-b border-border-theme flex items-center space-x-3">
              <section.icon className="w-4 h-4 text-text-muted" />
              <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">{section.title}</h3>
            </div>
            <div className="divide-y divide-border-theme">
              {section.items.map(item => (
                <button key={item.label} className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors text-left group">
                  <div>
                    <p className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{item.label}</p>
                    <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-red-900">Danger Zone</h4>
          <p className="text-xs text-red-600 mt-0.5">Deleting your account is permanent. Proceed with caution.</p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shadow-sm">
          Delete Account
        </button>
      </div>
    </div>
  );
}
