import React, { useState } from 'react';
import { useRole } from '../../context/RoleContext';
import { 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Save, 
  RotateCcw,
  Check,
  Layout,
  ExternalLink
} from 'lucide-react';
import { cn } from '../../lib/utils';

const presetColors = [
  { name: 'Blue', primary: '#3b82f6', secondary: '#1e40af' },
  { name: 'Green', primary: '#10b981', secondary: '#065f46' },
  { name: 'Orange', primary: '#f97316', secondary: '#9a3412' },
  { name: 'Purple', primary: '#8b5cf6', secondary: '#5b21b6' },
  { name: 'Red', primary: '#ef4444', secondary: '#991b1b' },
  { name: 'Slate', primary: '#475569', secondary: '#1e293b' },
];

export default function Branding() {
  const { branding, setBranding } = useRole();
  const [formData, setFormData] = useState({
    name: branding.name,
    logo: branding.logo,
    primaryColor: branding.primaryColor,
    secondaryColor: branding.secondaryColor,
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setBranding(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setFormData({
      name: branding.name,
      logo: branding.logo,
      primaryColor: branding.primaryColor,
      secondaryColor: branding.secondaryColor,
    });
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Company Branding</h1>
          <p className="text-text-muted text-sm mt-1">Customize your organization's identity across the platform.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleReset}
            className="flex items-center px-4 py-2 bg-white border border-border-theme rounded-lg text-sm font-medium text-text-main hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2 text-text-muted" />
            Discard Changes
          </button>
          <button 
            onClick={handleSave}
            className={cn(
              "flex items-center px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95",
              isSaved ? "bg-green-600 text-white" : "bg-primary text-white hover:bg-opacity-90"
            )}
          >
            {isSaved ? <Check className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {isSaved ? 'Identity Saved' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border-theme shadow-sm">
            <h3 className="text-lg font-bold text-text-main mb-6 flex items-center">
              <Type className="w-5 h-5 mr-2 text-primary" />
              Identity Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Company Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full bg-slate-50 border border-border-theme rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Enter company name..."
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Logo URL</label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={formData.logo}
                    onChange={(e) => updateField('logo', e.target.value)}
                    className="flex-1 bg-slate-50 border border-border-theme rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="https://..."
                  />
                  <div className="w-12 h-12 rounded-xl border border-border-theme bg-white p-1 overflow-hidden shrink-0">
                    <img src={formData.logo} alt="Logo Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <p className="text-[10px] text-text-muted mt-2">Recommended: Transparent PNG, square aspect ratio.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border-theme shadow-sm">
            <h3 className="text-lg font-bold text-text-main mb-6 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-primary" />
              Color Palette
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={formData.primaryColor}
                    onChange={(e) => updateField('primaryColor', e.target.value)}
                    className="w-10 h-10 rounded-lg p-0 border-none cursor-pointer overflow-hidden"
                  />
                  <input 
                    type="text" 
                    value={formData.primaryColor}
                    onChange={(e) => updateField('primaryColor', e.target.value)}
                    className="flex-1 bg-slate-50 border border-border-theme rounded-xl px-4 py-2 text-sm uppercase font-mono"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={formData.secondaryColor}
                    onChange={(e) => updateField('secondaryColor', e.target.value)}
                    className="w-10 h-10 rounded-lg p-0 border-none cursor-pointer overflow-hidden"
                  />
                  <input 
                    type="text" 
                    value={formData.secondaryColor}
                    onChange={(e) => updateField('secondaryColor', e.target.value)}
                    className="flex-1 bg-slate-50 border border-border-theme rounded-xl px-4 py-2 text-sm uppercase font-mono"
                  />
                </div>
              </div>
            </div>

            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Preset Themes</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {presetColors.map(color => (
                <button 
                  key={color.name}
                  onClick={() => {
                    updateField('primaryColor', color.primary);
                    updateField('secondaryColor', color.secondary);
                  }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-full aspect-square rounded-xl border border-border-theme p-1 group-hover:scale-105 transition-transform overflow-hidden relative">
                    <div className="absolute inset-0 bg-white" />
                    <div className="absolute right-0 top-0 w-1/2 h-full" style={{ backgroundColor: color.primary }} />
                    <div className="absolute right-0 top-1/2 w-1/2 h-1/2" style={{ backgroundColor: color.secondary }} />
                  </div>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider group-hover:text-text-main">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center relative z-10">
              <Layout className="w-5 h-5 mr-2 text-blue-400" />
              Real-time Preview
            </h3>
            
            <div className="space-y-8 relative z-10">
              {/* Sidebar Preview */}
              <div className="bg-white rounded-2xl p-4 shadow-lg flex items-center gap-3 w-max pr-12 border border-slate-100">
                <div 
                  className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  {formData.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{formData.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Business Console</p>
                </div>
              </div>

              {/* Component Style Preview */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 max-w-sm">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    Active Project
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Modern Kitchen Reno</h4>
                <p className="text-xs text-slate-500 mb-4">42 Maple Street, Seattle</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                    <span>Progress</span>
                    <span style={{ color: formData.primaryColor }}>75%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: '75%', backgroundColor: formData.primaryColor }}
                    />
                  </div>
                </div>

                <button 
                  className="w-full mt-6 py-3 rounded-xl text-xs font-bold text-white shadow-lg transition-transform active:scale-95"
                  style={{ 
                    backgroundImage: `linear-gradient(to right, ${formData.primaryColor}, ${formData.secondaryColor})` 
                  }}
                >
                  View Full Details
                </button>
              </div>
            </div>

            {/* Background pattern */}
            <div className="absolute right-0 bottom-0 w-64 h-64 opacity-20 pointer-events-none">
              <div 
                className="w-full h-full rotate-12 translate-x-12 translate-y-12 blur-3xl rounded-full"
                style={{ backgroundColor: formData.primaryColor }}
              />
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h4 className="text-sm font-bold text-primary mb-2">Automated Theming</h4>
            <p className="text-xs text-text-muted leading-relaxed italic">
              "BlueCollarOS automatically adapts the user interfaces of your employees and clients based on the primary color you select here. This ensures a consistent brand experience across all touchpoints."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
