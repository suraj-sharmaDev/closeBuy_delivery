import React from "react";
import { AppState, Platform, Dimensions, Alert, BackHandler } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';

import {UpdateLocation, UpdateStatus, AcceptOrder, GetPendingOrders} from '../../middleware/API';
import {updateStatus, updateCoordinate} from "../../store/actions/user";
import {acceptOrder, receivePendingOrder} from "../../store/actions/order";

import NotificationService from '../../middleware/NotificationService';
import AlertService from '../../middleware/AlertService';
import BackgroundGeolocationService from '../../middleware/BackgroundGeolocationService';
import NavigationBar from '../../components/DrawerNavigator/NavigationBar';
import DeliveryBoyStatus from '../../components/HomeScreen/DeliveryBoyStatus';
import OrdersList from '../../components/HomeScreen/OrdersList';
const {height, width} = Dimensions.get('window');

const Theme = styled.ScrollView`
  height : ${height};
  width : ${width};
`;
const Text = styled.Text``;

const HomeScreenPresenter = (props) => {
  appState = 'active';
  const [isLoading, updateLoading] = React.useState(true);
  React.useEffect(()=>{
    AppState.addEventListener('change', handleAppStateChange);
    NotificationService(props.deliveryBoyId, onDataNotifs);
    BackgroundGeolocationService(true, updateCoordinateHandler); //true as in mounted
    backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
      if(props.navigation.isFocused()){
        return true;
      }else{
        return false;
      }
    });  
    return ()=>{
      updateLoading(null);
      BackgroundGeolocationService(false, updateCoordinateHandler); //false as in unmounted
      backHandler.remove();
      AppState.removeEventListener('change', handleAppStateChange);            
    }
  },[])

  const handleAppStateChange = (nextAppState) => {
    //if app came from background to foreground
    if(appState.match(/inactive|background/) && nextAppState === 'active') {
      //make API calls to get latest info on current order
      onDataNotifs({type : 'background'});
    }
    appState = nextAppState;
  }

  const onDataNotifs = data => {
    if(data.type==='new_order' || data.type==='background'){
      //ajax call to get all pending orders for this delivery boy
      GetPendingOrders(props.deliveryBoyId)
      .then((result)=>{
        if(!result.error){
          if(result.reason.length!==props.order.pendingOrders.length){
            //This check is necessary since the background state of app doesn't fetch 
            //pending orders and update is really necessary
            props.onReceivePendingOrders(result.reason);
          }
        }
      })
      .catch((err)=>{
        console.warn(err);
      })
    }
  }
  const updateStatusHandler = () => {
    statusUpdateString = props.activeStatus==1?'offline':'online';
    UpdateStatus(props.deliveryBoyId, statusUpdateString, props.rowId)
    .then((result)=>{
      if(!result.error){
        props.onUpdateStatus({status : !props.activeStatus, rowId:result.rowId});
        props.navigation.navigate('Duty');
      }
    })
    .catch((err)=>{
      console.warn(err)
    })
  }
  const updateCoordinateHandler = (region, mounted) => {
    if(mounted){
      let formData = new FormData();
      formData.append('deliveryBoyId', props.deliveryBoyId);
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
  }
  const acceptOrderHandler = (orderId, customerId, index) => {
    AcceptOrder(orderId, customerId)
      .then(result => {
        props.onAcceptOrder(index);
        //after accepting order track it too
        trackOrderHandler(orderId, customerId, index);
      })
      .catch(err => {
        // console.warn(err);
      });
  }
  const trackOrderHandler = (orderId, customerId, index) => {
    props.navigation.navigate('OrderTrack', {currentIndex : index});
  }
  
  let content = (
  <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
    <NavigationBar {...props} />
    <OrdersList store={props.order} onAcceptOrder={acceptOrderHandler} onTrackOrder={trackOrderHandler}/>
    <DeliveryBoyStatus 
      onStatusUpdate={updateStatusHandler} 
      activeStatus={props.activeStatus}
    />    
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
    activeStatus : state.user.deliveryBoyStatus,
    deliveryBoyId : state.user.deliveryBoyId,
    rowId : state.user.rowId,
    order : state.order
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onUpdateStatus: status => {
      dispatch(updateStatus(status));
    },   
    onAcceptOrder : (index) => {
      dispatch(acceptOrder(index));
    },
    onUpdateCoordinate : data => {
      dispatch(updateCoordinate(data));
    },
    onReceivePendingOrders : data => {
      dispatch(receivePendingOrder(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenPresenter);
