const Api = async() => {
	let coords = {lat:'123.0.0.1',long:'123.0.0.1'};
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