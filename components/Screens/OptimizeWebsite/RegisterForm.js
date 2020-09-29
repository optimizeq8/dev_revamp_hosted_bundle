import React, { Component } from "react";
import { View, ScrollView, BackHandler, Text } from "react-native";
import InputScrollView from "react-native-input-scroll-view";

import { Item, Input } from "native-base";
import analytics from "@segment/analytics-react-native";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import InstagramIcon from "../../../assets/SVGs/InstagramIcon";
import SuccessIcon from "../../../assets/SVGs/Success";
import ErrorIcon from "../../../assets/SVGs/Error";
import LocationIcon from "../../../assets/SVGs/LocationOutline";

// Style
import styles from "./styles";

// import PhoneNoField from "./PhoneInput";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { showMessage } from "react-native-flash-message";
import LowerButton from "../../MiniComponents/LowerButton";
import PhoneNoField from "../Signup/PhoneNo/PhoneNoFieldNew";
import InputField from "../../MiniComponents/InputFieldNew";

class RegisterForm extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      phoneNum: "",
      countryCode: "",
      valid: false,
      type: "",
      whatsappnumber: "",
      insta_handle: "",
      callnumber: "",
      validCallNumber: false,
      validWhatsAppNumber: false,
      insta_handleError: "",
      showChangeInstaHandle: false,
      submissionLoading: false,
      googlemaplink: "",
      googleMapLinkError: null,
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    const {
      insta_handle,
      googlemaplink,
      whatsappnumber,
      callnumber,
    } = this.props.mainBusiness;
    const countryCode =
      callnumber && callnumber !== "" && callnumber.substring(0, 3);
    this.setState({
      callnumber: callnumber && callnumber.length > 0 ? "+" + callnumber : "",
      valid: true,
      countryCode: countryCode,
      googlemaplink,
      insta_handle,
      whatsappnumber:
        whatsappnumber && whatsappnumber.length > 0 ? "+" + whatsappnumber : "",
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  changePersonalNo = (number, countryCode, type, valid) => {
    // if (number.toString().length > 3 && valid) {
    this.setState({
      // phoneNum: number.toString().length > 3 && valid ? number.split(countryCode)[1] : number,
      phoneNum: number,
      countryCode: countryCode,
      valid,
      type,
    });
    // }
  };
  _handleSubmissionRegister = async () => {
    const error = await this.props.verifyInstagramHandle(
      this.state.insta_handle
    );
    const valid = this.validate();
    if (valid && !this.props.errorInstaHandle) {
      const callnumber =
        this.state.callnumber && this.state.callnumber.length > 0
          ? this.state.callnumber.replace("+", "")
          : "";
      const whatsappnumber =
        this.state.whatsappnumber && this.state.whatsappnumber.length > 0
          ? this.state.whatsappnumber.replace("+", "")
          : "";
      const info = {
        businessid: this.props.mainBusiness.businessid,
        whatsappnumber,
        insta_handle: this.state.insta_handle,
        callnumber,
        googlemaplink: this.state.googlemaplink ? this.state.googlemaplink : "",
      };

      this.props.updateWebInfoForBusiness(info, this.props.submitNextStep);
    } else {
      analytics.track(`a_submit_my_website_detail`, {
        source: "my_website_detail",
        source_action: "a_submit_my_website_detail",
        new: true,
        action_status: "failure",
        error_description:
          this.props.errorInstaHandle ||
          this.state.insta_handleError ||
          this.state.googleMapLinkError,
      });
    }
  };

  _handleSubmissionUpdate = () => {
    const { translate } = this.props.screenProps;
    const valid = this.validate();
    if (!valid || this.props.errorInstaHandle) {
      analytics.track(`a_error_form`, {
        source: "my_website_detail",
        error_page: "my_website_detail",
        source_action: "a_submit_my_website_detail",
        new: false,
        action_status: "failure",
        error_description:
          this.props.errorInstaHandle ||
          this.state.insta_handleError ||
          this.state.googleMapLinkError,
      });
    } else if (valid && !this.props.errorInstaHandle) {
      const whatsappnumber =
        this.props.mainBusiness.whatsappnumber &&
        this.props.mainBusiness.whatsappnumber.length > 0
          ? "+" + this.props.mainBusiness.whatsappnumber
          : this.props.mainBusiness.whatsappnumber;
      const statewhatsappnumber =
        this.state.whatsappnumber && this.state.whatsappnumber.length > 0
          ? this.state.whatsappnumber
          : "";
      const callnumber =
        this.props.mainBusiness.callnumber &&
        this.props.mainBusiness.callnumber.length > 0
          ? "+" + this.props.mainBusiness.callnumber
          : this.props.mainBusiness.callnumber;
      const statecallnumber =
        this.state.callnumber && this.state.callnumber.length > 0
          ? this.state.callnumber
          : "";
      const changedInfo =
        this.state.insta_handle !== this.props.mainBusiness.insta_handle ||
        this.state.googlemaplink !== this.props.mainBusiness.googlemaplink ||
        statewhatsappnumber !== whatsappnumber ||
        statecallnumber !== callnumber;

      if (changedInfo) {
        const callnumber =
          this.state.callnumber && this.state.callnumber.length > 0
            ? this.state.callnumber.replace("+", "")
            : "";
        const whatsappnumber =
          this.state.whatsappnumber && this.state.whatsappnumber.length > 0
            ? this.state.whatsappnumber.replace("+", "")
            : "";
        const info = {
          businessid: this.props.mainBusiness.businessid,
          whatsappnumber,
          insta_handle: this.state.insta_handle,
          callnumber,
          googlemaplink: this.state.googlemaplink
            ? this.state.googlemaplink
            : "",
        };

        this.props.updateWebInfoForBusiness(info, false);
      } else {
        analytics.track(`a_error_form`, {
          source: "my_website_detail",
          source_action: "a_submit_my_website_detail",
          new: false,
          action_status: "failure",
          error_description: "No changes to update",
        });
        showMessage({
          type: "warning",
          message: translate("No changes to update"),
          position: "top",
        });
      }
    }
  };

  changeWhatsAppPhoneNo = (value, countryCode, numberType, validNumber) => {
    analytics.track(`a_business_whatsapp`, {
      source: "my_website_detail",
      source_action: "a_business_whatsapp",
      new: this.props.edit ? false : true,
      whatsappnumber: value,
      action_status: validNumber ? "success" : "failure",
    });

    this.setState({
      whatsappnumber: validNumber ? value : "",
      validWhatsAppNumber: validNumber,
    });
  };
  changeCallNumberPhoneNo = (value, countryCode, numberType, validNumber) => {
    analytics.track(`a_business_callnumber`, {
      source: "my_website_detail",
      source_action: "a_business_callnumber",
      new: this.props.edit ? false : true,
      callnumber: value,
      action_status: validNumber ? "success" : "failure",
    });
    this.setState({
      callnumber: validNumber ? value : "",
      validCallNumber: validNumber,
    });
  };
  changeInstaHandle = (value) => {
    this.setState({
      insta_handle: value,
    });
  };

  changeGoogleMapLocation = (value) => {
    // truncate before https: everything
    if (value.includes("https:")) {
      const link = value.substring(value.indexOf("https:") + 1);
      // console.log("link", "h" + link);
      this.setState({
        googlemaplink: value === "" ? "" : "h" + link,
      });
    } else {
      this.setState({
        googlemaplink: value,
      });
    }
  };

  validateUrl = () => {
    const { translate } = this.props.screenProps;
    let googleMapLinkError = null;
    if (this.state.googlemaplink !== "")
      googleMapLinkError = validateWrapper(
        "googleMapLink",
        this.state.googlemaplink
      );
    this.setState({
      googleMapLinkError,
    });
    if (googleMapLinkError) {
      showMessage({
        message: translate("Please provide a valid location link"),
        type: "warning",
        position: "top",
        duration: 2000,
      });
      return false;
    } else {
      return true;
    }
  };
  validate = () => {
    const { translate } = this.props.screenProps;
    const insta_handleError = validateWrapper(
      "mandatory",
      this.state.insta_handle
    );

    if (this.state.googlemaplink && this.state.googlemaplink.length > 0) {
      var googleMapLinkError = validateWrapper(
        "googleMapLink",
        this.state.googlemaplink
      );
    }

    this.setState({
      insta_handleError,
      googleMapLinkError,
    });
    if (insta_handleError || googleMapLinkError) {
      showMessage({
        message: insta_handleError
          ? translate("Please provide an instagram handle")
          : googleMapLinkError
          ? translate("Please provide a valid location link")
          : "",
        type: "warning",
        position: "top",
        duration: 2000,
      });
      return false;
    } else {
      return true;
    }
  };

  setModalInstagramChangedVisible = (value) => {
    this.setState({
      showChangeInstaHandle: value,
    });
  };

  setValue = (stateName, value) => {
    let state = {};
    state[stateName] = value;

    this.setState({ ...state });
  };

  getValidInfo = async (stateError, validWrap) => {
    let state = {};
    if (stateError === "insta_handleError") {
      analytics.track(`a_business_insta_handle`, {
        source: "my_website_detail",
        source_action: "a_business_insta_handle",
        new: this.props.edit ? false : true,
        insta_handle: this.state.insta_handle,
      });
      await this.props.verifyInstagramHandle(this.state.insta_handle);
      if (this.props.errorInstaHandle) {
        analytics.track(`a_error_form`, {
          error_page: "my_website_detail",
          source: "my_website_detail",
          source_action: "a_business_insta_handle",
          new: this.props.edit ? false : true,
          insta_handle: this.state.insta_handle,
          error_description: this.props.errorInstaHandleMessage,
        });
      }
    }
    state[stateError] = validWrap;
    this.setState({
      ...state,
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <InputScrollView
        showsVerticalScrollIndicator={false}
        {...ScrollView.props}
        contentContainerStyle={[styles.whatsAppDetailContainer]}
      >
        <InputField
          // disabled={this.props.loadingUpdateInfo}
          // customStyles={{ width: "100%", marginLeft: 0 }}
          incomplete={false}
          translate={this.props.screenProps.translate}
          stateName1="insta_handle"
          label="instagram"
          placeholder1="Handle"
          value={this.state.insta_handle}
          valueError1={this.state.insta_handleError}
          icon={InstagramIcon}
          setValue={this.setValue}
          getValidInfo={this.getValidInfo}
          key={"insta_handle"}
          compulsory={true}
        />

        {this.props.errorInstaHandle && (
          <ErrorIcon
            width={25}
            height={25}
            style={styles.errorIcon}
            fill={"#EA514B"}
          />
        )}
        {!this.props.errorInstaHandle && (
          <SuccessIcon width={25} height={25} style={styles.errorIcon} />
        )}
        {this.props.errorInstaHandleMessage && (
          <Text style={styles.instagramErrorText}>
            {translate(
              `{{insta_handle}} ${this.props.errorInstaHandleMessage.substr(
                this.props.errorInstaHandleMessage.indexOf(" ") + 1
              )}`,
              { insta_handle: this.state.insta_handle }
            )}
          </Text>
        )}

        <View style={styles.marginVertical}>
          <PhoneNoField
            valid={this.state.validWhatsAppNumber}
            screenProps={this.props.screenProps}
            whatsApp
            phoneNum={this.state.whatsappnumber}
            changeNo={this.changeWhatsAppPhoneNo}
            invite={true}
            label={"WhatsApp Number"}
          />
        </View>
        <View style={styles.marginVertical}>
          <PhoneNoField
            valid={this.state.validCallNumber}
            screenProps={this.props.screenProps}
            whatsApp
            phoneNum={this.state.callnumber}
            changeNo={this.changeCallNumberPhoneNo}
            invite={true}
            label={"Phone Number"}
          />
        </View>
        <View style={styles.marginVertical}>
          <Item rounded style={[styles.input]}>
            <LocationIcon
              // width={50}
              // height={50}
              style={{ marginLeft: 18 }}
              stroke={"#FFF"}
            />
            <View style={styles.colView}>
              <Text style={[styles.inputLabel]}>
                {translate("LOCATION URL")}
              </Text>
              <Input
                style={styles.inputtext}
                placeholder={translate("Add Location URL")}
                placeholderTextColor="#fff"
                value={this.state.googlemaplink}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(value) => this.changeGoogleMapLocation(value)}
                onBlur={async () => {
                  analytics.track(`a_business_googlemaplink`, {
                    source: "my_website_detail",
                    source_action: "a_business_googlemaplink",
                    new: this.props.edit ? false : true,
                    googlemaplink: this.state.googlemaplink,
                  });
                  await this.validateUrl();
                  if (this.state.googleMapLinkError) {
                    analytics.track(`a_error_form`, {
                      error_page: "my_website_detail",
                      source: "my_website_detail",
                      source_action: "a_business_googlemaplink",
                      new: this.props.edit ? false : true,
                      googlemaplink: this.state.insta_handle,
                      error_description: this.state.googleMapLinkError,
                    });
                  }
                }}
              />
            </View>
          </Item>
        </View>
        {this.props.edit ? (
          <LowerButton
            screenProps={this.props.screenProps}
            checkmark={true}
            function={this._handleSubmissionUpdate}
          />
        ) : (
          <View style={styles.bottonViewWebsite}>
            {this.state.submissionLoading ? (
              <ForwardLoading bottom={-5} />
            ) : (
              <LowerButton
                screenProps={this.props.screenProps}
                // checkmark={true}
                function={this._handleSubmissionRegister}
              />
            )}
          </View>
        )}
      </InputScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  loadingUpdateInfo: state.auth.loadingUpdateInfo,
  errorInstaHandle: state.website.errorInstaHandle,
  errorInstaHandleMessage: state.website.errorInstaHandleMessage,
  productInfoId: state.website.productInfoId,
  businessLogo: state.website.businessLogo,
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  verifyInstagramHandle: (insta_handle) =>
    dispatch(actionCreators.verifyInstagramHandleWebsite(insta_handle)),
  updateWebInfoForBusiness: (info, submitNextStep) =>
    dispatch(actionCreators.updateWebInfoForBusiness(info, submitNextStep)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
