import React from "react";
import { Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';

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

const CurrentOrder = (props) => {
	// console.warn(props.store);
	let content = null;
	React.useEffect(() => {
	}, []);

	content = (
		<Container>
			<Label>Current Order</Label>
			<OrderCard store={props.store} index={0} clickHandler={props.onTrackOrder}/>
		</Container>		
	);
	return content;
}

export default React.memo(CurrentOrder);