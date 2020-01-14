import React from "react";
import { Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';

import NotificationService from '../../middleware/NotificationService';
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
    user : state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubscribe : data => {
      dispatch(subscribe(data));
    }
  }
}
export default connect(mapStateToProps,{})(HomeScreenPresenter);