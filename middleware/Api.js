import { ReverseGeocode, PlacesAutoComplete, PlaceDetailsById, DirectionPolyline, LoginApi, InitializeApi, UpdateStatusApi, 
	     UpdateTokenApi, UpdateLocationApi, AcceptOrderApi, PickOrderApi, CompleteOrderApi, GetCurrentOrderApi, 
	     GetPendingOrdersApi, GetCompletedOrdersApi, GetOrderDetailsApi, GetWorkingHoursApi} from "../constants/Urls";
import Polyline from '@mapbox/polyline';
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

export const UpdateStatus = async(deliveryBoyId, status, rowId) => {
	const url = `${UpdateStatusApi}?deliveryBoyId=${deliveryBoyId}&status=${status}&rowId=${rowId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}

export const UpdateLocation = async(data) => {
	const response = await fetch(UpdateLocationApi,{
		method : 'POST',
		body : data
	});
	const result = await response.json();
	return result;	
}
export const AcceptOrder = async(orderId, customerId) => {
	let url = `${AcceptOrderApi}?orderId=${orderId}&customerId=${customerId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}
export const PickOrder = async(orderId, customerId) => {
	let url = `${PickOrderApi}?orderId=${orderId}&customerId=${customerId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}
export const CompleteOrder = async(orderId, customerId) => {
	let url = `${CompleteOrderApi}?orderId=${orderId}&customerId=${customerId}`;
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
export const GetCompletedOrders = async(deliveryBoyId, startIndex) => {
	const url = `${GetCompletedOrdersApi}?deliveryBoyId=${deliveryBoyId}&startIndex=${startIndex}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}
export const GetWorkingHours = async(deliveryBoyId, startDate, endDate) => {
	const url = `${GetWorkingHoursApi}?deliveryBoyId=${deliveryBoyId}&startDate=${startDate}&endDate=${endDate}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}
export const GetDirection = async(startCoords, destinationCoords) => {
	const origin = `${startCoords.latitude},${startCoords.longitude}`;
	const destination = `${destinationCoords.latitude},${destinationCoords.longitude}`;
	const url = `${DirectionPolyline}?origin=${origin}&destination=${destination}&key=${API_KEY}`;
	const response = await fetch(url);
	const result = await response.json();
	let points = Polyline.decode(result.routes[0].overview_polyline.points);
	let coords = points.map((point, index) => {
		return {
			latitude: point[0],
			longitude: point[1],
		};
	});
    return coords;	
}
export const ReverseLookup = async (region) => {
	//function to get place name from lat and long
    const url = `${ReverseGeocode}?latlng=${region.latitude},${region.longitude}&key=${API_KEY}`;
   	const response = await fetch(url);
    const result = await response.json();
    console.warn(result);
}
