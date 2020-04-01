import React from "react";
import { Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import OrderCard from './OrderCard';

const Container = styled.View`
	margin-bottom : 20px;
	padding : 10px;
	background-color : ${Colors.lightGreenColor};
`;
const Label = styled.Text`
	color : white;
	text-align : center;
	font-size : 16px;
	font-family : ${Fonts.boldFont};
	border-bottom-width : 2px;
	border-bottom-color : ${Colors.greenColor};	
`;

const PendingOrders = (props) => {
	let content = null;
	React.useEffect(() => {
	}, []);	

	content = (
		<Container>
			<Label>Pending Order</Label>
			{
				Object.keys(props.store).length > 0
				?
				props.store.map((s, index)=>(<OrderCard store={s} key={index} index={index} clickHandler={props.onAcceptOrder}/>))
				:
				<OrderCard store={props.store} />				
			}
		</Container>
	);
	return content;
}

export default PendingOrders;