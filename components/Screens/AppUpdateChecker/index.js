//Components
import React, { Component } from "react";
import { Linking } from "expo";
import LottieView from "lottie-react-native";

import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
const imageLogo = require("../../../assets/images/logo01.png");
import { connect } from "react-redux";
import { Image, View, Text, Platform } from "react-native";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";
import {
  widthPercentageToDP,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Tutorial from "../Tutorial";
import { globalColors } from "../../../GlobalStyles";
import { Button } from "native-base";

import * as actionCreators from "../../../store/actions";
class AppUpdateChecker extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      updateDownloaded: false
    };
  }
  async componentDidMount() {
    // if (Constants.manifest.version === "0.1.6")
    //   this.setState({ updateDownloaded: true });

    let actualVersion = await this.props.checkForUpdate();
    if (actualVersion === Constants.manifest.version) {
    }
    this.setState({ updateDownloaded: true });

    // try {
    //   const update = await Updates.checkForUpdateAsync();
    //   if (update.isAvailable) {
    //     await Updates.fetchUpdateAsync();
    //     this.setState({ updateDownloaded: true });
    //     Updates.reloadFromCache();
    //   }
    // } catch (e) {
    //   console.log("error", e);
    // }
  }

  render() {
    if (this.state.updateDownloaded) {
      return <Tutorial navigation={this.props.navigation} />;
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
              {this.props.loadingChecker
                ? "CHECKING FOR UPDATES"
                : "UPDATE AVAILABLE"}
            </Text>
            <Text
              style={{
                fontFamily: "montserrat-light",
                color: globalColors.white,
                textAlign: "center",
                fontSize: 16
              }}
            >
              {this.props.loadingChecker
                ? "Please wait while we check for updates."
                : "You appear to be using an outdated version of OptimizeApp, please \n update to the latest version to enjoy all our features!"}
            </Text>
          </Animatable.View>
          {this.props.loadingChecker ? (
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                zIndex: 10,
                alignSelf: "center",
                // position: "absolute",
                width: widthPercentageToDP(20),
                height: widthPercentageToDP(20),
                top: "15%"
                // bottom: 20
                // position: "absolute"
              }}
              resizeMode="contain"
              source={require("../../../assets/animation/update_loader.json")}
              loop
              autoPlay
            />
          ) : (
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
                UPDATE NOW
              </Text>
            </Button>
          )}
        </View>
      );
  }
}

const mapStateToProps = state => ({
  actualVersion: state.generic.actualVersion,
  loadingChecker: state.generic.loadingChecker
});

const mapDispatchToProps = dispatch => ({
  checkForUpdate: () => dispatch(actionCreators.checkForUpdate())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppUpdateChecker);
