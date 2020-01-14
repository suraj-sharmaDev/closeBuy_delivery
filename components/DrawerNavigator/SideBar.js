import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import {connect} from 'react-redux';

import {logout} from "../../store/actions/user";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.ScrollView``;
const SafeAreaView = styled.SafeAreaView``;
const ImageBackground = styled.ImageBackground ``;

const Item = styled.View`
	margin-top : 30px;
	padding : 0px 10px;
	flex-direction : row;
	justify-content : center;
	align-items : center;
`;
const Button = styled.TouchableOpacity`
	background-color : ${Colors.dangerColor};
	border-radius : 10px;
	padding : 4px;
	flex-direction : row;
	justify-content : center;
	align-items : center;
`;
const Label = styled.Text`
	font-size : 18px;
	font-family : ${Fonts.boldFont};
	color : white;
`;

const SideBar = props => {
	React.useEffect(()=>{
	})
	return (
		<Container>
			<SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
				<ImageBackground source={require('../../assets/images/bubbles.jpg')} style={{width: '100%', height:100}} />
				<DrawerNavigatorItems {...props} />
				<Item onPress={props.onLogout}>
					<Button>
						<Icon name="lock" size={22} color="white"/>
						<Label>Logout</Label>					
					</Button>
				</Item>
			</SafeAreaView>
		</Container>
	);	
}

const mapStateToProps = state => {
	return {
		user : state.user
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onLogout : () => {
			dispatch(logout())
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);