import React from "react";
import { Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';
import {GetWorkingHours} from '../../middleware/API';
import Fonts from '../../constants/Fonts';
import LoadingScreen from '../../components/LoadingScreen';
import Analytics from '../../components/ProfileScreen/Analytics';
import NavigationBar from '../../components/DrawerNavigator/NavigationBar';

const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  height : ${height};
  width : ${width};
`;
const Picker = styled.Picker`
  height : 50px;
  width : 100%;
`;
const Container = styled.View`
  padding : 10px;
`;
const WorkHour = styled.View``;
const Order = styled.View``;
const Title = styled.Text`
  font-family : ${Fonts.boldFont};
  font-size : 16px;
  text-align : center;
`;

const ProfileScreenPresenter = (props) => {
  const [analytics, updateAnalytics] = React.useState(null);
  const [selected, updateSelected] = React.useState('this_week');
  React.useEffect(()=>{
    initialization();
  },[selected]);

  const initialization = () => {
    if(typeof startDate=='undefined' && typeof endDate=='undefined'){
      endDate = new Date();
      startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 7);
    }
    GetWorkingHours(props.user.deliveryBoyId, startDate.toISOString(), endDate.toISOString())
    .then((result)=>{
      updateAnalytics(result.reason);
    })
    .catch((err)=>{
      console.warn(err);
    })
  }
  const pickerHandler = (itemValue) => {
    endDate = new Date();
    switch(itemValue){
      case 'this_week' :
        startDate = new Date(
                          endDate.getFullYear(),
                          endDate.getMonth(), 
                          endDate.getDate() - 7
                    );
        break;
      case 'this_month' :
        startDate = new Date(
                          endDate.getFullYear(),
                          endDate.getMonth(), 
                          1
                    );      
        break;
      case 'prev_month' :
        startDate = new Date(
                          endDate.getFullYear(),
                          endDate.getMonth() - 1 , 
                          endDate.getDate()
                    );      
        break;
      case 'six_month' :
        startDate = new Date(
                          endDate.getFullYear(),
                          endDate.getMonth() - 6, 
                          endDate.getDate()
                    );      
        break;
      case 'this_year' :
        startDate = new Date(
                          endDate.getFullYear() - 1,
                          endDate.getMonth(), 
                          endDate.getDate()
                    );      
        break;        
      default :
        startDate = new Date(
                          endDate.getFullYear(),
                          endDate.getMonth(), 
                          endDate.getDate() - 7
                    );
    }
    updateSelected(itemValue);
  }
  
  let totalWorkHours = <LoadingScreen />;
  let totalOrderDelivered = null;
  if(analytics!==null){
    if(!analytics.working_hours.error){
      totalWorkHours = analytics.working_hours.map((wH, index)=>(<Analytics key={index} data={wH} type={'workingHours'}/>));
    }if(!analytics.order_analytics.error){
      totalOrderDelivered = analytics.order_analytics.map((oA, index)=>(<Analytics key={index} data={oA} type={'order'}/>))
    }
  }
  let content = (
  <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
    <NavigationBar {...props} />
    <Picker
      selectedValue={selected}    
      onValueChange={(itemValue, itemIndex) =>pickerHandler(itemValue)}
    >
      <Picker.Item label="This Week" value="this_week"/>
      <Picker.Item label="This Month" value="this_month"/>
      <Picker.Item label="Previous Month" value="prev_month"/>
      <Picker.Item label="Last Six Months" value="six_month"/>            
      <Picker.Item label="This Year" value="this_year"/>                  
    </Picker>  
    <Container>
      <WorkHour>
        <Title>Total Work Hours</Title>
        {totalWorkHours}      
      </WorkHour>
      <Order>
        <Title>Total Orders</Title>
        {totalOrderDelivered}          
      </Order>
    </Container>
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
export default connect(mapStateToProps,{})(ProfileScreenPresenter);
// export default ProfileScreenPresenter;
