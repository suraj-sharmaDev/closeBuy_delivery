import React from "react";
import { Platform, Dimensions, Alert } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';

import {UpdateLocation, AcceptOrder} from '../../middleware/API';
import {updateCoordinate} from "../../store/actions/user";
import {acceptOrder} from "../../store/actions/order";

import NotificationService from '../../middleware/NotificationService';
import GeolocationService from '../../middleware/GeolocationService';
import NavigationBar from '../../components/DrawerNavigator/NavigationBar';
import OrdersList from '../../components/HomeScreen/OrdersList';
const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  height : ${height};
  width : ${width};
`;
const Text = styled.Text``;

const HomeScreenPresenter = (props) => {
  const [isLoading, updateLoading] = React.useState(true);
  React.useEffect(()=>{
    NotificationService(props.deliveryBoyId, onDataNotifs);
    GeolocationService(true, updateCoordinateHandler); //true as in mounted

    return ()=>{
      GeolocationService(false, updateCoordinateHandler); //false as in unmounted      
    }
  },[])
  
  const onDataNotifs = data => {
    console.warn(data);
  }
  const updateCoordinateHandler = (region) => {
    let formData = new FormData();
    formData.append('deliveryBoyId', props.deliveryBoyId);
    formData.append('customerId', props.order.currentOrder.customerId);
    formData.append('coordinates', JSON.stringify(region));    
    UpdateLocation(formData)
    .then((result)=>{
      props.onUpdateCoordinate(region);
      // props.navigation.navigate('OrderTrack'); //for developmental purpose remove afterwards
      updateLoading(false);
    })
    .catch((err)=>{
      console.warn(err)
    })
  }
  const acceptOrderHandler = (orderId, customerId, index) => {
    if(Object.keys(props.order.currentOrder).length === 0){
      AcceptOrder(orderId, customerId)
      .then((result)=>{
        props.onAcceptOrder(index);        
      })
      .catch((err)=>{
        // console.warn(err);
      })
    }else{
      Alert.alert(
        'In Progress',
        'There is one order already in Progress!',
        [
          {text: 'Track Order', onPress: () => trackOrderHandler()},
          {
            text: 'Cancel',
            style: 'cancel',
          }
        ],
        {cancelable: false},
      );
    }
  }
  const trackOrderHandler = () => {
    props.navigation.navigate('OrderTrack');
  }
  
  let content = (
  <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
    <NavigationBar {...props} />
    <OrdersList store={props.order} onAcceptOrder={acceptOrderHandler} onTrackOrder={trackOrderHandler}/>
  </Theme>
  );
  if(isLoading){
    return null;
  }else{
    return content;
  }
};

const mapStateToProps = state => {
  return {
    deliveryBoyId : state.user.deliveryBoyId,
    order : state.order
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAcceptOrder : (index) => {
      dispatch(acceptOrder(index))
    },
    onUpdateCoordinate : data => {
      dispatch(updateCoordinate(data));
    }    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenPresenter);
