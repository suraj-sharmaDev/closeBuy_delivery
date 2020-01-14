import React from "react";
import { Platform, Dimensions, Animated, Keyboard, BackHandler} from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';

import {login} from "../../store/actions/user";  //belongs to redux

import {Login} from '../../middleware/API'; //for AJAX API
import LoginImage from "../../components/LoginScreen/LoginImage";
import LoginForm from "../../components/LoginScreen/LoginForm";

const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  height : ${height};
  width : ${width};
`;
const Container = styled.View``;

const LoginScreenPresenter = (props) => {
  
  let imageHeight = new Animated.Value(height*0.60);
  let formHeight = new Animated.Value(height*0.40);
  let imageAnimationStyle = { height : imageHeight};  
  let formAnimationStyle = { height : formHeight}; 
  React.useEffect(()=>{
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', inputFocused);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', inputBlurred);
    return()=>{
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    }
  })

  const formInput = (data) => {
    Login(data)
    .then((result)=>{
      if(result.error){
        //Username or password wrong
      }else{
        //Update redux
        props.onLogin(result.id);
      }
    })
    .catch((err)=>{
      console.warn(err);
    })
  }

  const inputFocused = () => {
    Animated.parallel([
      Animated.timing(imageHeight,{
        toValue : height*0.30,
        duration : 300
      }),
      Animated.timing(formHeight,{
        toValue : height*0.30,
        duration : 300
      })      
    ]).start();    
    return true;
  }
  const inputBlurred = () => {
    Animated.parallel([
      Animated.timing(imageHeight,{
        toValue : height*0.60,
        duration : 300
      }),
      Animated.timing(formHeight,{
        toValue : height*0.40,
        duration : 300
      })      
    ]).start();    
    return true;    
  }  
  let content = (
    <Theme>
      <Container>
        <Animated.View style={imageAnimationStyle}>
          <LoginImage />
        </Animated.View>
        <Animated.View style={formAnimationStyle}>          
          <LoginForm formInput={formInput}/>
        </Animated.View>
      </Container>
    </Theme>
  );
  return content;
};

const mapStateToProps = state => {
  return {
    user : state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogin : data => {
      dispatch(login(data));
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginScreenPresenter);
// export default LoginScreenPresenter;
