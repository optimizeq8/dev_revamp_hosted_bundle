import React, { Component } from "react";
import { Text, View } from "react-native";
import { Modal } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import { BlurView } from "expo-blur";
import CustomHeader from "../../../MiniComponents/Header";
import CameraLoading from "../../../MiniComponents/CameraLoading";

import styles from "./styles";
export default class LoadingModal extends Component {
  render() {
    let {
      videoUrlLoading,
      loading,
      isVisible,
      onToggleModal,
      cancelUpload,
      loaded,
    } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <Modal
        visible={videoUrlLoading || loading || isVisible}
        onDismiss={() => onToggleModal(false)}
        animationType={"slide"}
      >
        <BlurView intensity={95} tint="dark">
          <SafeAreaView
            forceInset={{ top: "always" }}
            style={styles.loadingSafeArea}
          >
            {loading && (
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
                actionButton={() => cancelUpload()}
                title={"Uploading Media"}
                segment={{
                  source: "upload_media",
                  source_action: "a_cancel_upload",
                }}
              />
            )}
            {!loading && (
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
                actionButton={() => onToggleModal(false)}
                segment={{
                  source: "upload_media",
                  source_action: "a_go_back",
                }}
              />
            )}

            <CameraLoading center={true} />
            {loading && (
              <View style={styles.loadingContainer}>
                <Text style={styles.uplaodPercentage}>
                  {Math.round(loaded, 2)}%
                </Text>

                <Text style={styles.uplaodText}>
                  {translate(
                    "Please make sure not to close the app or lock the phone while uploading"
                  )}
                </Text>
              </View>
            )}
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}
