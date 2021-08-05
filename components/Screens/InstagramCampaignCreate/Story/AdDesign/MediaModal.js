import React, { Component } from "react";
import { View, Platform } from "react-native";
import { Content } from "native-base";
import { Modal } from "react-native-paper";
import { BlurView } from "@react-native-community/blur";
import SafeAreaView from "react-native-safe-area-view";

import CustomHeader from "../../../../MiniComponents/Header";
import MediaOptions from "./MediaOptions";
import styles from "../../styles/mediaModal.styles";

export default class MediaModal extends Component {
  modifyOptionArr = () => {
    let optionsArr = ["Media"];

    let { instastoryad, adType } = this.props;
    switch (adType) {
      case "InstagramFeedAd":
        if (instafeedad.length > 0) {
          optionsArr.splice(0, 0, "Media Library");
        }
        break;
      case "InstagramStoryAd":
        if (instastoryad.length > 0) {
          optionsArr.splice(0, 0, "Media Library");
        }
        break;
      default:
        optionsArr;
    }
    return optionsArr;
  };
  render() {
    let { mediaUri, media_type, adType } = this.props;
    let { media } = mediaUri;
    let optionArr = this.modifyOptionArr();
    var options = optionArr.map((op) => {
      return (
        <MediaOptions
          getVideoUploadUrl={this.props.getVideoUploadUrl}
          _pickImage={this.props._pickImage}
          key={op}
          title={op}
          setUploadFromDifferentDeviceModal={
            this.props.setUploadFromDifferentDeviceModal
          }
          setMediaModalVisible={this.props.setMediaModalVisible}
          getWebUploadLinkMedia={this.props.getWebUploadLinkMedia}
          setDownloadMediaModal={this.props.setDownloadMediaModal}
          screenProps={this.props.screenProps}
          media_type={media_type}
          setExistingMediaModal={this.props.setExistingMediaModal}
          getExistingMediaInstagramList={
            this.props.getExistingMediaInstagramList
          }
          adType={adType}
        />
      );
    });

    return (
      <Modal
        animationType={"fade"}
        transparent={Platform.OS === "ios"}
        onRequestClose={() => this.props.setMediaModalVisible(false)}
        onDismiss={() => this.props.setMediaModalVisible(false)}
        visible={this.props.mediaModalVisible}
      >
        <BlurView>
          <SafeAreaView
            style={styles.safeAreaView}
            forceInset={{ bottom: "never", top: "always" }}
          >
            <View style={styles.popupOverlay}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
                actionButton={() => {
                  this.props.setMediaModalVisible(false);
                }}
                title={"UPLOAD MEDIA"}
                segment={{
                  source: "InstagramStoryMediaModal",
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
                {media ? (
                  <MediaOptions
                    _pickImage={this.props._pickImage}
                    title={"Edit Media"}
                    setMediaModalVisible={this.props.setMediaModalVisible}
                    screenProps={this.props.screenProps}
                    mediaUri={
                      // media !== "//"
                      media
                      // : storyAdCards.selectedCarouselAd.uneditedImageUri
                    }
                    media_type={media_type}
                    serialization={this.props.serialization}
                  />
                ) : null}
              </Content>
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}
