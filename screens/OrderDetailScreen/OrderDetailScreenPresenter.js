import React from "react";
import { Platform, PermissionsAndroid, Dimensions, Keyboard } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Theme = styled.View`
  height : ${height};
  width : ${width};
`;
const Text = styled.Text``;

const OrderDetailScreenPresenter = (props) => {
  let content = (
  <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
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
// export default connect(mapStateToProps,{})(OrderDetailScreenPresenter);
export default OrderDetailScreenPresenter;
