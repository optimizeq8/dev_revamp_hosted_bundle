import React, { Component } from "react";
import { Text, View, Modal } from "react-native";
import { Content } from "native-base";
// import { Modal } from "react-native-paper";
import { BlurView } from "expo";
import { SafeAreaView } from "react-navigation";
import CustomHeader from "../../../MiniComponents/Header";
import MediaOptions from "./MediaOptions";
import styles from "./styles";
// import Modal from "react-native-modal";
export default class MediaModal extends Component {
  render() {
    let options = ["Image", "Video"].map(op => (
      <MediaOptions
        getVideoUploadUrl={this.props.getVideoUploadUrl}
        _pickImage={this.props._pickImage}
        key={op}
        title={op}
      />
    ));
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        // onDismiss={() => this.props.setMediaModalVisible(false)}
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
