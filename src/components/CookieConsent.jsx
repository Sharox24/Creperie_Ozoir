import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const CONSENT_KEY = 'creperie-cookie-consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      if (!v) setVisible(true);
    } catch (_) {}
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <div className="max-w-5xl mx-auto rounded-xl shadow-2xl p-4 md:p-6 bg-white/95 backdrop-blur border dark:bg-gray-900/95">
        <div className="md:flex md:items-center md:justify-between gap-4">
          <div className="mb-3 md:mb-0">
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-200">
              Nous utilisons des cookies pour améliorer votre expérience et mesurer l'audience de manière anonyme. Vous pouvez accepter ou refuser.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button onClick={reject} variant="outline" className="border-anthracite text-anthracite dark:text-gray-100 dark:border-gray-600">Refuser</Button>
            <Button onClick={accept} className="bg-crepe-yellow hover:bg-yellow-400 text-anthracite">Accepter</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

