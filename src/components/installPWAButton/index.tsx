import React, { useEffect, useState } from 'react';
import Button from '../common/button/Index';

// Define the BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPWAButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired'); // Log when the event fires
      e.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true); // Set state to show the install button
    };

    // Listen for the `beforeinstallprompt` event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return; // Ensure deferredPrompt is not null

    console.log('beforeinstallprompt event triggered'); // Log when the prompt is triggered
    await deferredPrompt.prompt(); // Show the install prompt

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA installation accepted');
    } else {
      console.log('PWA installation dismissed');
    }

    setDeferredPrompt(null); // Clear the saved prompt event
    setIsInstallable(false); // Hide the install button after prompt
  };

  return (
    <>
      {isInstallable && (
        <Button variant="contained" onClick={handleInstallClick} style={{ padding: '10px', fontSize: '16px' }}>
          Install App
        </Button>
      )}
    </>
  );
};

export default InstallPWAButton;
