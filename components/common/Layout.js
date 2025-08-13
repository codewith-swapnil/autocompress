import React, { useState } from 'react';
import Header from '../home/Header';
import Navigation from './Navigation';
import InstallBanner from './InstallBanner';
import { notifications as initialNotifications } from '../../data/services';

const Layout = ({ children }) => {
  const [notifications] = useState(initialNotifications); // Notifications state can be managed globally or in Layout
  const [showInstallBanner, setShowInstallBanner] = useState(true);

  // You would need to handle PWA install banner logic here
  // For this example, we'll just show it statically

  return (
    <>
      <Header notifications={notifications} />
      <main className="pt-16 pb-16">{children}</main> {/* Adjust padding to account for header/nav */}
      <Navigation />
      <InstallBanner 
        showInstallBanner={showInstallBanner} 
        setShowInstallBanner={setShowInstallBanner} 
      />
    </>
  );
};

export default Layout;