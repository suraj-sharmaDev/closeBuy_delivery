import Sound from 'react-native-sound';
import AlertService from './AlertService';

const audio = {
    title: 'mp3 in bundle',
    url: 'alert.mp3',
    basePath: Sound.MAIN_BUNDLE,
    status: undefined
}
const callback = (error, alert) => {
	if(error){
		AlertService('Error','A bug was found in app!\nPlease Contact CloseBuy',()=>{});
	}else{
		//Loaded resource successfully
	}
}
const alert = new Sound(audio.url, audio.basePath, (error)=>callback(error, alert));

export const SoundService = (status) => {
	if(status==='play'){
		if(audio.status === undefined){
			audio.status = 'playing';
			alert.play()
		}
	}else if(status === 'stop'){
			audio.status = undefined;
			alert.stop();
	}		
	else{
		alert.stop().release();		
	}
}