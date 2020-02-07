import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
	padding : 2px 4px;
	background-color : ${Colors.lighterGreenColor};
	height : 45px;
	flex-direction : row;
	align-items : center;
`;
const MenuButton = styled.TouchableOpacity`
	padding : 4px;
`;
const View = styled.View`
	width : 80%;
`;
const Text = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 14px;
	text-align : center;
`;
const NavigationBar = props => {
	let content = (
		<Container>
			<MenuButton onPress={props.navigation.openDrawer}>
				<Icon name="menu" size={30} />					
			</MenuButton>
			<View>
				<Text>CloseBuy Delivery App</Text>
			</View>
		</Container>
	);
	return content;
}

export default NavigationBar;