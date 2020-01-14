import React from "react";
import { Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';

import {updateCoordinate} from "../../store/actions/user";
import NotificationService from '../../middleware/NotificationService';
import GeolocationService from '../../middleware/GeolocationService';
import NavigationBar from '../../components/DrawerNavigator/NavigationBar';

const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  height : ${height};
  width : ${width};
`;
const Text = styled.Text``;

const HomeScreenPresenter = (props) => {
  React.useEffect(()=>{
    NotificationService(props.user.deliveryBoyId, onDataNotifs);    
    GeolocationService(props.user.deliveryBoyId, props.order.customerId, props.onUpdateCoordinate);
  })
  const onDataNotifs = data => {
    console.warn(data);
  }
  let content = (
  <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
    <NavigationBar {...props} />
    <Text>Home Screen</Text>
  </Theme>
  );
  return content;
};

const mapStateToProps = state => {
  return {
    user : state.user,
    order : state.order,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubscribe : data => {
      dispatch(subscribe(data));
    },
    onUpdateCoordinate : data => {
      dispatch(updateCoordinate(data));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenPresenter);
