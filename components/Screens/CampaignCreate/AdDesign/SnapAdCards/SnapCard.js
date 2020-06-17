import React, { Component } from "react";
import { Text, View, Image as RNImage, TouchableOpacity } from "react-native";
import { Button, Icon } from "native-base";
import { Video } from "expo-av";
import styles from "../styles";
import MediaButton from "../MediaButton";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import * as actionCreators from "../../../../../store/actions";
import { globalColors } from "../../../../../GlobalStyles";
import PenIcon from "../../../../../assets/SVGs/Pen.svg";
import RNImageOrCacheImage from "../../../../MiniComponents/RNImageOrCacheImage";
import segmentEventTrack from "../../../../segmentEventTrack";
class SnapCard extends Component {
  state = { uploading: false, showDelete: false };
  render() {
    let {
      snapCardInfo,
      removeSnapCard,
      _handleStoryAdCards,
      rejected,
    } = this.props;
    const { translate } = this.props.screenProps;
    let videoPlayer = this.props.loadingStoryAdsArray[
      snapCardInfo.index
    ] ? null : (
      <Video
        source={{
          uri:
            rejected ||
            (!this.props.loadingStoryAdsArray[snapCardInfo.index] &&
              snapCardInfo.item.uploaded)
              ? snapCardInfo.item["media"]
              : "//",
        }}
        shouldPlay={false}
        isMuted
        // resizeMode={"stretch"}
        style={{ height: "100%", width: "100%" }}
      />
    );

    return (
      <TouchableOpacity
        style={styles.SnapAdCard}
        onLongPress={() => {
          this.setState({ showDelete: true });
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 20,
            overflow: "hidden",
            opacity: 0.5,
            position: "absolute",
          }}
        >
          {snapCardInfo.item.media_type === "VIDEO" ? (
            videoPlayer
          ) : (
            <RNImageOrCacheImage
              media={
                rejected || !this.props.loadingStoryAdsArray[snapCardInfo.index]
                  ? snapCardInfo.item["media"]
                  : "//"
              }
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
              }}
            />
          )}
        </View>
        <TouchableOpacity
          style={{
            width: 25,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            backgroundColor: globalColors.orange,
            bottom: "15%",
          }}
          onLongPress={() => {
            snapCardInfo.item.media !== "//" &&
              this.setState({ showDelete: true });
          }}
          onPress={() => {
            if (
              this.state.showDelete &&
              !this.props.loadingStoryAdsArray[snapCardInfo.index]
            ) {
              this.props.deleteStoryAdCard(
                snapCardInfo.item.story_id,
                snapCardInfo,
                removeSnapCard
              );
              this.setState({ showDelete: false });
            }
          }}
        >
          <Text style={{ color: "#fff" }}>
            {this.state.showDelete ? "X" : snapCardInfo.index + 1}
          </Text>
        </TouchableOpacity>
        {!this.props.loadingStoryAdsArray[snapCardInfo.index] ? (
          snapCardInfo.item.media === "//" ? (
            <MediaButton
              type={"media"}
              media={
                snapCardInfo.item[snapCardInfo.item.media ? "image" : "media"]
              }
              _handleStoryAdCards={_handleStoryAdCards}
              snapAdCard={true}
              snapCardInfo={snapCardInfo}
              screenProps={this.props.screenProps}
            />
          ) : (
            <TouchableOpacity
              onLongPress={() => {
                snapCardInfo.item.media !== "//" &&
                  this.setState({ showDelete: !this.state.showDelete });
              }}
              onPress={() => {
                segmentEventTrack("Button clicked to edit snap story ad card");

                _handleStoryAdCards({
                  index: snapCardInfo.index,
                  ...snapCardInfo.item,
                });
              }}
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                height: "100%",
                position: "absolute",
                bottom: 0,
                paddingBottom: 10,
                width: "100%",
              }}
            >
              {/* <Text
                style={[
                  styles.mediaButtonMsg,
                  { fontSize: 11, width: 65, textAlign: "left", top: 0 },
                ]}
              >
                {translate("Edit Media")}
              </Text>
              <PenIcon width={15} height={15} /> */}
            </TouchableOpacity>
          )
        ) : (
          <>
            <ActivityIndicator color={globalColors.orange} />
            <Text style={{ color: "#fff" }}>
              {!isNaN(Math.round(snapCardInfo.item.progress, 2))
                ? Math.round(snapCardInfo.item.progress, 2)
                : 0}
              %
            </Text>
          </>
        )}
        {/* {snapCardInfo.index > 2 && (
          <Icon
            onPress={() => {
              //   this.props.cancelUpload();
              segmentEventTrack("Button clicked to delete snap story ad card");
              !this.props.loadingStoryAdsArray[snapCardInfo.index] &&
                this.props.deleteStoryAdCard(
                  snapCardInfo.item.story_id,
                  snapCardInfo,
                  removeSnapCard
                );
            }}
            name="close"
            type="MaterialCommunityIcons"
            style={{
              bottom: "15%",
              color: "#fff",
              alignSelf: "flex-start"
            }}
          />
        )} */}
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = (state) => ({
  storyAdsArray: state.campaignC.storyAdsArray,
  loadingStoryAdsArray: state.campaignC.loadingStoryAdsArray,
});

const mapDispatchToProps = (dispatch) => ({
  deleteStoryAdCard: (story_id, card, removeCard) =>
    dispatch(actionCreators.deleteStoryAdCard(story_id, card, removeCard)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SnapCard);
