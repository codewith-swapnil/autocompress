import { Bell, Trash2, ArrowLeft } from 'lucide-react';

const NotificationsPage = ({ notifications, clearNotifications, setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-teal-50">
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="w-9 h-9 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h3 className="font-semibold text-gray-900">सूचनाएं</h3>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200"
          >
            <Trash2 className="h-5 w-5 text-gray-700" />
          </button>
        )}
      </div>

      <div className="p-3">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="h-16 w-16 text-teal-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">कोई सूचना नहीं</h3>
            <p className="text-gray-600">आपके पास कोई नई सूचना नहीं है</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div key={notification.id} className={`bg-white rounded-xl p-4 border-l-4 shadow-sm ${
                  notification.unread ? 'border-teal-600 bg-teal-50' : 'border-gray-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <IconComponent className="h-5 w-5 text-teal-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">{notification.title}</div>
                      <p className="text-gray-700 text-sm mb-2">{notification.message}</p>
                      <div className="text-xs text-gray-500">{notification.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;