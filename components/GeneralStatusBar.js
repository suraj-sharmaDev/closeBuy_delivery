import React from 'react';
import { Platform, StatusBar } from 'react-native';
import styled from "styled-components";

import Colors from '../constants/Colors';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const View = styled.SafeAreaView`
	height: ${STATUSBAR_HEIGHT};	
`;
const GeneralStatusBar = () => (
	<View>
		<StatusBar translucent backgroundColor={Colors.lighterGreenColor} barStyle="dark-content" />
	</View>
);

export default GeneralStatusBar;