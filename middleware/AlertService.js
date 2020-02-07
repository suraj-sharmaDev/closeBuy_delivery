import {Alert} from 'react-native';

export const AlertService = (title, body, callback) => {
	Alert.alert(
		title,
		body,
		[
          {text: 'Ok', onPress: () => callback()},
			{
				text: 'Cancel',
				style: 'cancel',
			},
		],
		{cancelable: false},
	);
}
