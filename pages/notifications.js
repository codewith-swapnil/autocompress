import { useState } from 'react';
import Head from 'next/head';
import NotificationsPage from '../components/notifications/NotificationsPage';
import { notifications as initialNotifications } from '../data/services';
import Layout from '../components/common/Layout';

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <Layout>
      <Head>
        <title>Notifications | FixKaro</title>
        <meta name="description" content="View your latest notifications from FixKaro" />
      </Head>
      <NotificationsPage 
        notifications={notifications} 
        clearNotifications={clearNotifications} 
      />
    </Layout>
  );
};

export default Notifications;