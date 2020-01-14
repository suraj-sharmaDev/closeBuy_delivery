import React from "react";
import { Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
	margin : 10px 0px;
	padding : 10px;
	background-color : white;	
	flex-direction : column;
	align-items : center;
	justify-content : center;
`;
const Button = styled.TouchableOpacity``;
const Text = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.normalFont};
	color : ${Colors.greenColor};
`;

const OrderCard = props => {
	let content = null;
	let order = null;
	React.useEffect(() => {
	}, []);

	if(Object.keys(props.store).length===0){
		content = (<Text>No Order</Text>);
	}else{
		let numOfItems = Object.keys(props.store.orderItems).length;
		let orderId = props.store.orderId;
		let houseDetail = props.store.deliveryCoordinates.houseDetail;
		let landmark = props.store.deliveryCoordinates.landmark;
		content = (
			<Button onPress={()=>props.clickHandler(orderId)}>
				<Text>{numOfItems} Items Ordered</Text>
				<Text>To be delivered at {houseDetail}</Text>
				<Text>{landmark}</Text>								
			</Button>
		);
	}

	return(
		<Container>
			{content}
		</Container>
	);
}

export default React.memo(OrderCard);