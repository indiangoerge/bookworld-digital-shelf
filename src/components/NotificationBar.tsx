
import React from 'react';

const NotificationBar = () => {
  return (
    <div className="bg-bookworld-notification h-8 flex items-center justify-center text-sm font-semibold text-gray-700">
      <span className="animate-fade-in">
        🚚 Free shipping above ₹499 | 10% Off First Order
      </span>
    </div>
  );
};

export default NotificationBar;
