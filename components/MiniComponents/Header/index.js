import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import styles from './styles';
import BackIcon from '../../../assets/SVGs/BackButton.svg';
import CloseIcon from '../../../assets/SVGs/Close.svg';
import * as Segment from 'expo-analytics-segment';
import isUndefined from 'lodash/isUndefined';

export default class Header extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => {
						if (!isUndefined(this.props.segment))
							Segment.trackWithProperties(this.props.segment.str, this.props.segment.obj);
						if (!isUndefined(this.props.navigation)) this.props.navigation.goBack();
						else this.props.actionButton();
					}}
					style={styles.left}
				>
					{this.props.closeButton ? (
						<CloseIcon width={17} height={17} />
					) : (
						<BackIcon width={24} height={24} />
					)}
				</TouchableOpacity>
				<Text uppercase style={styles.title}>
					{this.props.title}
				</Text>
				<View style={[styles.right, this.props.selectedCampaign ? {} : { width: 24 }]}>
					{this.props.selectedCampaign && (
						<Text
							onPress={() =>
								this.props.navigation.push('AdDetails', {
									editCampaign: true,
									campaign: this.props.selectedCampaign,
									image: 'http://' + this.props.selectedCampaign.media,
								})
							}
							style={styles.edit}
						>
							Edit
						</Text>
					)}
				</View>
			</View>
		);
	}
}
