import React, { Component } from "react";
import { View } from "react-native";
import { Content } from "native-base";
import { Modal } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";

import CustomHeader from "../../../MiniComponents/Header";
import MediaOptions from "./MediaOptions";
import styles from "./styles";
import { BlurView } from "@react-native-community/blur";

export default class MediaModal extends Component {
  modifyOptionArr = () => {
    let optionsArr = [
      "Media",
      "Upload media from a different device",
      "Download media from a different device",
    ];

    let { snapad, snapcollectionad, snapstoryad, adType } = this.props;
    switch (adType) {
      case "SnapAd":
        if (snapad.length > 0) {
          optionsArr.splice(0, 0, "Media Library");
        }
        break;
      //   case "StoryAd":
      //     if (snapstoryad.length > 0) {
      //       optionsArr.splice(0, 0, "Media Library");
      //     }
      //     break;
      //   case "CollectionAd":
      //     if (snapcollectionad.length > 0) {
      //       optionsArr.splice(0, 0, "Media Library");
      //     }
      //     break;
      default:
        optionsArr;
    }
    return optionsArr;
  };
  render() {
    let { mediaUri, media_type, rejected, adType } = this.props;
    let optionArr = this.modifyOptionArr();
    options = optionArr.map((op) => {
      return (
        <MediaOptions
          _pickImage={this.props._pickImage}
          key={op}
          title={op}
          setUploadFromDifferentDeviceModal={
            this.props.setUploadFromDifferentDeviceModal
          }
          setMediaModalVisible={this.props.setMediaModalVisible}
          getWebUploadLinkMedia={this.props.getWebUploadLinkMedia}
          setDownloadMediaModal={this.props.setDownloadMediaModal}
          setExistingMediaModal={this.props.setExistingMediaModal}
          getExistingMediaSnapchatList={this.props.getExistingMediaSnapchatList}
          adType={adType}
          screenProps={this.props.screenProps}
          media_type={media_type}
          rejected={rejected}
        />
      );
    });
    let { media, storyAdCards } = mediaUri;

    return (
      <Modal
        animationType={"fade"}
        onRequestClose={() => this.props.setMediaModalVisible(false)}
        onDismiss={() => this.props.setMediaModalVisible(false)}
        visible={this.props.mediaModalVisible}
      >
        <BlurView
          blurType="dark"
          blurAmount={20}
          reducedTransparencyFallbackColor="black"
        >
          <View style={{ backgroundColor: "#0000", height: "100%" }}>
            <SafeAreaView forceInset={{ bottom: "never", top: "always" }} />
            <View style={styles.popupOverlay}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
                actionButton={() => {
                  this.props.setMediaModalVisible(false);
                }}
                title={"UPLOAD MEDIA"}
                segment={{
                  source: "SnapchatMediaModal",
                  source_action: "a_go_back",
                }}
              />
              <Content
                indicatorStyle="white"
                contentContainerStyle={{
                  marginTop: 15,
                  paddingTop: 15,
                  marginBottom: 15,
                }}
              >
                {options}
                {((!storyAdCards.storyAdSelected && media !== "//") ||
                  (storyAdCards.selectedStoryAd.media !== "//" &&
                    storyAdCards.selectedStoryAd.media.includes("file:/"))) && (
                  <MediaOptions
                    _pickImage={this.props._pickImage}
                    title={"Edit Media"}
                    setMediaModalVisible={this.props.setMediaModalVisible}
                    screenProps={this.props.screenProps}
                    mediaUri={
                      media !== "//"
                        ? media
                        : storyAdCards.selectedStoryAd.uneditedImageUri
                    }
                    media_type={media_type}
                    serialization={this.props.serialization}
                    rejected={rejected}
                  />
                )}
              </Content>
            </View>
          </View>
        </BlurView>
      </Modal>
    );
  }
}
