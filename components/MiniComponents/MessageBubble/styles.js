import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
	orangeTriangleView: {
		alignSelf: 'flex-end',
		position: 'absolute',
		bottom: 0,
		transform: [{ rotate: '195deg' }],
	},
	messageText: {
		color: 'white',
		alignSelf: 'center',
	},
	messageView: {
		position: 'relative',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		maxWidth: '95%',
		borderRadius: 50,
	},
	transparentTriangleView: {
		alignSelf: 'flex-end',
		position: 'absolute',

		bottom: 0,
		// top: '75%',
		// marginTop: 0,
		// marginRight: -10,
		transform: [{ rotate: '10deg' }],
	},
	messageBubbleOuterView: {
		marginLeft: 18,
		marginRight: 18,
		marginVertical: 5,
		flexDirection: 'column',
		// alignSelf: align,
	},
	dateText: {
		color: 'white',
		fontSize: 10,
		paddingBottom: 5,
		paddingLeft: 5,
		paddingRight: 5,
	},
	messageFullView: {
		flexDirection: 'row',
	},
});
export default styles;
