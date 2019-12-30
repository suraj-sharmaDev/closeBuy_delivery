import firebase from 'react-native-firebase';

const NotificationService = (callback, fcmToken='value') => {
  const channel = new firebase.notifications.Android.Channel(
    'delivery',
    'delivery channel',
    firebase.notifications.Android.Importance.Max,
  );
  firebase.notifications().android.createChannel(channel);
  firebase.messaging().subscribeToTopic('delivery_Suraj');  //to receive message for individual users
  const checkPermission = async () => {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
          getToken();
      } else {
          requestPermission();
      }
  }

  const getToken = async () => {
      if (fcmToken==='') {
          fcmToken = await firebase.messaging().getToken();
          if (fcmToken) {
            console.log(fcmToken);
          }
      }
  }


  const requestPermission = async () => {
      try {
          await firebase.messaging().requestPermission();
          getToken();
      } catch (error) {
          console.log('permission rejected');
      }
  }

  const createNotificationListeners = () => {
      
      firebase.notifications().onNotificationOpened((notificationOpen) => {
          const { title, body, _data} = notificationOpen.notification;
      });    
      firebase.messaging().onMessage((message) => {
          console.warn(JSON.stringify(message));
      });
      firebase.notifications().onNotification(notification => {
          callback(notification._data);
          // const localNotification = new firebase.notifications.Notification()
          //   .setNotificationId(notification.notificationId)
          //   .setTitle(notification.title)
          //   .setBody(notification.body)
          //   .setData(notification._data)
          //   .setSound('default')            
          //   .android.setChannelId('delivery')
          //   .android.setAutoCancel(true);

          // firebase.notifications().displayNotification(localNotification)
      });
  }

  checkPermission();
  createNotificationListeners();
}

export default NotificationService;