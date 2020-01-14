import React from "react";
import { Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import CurrentOrder from './CurrentOrder';
import PendingOrders from './PendingOrders';

const Container = styled.ScrollView`
	padding : 10px;
`;

const OrdersList = (props) => {
	React.useEffect(() => {
	}, []);
	let content = (
		<Container>
			<CurrentOrder store={props.store.currentOrder} onTrackOrder={props.onTrackOrder}/>
			<PendingOrders store={props.store.pendingOrders} onAcceptOrder={props.onAcceptOrder}/>
		</Container>
	);
	return content;
}

export default React.memo(OrdersList);