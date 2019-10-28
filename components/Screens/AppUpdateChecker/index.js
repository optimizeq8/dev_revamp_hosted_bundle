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
import styles from "./styles";
import { NavigationEvents } from "react-navigation";

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

  componentDidUpdate(prevProps) {
    if (
      prevProps.actualVersion !== this.props.actualVersion &&
      this.props.actualVersion === "0.1.7"
    ) {
      this.handleUpdates();
    }
  }

  handleUpdates = async () => {
    const { translate } = this.props.screenProps;
    try {
      this.setState({
        status: "",
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
          <NavigationEvents
            onDidFocus={async () => this.props.checkForUpdate()}
          />
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

          <Animatable.View animation={"slideInUp"} style={styles.textContainer}>
            <Text style={styles.textUpdate}>
              {this.props.loadingChecker
                ? translate("checking for updates")
                : this.state.statusLoading
                ? ""
                : translate("Update Available")}
            </Text>

            <Text
              style={[styles.textUpdate, { fontFamily: "montserrat-light" }]}
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
                <Text style={[styles.textUpdate, { top: 10 }]}>
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
              style={styles.loadingStyle}
              resizeMode="contain"
              source={require("../../../assets/animation/update_loader.json")}
              loop
              autoPlay
            />
          ) : (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "20%"
              }}
            >
              <Button
                block
                onPress={() =>
                  Linking.openURL(
                    Platform.OS === "ios"
                      ? "https://apps.apple.com/us/app/optimizeapp/id1462878125"
                      : "https://play.google.com/store/apps/details?id=com.optimizeapp.optimizeapp&hl=en"
                  )
                }
                style={styles.updateButton}
              >
                <Text style={styles.textUpdate}>{translate("Update Now")}</Text>
              </Button>
              <Button
                block
                onPress={() => this.setState({ updateDownloaded: true })}
                style={styles.updateButton}
              >
                <Text style={styles.textUpdate}>
                  {translate("Continue with the app")}
                </Text>
              </Button>
            </View>
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
