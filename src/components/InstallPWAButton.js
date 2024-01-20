import React, { useState, useEffect } from 'react';

function InstallPWAButton() {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setInstallPromptEvent(null);
      });
    }
  };

  return (
      installPromptEvent && 
      <div className=" top-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-md flex justify-center">
        <button
          className="bg-green-500 hover:bg-red-700 text-white  py-2 px-4 rounded"
          onClick={handleInstallClick}>
          Cài Đặt Ứng Dụng
        </button>
      </div>
    );}

  export default InstallPWAButton;
