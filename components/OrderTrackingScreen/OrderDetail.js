import React from 'react';
import {Linking} from 'react-native';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import OrderButton from './OrderButton';

const Container = styled.View`
	padding : 10px;
	height : 45%;
`;
const HeaderTitle = styled.Text`
	text-align : center;
	font-family : ${Fonts.boldFont};
	font-size : 18px;
	text-decoration-line: underline;
	text-decoration-style: solid;
    text-decoration-color: ${Colors.greyColor};	
`;

const OrderBox = styled.View`
	margin : 8px 0px;
	flex-direction : row;
	justify-content : space-between;
	align-items : center;
`;
const View = styled.View``;

const MainText = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 16px;
`;
const SmallText = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 14px;
`;
const Button = styled.TouchableOpacity`
	padding : 4px;
	flex-direction : row;
	align-items : center;
	justify-content : center;
`;

const OrderItem = ({data}) => {
	let item = (
		<OrderBox>
			<View>
				<MainText>{data.name}</MainText>			
				<SmallText>{data.qty} x Rs {data.price}</SmallText>
			</View>
			<MainText>Rs {data.qty * data.price}</MainText>
		</OrderBox>
	);
	return item;
}
const OrderDetail = props => {
	const customerName = props.order.customerName;
	const customerMobile = props.order.customerMobile;
	const distributorName = props.order.distributorName;
	const pickupAddress = props.order.pickupAddress;
	const deliveryAddressStreet = props.order.deliveryCoordinates.coordinate.reverseAddress.title +', '+props.order.deliveryCoordinates.coordinate.reverseAddress.street;
	const deliveryAddress = deliveryAddressStreet+', House Address is '+props.order.deliveryCoordinates.houseDetail+', '+props.order.deliveryCoordinates.landmark;	
	React.useEffect(()=>{
	},[])
	
	const makeCall = () => {
		Linking.openURL(`tel:${customerMobile}`);		
	}

	let content = (
		<Container>
			<HeaderTitle>OrderDetail</HeaderTitle>		
			{
				props.orderStatus==='picked'
				?
				<View>
					<OrderBox>
						<MainText>Customer Name</MainText>
						<MainText>{customerName}</MainText>
					</OrderBox>
					<OrderBox>
						<MainText>Customer Mobile</MainText>
						<Button onPress={makeCall}>
							<MainText style={{marginRight : 10}}>{customerMobile}</MainText>						
							<Icon name="phone" size={20} color='green' />
						</Button>
					</OrderBox>					
					<View style={{alignItems : 'center', width : '100%'}}>
						<MainText>{deliveryAddress}</MainText>
					</View>										
				</View>
				:
				<View>
					<OrderBox>
						<MainText>Shop Name</MainText>
						<MainText>{distributorName}</MainText>
					</OrderBox>
					<OrderBox>
						<MainText>Pickup Address</MainText>
						<MainText>{pickupAddress}</MainText>
					</OrderBox>
				</View>
			}
			{
				props.order.orderItems.map((o, index)=>(
					<OrderItem data={o} key={index}/>
				))
			}			
			<OrderButton orderStatus={props.orderStatus} clickHandler={props.clickHandler}/>
		</Container>
	);
	return content;
}

export default OrderDetail;