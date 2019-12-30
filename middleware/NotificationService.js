import firebase from 'react-native-firebase';

const NotificationService = (callback, fcmToken) => {
  const channel = new firebase.notifications.Android.Channel(
    'insider',
    'insider channel',
    firebase.notifications.Android.Importance.Max,
  );
  firebase.notifications().android.createChannel(channel);
  firebase.messaging().subscribeToTopic('user_Suraj');  //to receive message for individual users
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
              callback(fcmToken);
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
          if(_data.second_key==='Second Value'){
            console.warn('Arey Waah!');
          }
      });    
      firebase.messaging().onMessage((message) => {
          console.warn(JSON.stringify(message));
      });
      firebase.notifications().onNotification(notification => {
          const localNotification = new firebase.notifications.Notification()
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setBody(notification.body)
            .setData(notification._data)
            .setSound('default')            
            .android.setChannelId('insider')
            .android.setAutoCancel(true);

          firebase.notifications().displayNotification(localNotification)


          // notification.android.setChannelId('insider').setSound('default');
          // notification.android.setAutoCancel(true);
          // const action = new firebase.notifications.Android.Action('control_notification', 'ic_launcher', 'Open CloseBuy');          
          // // Add the action to the notification
          // notification.android.addAction(action);      
          // //Then display the notification    
          // firebase.notifications().displayNotification(notification);
      });
  }

  checkPermission();
  createNotificationListeners();
}

export default NotificationService;