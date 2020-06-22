import React, { Component } from "react";
import { Text, View, Image as RNImage, TouchableOpacity } from "react-native";
import { Button, Icon } from "native-base";
import { Video } from "expo-av";
import styles from "../../../styles/adDesign.styles";
import MediaButton from "../MediaButton";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import * as actionCreators from "../../../../../../store/actions";
import { globalColors } from "../../../../../../GlobalStyles";
import RNImageOrCacheImage from "../../../../../MiniComponents/RNImageOrCacheImage";
class CarouselCard extends Component {
  state = { uploading: false, showDelete: false };
  showDeleteButton = () => {
    let { snapCardInfo } = this.props;
    snapCardInfo.item.media !== "//" && this.setState({ showDelete: true });
  };
  render() {
    let {
      snapCardInfo,
      removeSnapCard,
      _handleStoryAdCards,
      rejected,
    } = this.props;
    const { translate } = this.props.screenProps;
    let videoPlayer = this.props.loadingCarouselAdsArray[
      snapCardInfo.index
    ] ? null : (
      <Video
        source={{
          uri:
            rejected ||
            (!this.props.loadingCarouselAdsArray[snapCardInfo.index] &&
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
        disabled={this.props.loadingCarouselAdsArray.includes(true)}
        style={styles.SnapAdCard}
        onLongPress={this.showDeleteButton}
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
                rejected ||
                !this.props.loadingCarouselAdsArray[snapCardInfo.index]
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
          style={styles.carouselCardNumber}
          onLongPress={this.showDeleteButton}
          onPress={() => {
            if (
              this.state.showDelete &&
              !this.props.loadingCarouselAdsArray[snapCardInfo.index]
            ) {
              this.props.deleteCarouselCard(
                snapCardInfo.item.story_id,
                snapCardInfo,
                removeSnapCard
              );
              this.setState({ showDelete: false });
            }
          }}
        >
          <Text style={styles.carouselCardNumberText}>
            {this.state.showDelete ? "X" : snapCardInfo.index + 1}
          </Text>
        </TouchableOpacity>
        {!this.props.loadingCarouselAdsArray[snapCardInfo.index] ? (
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
                _handleStoryAdCards({
                  index: snapCardInfo.index,
                  ...snapCardInfo.item,
                });
              }}
              style={styles.carouselEditMedia}
            />
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
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = (state) => ({
  carouselAdsArray: state.instagramAds.carouselAdsArray,
  loadingCarouselAdsArray: state.instagramAds.loadingCarouselAdsArray,
});

const mapDispatchToProps = (dispatch) => ({
  deleteCarouselCard: (story_id, card, removeCard) =>
    dispatch(actionCreators.deleteCarouselCard(story_id, card, removeCard)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarouselCard);
