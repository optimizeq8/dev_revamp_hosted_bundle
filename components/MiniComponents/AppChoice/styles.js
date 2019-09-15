import { StyleSheet, Platform, PixelRatio } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
export const colors = {
	black: '#1a1917',
	gray: '#888888',
	background1: '#751AFF',
	background2: '#751AFF',
};
const styles = StyleSheet.create({
	scrollViewContainer: {
		width: '100%',
		flex: 1,
	},
	keyboardContainer: {
		flex: 1,
		height: '100%',
	},
	bottomView: {
		justifyContent: 'flex-end',
	},
	animateView1: {
		flexDirection: 'row',
		alignSelf: 'center',
		marginVertical: 10,
	},
	buttonAndroid: {
		paddingHorizontal: 0,
	},
	buttonBoth: {
		paddingHorizontal: 0,
	},
	searchContainer: {
		borderRadius: 30,
		// marginBottom: 10,
		marginTop: 0,
	},
	listImage: {
		marginHorizontal: 0,
	},
	flatListStyle: {
		flex: 1,
		width: '100%',
	},
	flatListContentContainerStyle: {
		paddingBottom: 30,
	},
	itemCallToAction: {
		marginTop: 20,
	},
	itemCallToActionText: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		color: '#fff',
	},
	activityIndicator: {
		height: 150,
	},
	searchView: {
		height: heightPercentageToDP(30),
		width: '100%',
	},
	animateView2: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: "space-around",
		flex: 1,
		// width: "100%"
	},
	optionsRowView: {
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	iconDown: {
		color: '#fff',
		fontSize: 20,
		// left: 25
	},
	listText: {
		fontFamily: 'montserrat-regular',
		fontSize: 14,
		color: '#fff',
		// flex: 1,
		width: 170,
	},
	footerText: {
		color: '#fff',
		fontSize: 14,
		fontFamily: 'montserrat-regular',
		paddingBottom: 16,
		textDecorationLine: 'underline',
		textAlign: 'center',
	},
	icon: {
		alignSelf: 'center',
		paddingHorizontal: 7,
	},

	mainCard: {
		flex: 1,
	},
	text: {
		color: '#fff',
		paddingBottom: 10,
		fontFamily: 'montserrat-bold',
		fontSize: 14,
		alignSelf: 'center',
	},

	gradient: {
		...StyleSheet.absoluteFillObject,
		height: heightPercentageToDP(105),
	},
	input: {
		backgroundColor: 'rgba(0,0,0,0.2)',
		paddingHorizontal: 15,
		borderRadius: 150,
		borderColor: '#5D1CD8',
		alignSelf: 'center',
		width: '100%',
		height: 50,
		// marginVertical: 10,
		marginBottom: 10,
	},
	inputText: {
		fontFamily: 'montserrat-light',
		fontSize: 14 / PixelRatio.getFontScale(),
		alignSelf: 'center',
		textAlign: 'center',
		color: '#fff',
	},
	pickerText: {
		fontFamily: 'montserrat-light',
		fontSize: 14,
		alignSelf: 'center',
		textAlign: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		color: '#fff',
	},
	media: {
		width: 30,
		height: 30,
		borderRadius: 13,
		marginHorizontal: 20,
	},
	campaignButton: {
		flexDirection: 'row',
		marginHorizontal: 15,
		// paddingHorizontal: 10,
		borderTopStartRadius: 20,
		borderTopEndRadius: 20,
		borderBottomStartRadius: 20,
		borderBottomEndRadius: 20,
		backgroundColor: '#FF9D00',
		height: heightPercentageToDP(7.3),
	},
	OS: {
		padding: widthPercentageToDP(4),
		marginHorizontal: widthPercentageToDP(2),
		borderRadius: 90,
		height: parseInt(heightPercentageToDP(7.2)),
		width: parseInt(widthPercentageToDP(16)),
		justifyContent: 'center',
	},
	OSText: {
		fontSize: widthPercentageToDP(2.9),
		fontFamily: 'montserrat-bold',
		alignSelf: 'center',
	},
	callToActionLabelView: {
		borderTopLeftRadius: 150,
		borderTopRightRadius: 150,
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
		paddingTop: 8,
		width: 150,
		alignSelf: 'center',
		backgroundColor: 'rgba(0,0,0,0.2)',
		height: 15,
		zIndex: 1,
	},
	inputLabel: {
		fontFamily: 'montserrat-bold',
		fontSize: 12 / PixelRatio.getFontScale(),
		color: '#fff',
		alignSelf: 'center',
		textAlign: 'center',
		borderRadius: 30,
		marginBottom: -10,
	},
});

export default styles;
