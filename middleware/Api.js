const Api = async(position) => {
	let coords = {latitude:position.latitude.toString(), longitude:position.longitude.toString()};
	let formData = new FormData();
	formData.append('receiver', 'user_Suraj');
	formData.append('coordinates', JSON.stringify(coords));
	const response = await fetch('https://www.closebuy.adastratech.in/welcome/sendPush',{
		method : 'POST',
		body : formData
	});
	const result = await response.json(); //it carries the error
}

export default Api;