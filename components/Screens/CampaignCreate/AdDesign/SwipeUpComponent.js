import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
export default class SwipeUpComponent extends Component {

{/* render() {
    let { destination, attachment, objective, image, adType } = this.props;
    return (
      <TouchableOpacity
        style={styles.swipeUp}
        onPress={() => {
          objective === "TRAFFIC" || adType === "StoryAd"
            ? this.props.navigation.push("SwipeUpDestination", {
                _changeDestination: this.props._changeDestination,
                image
              })
            : this.props.navigation.navigate("SwipeUpChoice", {
                _changeDestination: this.props._changeDestination,
                objective
              });
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.swipeUpText}>
            {(destination !== "BLANK" ||
              (this.props.selectedStoryAd.destination &&
                this.props.selectedStoryAd.destination !== "BLANK")) &&
            (destination !== "REMOTE_WEBPAGE" ||
              (this.props.selectedStoryAd.destination &&
                this.props.selectedStoryAd.destination !== "REMOTE_WEBPAGE"))
              ? this.props.selectedStoryAd.destination || destination
              : destination === "REMOTE_WEBPAGE" &&
                objective !== "WEB_CONVERSION"
              ? "Website"
              : objective === "WEB_CONVERSION" &&
                (destination !== "BLANK" ||
                  this.props.selectedStoryAd.destination !== "BLANK")
              ? "WhatsApp Campaign"
              : "Swipe Up destination"}
          </Text>
          {objective !== "WEB_CONVERSION" &&
            ["REMOTE_WEBPAGE", "DEEP_LINK", "LEAD_GENERATION"].includes(
              destination
            ) && (
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.swipeUpText, { fontSize: 12, width: 150 }]}
              >
                {attachment.hasOwnProperty("deep_link_uri")
                  ? attachment.deep_link_uri
                  : attachment.url}
              </Text>
            )}
        </View>
        <Icon
          type="MaterialIcons"
          name="arrow-drop-down"
          style={{ left: 10, color: "#fff" }}
        />
      </TouchableOpacity>
    );
  }*/}

	render() {
		let {
			destination,
			attachment,
			collectionAdLinkForm,
			adType,
			objective,
			image,
      selectedStoryAd,
			call_to_action_label,
		} = this.props;

		return (
			<TouchableOpacity
				style={[
					styles.swipeUp,
					{
						bottom: adType === 'CollectionAd' ? 50 : 0,
						marginBottom: adType === 'CollectionAd' ? 30 : 10,
					},
				]}
				onPress={() => {
					if (adType === 'CollectionAd') {
						this.props.navigation.navigate('SwipeUpChoice', {
							_changeDestination: this.props._changeDestination,
							objective: objective,
							collectionAdLinkForm: collectionAdLinkForm,
							adType: adType,
						});
					} else {
						objective === 'TRAFFIC' || adType === "StoryAd"
							? this.props.navigation.push('SwipeUpDestination', {
									_changeDestination: this.props._changeDestination,
									image: image,
							  })
							: this.props.navigation.navigate('SwipeUpChoice', {
									_changeDestination: this.props._changeDestination,
									objective: objective,
									collectionAdLinkForm: collectionAdLinkForm,
							  });
					}
				}}
			>
				<View style={styles.swipeUpView}>
					<Text style={styles.swipeUpText}>
						{(destination !== 'BLANK' && destination !== 'REMOTE_WEBPAGE') ||
						(destination === 'COLLECTION' && collectionAdLinkForm === 2)
							? call_to_action_label
							: (destination === 'REMOTE_WEBPAGE' && objective !== 'WEB_CONVERSION') ||
							  (destination === 'COLLECTION' && collectionAdLinkForm === 1)
							? call_to_action_label
							:  objective === "WEB_CONVERSION" &&
                (destination !== "BLANK" ||
                  selectedStoryAd.destination !== "BLANK")
              ? "WhatsApp Campaign"
							: 'Swipe Up destination'}
					</Text>
					{objective !== 'WEB_CONVERSION' &&
						['REMOTE_WEBPAGE', 'DEEP_LINK', 'LEAD_GENERATION'].includes(destination) && (
							<Text
								ellipsizeMode={'tail'}
								numberOfLines={1}
								style={[styles.swipeUpText, styles.swipeUpSubText]}
							>
								{attachment.hasOwnProperty('deep_link_uri') ? attachment.deep_link_uri : attachment.url}
							</Text>
						)}
				</View>
				<Icon type="MaterialIcons" name="arrow-drop-down" fontSize={50} style={styles.downIcon} />
			</TouchableOpacity>
		);
	}
}
