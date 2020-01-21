import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {GetCompletedOrders} from '../../middleware/API';
import OrderItem from './OrderItem';

const Container = styled.ScrollView`
	padding : 10px;
`;
const PaddedView = styled.View`
	padding : 20px 10px 20px 10px;
`;
const InfoView = styled.View`
	background-color : ${Colors.warningColor};
	padding : 10px;
	align-items : center;
	justify-content : center;
`;
const Text = styled.Text`
	font-size : 18px;
	font-family : ${Fonts.boldFont};
	color : white;
`;

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height;
};

const OrdersCard = props => {
	const [startIndex, updateStartIndex] = React.useState(0);
	React.useEffect(() => {
		initialize();
	}, []);
	const initialize = () => {
		if(startIndex!=null){
			GetCompletedOrders(props.deliveryBoyId, startIndex)
				.then(result => {
					if (result.error) {
						updateStartIndex(null);
					} else {
						if(typeof fetchedOrders == 'object'){
							fetchedOrders = [...fetchedOrders, ...result.reason];
						}else{
							fetchedOrders = result.reason;
						}	
						updateStartIndex(startIndex + Object.keys(result.reason).length);
					}
				})
				.catch(err => {
					console.warn(err);
				});
			}
	};

	let body = (<Text>Loading...</Text>);
	if(startIndex!==0 && typeof fetchedOrders=='object'){
		body = fetchedOrders.map((item, index)=>(
			<OrderItem item={item} key={index}/>
		));
	}
	let content = (
		<Container
		 onScroll={({nativeEvent}) => {
		  if (isCloseToBottom(nativeEvent)) {
			initialize();
		  }
         }}
         scrollEventThrottle={400}
         contentContainerStyle={{paddingVertical: 20}}		
		>
			{body}
			<PaddedView>
			{
				startIndex===null
				?
				<InfoView>
					<Text>You have no more orders!</Text>
				</InfoView>
				:
				null
			}
			</PaddedView>			
		</Container>
	);
	return content;
}

export default OrdersCard;