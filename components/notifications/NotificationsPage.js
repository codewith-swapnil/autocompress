import { ArrowLeft, Bell, CheckCircle, X } from 'lucide-react';

const NotificationsPage = ({ notifications, clearNotifications, setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg px-4 py-3 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <button 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-teal-700 font-semibold group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
        <button 
          onClick={clearNotifications}
          className="text-teal-700 font-medium text-sm flex items-center gap-1 hover:text-teal-800"
          disabled={notifications.length === 0}
        >
          Clear All
        </button>
      </div>

      {/* Notifications List */}
      <div className="p-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="h-10 w-10 text-teal-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No notifications</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              You'll see important updates here when you have new messages or bookings
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-sm border p-4 flex items-start gap-3 ${
                  notification.unread 
                    ? 'border-teal-300 bg-teal-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  notification.unread 
                    ? 'bg-teal-100 text-teal-600' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{notification.text}</p>
                  {notification.unread && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-teal-700">
                      <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                      <span>New</span>
                    </div>
                  )}
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;