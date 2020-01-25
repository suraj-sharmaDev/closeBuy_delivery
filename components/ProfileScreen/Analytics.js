import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
	margin : 5px 0px;
	padding : 6px;
	flex-direction : row;
	align-items : center;
	justify-content : space-between;
	background-color : ${Colors.lightGreenColor};
`;
const DateField = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 14px;
	color : white;
`;
const DataField = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 15px;
	color : white;
`;
const Analytics = ({data, type}) => {
	let content = (
		<Container>
			<DateField>{data.date}</DateField>
			<DataField>{type==='order'?`${data.count} order`:`${data.working_hours} hours`}</DataField>
		</Container>
	);
	return content;
}

export default Analytics;