import React from 'react';
import { Building2 } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-primary-900';
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <Building2 className={`w-8 h-8 ${variant === 'light' ? 'text-primary-300' : 'text-primary-600'}`} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-500 rounded-full" />
      </div>
      <div className={`ml-2 font-display ${textColor}`}>
        <span className="text-xl font-bold tracking-tight">HABIBI</span>
        <span className="text-xl font-light tracking-wide">STAY</span>
      </div>
    </div>
  );
};

export default Logo;