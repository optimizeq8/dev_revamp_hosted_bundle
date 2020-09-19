import React, { Component } from "react";
import { View } from "react-native";
import { Content } from "native-base";
import { Modal } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import CustomHeader from "../../../MiniComponents/Header";
import MediaOptions from "./MediaOptions";
import styles from "./styles";
import { BlurView } from "@react-native-community/blur";

export default class MediaModal extends Component {
  render() {
    var options = [
      "Media",
      "Upload media from a different device",
      "Download media from a different device",
    ].map((op) => {
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
        />
      );
    });
    let { mediaUri, media_type } = this.props;
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
                  source: "upload_media",
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
