import React, { Component } from "react";
import { connect } from "react-redux";
import { View, BackHandler, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text, Item, Input, Icon } from "native-base";
import { showMessage } from "react-native-flash-message";
import split from "lodash/split";
import isEmpty from "lodash/isEmpty";
import Picker from "../../../MiniComponents/Picker";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";
import LowerButton from "../../../MiniComponents/LowerButton";

//icons
import WebsiteIcon from "../../../../assets/SVGs/SwipeUps/Website";

// Style
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";

//Data
import list from "../../../Data/callactions.data";
import { netLoc } from "../../../Data/callactions.data";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";

class Website extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        attachment: "",
        callaction: list.SnapAd[0].call_to_action_list[0]
      },
      callActionLabel: "",
      networkString: netLoc[0].label,
      netLoc: netLoc,
      callactions: list.SnapAd[0].call_to_action_list,
      urlError: "",
      inputCallToAction: false
    };
  }

  componentDidMount() {
    if (
      this.props.data.hasOwnProperty("attachment") &&
      this.props.data.attachment !== "BLANK" &&
      !this.props.data.attachment.hasOwnProperty("android_app_url")
    ) {
      const url = split(this.props.data.attachment.url, "://");
      this.setState({
        campaignInfo: {
          attachment: url[1],
          callaction: this.props.data.call_to_action
        },
        networkString: url[0] + "://"
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  validateUrl = () => {
    const urlError = validateWrapper(
      "website",
      this.state.networkString + this.state.campaignInfo.attachment
    );
    this.setState({
      urlError
    });
    if (urlError) {
      showMessage({
        message: "Please enter a vaild url",
        type: "warning",
        position: "top",
        duration: 7000
      });
      return false;
    } else {
      return true;
    }
  };
  _handleSubmission = () => {
    console.log(this.props.objective);
    console.log(this.props.collectionAdLinkForm);

    if (this.validateUrl()) {
      this.props._changeDestination(
        this.props.collectionAdLinkForm === 0
          ? this.props.data.objective !== "LEAD_GENERATION"
            ? "REMOTE_WEBPAGE"
            : "LEAD_GENERATION"
          : "COLLECTION",

        this.state.campaignInfo.callaction,
        {
          url: this.state.networkString + this.state.campaignInfo.attachment
        }
      );
      this.props.navigation.navigate("AdDesign");
    }
  };
  onSelectedCallToActionIdChange = value => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  closeCallToActionModal = () => {
    this.setState({
      inputCallToAction: false
    });
  };

  onSelectedCallToActionChange = value => {
    if (value && !isEmpty(value)) {
      this.setState(
        {
          campaignInfo: {
            ...this.state.campaignInfo,
            callaction: {
              label: value[0].label,
              value: value[0].value
            }
          }
        },
        () => {
          this.closeCallToActionModal();
        }
      );
    }
  };
  render() {
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <KeyboardShift>
          {() => (
            <View
              style={[
                styles.websiteContent,
                {
                  paddingHorizontal:
                    this.props.objective === "LEAD_GENERATION" ? 40 : 10
                }
              ]}
            >
              <WebsiteIcon style={styles.icon} />
              <View style={[styles.textcontainer]}>
                <Text style={styles.titletext}>Website</Text>
                <Text style={styles.subtext}>
                  The user will be taken to your website
                </Text>
              </View>
              <Picker
                searchPlaceholderText={"Search Call To Action"}
                data={this.state.callactions}
                uniqueKey={"value"}
                displayKey={"label"}
                open={this.state.inputCallToAction}
                onSelectedItemsChange={this.onSelectedCallToActionIdChange}
                onSelectedItemObjectsChange={this.onSelectedCallToActionChange}
                selectedItems={[this.state.campaignInfo.callaction.value]}
                single={true}
                screenName={"Swipe up destination Website"}
                closeCategoryModal={this.closeCallToActionModal}
              />

              <Item
                rounded
                style={[styles.input]}
                onPress={() => {
                  this.setState({ inputCallToAction: true });
                }}
              >
                <Text style={styles.callActionLabel}>
                  {this.state.campaignInfo.callaction.label}
                </Text>
                <Icon
                  type="AntDesign"
                  name="down"
                  style={{ color: "#fff", fontSize: 20, left: 25 }}
                />
              </Item>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%"
                }}
              >
                <TouchableOpacity
                  style={styles.optionsRowContainer}
                  onPress={() => {
                    this.setState({
                      networkString: "http://"
                    });
                  }}
                  // onPress={() => this.props.onSelectedGenderChange("MALE")}
                >
                  <Icon
                    type="MaterialCommunityIcons"
                    name={
                      this.state.networkString === "http://"
                        ? "circle"
                        : "circle-outline"
                    }
                    style={[
                      this.state.networkString === "http://"
                        ? styles.activetext
                        : styles.inactivetext,
                      styles.optionsIconSize
                    ]}
                  />
                  <Text
                    style={[styles.inactivetext, styles.optionsTextContainer]}
                  >
                    http://
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.optionsRowContainer}
                  onPress={() => {
                    this.setState({
                      networkString: "https://"
                    });
                  }}
                  // onPress={() => this.props.onSelectedGenderChange("FEMALE")}
                >
                  <Icon
                    type="MaterialCommunityIcons"
                    name={
                      this.state.networkString === "https://"
                        ? "circle"
                        : "circle-outline"
                    }
                    style={[
                      this.state.networkString === "https://"
                        ? styles.activetext
                        : styles.inactivetext,
                      styles.optionsIconSize
                    ]}
                  />
                  <Text
                    style={[styles.inactivetext, styles.optionsTextContainer]}
                  >
                    https://
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center"
                }}
              >
                <Item rounded style={styles.netLocStyle}>
                  <Text style={[styles.callActionLabel, { top: 3, right: 4 }]}>
                    {this.state.networkString}
                  </Text>
                </Item>

                <Item
                  rounded
                  style={[
                    styles.input,
                    {
                      paddingHorizontal: 0,
                      width: "65%"
                    },
                    this.state.urlError
                      ? GlobalStyles.redBorderColor
                      : GlobalStyles.transparentBorderColor
                  ]}
                >
                  <Input
                    style={styles.inputtext}
                    placeholder="Enter your website's URL"
                    placeholderTextColor="#fff"
                    value={this.state.campaignInfo.attachment}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value =>
                      this.setState({
                        campaignInfo: {
                          ...this.state.campaignInfo,
                          attachment: value
                        }
                      })
                    }
                    onBlur={() => this.validateUrl()}
                  />
                </Item>
              </View>
              <Text style={styles.warningText}>
                Please make sure not include social media sites such as Facbook,
                Instagram, Youtube, SnapChat, etc.
              </Text>
              <View />
              <View style={styles.bottonViewWebsite}>
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
                  bottom={0}
                  function={this._handleSubmission}
                />
              </View>
            </View>
          )}
        </KeyboardShift>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Website);
