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
class SnapCard extends Component {
  state = { uploading: false, showDelete: false };
  handleDeletion = () => {
    let { snapCardInfo, removeSnapCard } = this.props;
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
  };
  render() {
    let { snapCardInfo, _handleStoryAdCards, rejected } = this.props;
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
        disabled={this.props.loadingStoryAdsArray.includes(true)}
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
                snapCardInfo.item.id === -1
                  ? rejected
                    ? this.props.rejCampaign
                      ? this.props.rejCampaign.story_preview_media
                      : "//"
                    : (this.props.data && this.props.data.cover) || "//"
                  : rejected ||
                    !this.props.loadingStoryAdsArray[snapCardInfo.index]
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
            width: snapCardInfo.item.id === -1 ? 50 : 24,
            height: 24,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            backgroundColor: globalColors.orange,
            bottom: "20%",
          }}
          onLongPress={() => {
            snapCardInfo.item.media !== "//" &&
              this.setState({ showDelete: true });
          }}
          onPress={this.handleDeletion}
        >
          <Text style={{ color: "#fff", fontFamily: "montserrat-regular" }}>
            {this.state.showDelete
              ? "X"
              : snapCardInfo.item.id === -1
              ? "Cover"
              : snapCardInfo.index}
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
              navigateToCover={snapCardInfo.item.id === -1}
              setTheState={this.props.setTheState}
              rejected={rejected}
            />
          ) : (
            <TouchableOpacity
              onLongPress={() => {
                snapCardInfo.item.media !== "//" &&
                  snapCardInfo.item.id !== -1 &&
                  this.setState({ showDelete: !this.state.showDelete });
              }}
              onPress={() => {
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
  data: state.campaignC.data,
  rejCampaign: state.dashboard.rejCampaign,
});

const mapDispatchToProps = (dispatch) => ({
  deleteStoryAdCard: (story_id, card, removeCard) =>
    dispatch(actionCreators.deleteStoryAdCard(story_id, card, removeCard)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SnapCard);
