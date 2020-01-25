import React from 'react';
import styled from 'styled-components';

const View = styled.View`
	background-color : white;
	height : 100%;
	align-items : center;
	justify-content : center;
`;
const Image = styled.Image`
	height : 70%;
	width : 70%;
`;

const LoginImage = props => {
	let content = (
		<View>
			<Image source={require('../../assets/images/loginBanner.png')} />
		</View>
	);
	return content;
}

export default LoginImage;