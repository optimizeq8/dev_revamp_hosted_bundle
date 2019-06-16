import React, { Component } from "react";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { View, SafeAreaView, BackHandler } from "react-native";
import { Text, Item, Input, Icon } from "native-base";
import list from "./callactions";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import LowerButton from "../../../MiniComponents/LowerButton";
//icons
import WebsiteIcon from "../../../../assets/SVGs/SwipeUps/Website";

// Style
import styles from "./styles";
import { showMessage } from "react-native-flash-message";

class Website extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        attachment: "",
        callaction: list[0].call_to_action_list[0]
      },

      callactions: list[0].call_to_action_list,
      urlError: ""
    };
  }

  componentDidMount() {
    if (
      this.props.data.hasOwnProperty("attachment") &&
      this.props.data.attachment !== "BLANK" &&
      !this.props.data.attachment.hasOwnProperty("android_app_url")
    ) {
      this.setState({
        campaignInfo: {
          attachment: this.props.data.attachment.url,
          callaction: this.props.data.call_to_action
        }
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
      this.state.campaignInfo.attachment
    );
    this.setState({
      urlError
    });
    if (urlError) {
      showMessage({
        message: "Please enter a vaild url",
        description:
          'Make sure to include the network location (e.g., "http://" or "https://") in the URL',
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
    if (this.validateUrl()) {
      this.props._changeDestination(
        this.props.objective !== "LEAD_GENERATION"
          ? "REMOTE_WEBPAGE"
          : "LEAD_GENERATION",
        this.state.campaignInfo.callaction,
        { url: this.state.campaignInfo.attachment }
      );
      this.props.navigation.navigate("AdDesign");
    }
  };
  render() {
    return (
      <SafeAreaView
        style={{
          height: "100%"
        }}
      >
        <View
          style={{
            height: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            padding: this.props.objective === "LEAD_GENERATION" ? 40 : 10
          }}
        >
          <View style={{}}>
            <WebsiteIcon style={styles.icon} />
            <View style={[styles.textcontainer, { marginBottom: 20 }]}>
              <Text style={[styles.titletext]}>Website</Text>
              <Text style={[styles.subtext]}>
                The user will be taken to your website
              </Text>
            </View>
            <RNPickerSelect
              items={this.state.callactions}
              placeholder={{}}
              value={this.state.campaignInfo.callaction.value}
              onValueChange={(value, index) => {
                this.setState({
                  campaignInfo: {
                    ...this.state.campaignInfo,
                    callaction: {
                      label: list[0].call_to_action_list[index].label,
                      value
                    }
                  }
                });
              }}
            >
              <Item rounded style={[styles.input, { marginBottom: 20 }]}>
                <Text
                  style={[
                    styles.inputtext,
                    {
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      color: "#fff"
                    }
                  ]}
                >
                  {this.state.campaignInfo.callaction === ""
                    ? this.state.callactions[0].label
                    : this.state.callactions.find(
                        c =>
                          this.state.campaignInfo.callaction.value === c.value
                      ).label}
                </Text>
                <Icon
                  type="AntDesign"
                  name="down"
                  style={{ color: "#fff", fontSize: 20, left: 25 }}
                />
              </Item>
            </RNPickerSelect>
            <Item
              rounded
              style={[
                styles.input,
                {
                  borderColor: this.state.urlError ? "red" : "transparent"
                }
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
            <Text style={styles.warningText}>
              Please make sure not include social media sites such as Facbook,
              Instagram, Youtube, SnapChat, etc.
            </Text>
          </View>
          <View />
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
              bottom={0}
              function={this._handleSubmission}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({ data: state.campaignC.data });

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Website);
