//Components
import React, { Component } from "react";
import { Linking, Updates } from "expo";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
const imageLogo = require("../../../assets/images/logo01.png");
import LottieView from "lottie-react-native";

import {
  Image,
  View,
  Text,
  Platform,
  Alert,
  TouchableOpacity,
  I18nManager
} from "react-native";
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
      statusLoading: false,
      updateIsAvalible: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.actualVersion !== this.props.actualVersion &&
      this.props.actualVersion === Constants.manifest.version
    ) {
      if (!this.props.underMaintenanceMessage_en) this.handleUpdates();
    } else if (
      prevProps.actualVersion !== this.props.actualVersion &&
      this.props.actualVersion !== Constants.manifest.version
    ) {
      this.setState({ updateIsAvalible: true });
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
        if (!(this.props.customMessage_en && this.props.customMessage_ar))
          this.setState({ updateDownloaded: true });
        else this.setState({ statusLoading: false });
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
    const { translate } = this.props.screenProps;
    if (event.type === Updates.EventType.DOWNLOAD_STARTED) {
      this.setState({
        status2: translate("downloading")
      });
    }
  };

  handleButton = () => {
    Linking.openURL(
      Platform.OS === "ios"
        ? "https://apps.apple.com/us/app/optimizeapp/id1462878125"
        : "https://play.google.com/store/apps/details?id=com.optimizeapp.optimizeapp&hl=en"
    );
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
            onDidFocus={async () => {
              Constants.manifest.version[
                Constants.manifest.version.length - 1
              ] === "0"
                ? this.handleUpdates()
                : this.props.checkForUpdate();
            }}
          />
          <BackdropIcon
            style={{
              position: "absolute",
              top: -hp("50%"),
              alignSelf: "center"
            }}
            height={hp("100%")}
          />
          <TouchableOpacity
            activeOpacity={1}
            style={{
              top: "15%"
            }}
            delayLongPress={1000}
            onLongPress={() => this.setState({ updateDownloaded: true })}
          >
            <Image
              style={{
                alignSelf: "center",
                height: 150,
                width: "100%",
                margin: 10,
                justifyContent: "flex-start"
              }}
              source={imageLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Animatable.View animation={"slideInUp"} style={styles.textContainer}>
            <Text style={styles.textUpdate}>
              {this.props.loadingChecker
                ? translate("checking for updates")
                : this.state.statusLoading
                ? ""
                : this.props.underMaintenanceMessage_en
                ? translate("Under Maintenance")
                : this.props.updateMessage_en && this.state.updateIsAvalible
                ? translate("Update Available")
                : this.props.customMessage_en && this.props.customMessage_ar
                ? translate("Important notice")
                : ""}
            </Text>

            <Text
              style={[styles.textUpdate, { fontFamily: "montserrat-light" }]}
            >
              {this.props.loadingChecker
                ? translate("Please wait while we check for updates")
                : !this.state.statusLoading
                ? this.props.underMaintenanceMessage_en
                  ? I18nManager.isRTL
                    ? this.props.underMaintenanceMessage_ar
                    : this.props.underMaintenanceMessage_en
                  : this.state.updateIsAvalible
                  ? I18nManager.isRTL
                    ? this.props.updateMessage_ar
                    : this.props.updateMessage_en
                  : I18nManager.isRTL
                  ? this.props.customMessage_ar
                  : this.props.customMessage_en
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
              {(this.props.updateMessage_en && this.state.updateIsAvalible) ||
              this.props.underMaintenanceMessage_en ? (
                <Button
                  block
                  onPress={this.handleButton}
                  style={styles.updateButton}
                >
                  <Text style={styles.textUpdate}>
                    {this.props.underMaintenanceMessage_en
                      ? translate("Check for update")
                      : translate("Update Now")}
                  </Text>
                </Button>
              ) : (
                <Button
                  block
                  onPress={() => this.setState({ updateDownloaded: true })}
                  style={styles.updateButton}
                >
                  <Text style={styles.textUpdate}>
                    {translate("Continue with the app")}
                  </Text>
                </Button>
              )}
            </View>
          )}
        </View>
      );
  }
}

const mapStateToProps = state => ({
  actualVersion: state.generic.actualVersion,
  underMaintenanceMessage_ar: state.generic.underMaintenanceMessage_ar,
  underMaintenanceMessage_en: state.generic.underMaintenanceMessage_en,
  updateMessage_ar: state.generic.updateMessage_ar,
  updateMessage_en: state.generic.updateMessage_en,
  customMessage_en: state.generic.customMessage_en,
  customMessage_ar: state.generic.customMessage_ar,
  loadingChecker: state.generic.loadingChecker
});

const mapDispatchToProps = dispatch => ({
  checkForUpdate: () => dispatch(actionCreators.checkForUpdate())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppUpdateChecker);
