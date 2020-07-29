import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Modal } from "react-native-paper";
import { Video } from "expo-av";

import { SafeAreaView } from "react-navigation";
import { BlurView } from "expo-blur";
import CustomHeader from "../Header";
import { heightPercentageToDP } from "react-native-responsive-screen";
import RNImageOrCacheImage from "../RNImageOrCacheImage";

export default class LoadingModal extends Component {
  render() {
    let {
      isVisible,
      onToggleModal,
      cancelUpload,
      title,
      source,
      source_action,
      description,
      media,
      imageStyle,
      mediaType,
    } = this.props;
    const { translate } = this.props.screenProps;

    if (mediaType === "video") {
      var mediaPlayer = (
        <Video
          shouldPlay={true}
          isMuted={false}
          isLooping={true}
          source={{
            uri: media !== "//" ? media : "dfv.dfv",
          }}
          style={{
            width: "80%",
            height: "100%",
            position: "absolute",
          }}
        />
      );
    } else
      mediaPlayer = (
        <RNImageOrCacheImage
          resizeMode={"cover"}
          media={media}
          style={[styles.review, imageStyle]}
        />
      );
    return (
      <Modal
        visible={isVisible}
        onDismiss={() => onToggleModal(false)}
        animationType={"slide"}
      >
        <SafeAreaView
          forceInset={{ top: "always" }}
          style={styles.loadingSafeArea}
        />
        <BlurView intensity={100} tint="dark">
          <View style={{ height: "100%", alignItems: "center" }}>
            <CustomHeader
              screenProps={this.props.screenProps}
              closeButton={true}
              actionButton={() => cancelUpload()}
              title={title}
              segment={{
                source: source,
                source_action: source_action,
              }}
              titleStyle={{ textAlign: "left" }}
            />
            <Text style={styles.descText}>{description}</Text>
            <View style={styles.reviewView}></View>
            {mediaPlayer}
          </View>
        </BlurView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  descText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "montserrat-regular",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  loadingSafeArea: {
    flex: 1,
    height: "100%",
  },
  review: {
    flex: 1,
    aspectRatio: 0.5,
  },
  reviewView: {
    height: "71%",
    width: "90%",
    marginTop: 20,
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  uplaodPercentage: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "montserrat-bold",
  },
  uplaodText: {
    justifyContent: "center",
    fontSize: 12,
    color: "white",
    fontFamily: "montserrat-medium",
    alignSelf: "center",
    paddingTop: 10,
    textAlign: "center",
  },
});
