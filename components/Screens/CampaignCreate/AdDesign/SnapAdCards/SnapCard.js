import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Button, Icon } from "native-base";
import { Video } from "expo";
import styles from "../styles";
import MediaButton from "../MediaButton";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import * as actionCreators from "../../../../../store/actions";
import { globalColors } from "../../../../../GlobalStyles";

class SnapCard extends Component {
  state = { uploading: false };
  render() {
    let {
      snapCardInfo,
      removeSnapCard,
      _handleStoryAdCards,
      video
    } = this.props;

    return (
      <View key={snapCardInfo.index} style={styles.SnapAdCard}>
        <View
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 15,
            overflow: "hidden",
            opacity: 0.5,
            position: "absolute"
          }}
        >
          {video ? (
            <Video
              source={{
                uri: snapCardInfo.item.image
              }}
              isMuted
              resizeMode={"stretch"}
              style={[styles.video, { opacity: 0.5 }]}
            />
          ) : (
            <Image
              source={{
                uri: !this.props.loadingStoryAdsArray[snapCardInfo.index]
                  ? snapCardInfo.item.image
                  : "snapCardInfo.item.image"
              }}
              style={{ height: "100%", width: "100%", position: "absolute" }}
            />
          )}
        </View>
        <Text style={{ color: "#fff" }}>{snapCardInfo.index + 1}</Text>
        {snapCardInfo.index > 2 && (
          <Icon
            onPress={() => {
              //   this.props.cancelUpload();

              !this.props.loadingStoryAdsArray[snapCardInfo.index] &&
                this.props.deleteStoryAdCard(
                  snapCardInfo.item.story_id,
                  snapCardInfo,
                  removeSnapCard
                );
            }}
            name="close"
            type="MaterialCommunityIcons"
            style={{ bottom: "35%", color: "#fff" }}
          />
        )}
        {!this.props.loadingStoryAdsArray[snapCardInfo.index] ? (
          <MediaButton
            _handleStoryAdCards={_handleStoryAdCards}
            snapAdCard={true}
            snapCardInfo={snapCardInfo}
          />
        ) : (
          <ActivityIndicator color={globalColors.orange} />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  storyAdsArray: state.campaignC.storyAdsArray,
  loadingStoryAdsArray: state.campaignC.loadingStoryAdsArray
});

const mapDispatchToProps = dispatch => ({
  deleteStoryAdCard: (story_id, card, removeCard) =>
    dispatch(actionCreators.deleteStoryAdCard(story_id, card, removeCard))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapCard);
