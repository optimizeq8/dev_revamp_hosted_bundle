import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  ScrollView
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import KeyboardShift from "../KeyboardShift";
import { connect } from "react-redux";
import Toggle from "react-native-switch-toggle";
//styles
import styles from "../../Screens/CampaignCreate/SwipeUpChoice/styles";
import LowerButton from "../LowerButton";
import { Item, Input } from "native-base";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { showMessage } from "react-native-flash-message";
class index extends Component {
  state = { deep_link_url: "", deep_link_urlError: "" };
  componentDidMount() {
    this.setState({ deep_link_url: this.props.deep_link_url });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.deep_link_url !== this.props.deep_link_url) {
      this.setState({ deep_link_url: this.props.deep_link_url });
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
    const deep_link_urlError = validateWrapper(
      "deepLink",
      this.state.deep_link_url
    );
    this.setState({
      deep_link_urlError
    });
    if (deep_link_urlError) {
      showMessage({
        message: "Invalid deep link url.",
        description:
          "A few format examples: 'my-app://your_url_here', 'my-app://?content=' or 'https://url.com'",
        type: "warning",
        position: "top",
        duration: 7000
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
      this.props._handleSubmission(this.state.deep_link_url);
    }
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          alignSelf: "center",
          width: "100%",
          flex: 1,
          justifyContent: "space-around"
          //   height: heightPercentageToDP(80),
          //   overflow: "hidden"
        }}
      >
        <KeyboardShift
          style={{
            alignSelf: "center",
            width: "100%",
            flex: 1,
            justifyContent: "space-around"
          }}
        >
          {() => (
            <>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Image
                  style={{
                    height: heightPercentageToDP(8.3),
                    width: heightPercentageToDP(8.3),
                    alignSelf: "center",
                    borderRadius: 18
                  }}
                  source={{
                    uri: this.props.icon_media_url || "place.co"
                  }}
                />
                <View style={{ flexDirection: "column", paddingTop: 10 }}>
                  <Text style={[styles.title]}>{this.props.app_name}</Text>
                  {this.props.ios_app_id !== "" && (
                    <Text
                      style={[styles.appTexts, { flexDirection: "column" }]}
                    >
                      iOS App ID{" "}
                      <Text style={{ color: "#FF9D00" }}>
                        {" "}
                        {this.props.ios_app_id}
                      </Text>
                    </Text>
                  )}
                  {this.props.android_app_url !== "" && (
                    <Text
                      style={[styles.appTexts, { flexDirection: "column" }]}
                    >
                      Android URL{" "}
                      <Text style={{ color: "#FF9D00" }}>
                        {this.props.android_app_url}
                      </Text>
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  // marginTop: heightPercentageToDP(4),
                  alignSelf: "center"
                }}
              >
                <Text style={[styles.text]}>
                  Your app will be advertised for
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                  }}
                >
                  <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity
                      style={[
                        styles.OS,
                        {
                          backgroundColor:
                            this.props.ios_app_id !== ""
                              ? "#fff"
                              : "rgba(255,255,255,0.3)"
                        }
                      ]}
                    >
                      <Text style={styles.OSText}>iOS</Text>
                    </TouchableOpacity>
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
                  <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity
                      style={[
                        styles.OS,
                        {
                          paddingHorizontal: 0,
                          backgroundColor:
                            this.props.android_app_url !== ""
                              ? "#fff"
                              : "rgba(255,255,255,0.3)"
                        }
                      ]}
                    >
                      <Text style={[styles.OSText]}>Android</Text>
                    </TouchableOpacity>
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
              {this.props.deepLink && (
                <>
                  <Item
                    rounded
                    style={[
                      styles.input,
                      {
                        borderColor: this.state.deep_link_urlError
                          ? "red"
                          : "transparent",
                        marginBottom: 0
                        //   top: heightPercentageToDP(4)
                      }
                    ]}
                  >
                    <Input
                      value={this.state.deep_link_url}
                      style={styles.inputtext}
                      placeholder="Deep Link URL"
                      placeholderTextColor="white"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value =>
                        this.setState({
                          deep_link_url: value
                        })
                      }
                      onBlur={() => {
                        this.validateUrl();
                      }}
                    />
                  </Item>
                </>
              )}
              {this.props.swipeUpDestination && (
                <Text
                  style={[
                    styles.subtext,
                    {
                      marginBottom: 0,
                      // top: heightPercentageToDP(17),
                      textDecorationLine: "underline",
                      fontFamily: "montserrat-bold",
                      fontSize: heightPercentageToDP(2)
                    }
                  ]}
                  onPress={() => this.props.renderPreviousStep()}
                >
                  Change app
                </Text>
              )}
              <View>
                {this.props.swipeUpDestination && (
                  <Text
                    style={styles.footerText}
                    onPress={() => this.props.toggleSideMenu()}
                  >
                    Change Swipe-up Destination
                  </Text>
                )}

                <LowerButton
                  checkmark={true}
                  function={() => this._submitDeepLink()}
                  bottom={0}
                />
              </View>
            </>
          )}
        </KeyboardShift>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({ data: state.campaignC.data });

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
