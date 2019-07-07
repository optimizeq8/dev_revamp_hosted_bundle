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
import PhoneNo from "../../../Screens/Signup/PhoneNo";
//icons
import WhatsAppIcon from "../../../../assets/SVGs/SwipeUps/WhatsApp";

// Style
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";

//Data
import list from "../../../Data/callactions.data";

import * as actionCreators from "../../../../store/actions";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";

class WhatsApp extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        weburl: "",
        whatsappnumber: "",
        insta_handle: "",
        callnumber: "",
        callaction: list[4].call_to_action_list[0]
      },
      callactions: list[4].call_to_action_list,

      insta_handleError: "",
      inputCallToAction: false
    };
  }

  componentDidMount() {
    if (
      (this.props.data.hasOwnProperty("attachment") &&
        this.props.data.attachment !== "BLANK") ||
      this.props.mainBusiness.whatsappnumber !== ""
    ) {
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          weburl: this.props.mainBusiness.weburl
            ? this.props.mainBusiness.weburl
            : this.props.data.weburl,
          insta_handle: this.props.mainBusiness.insta_handle
            ? this.props.mainBusiness.insta_handle
            : this.props.data.insta_handle,
          whatsappnumber: this.props.mainBusiness.whatsappnumber
            ? this.props.mainBusiness.whatsappnumber
            : this.props.data.whatsappnumber,
          callnumber: this.props.mainBusiness.callnumber
            ? this.props.mainBusiness.callnumber
            : this.props.data.callnumber,
          callaction:
            this.props.data.call_to_action.value !== "BLANK"
              ? this.props.data.call_to_action
              : list[4].call_to_action_list[0]
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
  validate = () => {
    const insta_handleError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.insta_handle
    );
    const weburlError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.weburl
    );
    const whatsappnumberError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.whatsappnumber
    );
    this.setState({
      insta_handleError,
      weburlError
    });
    if (insta_handleError || weburlError || whatsappnumberError) {
      showMessage({
        message: insta_handleError
          ? "Please provide an instagram handle"
          : weburlError
          ? "Please provide domain name"
          : whatsappnumberError
          ? "Please provide a valid whatsapp number"
          : "",
        type: "warning",
        position: "top",
        duration: 7000
      });
      return false;
    } else {
      return true;
    }
  };
  _handleSubmission = async () => {
    if (!this.props.mainBusiness.weburl) {
      await this.props.verifyBusinessUrl(this.state.campaignInfo.weburl);
    }
    let weburlAvalible =
      this.props.mainBusiness.weburl || this.props.weburlAvalible;

    if (this.validate() && weburlAvalible) {
      let whatsAppCampaign = {
        weburl: this.state.campaignInfo.weburl,
        whatsappnumber: this.state.campaignInfo.whatsappnumber,
        insta_handle: this.state.campaignInfo.insta_handle,
        callnumber:
          this.state.campaignInfo.callnumber ||
          this.state.campaignInfo.callnumber !== ""
            ? this.state.campaignInfo.callnumber
            : this.state.campaignInfo.whatsappnumber
      };

      this.props._changeDestination(
        "REMOTE_WEBPAGE",
        this.state.campaignInfo.callaction,
        {
          url: `https://${this.state.campaignInfo.weburl.replace(
            /[^0-9a-z]/gi,
            ""
          )}.optimizeapp.com`
        },
        null,
        whatsAppCampaign
      );
      this.props.navigation.navigate("AdDesign");
    }
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
  closeCallToActionModal = () => {
    this.setState({
      inputCallToAction: false
    });
  };
  onSelectedCallToActionIdChange = value => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  changeWhatsAppPhoneNo = (value, validNumber) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        whatsappnumber: validNumber ? value : ""
      }
    });
  };
  changeCallNumberPhoneNo = (value, validNumber) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        callnumber: validNumber ? value : ""
      }
    });
  };
  changeInstaHandle = value => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        insta_handle: value
      }
    });
  };
  changeWebUrl = value => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        weburl: value.replace(/[^0-9a-z]/gi, "")
      }
    });
  };
  render() {
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <KeyboardShift>
          {() => (
            <View style={[styles.whatsApp, { bottom: "8%" }]}>
              <WhatsAppIcon
                width={90}
                height={90}
                fill="#fff"
                style={[styles.icon]}
              />
              <View style={[styles.textcontainer]}>
                <Text style={styles.titletext}>WhatsApp Campaign</Text>
                <Text style={styles.subtext}>
                  We’ll create a mini website for your business. Just fill in
                  the info below
                </Text>
              </View>
              <View style={[styles.whatsApp]}>
                {!this.props.mainBusiness.weburl && (
                  <View style={{}}>
                    <Text style={[styles.subTitle]}>
                      Pick a domain for your Website
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center"
                      }}
                    >
                      <Item
                        rounded
                        style={[
                          styles.input,
                          {
                            paddingHorizontal: 0,
                            width: "50%"
                          },
                          this.state.weburlError
                            ? GlobalStyles.redBorderColor
                            : GlobalStyles.transparentBorderColor
                        ]}
                      >
                        <Input
                          style={[styles.inputtext]}
                          placeholder="eg. businessname"
                          placeholderTextColor="#fff"
                          value={this.state.campaignInfo.weburl}
                          autoCorrect={false}
                          autoCapitalize="none"
                          onChangeText={value => this.changeWebUrl(value)}
                          onBlur={() => {
                            this.validate();
                            if (!this.props.mainBusiness.weburl) {
                              this.props.verifyBusinessUrl(
                                this.state.campaignInfo.weburl
                              );
                            }
                          }}
                        />
                      </Item>
                      <Text style={[styles.url]}>.optimizeapp.com</Text>
                    </View>
                  </View>
                )}
                <View style={{}}>
                  <Text style={[styles.subTitle]}>Call to action</Text>
                  <Picker
                    searchPlaceholderText={"Search Call To Action"}
                    data={this.state.callactions}
                    uniqueKey={"value"}
                    displayKey={"label"}
                    open={this.state.inputCallToAction}
                    onSelectedItemsChange={this.onSelectedCallToActionIdChange}
                    onSelectedItemObjectsChange={
                      this.onSelectedCallToActionChange
                    }
                    selectedItems={[this.state.campaignInfo.callaction.value]}
                    single={true}
                    screenName={"Swipe up destination WhatsApp"}
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
                </View>

                <View style={{}}>
                  <Text style={[styles.subTitle]}>WhatsApp number</Text>
                  <Text
                    style={[
                      styles.subtext,
                      { fontFamily: "montserrat-regular" }
                    ]}
                  >
                    Customers would be able to call And text this number
                  </Text>
                  <PhoneNo
                    whatsApp
                    phoneNum={this.state.campaignInfo.whatsappnumber}
                    changeFunction={this.changeWhatsAppPhoneNo}
                    invite={true}
                  />
                </View>
                <View style={{}}>
                  <Text style={[styles.subTitle]}>Phone number (optional)</Text>
                  <PhoneNo
                    whatsApp
                    phoneNum={this.state.campaignInfo.callnumber}
                    changeFunction={this.changeCallNumberPhoneNo}
                    invite={true}
                  />
                </View>

                <View style={{}}>
                  <Text style={[styles.subTitle]}>Instagram handle</Text>

                  <Item
                    rounded
                    style={[
                      styles.input,
                      {
                        paddingHorizontal: 0,
                        width: "75%"
                      },
                      this.state.insta_handleError
                        ? GlobalStyles.redBorderColor
                        : GlobalStyles.transparentBorderColor
                    ]}
                  >
                    <Icon
                      style={{ color: "#FFF", position: "absolute" }}
                      name="at"
                      type="MaterialCommunityIcons"
                    />
                    <Input
                      style={styles.inputtext}
                      placeholder="Enter your Instagram handle"
                      placeholderTextColor="#fff"
                      value={this.state.campaignInfo.insta_handle}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value => this.changeInstaHandle(value)}
                      onBlur={() => this.validate()}
                    />
                  </Item>
                </View>
              </View>
              <View style={styles.bottonViewWebsite}>
                <LowerButton
                  checkmark={true}
                  bottom={-5}
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
  weburlAvalible: state.campaignC.weburlAvalible,
  mainBusiness: state.account.mainBusiness
});

const mapDispatchToProps = dispatch => ({
  verifyBusinessUrl: weburl =>
    dispatch(actionCreators.verifyBusinessUrl(weburl))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhatsApp);
