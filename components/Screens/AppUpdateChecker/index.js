//Components
import React, { Component } from "react";
import { Linking, Updates } from "expo";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
const imageLogo = require("../../../assets/images/logo01.png");
import LottieView from "lottie-react-native";

import { Image, View, Text, Platform, Alert } from "react-native";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";
import {
  widthPercentageToDP,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Tutorial from "../Tutorial";
import { globalColors } from "../../../GlobalStyles";
import { Button } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

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
    this.props.checkForUpdate();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.actualVersion !== this.props.actualVersion &&
      this.props.actualVersion === "0.1.6"
    ) {
      this.handleUpdates();
    }
  }

  handleUpdates = async () => {
    const { translate } = this.props.screenProps;
    try {
      this.setState({
        status: translate("Checking for OTA updates"),
        statusLoading: true
      });
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        this.setState({
          status: translate(
            "There is an OTA update available Please wait while it downloads"
          )
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
      this.setState({ status: "", statusLoading: false });

      Alert.alert(
        e.message || e.response || translate("Something went wrong!"),
        "",
        [
          {
            text: "OK",
            onPress: () => {
              this.setState({
                updateDownloaded: true
              });
            }
          },
          ,
          {
            text: "Reload",
            onPress: () => Updates.reload()
          }
        ]
      );

      // handle or log error
    }
  };

  handleOTAListener = event => {
    if (event.type === Updates.EventType.DOWNLOAD_STARTED) {
      this.setState({
        status2: translate("downloading")
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
              {this.props.loadingChecker
                ? translate("checking for updates")
                : this.state.statusLoading
                ? ""
                : translate("Update Available")}
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
                ? translate("Please wait while we check for updates")
                : !this.state.statusLoading
                ? translate(
                    "You appear to be using an outdated version of OptimizeApp, please update to the latest version to enjoy all our features!"
                  )
                : ""}
            </Text>

            {this.state.statusLoading && (
              <>
                <Text
                  style={{
                    fontFamily: "montserrat-bold",
                    color: globalColors.white,
                    textAlign: "center",
                    fontSize: 16,
                    top: 10
                  }}
                >
                  {this.state.status + "\n"}
                  {this.state.status2}
                </Text>
              </>
            )}
          </Animatable.View>
          {this.props.loadingChecker || this.state.statusLoading ? (
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
                top: "30%"
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
                {translate("Update Now")}
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
