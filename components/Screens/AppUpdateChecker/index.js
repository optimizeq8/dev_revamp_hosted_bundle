//Components
import React, { PureComponent } from "react";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
import { View, Text, Platform, I18nManager, Linking } from "react-native";
import { Button } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import styles from "./styles";
import Modal from "react-native-modal";
import { Small } from "../../MiniComponents/StyledComponents";
import GradientButton from "../../MiniComponents/GradientButton";
import CustomHeader from "../../MiniComponents/Header";
import { SafeAreaView } from "react-navigation";
import * as Sentry from "@sentry/react-native";
import * as Updates from "expo-updates";
class AppUpdateChecker extends PureComponent {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      updateDownloaded: false,
      status: "",
      status2: "",
      statusLoading: false,
      updateIsAvalible: false,
      OTAAvalibe: false,
    };
  }

  componentDidMount() {
    Constants.nativeAppVersion[Constants.nativeAppVersion.length - 1] === "0"
      ? this.handleUpdates()
      : this.props.checkForUpdate();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.actualVersion !== this.props.actualVersion &&
      this.props.actualVersion === Constants.nativeAppVersion
    ) {
      if (!this.props.underMaintenanceMessage_en) this.handleUpdates();
    } else if (
      prevProps.actualVersion !== this.props.actualVersion &&
      this.props.actualVersion !== Constants.nativeAppVersion &&
      this.props.actualVersion
    ) {
      this.setState({ updateIsAvalible: true });
    }
  }

  handleUpdates = async () => {
    const { translate } = this.props.screenProps;
    try {
      this.setState({
        status: "",
        statusLoading: true,
      });
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        this.setState({
          status: translate("New update found"),
          OTAAvalibe: true,
        });
        await Updates.fetchUpdateAsync({
          eventListener: this.handleOTAListener,
        });
        Updates.reloadAsync();
      } else {
        if (!(this.props.customMessage_en && this.props.customMessage_ar))
          this.setState({ updateDownloaded: true });
        else this.setState({ statusLoading: false });
      }
    } catch (e) {
      if (!__DEV__) {
        Sentry.captureException(e);
      }
      this.setState({
        status: "",
        statusLoading: false,
        OTAAvalibe: false,
        updateIsAvalible: false,
      });
    }
  };

  handleOTAListener = (event) => {
    const { translate } = this.props.screenProps;
    if (event.type === Updates.EventType.DOWNLOAD_STARTED) {
      this.setState({
        status2: translate("downloading"),
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
    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={{ margin: 0 }}
        isVisible={this.state.updateIsAvalible || this.state.OTAAvalibe}
      >
        <SafeAreaView forceInset={{ top: "always" }}>
          <BlurView intensity={70} tint="dark" style={styles.blurStyle}>
            <View style={{ height: "100%" }}>
              {this.state.updateIsAvalible && (
                <CustomHeader
                  screenProps={this.props.screenProps}
                  closeButton={true}
                  actionButton={() => {
                    this.setState({ updateIsAvalible: false });
                  }}
                />
              )}
              <Animatable.View
                animation="fadeInDown"
                style={styles.textContainer}
              >
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
                  style={[
                    styles.textUpdate,
                    { fontFamily: "montserrat-light" },
                  ]}
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
                      <Small style={{ fontSize: 14 }}>
                        {translate("The app will restart once it's done") +
                          "\n"}
                      </Small>
                      {this.state.status2}
                    </Text>
                  </>
                )}
              </Animatable.View>
              {this.props.loadingChecker || this.state.statusLoading ? (
                <LottieView
                  ref={(animation) => {
                    this.animation = animation;
                  }}
                  style={styles.loadingStyle}
                  resizeMode="contain"
                  source={require("../../../assets/animation/update_loader.json")}
                  loop
                  autoPlay
                />
              ) : (
                <Animatable.View
                  animation="fadeInUp"
                  style={styles.buttonContainer}
                >
                  {(this.props.updateMessage_en &&
                    this.state.updateIsAvalible) ||
                  this.props.underMaintenanceMessage_en ? (
                    <GradientButton
                      onPressAction={this.handleButton}
                      style={styles.updateButton}
                      textStyle={styles.textUpdate}
                      text={
                        this.props.underMaintenanceMessage_en
                          ? translate("Check for update")
                          : translate("Update Now")
                      }
                      uppercase={true}
                    />
                  ) : (
                    <GradientButton
                      onPressAction={() =>
                        this.setState({
                          updateIsAvalible: false,
                          OTAAvalibe: false,
                        })
                      }
                      style={styles.updateButton}
                      textStyle={styles.textUpdate}
                      text={translate("Continue with the app")}
                      uppercase={true}
                    />
                  )}
                </Animatable.View>
              )}
            </View>
          </BlurView>
        </SafeAreaView>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  actualVersion: state.generic.actualVersion,
  underMaintenanceMessage_ar: state.generic.underMaintenanceMessage_ar,
  underMaintenanceMessage_en: state.generic.underMaintenanceMessage_en,
  updateMessage_ar: state.generic.updateMessage_ar,
  updateMessage_en: state.generic.updateMessage_en,
  customMessage_en: state.generic.customMessage_en,
  customMessage_ar: state.generic.customMessage_ar,
  loadingChecker: state.generic.loadingChecker,
});

const mapDispatchToProps = (dispatch) => ({
  checkForUpdate: () => dispatch(actionCreators.checkForUpdate()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppUpdateChecker);
