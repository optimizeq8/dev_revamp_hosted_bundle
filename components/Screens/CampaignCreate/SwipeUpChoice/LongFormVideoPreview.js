import React, { Component } from "react";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { BackHandler, View, StatusBar } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video } from "expo-av";
import CustomHeader from "../../../MiniComponents/Header";
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";

export default class LongFormVideoPreview extends Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.ALL_BUT_UPSIDE_DOWN
    );
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.videoRef.dismissFullscreenPlayer();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    this.props.navigation.goBack();
    return true;
  };
  actionButton = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
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
          styles.safeAreaViewLongFormVideoPreview,
        ]}
      >
        <CustomHeader
          screenProps={this.props.screenProps}
          actionButton={this.actionButton}
          closeButton={true}
          segment={{
            str: "LongForm Video Preview Back Button",
            source: "ad_swipe_up_destination",
            source_action: "a_go_back",
          }}
        />
        <View style={styles.videoPreviewView}>
          <Video
            ref={(ref) => {
              this.videoRef = ref;
            }}
            style={styles.videoStyle}
            source={{
              uri: videoUrl,
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
