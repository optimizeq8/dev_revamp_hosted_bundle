import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon } from 'native-base';

import styles from './styles';

import EditCameraIcon from '../../../../assets/SVGs/CameraCircleOutline';
export default class MediaButton extends Component {
	render() {
		let image = this.props.image;
		if (image) {
			return (
				<View style={styles.inputMiddleButton2}>
					<EditCameraIcon />
					<Text style={styles.mediaButtonMsgEdit}>Edit Media</Text>
				</View>
			);
		} else
			return (
				<Button
					style={styles.inputMiddleButton}
					onPress={() => {
						// this._pickImage();
						this.props.setMediaModalVisible(true);
					}}
				>
					<Icon style={styles.icon} name="camera" />
					<Text style={[styles.mediaButtonMsg]}>
						{image
							? // ? Platform.OS === "ios"
							  //   ? "Edit Photo"
							  //   :
							  'Edit Media'
							: // : Platform.OS === "ios"
							  // ? "Add Photo"
							  'Add Media'}
					</Text>
				</Button>
			);
	}
}
