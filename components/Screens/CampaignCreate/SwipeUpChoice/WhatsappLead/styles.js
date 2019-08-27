import { StyleSheet, Platform, PixelRatio } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
export const colors = {
	black: '#1a1917',
	gray: '#888888',
	background1: '#751AFF',
	background2: '#751AFF',
};
const styles = StyleSheet.create({
	safeAreaContainer: {
		flex: 1,
	},
	container: {
		backgroundColor: 'transparent',
		// marginTop: 0,
		// height: '100%',
		flex: 1,
		// marginBottom: heightPercentageToDP(35),
	},
	bottonViewWebsite: {
		marginBottom: heightPercentageToDP(35),
	},
	websiteView: {
		alignItems: 'center',
		width: '100%',
	},
	websiteLabelView: {
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
	input: {
		// backgroundColor: '#5D1CD8',
		backgroundColor: 'rgba(0,0,0,0.2)',
		borderRadius: 40,
		borderColor: 'transparent',
		alignSelf: 'center',
		// width: wp(75),
		height: 50,
		paddingHorizontal: 0,
		width: 270,
	},
	inputtext: {
		fontFamily: 'montserrat-regular',
		fontSize: 14 / PixelRatio.getFontScale(),
		alignSelf: 'center',
		textAlign: 'center',
		color: '#FFF',
		borderColor: 'transparent',
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
	inputContainer: {
		marginTop: 30,
	},
});

export default styles;
