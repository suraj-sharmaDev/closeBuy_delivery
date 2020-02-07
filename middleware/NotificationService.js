import firebase from 'react-native-firebase';
import {UpdateToken} from './API';

const NotificationService = (deliveryBoyId, onDataNotifs) => {
  const channel = new firebase.notifications.Android.Channel(
    'delivery',
    'delivery channel',
    firebase.notifications.Android.Importance.Max,
  )
  .setSound('default')
  .enableLights(true)
  .enableVibration(true)
  .setVibrationPattern([200,300,400,500]);

  firebase.notifications().android.createChannel(channel);
  // firebase.messaging().subscribeToTopic('delivery_Suraj');  //to receive message for individual users

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  const saveToken = fcmToken => {
    let formData = new FormData();
    formData.append('deliveryBoyId', deliveryBoyId);
    formData.append('token', fcmToken);
    UpdateToken(formData)
      .then(result => {
        // console.warn(result);
      })
      .catch(err => {
        console.warn('Notification Service Error');
      });
    // subscribe(fcmToken);
  };

  const getToken = async () => {
    try {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        saveToken(fcmToken);
      } else {
        //error occurred
      }
    } catch (err) {
      console.warn('No Internet!');
    }
  };

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  };

  const createNotificationListeners = () => {
    //We have to check for refreshed tokens
    onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      subscribe(fcmToken);
    });

    //Listen for notifications
    firebase.notifications().onNotificationOpened(notificationOpen => {
      const {title, body, _data} = notificationOpen.notification;
      console.warn(JSON.stringify(_data));
    });
    firebase.messaging().onMessage(message => {
      console.warn(JSON.stringify(message));
    });
    firebase.notifications().onNotification(notification => {
      const localNotification = new firebase.notifications.Notification()
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId('delivery')        
        .android.setAutoCancel(true)
        .android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.All)
        .android.setCategory(firebase.notifications.Android.Category.Alarm);

      if (notification._data) {
        onDataNotifs(notification._data);
        firebase.notifications().displayNotification(localNotification);
        //do something with data
      } else {
        firebase.notifications().displayNotification(localNotification);
      }
    });
  };

  checkPermission();
  createNotificationListeners();
};

export default NotificationService;