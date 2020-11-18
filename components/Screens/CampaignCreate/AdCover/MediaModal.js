import React, { Component } from "react";
import { Text, View, Platform } from "react-native";
import { Content } from "native-base";
import { Modal } from "react-native-paper";
import { BlurView } from "expo-blur";
import SafeAreaView from "react-native-safe-area-view";

import CustomHeader from "../../../MiniComponents/Header";
import MediaOptions from "./MediaOptions";
import styles from "./styles";

export default class MediaModal extends Component {
  render() {
    let { mediaUri } = this.props;
    let { media } = mediaUri;

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
                screenProps={this.props.screenProps}
                closeButton={true}
                actionButton={() => {
                  this.props.setMediaModalVisible(false);
                }}
                title={"UPLOAD MEDIA"}
                segment={{
                  source: "media_options_type",
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
                <MediaOptions
                  _pickImage={this.props._pickImage}
                  title={"Image"}
                  setMediaModalVisible={this.props.setMediaModalVisible}
                  screenProps={this.props.screenProps}
                />
                {media !== "//" && (
                  <MediaOptions
                    _pickImage={this.props._pickImage}
                    title={"Edit Image"}
                    setMediaModalVisible={this.props.setMediaModalVisible}
                    screenProps={this.props.screenProps}
                    mediaUri={media !== "//" ? media : ""}
                    serialization={this.props.serialization}
                  />
                )}
              </Content>
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}
