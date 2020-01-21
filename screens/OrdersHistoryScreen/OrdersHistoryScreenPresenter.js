import React from "react";
import { Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';

import OrdersCard from '../../components/OrdersHistoryScreen/OrdersCard';
import NavigationBar from '../../components/DrawerNavigator/NavigationBar';

const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  height : ${height};
  width : ${width};
`;

//Let's not store all orders for this customer in his local storage
//With increase in orders the data stored will also increase
//hail ajax call
const OrdersHistoryScreenPresenter = (props) => {
  let content = (
  <Theme>
    <NavigationBar {...props} />
    <OrdersCard deliveryBoyId={props.user.deliveryBoyId}/>
  </Theme>
  );
  return content;
};

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

export default connect(mapStateToProps,{})(OrdersHistoryScreenPresenter);
