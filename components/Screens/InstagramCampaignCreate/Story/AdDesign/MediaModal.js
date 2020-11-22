import React, { Component } from "react";
import { Text, View, Platform } from "react-native";
import { Content } from "native-base";
import { Modal } from "react-native-paper";
import { BlurView } from "@react-native-community/blur";
import SafeAreaView from "react-native-safe-area-view";

import CustomHeader from "../../../../MiniComponents/Header";
import MediaOptions from "./MediaOptions";
import styles from "../../styles/mediaModal.styles";

export default class MediaModal extends Component {
  render() {
    var options = ["Media"].map((op) => {
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
    let { media } = mediaUri;

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
