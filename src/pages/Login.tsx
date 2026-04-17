import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';
import { UserRole } from '../types';
import { Briefcase, Shield, Users, User, Layout, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const { setRole, setIsLoggedIn, setUserName } = useRole();
  const [loading, setLoading] = useState<UserRole | null>(null);

  const users: { id: UserRole; name: string; roleName: string; icon: any; color: string }[] = [
    { id: 'OWNER', name: 'Jerry Construction', roleName: 'Business Owner', icon: Shield, color: 'text-blue-600' },
    { id: 'MANAGER', name: 'Sarah Manager', roleName: 'Operations Manager', icon: Layout, color: 'text-green-600' },
    { id: 'CREW_LEAD', name: 'Mike Foreman', roleName: 'Field Crew Lead', icon: Users, color: 'text-orange-600' },
    { id: 'CREW_MEMBER', name: 'Alex Worker', roleName: 'Field Technician', icon: User, color: 'text-slate-600' },
    { id: 'CLIENT', name: 'Homeowner Corp', roleName: 'Project Client', icon: Briefcase, color: 'text-purple-600' },
  ];

  const handleLogin = (user: typeof users[0]) => {
    setLoading(user.id);
    setTimeout(() => {
      setRole(user.id);
      setUserName(user.name);
      setIsLoggedIn(true);
      setLoading(null);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] overflow-hidden shadow-2xl border border-border-theme">
        {/* Left Side: Brand/Info */}
        <div className="bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white blur-3xl" />
             <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-black blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-2xl mb-6 shadow-lg">
              B
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">BlueCollarOS</h1>
            <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
              The complete operating system for modern field service businesses.
            </p>
          </div>

          <div className="relative z-10 pt-12">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-blue-400 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="user" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-blue-100 italic">
              "Finally, a tool built for the way we actually work."
            </p>
          </div>
        </div>

        {/* Right Side: Demo Access */}
        <div className="p-12">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-text-main mb-2">Welcome Back</h2>
            <p className="text-text-muted text-sm capitalize">Select a perspective to enter the demo environment.</p>
          </div>

          <div className="space-y-3">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleLogin(user)}
                disabled={!!loading}
                className="w-full flex items-center p-4 rounded-2xl border border-slate-100 hover:border-primary hover:bg-blue-50/50 transition-all group relative overflow-hidden active:scale-[0.98]"
              >
                <div className={`p-3 rounded-xl bg-slate-50 mr-4 group-hover:bg-white transition-colors ${user.color}`}>
                  <user.icon className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-bold text-text-main leading-tight">{user.name}</p>
                  <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mt-0.5">{user.roleName}</p>
                </div>
                {loading === user.id ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-text-muted font-bold uppercase tracking-widest">
            <span>v1.0.4 PROD</span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-accent-green rounded-full mr-1.5 animate-pulse" />
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
