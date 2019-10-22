//Components
import React, { Component } from "react";
import { Linking, Updates } from "expo";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
const imageLogo = require("../../../assets/images/logo01.png");

import { Image, View, Text, Platform } from "react-native";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";
import {
  widthPercentageToDP,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Tutorial from "../Tutorial";
import { globalColors } from "../../../GlobalStyles";
import { Button } from "native-base";
import { showMessage } from "react-native-flash-message";
class AppUpdateChecker extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      updateDownloaded: false,
      status: "",
      status2: "",
      statusLoading: false
    };
  }
  async componentDidMount() {
    if (Constants.manifest.version === "0.1.61") {
    }

    try {
      this.setState({ status: "Checking for updates.", statusLoading: true });
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        this.setState({
          status:
            "There is an update available. Please wait while it downloads."
        });
        await Updates.fetchUpdateAsync({
          eventListener: this.handleOTAListener
        });
        // ... notify user of update ...
        Updates.reloadFromCache();
      } else {
        this.setState({ updateDownloaded: true });
      }
    } catch (e) {
      alert(e.message || e.response || "Something went wrong", [
        {
          text: "Reload",
          onPress: () => Updates.reload()
        }
      ]);

      // handle or log error
    }
  }

  handleOTAListener = event => {
    if (event.type === Updates.EventType.DOWNLOAD_STARTED) {
      this.setState({
        status2: "Downloading..."
      });
    } else if (event.type === Updates.EventType.DOWNLOAD_FINISHED) {
      this.setState({
        status2: "Download done..."
      });
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    if (this.state.updateDownloaded) {
      return (
        <Tutorial
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
        />
      );
    } else
      return (
        <View style={{ height: "100%" }}>
          <BackdropIcon
            style={{
              position: "absolute",
              top: -hp("50%"),
              alignSelf: "center"
            }}
            height={hp("100%")}
          />
          <Image
            style={{
              // position: "absolute",
              alignSelf: "center",
              top: "15%",
              height: 150,
              width: "100%",
              margin: 10,
              justifyContent: "flex-start"
            }}
            source={imageLogo}
            resizeMode="contain"
          />

          <Animatable.View
            animation={"slideInUp"}
            style={{
              alignSelf: "center",
              top: "20%",
              // backgroundColor: "#0009",
              width: "80%",
              height: "20%",
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 10
            }}
          >
            <Text
              style={{
                fontFamily: "montserrat-bold",
                color: globalColors.white,
                textAlign: "center",
                fontSize: 16
              }}
            >
              {translate("Update Available")}
            </Text>

            <Text
              style={{
                fontFamily: "montserrat-light",
                color: globalColors.white,
                textAlign: "center",
                fontSize: 16
              }}
            >
              status1: {this.state.status + "\n"}
              status2: {this.state.status2}
            </Text>
          </Animatable.View>
          <Button
            block
            onPress={() =>
              Linking.openURL(
                Platform.OS === "ios"
                  ? "https://apps.apple.com/us/app/optimizeapp/id1462878125"
                  : "https://play.google.com/store/apps/details?id=com.optimizeapp.optimizeapp&hl=en"
              )
            }
            style={{
              backgroundColor: globalColors.orange,
              width: "70%",
              alignSelf: "center",
              top: "40%",
              borderRadius: 15
            }}
          >
            <Text
              style={{
                fontFamily: "montserrat-bold",
                color: globalColors.white,
                textAlign: "center",
                fontSize: 16
              }}
            >
              {translate("Update Now")}
            </Text>
          </Button>
          {this.state.statusLoading && (
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                zIndex: 10,
                alignSelf: "center",
                position: "absolute",
                width: widthPercentageToDP(20),
                height: widthPercentageToDP(20),
                bottom: 20
                // position: "absolute"
              }}
              resizeMode="contain"
              source={require("../../../assets/animation/update_loader.json")}
              loop
              autoPlay
            />
          )}
        </View>
      );
  }
}

export default AppUpdateChecker;
