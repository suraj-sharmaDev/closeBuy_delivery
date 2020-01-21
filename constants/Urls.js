const serverUrl = `http://34.94.115.243`;

export const ReverseGeocode = `https://maps.googleapis.com/maps/api/geocode/json`;
export const PlacesAutoComplete = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
export const PlaceDetailsById = `https://maps.googleapis.com/maps/api/place/details/json`;
export const DirectionPolyline =`https://maps.googleapis.com/maps/api/directions/json`;

export const LoginApi = `${serverUrl}/delivery/loginApi/login`;

export const InitializeApi =`${serverUrl}/delivery/initializationApi/initialize`;
export const UpdateStatusApi =`${serverUrl}/delivery/statusApi/updateStatus`;
export const UpdateTokenApi = `${serverUrl}/delivery/tokenApi/updateToken`;
export const UpdateLocationApi = `${serverUrl}/delivery/locationApi/updateLocation`;

export const AcceptOrderApi =`${serverUrl}/delivery/orderApi/acceptOrder`; 
export const PickOrderApi =`${serverUrl}/delivery/orderApi/pickOrder`; 
export const CompleteOrderApi =`${serverUrl}/delivery/orderApi/completeOrder`;

export const GetCurrentOrderApi = `${serverUrl}/delivery/orderApi/getCurrentOrder`;
export const GetPendingOrdersApi = `${serverUrl}/delivery/orderApi/getPendingOrders`;
export const GetCompletedOrdersApi =`${serverUrl}/delivery/orderApi/getCompletedOrders`;

export const GetOrderDetailsApi = `${serverUrl}/delivery/orderApi/getOrderDetails`;
