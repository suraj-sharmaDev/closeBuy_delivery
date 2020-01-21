import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
const Container = styled.View`
	background-color : ${Colors.lightGreenColor};
	padding : 10px;
	margin-vertical : 10px;
	border-radius : 7px;
`;
const OrderId = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.boldFont};
	color : white;
	text-align : center;
	margin-bottom : 4px;
`;
const Text = styled.Text`
	font-size : 15px;
	font-family : ${Fonts.normalFont};
	color : white;
`;

const OrderItem = props => {
	// console.warn(props.item);
	let numOfItems = Object.keys(JSON.parse(props.item.items_added)).length;
	let orderId = props.item.id;
	let customerId = props.item.customerId;
	let houseDetail = JSON.parse(props.item.delivery_address).houseDetail;
	let landmark = JSON.parse(props.item.delivery_address).landmark;
	let dateArray = props.item.time_stamp.split(' ');
	let ymd = dateArray[0].replace(/-/g,'/');
	let content = (
		<Container>
			<OrderId>#ORDERID{orderId}</OrderId>
			<Text>{numOfItems} item delivered</Text>
			<Text>To {houseDetail} {landmark}</Text>
			<Text>{ymd}</Text>
		</Container>
	);
	return content;
}

export default OrderItem;