import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';

const Container = styled.View`
	padding : 2px 4px;
	background-color : ${Colors.lighterGreenColor};
	height : 45px;
	flex-direction : row;
	align-items : center;
	justify-content : flex-end;
`;
const MenuButton = styled.TouchableOpacity`
	padding : 4px;
`;

const NavigationBar = props => {
	let content = (
		<Container>
			<MenuButton onPress={props.navigation.openDrawer}>
				<Icon name="menu" size={30} />					
			</MenuButton>
		</Container>
	);
	return content;
}

export default NavigationBar;