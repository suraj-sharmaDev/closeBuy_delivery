import React from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
	margin-top : auto;
	flex-direction : row;
	align-items : center;
	justify-content : center;
`;
const Button = styled.TouchableOpacity`
	background-color : ${Colors.greenColor};
	padding : 4px;
	border-radius : 7px;
`;
const Text = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 18px;
	color : white;
`;

const OrderButton = props =>{
	const clickHandler = () => {
		Alert.alert(
			'Completed',
			'Have You completed!',
			[
				{text: 'Yes', onPress: () => props.clickHandler()},
				{
					text: 'Cancel',
					style: 'cancel',
				},
			],
			{cancelable: false},
		);
	}

	if(props.orderStatus==='accepted'){
		currentStatus = 'Complete Pickup';		
	}else if(props.orderStatus==='picked'){
		currentStatus = 'Complete Delivery';
	}
	let content = (
		<Container>
			<Button activeOpacity={0.7} onPress={clickHandler}>
				<Text>{currentStatus}</Text>
			</Button>
		</Container>
	);
	return content;
}

export default OrderButton;