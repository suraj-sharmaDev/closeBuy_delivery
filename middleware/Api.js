import { ReverseGeocode, PlacesAutoComplete, PlaceDetailsById, LoginApi, InitializeApi, 
	     UpdateTokenApi, AcceptOrderApi, CompleteOrderApi, GetCurrentOrderApi, 
	     GetPendingOrdersApi, GetCompletedOrdersApi, GetOrderDetailsApi} from "../constants/Urls";

import API_KEY from "../constants/Api";

export const Login = async (data) => {
	const response = await fetch(LoginApi,{
		method : 'POST',
    	body : data		
	});
	const result = await response.json();
	return result;
}

export const Initialize = async(deliveryBoyId) => {
	const url = `${InitializeApi}?deliveryBoyId=${deliveryBoyId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const UpdateToken = async(data) => {
	const response = await fetch(UpdateTokenApi,{
		method : 'POST',
		body : data
	});
	const result = await response.json();
	return result;	
}

export const AcceptOrder = async(orderId) => {
	let url = `${AcceptOrderApi}?orderId=${orderId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}

export const CompleteOrder = async(orderId) => {
	let url = `${CompleteOrderApi}?orderId=${orderId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}
export const GetCurrentOrder = async(deliveryBoyId) => {
	const url = `${GetCurrentOrderApi}?deliveryBoyId=${deliveryBoyId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const GetPendingOrders = async(deliveryBoyId) => {
	const url = `${GetPendingOrdersApi}?deliveryBoyId=${deliveryBoyId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}
export const GetCompletedOrders = async(deliveryBoyId) => {
	const url = `${GetCompletedOrdersApi}?deliveryBoyId=${deliveryBoyId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}
export const ReverseLookup = async (region) => {
	//function to get place name from lat and long
    const url = `${ReverseGeocode}?latlng=${region.latitude},${region.longitude}&key=${API_KEY}`;
   	const response = await fetch(url);
    const result = await response.json();
    console.warn(result);
}
