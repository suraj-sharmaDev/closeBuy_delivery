import React from "react";
import { Platform, Dimensions, RefreshControl } from 'react-native';
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
	const [refreshing, updateRefreshing] = React.useState(false);
	React.useEffect(() => {
	}, []);

	const refresh = () => {
		// console.warn('refresh');
		updateRefreshing(false);
	}
	let content = (
		<Container
		 refreshControl={		
			<RefreshControl
            	refreshing={refreshing}
            	onRefresh={refresh}
          	/>
         }		
		> 		
			<CurrentOrder store={props.store.currentOrder} onTrackOrder={props.onTrackOrder}/>
			<PendingOrders store={props.store.pendingOrders} onAcceptOrder={props.onAcceptOrder}/>
		</Container>
	);
	return content;
}

export default OrdersList;