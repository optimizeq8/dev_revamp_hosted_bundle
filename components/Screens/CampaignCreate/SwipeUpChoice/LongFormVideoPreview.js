import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import { BackHandler, View, StatusBar } from "react-native";

import { Video, ScreenOrientation } from "expo";
import VideoPlayer from "expo-video-player";
import CustomHeader from "../../../MiniComponents/Header";
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";

export default class LongFormVideoPreview extends Component {
  componentDidMount() {
    ScreenOrientation.allowAsync("ALL_BUT_UPSIDE_DOWN");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.videoRef.dismissFullscreenPlayer();
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);

    this.props.navigation.goBack();
    return true;
  };
  actionButton = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    this.props.navigation.goBack();
  };
  render() {
    const videoUrl = this.props.navigation.getParam("longformvideo_media", "");
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={[
          styles.safeAreaContainer,
          globalStyles.blackBackgroundColor,
          styles.safeAreaViewLongFormVideoPreview
        ]}
      >
        <CustomHeader actionButton={this.actionButton} closeButton={true} />
        <View style={styles.videoPreviewView}>
          <Video
            ref={ref => {
              this.videoRef = ref;
            }}
            style={styles.videoStyle}
            source={{
              uri: videoUrl
            }}
            shouldPlay={true}
            isLooping={true}
            useNativeControls={true}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            //   onPlaybackStatusUpdate={() => {
            //     this.videoRef.presentFullscreenPlayer();
            //   }}
            // onReadyForDisplay={() => {
            //   this.videoRef.presentFullscreenPlayer();
            // }}
            onLoad={() => {
              this.videoRef.presentFullscreenPlayer();
            }}
            onError={() => {
              this.videoRef.dismissFullscreenPlayer();
            }}
            playFromPositionMillis={0}
          />
        </View>
      </SafeAreaView>
    );
  }
}
