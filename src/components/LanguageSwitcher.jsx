import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe size={18} className="text-gray-600" />
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="text-sm border-none bg-transparent text-gray-600 focus:outline-none focus:text-anthracite cursor-pointer"
      >
        <option value="fr">FR</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;