import React, { Component } from "react";
import { Text, View, Platform } from "react-native";
import { Content } from "native-base";
import { Modal } from "react-native-paper";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-navigation";
import CustomHeader from "../../../MiniComponents/Header";
import MediaOptions from "./MediaOptions";
import styles from "./styles";

export default class MediaModal extends Component {
  render() {
    if (this.props.adType === "SnapAd") {
      var options = [
        "Image",
        "Video",
        "Upload media from a different device",
        "Download media from a different device"
      ].map(op => {
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
          />
        );
      });
    } else {
      var options = ["Image", "Video"].map(op => {
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
          />
        );
      });
    }

    return (
      <Modal
        animationType={"fade"}
        transparent={Platform.OS === "ios"}
        onRequestClose={() => this.props.setMediaModalVisible(false)}
        onDismiss={() => this.props.setMediaModalVisible(false)}
        visible={this.props.mediaModalVisible}
      >
        <BlurView intensity={95} tint="dark">
          <SafeAreaView
            style={styles.safeAreaView}
            forceInset={{ bottom: "never", top: "always" }}
          >
            <View style={styles.popupOverlay}>
              <CustomHeader
                closeButton={true}
                actionButton={() => {
                  this.props.setMediaModalVisible(false);
                }}
                title="UPLOAD MEDIA"
              />
              <Content
                padder
                indicatorStyle="white"
                contentContainerStyle={{
                  marginTop: 15,
                  paddingTop: 15,
                  marginBottom: 15
                }}
              >
                {options}
              </Content>
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}
