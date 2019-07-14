import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export const colors = {
	black: '#1a1917',
	gray: '#888888',
	background1: '#751AFF',
	background2: '#751AFF',
};
const styles = StyleSheet.create({
	iconWallet: {
		top: '1%',
		left: '90%',
	},
	mainView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
		width: '100%',
	},
	amountContainer: {
		flexDirection: 'column',
	},
	amountText: {
		fontSize: heightPercentageToDP(3.4),
		paddingHorizontal: 0,
	},
	cardStyle: {
		justifyContent: 'space-between',
		backgroundColor: '#FFFF',
		flexDirection: 'row',
		flex: 1,
		marginHorizontal: 25,
		borderRadius: 25,
		marginVertical: 10,
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowColor: '#a0a0a0',
		shadowOffset: { height: 6, width: 0 },
		elevation: 5,
	},
	text: {
		color: '#5F5F5F',
		fontFamily: 'montserrat-medium',
		fontSize: 13,
		textAlign: 'left',
		paddingTop: heightPercentageToDP(0.5),
	},
	dateText: {
		color: '#5F5F5F',
		fontFamily: 'montserrat-medium',
		fontSize: 13,
		paddingTop: heightPercentageToDP(0.5),
	},
	header: {
		paddingBottom: heightPercentageToDP(1),
	},
	textContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	titleText: {
		textAlign: 'left',
		color: '#5F5F5F',
		fontFamily: 'montserrat-bold',
		fontSize: 16,
		paddingVertical: 0,
		width: 200,
	},

	subText: {
		paddingTop: heightPercentageToDP(0.25),
		paddingBottom: heightPercentageToDP(0.5),
		fontFamily: 'montserrat-regular',
		fontSize: 14,
		color: '#a0a0a0',
	},
	transactionButton: {
		flex: 1,
		padding: 20,
	},
	containerStyle: {
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: 'transparent',
		borderRadius: 20,
	},
	icon: {
		position: 'absolute',
		color: '#a0a0a0',
		// left: widthPercentageToDP('63%'),
		right: 0,
		fontSize: widthPercentageToDP('15%'),
		top: widthPercentageToDP('-3%'),
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowColor: '#6268FF',
		shadowOffset: { height: 1, width: 0 },
		elevation: 5,
	},
});

export default styles;
