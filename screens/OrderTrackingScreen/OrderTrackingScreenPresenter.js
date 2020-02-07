import React from "react";
import { Platform, PermissionsAndroid, Dimensions, Linking } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';
import {updateOrderStatus, completeOrder} from '../../store/actions/order';
import {PickOrder, CompleteOrder} from '../../middleware/API';
import MapDisplay from '../../components/OrderTrackingScreen/MapDisplay';
import OrderDetail from '../../components/OrderTrackingScreen/OrderDetail';

const {height, width} = Dimensions.get('window');
const Theme = styled.View`
  height : ${height};
  width : ${width};
`;
const Text = styled.Text``;

const OrderTrackingScreenPresenter = (props) => {
  const currentIndex = props.navigation.getParam('currentIndex');
  const markers = {
            deliveryBoyMarker: {
              latitude: parseFloat(props.user.coordinate.latitude),
              longitude: parseFloat(props.user.coordinate.longitude),
            },
            distributorMarker : {
              latitude: Object.keys(props.order).length > 0 ? parseFloat(props.order[currentIndex].pickupCoordinates.latitude) : null,
              longitude: Object.keys(props.order).length > 0 ? parseFloat(props.order[currentIndex].pickupCoordinates.longitude) : null,
            },
            customerMarker: {
              latitude: Object.keys(props.order).length > 0 ? parseFloat(props.order[currentIndex].deliveryCoordinates.coordinate.latitude) : null,
              longitude: Object.keys(props.order).length > 0 ? parseFloat(props.order[currentIndex].deliveryCoordinates.coordinate.longitude) : null,              
            },
  }; 
  const orderId = props.order[currentIndex] ? props.order[currentIndex].orderId : null;
  const customerId = props.order[currentIndex] ? props.order[currentIndex].customerId : null;
  //order status can have three states
  //accepted
  //picked
  //completed
  const [orderStatus, updateOrderStatus] = React.useState(props.order[currentIndex]?props.order[currentIndex].orderStatus: null);
  React.useEffect(()=>{
  },[])

  const clickHandler = () => {
    if(orderStatus==='accepted'){
      //when order has been picked up
      PickOrder(orderId, customerId)
      .then((result)=>{
        props.onUpdateOrderStatus({index:currentIndex, status:'picked'});
        updateOrderStatus('picked');
      })
      .catch((err)=>{
        console.warn(err);
      })
    }else{
      //when order has been delivered up
      CompleteOrder(orderId, customerId)
      .then((result)=>{
        props.onCompleteOrder(currentIndex);
        props.navigation.navigate('HomeScreen');
      })
      .catch((err)=>{
        console.warn(err);
      })      
    }
  }
  const openNativeMaps = () => {
    //Lets facilitate delivery boy to see location of all the pickups and delivery Location
    //for easier delivery
    wayPoints='';
    props.order.map((o, index)=>{
      if(index!=currentIndex){
        if(orderStatus==='accepted'){
          wayPoints+=wayPoints!==''?`${o.pickupCoordinates.latitude},${o.pickupCoordinates.longitude}`
                              :`|${o.pickupCoordinates.latitude},${o.pickupCoordinates.longitude}`
        }else{
          wayPoints+=wayPoints!==''?`${o.deliveryCoordinates.latitude},${o.deliveryCoordinates.longitude}`
                              :`|${o.deliveryCoordinates.latitude},${o.deliveryCoordinates.longitude}`
        }
      }
    });

    // const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const origin = `${props.user.coordinate.latitude},${props.user.coordinate.longitude}`;    
    const destination = orderStatus==='accepted' ? 
          `${props.order[currentIndex].pickupCoordinates.latitude},${props.order[currentIndex].pickupCoordinates.longitude}`
          :
          `${props.order[currentIndex].deliveryCoordinates.coordinate.latitude},${props.order[currentIndex].deliveryCoordinates.coordinate.longitude}`;

    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    if(wayPoints!==''){
      url+=`&waypoints=${wayPoints}`;
    }
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        //install google maps
      }
    });
  }

  let content = null;
  if(props.order[currentIndex])
  {
    content = (
      <Theme>
        <MapDisplay markers={markers} 
          userLocation={props.user.coordinate} 
          orderStatus={orderStatus}
          openNativeMaps={openNativeMaps}
        />
        <OrderDetail order={props.order[currentIndex]} orderStatus={orderStatus} clickHandler={clickHandler}/>
      </Theme>
    );
  }
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
    onUpdateOrderStatus : (data) => {
      dispatch(updateOrderStatus(data))
    },
    onCompleteOrder : (index) => {
      dispatch(completeOrder(index))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderTrackingScreenPresenter);