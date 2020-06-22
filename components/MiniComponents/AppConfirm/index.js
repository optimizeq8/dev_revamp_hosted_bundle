import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Item, Input, Text } from "native-base";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { showMessage } from "react-native-flash-message";
import { connect } from "react-redux";
import Toggle from "../Toggle";

//styles
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";
import { colors } from "../../GradiantColors/colors";

import AppStoreIcon from "../../../assets/SVGs/AppleIcon";
import PlayStoreIcon from "../../../assets/SVGs/PlayStoreIcon";

import LowerButton from "../LowerButton";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import KeyboardShift from "../KeyboardShift";

class index extends Component {
  state = { deep_link_uri: "", deep_link_uriError: "" };
  componentDidMount() {
    this.setState({ deep_link_uri: this.props.deep_link_uri });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.deep_link_uri !== this.props.deep_link_uri) {
      this.setState({ deep_link_uri: this.props.deep_link_uri });
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    // this.props.navigation.goBack();
    this.props.renderPreviousStep();
    return true;
  };
  validateUrl = () => {
    const deep_link_uriError = validateWrapper(
      "deepLink",
      this.state.deep_link_uri
    );
    const { translate } = this.props.screenProps;
    this.setState({
      deep_link_uriError,
    });
    if (deep_link_uriError) {
      showMessage({
        message: translate("Invalid deep link URL"),
        description: translate(
          "A few format examples: 'my-app://your_url_here', 'my-app://?content=' or 'https://urlcom'"
        ),
        type: "warning",
        position: "top",
        duration: 7000,
      });
      return false;
    } else {
      return true;
    }
  };
  _submitDeepLink = () => {
    if (!this.props.deepLink) {
      this.props._handleSubmission();
    } else if (this.validateUrl()) {
      this.props._handleSubmission(this.state.deep_link_uri);
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <>
        {/* <KeyboardShift style={styles.keyboardContainer}>
          {() => ( */}
        {/* <> */}
        {/* <LinearGradient
                colors={[colors.background1, colors.background2]}
                locations={[0.7, 1]}
                style={styles.gradient}
              /> */}
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.mainView}>
            <Image
              style={styles.imageApp}
              source={{
                uri: this.props.icon_media_url || "place.co",
              }}
            />
            <View style={styles.appDetailsContainer}>
              <Text style={[styles.title]}>{this.props.app_name}</Text>
              {this.props.ios_app_id !== "" && (
                <Text style={[styles.appTexts, globalStyles.column]}>
                  {translate("iOS App ID")}{" "}
                  <Text style={globalStyles.orangeTextColor}>
                    {" "}
                    {this.props.ios_app_id}
                  </Text>
                </Text>
              )}
              {this.props.android_app_url !== "" && (
                <Text style={[styles.appTexts, globalStyles.column]}>
                  {translate("Android URL")}{" "}
                  <Text style={globalStyles.orangeTextColor}>
                    {this.props.android_app_url}
                  </Text>
                </Text>
              )}
            </View>
          </View>
          <View>
            <View style={[styles.appStoreLabelView]}>
              <Text uppercase style={[styles.inputLabel]}>
                {translate("app stores")}
              </Text>
            </View>
            <View style={styles.advertiseOSView}>
              <Text style={[styles.text]}>
                {translate("Your app will be advertised for")}
              </Text>
              <View style={styles.advertiseOSButtonView}>
                <View
                  style={[
                    globalStyles.column,
                    styles.appStoreButtons,
                    this.props.ios_app_id === "" ? { opacity: 0.5 } : {},
                  ]}
                >
                  {/* <TouchableOpacity
												style={[
													styles.OS,
													this.props.ios_app_id !== ''
														? globalStyles.whiteBackgroundColor
														: { backgroundColor: 'rgba(255,255,255,0.3)' },
												]}
											>
												<Text style={styles.OSText}>iOS</Text>
                                            </TouchableOpacity> */}
                  <AppStoreIcon />
                  <Text uppercase style={styles.appStoreButtonsText}>
                    {translate(`apple\napp store`)}
                  </Text>
                  <Toggle
                    switchOn={this.props.ios_app_id !== ""}
                    backgroundColorOff="rgba(255,255,255,0.1)"
                    backgroundColorOn="rgba(255,255,255,0.1)"
                    circleColorOff="#FFf"
                    circleColorOn="#66D072"
                    duration={500}
                    circleStyle={styles.toggleCircle}
                    containerStyle={styles.toggleStyle}
                  />
                </View>
                <View
                  style={[
                    globalStyles.column,
                    styles.appStoreButtons,
                    this.props.android_app_url === "" ? { opacity: 0.5 } : {},
                  ]}
                >
                  {/* <TouchableOpacity
												style={[
													styles.OS,
													this.props.android_app_url !== ''
														? globalStyles.whiteBackgroundColor
														: { backgroundColor: 'rgba(255,255,255,0.3)' },
													styles.androidButton,
												]}
											>
												<Text style={[styles.OSText]}>Android</Text>
                                            </TouchableOpacity> */}
                  <PlayStoreIcon />
                  <Text uppercase style={styles.appStoreButtonsText}>
                    {translate(`google\nplay store`)}
                  </Text>

                  <Toggle
                    switchOn={this.props.android_app_url !== ""}
                    backgroundColorOff="rgba(255,255,255,0.1)"
                    backgroundColorOn="rgba(255,255,255,0.1)"
                    circleColorOff="#FFf"
                    circleColorOn="#66D072"
                    duration={500}
                    circleStyle={styles.toggleCircle}
                    containerStyle={styles.toggleStyle}
                  />
                </View>
              </View>
            </View>
          </View>
          {this.props.deepLink && (
            <View>
              <View style={[styles.callToActionLabelView]}>
                <Text uppercase style={[styles.inputLabel]}>
                  {translate("url")}
                </Text>
              </View>
              <Item
                // rounded
                style={[
                  styles.input,
                  this.state.deep_link_uriError
                    ? globalStyles.redBorderColor
                    : globalStyles.transparentBorderColor,
                  styles.deepLinkItem,
                ]}
              >
                <Input
                  value={this.state.deep_link_uri}
                  style={styles.inputtext}
                  placeholder={translate("Deep Link URL")}
                  placeholderTextColor="white"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(value) =>
                    this.setState({
                      deep_link_uri: value,
                    })
                  }
                  onBlur={() => {
                    this.validateUrl();
                  }}
                />
              </Item>
            </View>
          )}

          <Text
            style={[styles.subtext, styles.changeAppText]}
            onPress={() => this.props.renderPreviousStep()}
          >
            {translate("Change app")}
          </Text>

          <View>
            <View>
              {this.props.swipeUpDestination && (
                <Text
                  style={styles.footerText}
                  onPress={() => this.props.toggleSideMenu()}
                >
                  {translate("Change Swipe-up Destination")}
                </Text>
              )}

              <LowerButton
                screenProps={this.props.screenProps}
                checkmark={true}
                function={() => this._submitDeepLink()}
                bottom={0}
              />
            </View>
          </View>
        </ScrollView>
        {/* </>
          )}
        </KeyboardShift> */}
      </>
    );
  }
}
const mapStateToProps = (state) => ({ data: state.campaignC.data });

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(index);
