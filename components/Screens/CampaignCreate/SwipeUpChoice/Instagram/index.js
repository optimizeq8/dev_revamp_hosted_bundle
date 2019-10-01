import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text, Item, Input, Icon, Button, Container } from "native-base";
import { showMessage } from "react-native-flash-message";
import isEmpty from "lodash/isEmpty";
import upperCase from "lodash/upperCase";
// import { Modal } from 'react-native-paper';
import { BlurView } from "expo-blur";

import Picker from "../../../../MiniComponents/Picker";
import KeyboardShift from "../../../../MiniComponents/KeyboardShift";
import LowerButton from "../../../../MiniComponents/LowerButton";
import PhoneNoField from "../../../Signup/PhoneNo/PhoneNoField";
//icons
import SuccessIcon from "../../../../../assets/SVGs/Success";
import ErrorIcon from "../../../../../assets/SVGs/Error";
import InstagramIcon from "../../../../../assets/SVGs/InstagramIcon";

// Style
import styles from "../styles";

//Data
import list from "../../../../Data/callactions.data";

import * as actionCreators from "../../../../../store/actions";

//Functions
import validateWrapper from "../../../../../ValidationFunctions/ValidateWrapper";

class Instagram extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        weburl: "",
        googlemaplink: "",
        insta_handle: "",
        callnumber: "",
        callaction: list.SnapAd[4].call_to_action_list[0]
      },
      callactions: list.SnapAd[4].call_to_action_list,

      insta_handleError: "",
      inputCallToAction: false
    };
  }
  componentDidMount() {
    if (
      (this.props.data &&
        this.props.data.hasOwnProperty("attachment") &&
        this.props.data.attachment !== "BLANK") ||
      this.props.mainBusiness.googlemaplink !== ""
    ) {
      // console.log("capmaignDetail", this.props.data);
      // console.log("mainBusinessInstaHandle", this.props.mainBusiness);

      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          weburl: this.props.mainBusiness.weburl
            ? this.props.mainBusiness.weburl
            : this.props.data.weburl,
          insta_handle:
            this.props.data && this.props.data.insta_handle
              ? this.props.data.insta_handle
              : this.props.mainBusiness.insta_handle
              ? this.props.mainBusiness.insta_handle
              : "",
          googlemaplink: this.props.mainBusiness.googlemaplink
            ? this.props.mainBusiness.googlemaplink
            : this.props.data && this.props.data.googlemaplink
            ? this.props.data.googlemaplink
            : "",
          callnumber: this.props.mainBusiness.callnumber
            ? this.props.mainBusiness.callnumber
            : this.props.data.callnumber,
          callaction:
            this.props.data &&
            this.props.data.call_to_action &&
            this.props.data.call_to_action.value !== "BLANK"
              ? this.props.data.call_to_action
              : list.SnapAd[4].call_to_action_list[0]
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
    const { translate } = this.props.screenProps;
    const insta_handleError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.insta_handle
    );
    const weburlError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.weburl
    );
    const googlemaplinkError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.googlemaplink
    );
    this.setState({
      insta_handleError,
      weburlError
    });
    if (insta_handleError || weburlError || googlemaplinkError) {
      showMessage({
        message: insta_handleError
          ? translate("Please provide an instagram handle")
          : weburlError
          ? translate("Please provide domain name")
          : googlemaplinkError
          ? translate("Please provide a valid location link")
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
    const { translate } = this.props.screenProps;
    // if (!this.props.mainBusiness.weburl) {
    await this.props.verifyInstagramHandle(
      this.state.campaignInfo.insta_handle
    );
    if (!this.props.errorInstaHandle && !this.props.mainBusiness.weburl) {
      await this.props.verifyBusinessUrl(this.state.campaignInfo.weburl);
    }
    if (this.props.errorInstaHandle && this.props.errorInstaHandleMessage) {
      showMessage({
        message: translate(
          `{{insta_handle}} ${this.props.errorInstaHandleMessage.substr(
            this.props.errorInstaHandleMessage.indexOf(" ") + 1
          )}`,
          { insta_handle: this.state.campaignInfo.insta_handle }
        ),
        type: "danger",
        duration: 2000
      });
    }
    let weburlAvalible =
      this.props.mainBusiness.weburl || this.props.weburlAvalible;

    if (this.validate() && weburlAvalible && !this.props.errorInstaHandle) {
      let instagramTrafficCampaign = {
        weburl: this.state.campaignInfo.weburl,
        insta_handle: this.state.campaignInfo.insta_handle,
        callnumber: this.state.campaignInfo.callnumber.replace("+", ""),
        googlemaplink: this.state.campaignInfo.googlemaplink
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
        null,
        instagramTrafficCampaign
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
  changeGoogleMapLocation = value => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        googlemaplink: value
      }
    });
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={[styles.safeAreaContainer]}
      >
        <KeyboardShift style={{ flex: 1 }}>
          {() => (
            <View style={[styles.whatsApp]}>
              <InstagramIcon
                width={60}
                height={60}
                fill="#fff"
                style={[styles.icon]}
              />
              <View style={[styles.textcontainer]}>
                <Text style={styles.titletext}>
                  {translate("Instagram Traffic")}
                </Text>
                <Text style={styles.subtext}>
                  {translate(
                    "We’ll create a mini website for your business Just fill in the info below"
                  )}
                </Text>
              </View>
              <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={[styles.whatsAppDetailContainer]}>
                  <View style={styles.marginVertical}>
                    {/* <Text style={[styles.subTitle]}>Instagram handle</Text> */}
                    <View style={[styles.callToActionLabelView]}>
                      <Text uppercase style={[styles.inputLabel]}>
                        {translate("instagram")}
                      </Text>
                    </View>
                    <Item
                      rounded
                      style={[
                        styles.input,
                        {
                          paddingHorizontal: 0
                          // width: "75%"
                        }
                        //   this.state.insta_handleError
                        //     ? GlobalStyles.redBorderColor
                        //     : GlobalStyles.transparentBorderColor
                      ]}
                    >
                      <Icon
                        style={{ color: "#FFF", position: "absolute" }}
                        name="at"
                        type="MaterialCommunityIcons"
                      />
                      <Input
                        style={styles.inputtext}
                        placeholder={translate("Handle")}
                        placeholderTextColor="#fff"
                        value={this.state.campaignInfo.insta_handle}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={value => this.changeInstaHandle(value)}
                        onBlur={() => {
                          this.validate();
                          // if (!this.props.errorInstaHandle) {
                          this.props.verifyInstagramHandle(
                            this.state.campaignInfo.insta_handle
                          );
                          // }
                        }}
                      />
                      {this.props.errorInstaHandle && (
                        <ErrorIcon
                          width={25}
                          height={25}
                          style={{ marginRight: 10 }}
                        />
                      )}
                      {!this.props.errorInstaHandle && (
                        <SuccessIcon
                          width={25}
                          height={25}
                          style={{ marginRight: 10 }}
                        />
                      )}
                    </Item>
                    {this.props.errorInstaHandleMessage && (
                      <Text
                        style={{
                          paddingTop: 12,
                          paddingHorizontal: 50,
                          fontSize: 14,
                          fontFamily: "montserrat-regular",
                          color: "#fff",
                          textAlign: "center"
                        }}
                      >
                        {this.props.errorInstaHandleMessage &&
                          translate(
                            `{{insta_handle}} ${this.props.errorInstaHandleMessage.substr(
                              this.props.errorInstaHandleMessage.indexOf(" ") +
                                1
                            )}`,
                            {
                              insta_handle: this.state.campaignInfo.insta_handle
                            }
                          )}
                      </Text>
                    )}
                  </View>

                  {!this.props.mainBusiness.weburl && (
                    <View style={styles.marginVertical}>
                      <Text style={[styles.subTitle]}>
                        {translate("Pick a domain for your Website")}
                      </Text>
                      <View style={[styles.callToActionLabelView]}>
                        <Text uppercase style={[styles.inputLabel]}>
                          {translate("domain")}
                        </Text>
                      </View>
                      <Item
                        rounded
                        style={[
                          styles.input,
                          {
                            paddingHorizontal: 0
                            // width: "50%"
                          }
                          //   this.state.weburlError
                          //     ? GlobalStyles.redBorderColor
                          //     : GlobalStyles.transparentBorderColor
                        ]}
                      >
                        <Input
                          style={[styles.businessInputText]}
                          placeholder="eg. businessname"
                          placeholderTextColor="#FF9D00"
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
                        <Text style={[styles.url]}>.optimizeapp.com</Text>
                      </Item>
                    </View>
                  )}
                  <View style={styles.marginVertical}>
                    {/* <Text style={[styles.subTitle]}>Call to action</Text> */}
                    <Picker
                      screenProps={this.props.screenProps}
                      searchPlaceholderText={translate("Search Call To Action")}
                      data={this.state.callactions}
                      uniqueKey={"value"}
                      displayKey={"label"}
                      open={this.state.inputCallToAction}
                      onSelectedItemsChange={
                        this.onSelectedCallToActionIdChange
                      }
                      onSelectedItemObjectsChange={
                        this.onSelectedCallToActionChange
                      }
                      selectedItems={[this.state.campaignInfo.callaction.value]}
                      single={true}
                      screenName={"Swipe up destination Instagram Traffic"}
                      closeCategoryModal={this.closeCallToActionModal}
                    />
                    <View style={[styles.callToActionLabelView]}>
                      <Text uppercase style={[styles.inputLabel]}>
                        {translate("call to action")}
                      </Text>
                    </View>
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
                        style={styles.downArrowIcon}
                      />
                    </Item>
                  </View>

                  <View style={styles.marginVertical}>
                    <View style={[styles.callToActionLabelView]}>
                      <Text uppercase style={[styles.inputLabel]}>
                        {translate("mobile")}
                      </Text>
                    </View>
                    {/* <Text style={[styles.subTitle]}>Phone number (optional)</Text> */}
                    <PhoneNoField
                      screenProps={this.props.screenProps}
                      whatsApp
                      phoneNum={this.state.campaignInfo.callnumber}
                      changeNo={this.changeCallNumberPhoneNo}
                      invite={true}
                    />
                  </View>
                  <View style={styles.marginVertical}>
                    <View style={[styles.callToActionLabelView]}>
                      <Text uppercase style={[styles.inputLabel]}>
                        {translate("LOCATION URL")}
                      </Text>
                    </View>
                    <Item
                      rounded
                      style={[
                        styles.input,
                        {
                          paddingHorizontal: 0
                          // width: "75%"
                        }
                        //   this.state.insta_handleError
                        //     ? GlobalStyles.redBorderColor
                        //     : GlobalStyles.transparentBorderColor
                      ]}
                    >
                      <Input
                        style={styles.inputtext}
                        placeholder={translate("Add Location URL")}
                        placeholderTextColor="#fff"
                        value={this.state.campaignInfo.googlemaplink}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={value =>
                          this.changeGoogleMapLocation(value)
                        }
                        // onBlur={() => {
                        //   this.validate();
                        //   // if (!this.props.errorInstaHandle) {
                        //   this.props.verifyInstagramHandle(
                        //     this.state.campaignInfo.insta_handle
                        //   );
                        //   // }
                        // }}
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
              </ScrollView>
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
  mainBusiness: state.account.mainBusiness,
  errorInstaHandle: state.campaignC.errorInstaHandle,
  errorInstaHandleMessage: state.campaignC.errorInstaHandleMessage,
  productInfoId: state.campaignC.productInfoId,
  businessLogo: state.campaignC.businessLogo
});

const mapDispatchToProps = dispatch => ({
  verifyBusinessUrl: weburl =>
    dispatch(actionCreators.verifyBusinessUrl(weburl)),
  verifyInstagramHandle: insta_handle =>
    dispatch(actionCreators.verifyInstagramHandle(insta_handle))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instagram);
