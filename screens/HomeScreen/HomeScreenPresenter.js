import React from "react";
import { Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';

import {updateCoordinate} from "../../store/actions/user";
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
  React.useEffect(()=>{
    NotificationService(props.user.deliveryBoyId, onDataNotifs);
  },[])
  const onDataNotifs = data => {
    console.warn(data);
  }
  const onAcceptOrder = (data) => {
    console.warn(data, 'accepting');
  }
  const onTrackOrder = (data) => {
    console.warn(data, 'tracking');
  }
  let content = (
  <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
    <GeolocationService />
    <NavigationBar {...props} />
    <OrdersList store={props.order} onAcceptOrder={onAcceptOrder} onTrackOrder={onTrackOrder}/>
  </Theme>
  );
  return content;
};

const mapStateToProps = state => {
  return {
    user : state.user,
    order : state.order
  }
}
export default React.memo(connect(mapStateToProps, {})(HomeScreenPresenter));
