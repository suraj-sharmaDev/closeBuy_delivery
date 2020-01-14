import React from 'react';
import styled from 'styled-components';

const View = styled.View`
	background-color : blue;
	height : 100%;
`;
const Image = styled.Image`
	height : 100%;
	width : 100%;
`;

const LoginImage = props => {
	let content = (
		<View>
			<Image source={require('../../assets/images/offer2.png')} />
		</View>
	);
	return content;
}

export default LoginImage;