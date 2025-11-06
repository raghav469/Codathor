const Notification = require('../models/Notification');

exports.createNotification = async (userId, message, type, relatedEntity = null) => {
  const notification = new Notification({
    user: userId,
    message,
    type,
    relatedEntity
  });
  
  await notification.save();
  
  // Emit real-time notification
  const io = require('../app').get('io');
  io.to(userId.toString()).emit('new-notification', notification);
  
  return notification;
};

exports.getUserNotifications = async (userId) => {
  return await Notification.find({ user: userId })
    .sort('-createdAt')
    .limit(20);
};

exports.markAsRead = async (notificationId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { $set: { read: true } },
    { new: true }
  );
};