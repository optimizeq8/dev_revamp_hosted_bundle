import { StyleSheet, PixelRatio } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalColors } from '../../../../GlobalStyles';
export const colors = {
	black: '#1a1917',
	gray: '#888888',
	background1: '#751AFF',
	background2: '#6268FF',
};
const styles = StyleSheet.create({
	safeAreaView: {
		backgroundColor: '#0000',
		height: '100%',
	},
	container: {
		backgroundColor: '#0000',
		display: 'flex',
		justifyContent: 'space-between',
	},
	backDrop: {
		position: 'absolute',
		top: -hp('60%'),
		alignSelf: 'center',
	},
	block1: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		width: wp(100),
		paddingTop: 10,
	},
	phoneicon: {
		alignSelf: 'center',
		marginTop: 20,
	},
	mainContent: {
		flex: 1,
		justifyContent: 'flex-start',
		paddingTop: 30,
	},
	input1: {
		marginBottom: 30,
		borderRadius: 15,
		alignSelf: 'center',
		width: 300,
		height: 50,
	},
	inputLabel: {
		fontFamily: 'montserrat-semibold',
		fontSize: 14 / PixelRatio.getFontScale(),
		color: '#fff',
		alignSelf: 'center',
		textAlign: 'center',
	},
	inputText: {
		fontFamily: 'montserrat-regular',
		fontSize: 14 / PixelRatio.getFontScale(),
		color: '#fff',
		alignSelf: 'center',
		textAlign: 'center',
	},
	minBudget: {
		color: '#fff',
		alignSelf: 'center',
		fontSize: 11,
	},
	title: {
		fontSize: 16,
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'montserrat-semibold',
		paddingTop: 30,
	},
	input2: {
		backgroundColor: 'rgba(0, 0, 0, 0.16)',
		paddingHorizontal: 50,
		borderRadius: 15,
		alignSelf: 'center',
		width: 250,
		height: 50,
		marginTop: 10,
		marginBottom: 20,
	},
	label: {
		fontFamily: 'montserrat-regular',
		fontSize: 14,
		color: '#fff',
		alignSelf: 'center',
		textAlign: 'center',
		width: '100%',
	},
	downicon: {
		color: '#fff',
		fontSize: 20,
	},
	popupOverlay: {
		height: '100%',
	},
	contentContainer: {
		marginTop: 15,
		paddingTop: 15,
		marginBottom: 15,
	},
	dateInput: {
		marginBottom: 5,
		backgroundColor: 'rgba(0,0,0,0.15)',
		borderRadius: 15,
		alignSelf: 'center',
		width: 270,
		height: hp(7),
		justifyContent: 'center',
		borderWidth: 0.5,
	},
	dateLabel: {
		textAlign: 'center',
		color: globalColors.orange,
		flexDirection: 'column',
		fontFamily: 'montserrat-regular',
		fontSize: 16,
		paddingHorizontal: 10,
	},
	date: {
		fontFamily: 'montserrat-medium',
		color: '#fff',
	},
	block1Title: {
		top: hp(5),
	},
	innerBlock1: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	dateContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	dateColumn: {
		flexDirection: 'column',
	},
});

export default styles;
