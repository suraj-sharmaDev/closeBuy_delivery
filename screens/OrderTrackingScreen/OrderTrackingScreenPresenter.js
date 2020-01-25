import React from "react";
import { Platform, PermissionsAndroid, Dimensions, Linking } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';
import {completeOrder} from '../../store/actions/order';
import {PickOrder, CompleteOrder} from '../../middleware/API';
import MapDisplay from '../../components/OrderTrackingScreen/MapDisplay';
import OrderDetail from '../../components/OrderTrackingScreen/OrderDetail';
import OrderButton from '../../components/OrderTrackingScreen/OrderButton';

const {height, width} = Dimensions.get('window');
const Theme = styled.View`
  height : ${height};
  width : ${width};
`;
const Text = styled.Text``;

const OrderTrackingScreenPresenter = (props) => {
  const markers = {
            deliveryBoyMarker: {
              latitude: parseFloat(props.user.coordinate.latitude),
              longitude: parseFloat(props.user.coordinate.longitude),
            },
            distributorMarker : {
              latitude: Object.keys(props.order).length > 0 ? parseFloat(props.order.pickupCoordinates.latitude) : null,
              longitude: Object.keys(props.order).length > 0 ? parseFloat(props.order.pickupCoordinates.longitude) : null,
            },
            customerMarker: {
              latitude: Object.keys(props.order).length > 0 ? parseFloat(props.order.deliveryCoordinates.coordinate.latitude) : null,
              longitude: Object.keys(props.order).length > 0 ? parseFloat(props.order.deliveryCoordinates.coordinate.longitude) : null,              
            },
  }; 
  const orderId = props.order.orderId;
  const customerId = props.order.customerId;
  //order status can have three states
  //accepted
  //picked
  //completed
  const [orderStatus, updateOrderStatus] = React.useState(props.order.orderStatus);

  React.useEffect(()=>{
  },[])

  const clickHandler = () => {
    if(orderStatus==='accepted'){
      //when order has been picked up
      PickOrder(orderId, customerId)
      .then((result)=>{
        updateOrderStatus('picked')        
      })
      .catch((err)=>{
        console.warn(err);
      })
    }else{
      //when order has been delivered up
      CompleteOrder(orderId, customerId)
      .then((result)=>{
        props.onCompleteOrder();
      })
      .catch((err)=>{
        console.warn(err);
      })      
    }
  }
  const openNativeMaps = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = orderStatus==='accepted' ? 
          `${props.order.pickupCoordinates.latitude},${props.order.pickupCoordinates.longitude}`
          :
          `${props.order.deliveryCoordinates.coordinate.latitude},${props.order.deliveryCoordinates.coordinate.longitude}`;
    const label = orderStatus==='accepted' ? 'Distributor' : 'Customer';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        browser_url =
          'https://www.google.de/maps/@' +
          this.props.track.userLatitude +
          ',' +
          this.props.track.userLongitude +
          '?q=' +
          label;
        return Linking.openURL(browser_url);
      }
    });
  }

  let content = (
    <Theme>
      {
        Object.keys(props.order).length > 0 ? 
        <React.Fragment>
          <MapDisplay markers={markers} 
            userLocation={props.user.coordinate} 
            orderStatus={orderStatus}
            openNativeMaps={openNativeMaps}
          />
          <OrderDetail order={props.order} />
          <OrderButton orderStatus={orderStatus} clickHandler={clickHandler} />        
        </React.Fragment>
        : 
        <Text>Completed Order</Text>
      }
    </Theme>
  );
  return content;
};

const mapStateToProps = state => {
  return {
    user : state.user,
    order : state.order.currentOrder
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCompleteOrder : () => {
      dispatch(completeOrder())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderTrackingScreenPresenter);