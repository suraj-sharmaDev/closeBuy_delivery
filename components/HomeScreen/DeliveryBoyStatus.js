import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {AlertService} from '../../middleware/AlertService';

const Container = styled.View`
	padding : 5px 0px;
	align-items : center;
	justify-content : center;
`;
const Button = styled.TouchableOpacity`
	background-color : ${Colors.dangerColor};
	padding : 8px 12px;
	border-radius : 7px;
`;
const Text = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 15px;
	color : white;
`;

const DeliveryBoyStatus = (props) => {
	const clickHandler = () => {
		AlertService('','Are you sure to end duty?',()=>props.onStatusUpdate());		
	}
	let content = (
		<Container>
			<Button 
				style={{ backgroundColor : props.activeStatus===true ? Colors.greenColor : Colors.dangerColor}}
				onPress={clickHandler}
			>
				<Text>
				{
					props.activeStatus===true?'Online':'Offline'
				}
				</Text>
			</Button>
		</Container>
	);
	return content;
}

export default DeliveryBoyStatus;