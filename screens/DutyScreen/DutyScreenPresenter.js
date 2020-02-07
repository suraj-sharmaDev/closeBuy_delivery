import React from "react";
import { Platform, Dimensions, Alert } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';

import {UpdateStatus} from '../../middleware/API';
import {updateStatus} from "../../store/actions/user";
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  height : ${height};
  width : ${width};
  flex-direction : column;
  align-items : center;
`;
const ImageView = styled.View`
  justify-content : center;
  padding : 60px 0px 0px 0px;
`;
const Image = styled.Image``;

const View = styled.View`
  height : ${height*0.45};
  justify-content : flex-end;
`;
const Button = styled.TouchableOpacity`
  width : ${width*0.6};
  background-color : ${Colors.blueColor};
  padding : 8px;
  border-radius : 10px;
`;
const Text = styled.Text`
  font-family : ${Fonts.boldFont};
  font-size : 18px;
  color : white;
  text-align : center;
`;

const DutyScreenPresenter = (props) => {

  React.useEffect(()=>{
    if(props.activeStatus==1) props.navigation.navigate('HomeScreen');
  },[])

  const updateStatusHandler = () => {
    statusUpdateString = props.activeStatus==1?'offline':'online';
    UpdateStatus(props.deliveryBoyId, statusUpdateString, props.rowId)
    .then((result)=>{
      if(!result.error){
        props.onUpdateStatus({status : !props.activeStatus, rowId:result.rowId});        
      }
    })
    .catch((err)=>{
      console.warn(err)
    })
    props.navigation.navigate('HomeScreen');    
  }
  if(props.activeStatus==1){
    //deliveryBoy is already online
    return null;
  }else{
    let content = (
    <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <ImageView>
        <Image source={require('../../assets/images/192.png')} />
      </ImageView>
      <View>
        <Button onPress={updateStatusHandler}>
          <Text>Start Duty</Text>
        </Button>    
      </View>
    </Theme>
    );
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DutyScreenPresenter);
