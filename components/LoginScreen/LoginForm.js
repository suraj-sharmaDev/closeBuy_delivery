import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
	padding : 20px;
`;
const Input = styled.TextInput`
	margin-bottom : 10px;
	padding : 5px 5px;
	font-size : 16px;
	font-family : ${Fonts.normalFont};
	border-width : 1px;
	border-color : ${Colors.lightGreyColor};
	border-radius : 6px;
`;
const Button = styled.TouchableOpacity`
	margin-top : 10px;
	backgroundColor : ${Colors.greenColor};
	padding : 10px 0px;
	justify-content : center;
	align-items : center;
`;
const Text = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.normalFont};
	color : white;
`;

const LoginForm = props => {
	const [submitButton, updateSubmitButton] = React.useState(false);
	let username = '';
	let password = '';
	const formHandler = (text, type) => {
		if(type==="username")
		{
			username = text;
		}else{
			password = text;
		}
	}

	const submitForm = () => {
		let formData = new FormData();
		if(username && password){
			formData.append('username', username);
			formData.append('password', password);
			props.formInput(formData);
		}else{
			console.warn('FIll em');
		}
	}

	let content = (
		<Container>
			<Input 
				placeholder="Enter Username"
				keyboardType="default"
				onChangeText={e => formHandler(e, 'username')}
			/>
			<Input 
				placeholder="Enter Password"
				secureTextEntry={true} 
				keyboardType="default"
				onChangeText={e => formHandler(e, 'password')}
			/>			
			<Button onPress={submitForm}>
				<Text>Login</Text>
			</Button>
		</Container>		
	);
	return content;
}

export default LoginForm;