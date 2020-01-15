import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
	padding : 10px;
`;
const HeaderTitle = styled.Text`
	text-align : center;
	font-family : ${Fonts.boldFont};
	font-size : 18px;
	text-decoration-line: underline;
	text-decoration-style: solid;
    text-decoration-color: ${Colors.greyColor};	
`;

const View = styled.View``;
const Table = styled.View`
	margin-top : 10px;
	flexDirection : row;
	align-items : center;
	justify-content : space-between;
`; 
const Column = styled.View`
	flexDirection : column;
	align-items : center;
	justify-content : center;
`;
const Text = styled.Text`
	font-family : ${Fonts.lightFont};
	font-size : 14px;
`;

const OrderItem = ({data}) => {
	let item = (
		<Table>
			<Column>
				<Text>Item Name</Text> 
				<Text>{data.name}</Text>
			</Column>
			<Column>
				<Text>Quantity</Text> 
				<Text>{data.qty}</Text>
			</Column>
			<Column>
				<Text>Price/Qty</Text> 
				<Text>{data.price}</Text>
			</Column>
		</Table>
	);
	return item;
}
const OrderDetail = props => {
	React.useEffect(()=>{
	},[])
	
	let content = (
		<Container>
			<HeaderTitle>OrderDetail</HeaderTitle>		
			<View>
			{
				props.order.orderItems.map((o, index)=>(
					<OrderItem data={o} key={index}/>
				))				
			}
			</View>
		</Container>
	);
	return content;
}

export default OrderDetail;