import React, { Component } from "react";
import { connect } from "react-redux";
import { View, BackHandler, ScrollView, Text } from "react-native";
import analytics from "@segment/analytics-react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";

import { showMessage } from "react-native-flash-message";
import InputScrollView from "react-native-input-scroll-view";
import split from "lodash/split";
import isEmpty from "lodash/isEmpty";
import Picker from "../../../MiniComponents/Picker";
import LowerButton from "../../../MiniComponents/LowerButton";
import PhoneInput from "../../PersonalInfo/PhoneInput";

//icons
import WindowIcon from "../../../../assets/SVGs/Window";

//redux
import * as actions from "../../../../store/actions";
// Style
import styles, { codeFieldStyle } from "./styles";
import { globalColors } from "../../../../GlobalStyles";

//Data
import list from "../../../Data/callactions.data";
import { netLoc } from "../../../Data/callactions.data";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import WebsiteField from "../../../MiniComponents/InputFieldNew/Website";
import ModalField from "../../../MiniComponents/InputFieldNew/ModalField";
import GradientButton from "../../../MiniComponents/GradientButton";
class Call extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        attachment: { mobile: "" },
        callaction: list.SnapAd[5].call_to_action_list[0],
      },
      callActionLabel: "",
      // networkString: netLoc[0].label,
      netLoc: netLoc,
      callactions: list.SnapAd[5].call_to_action_list,
      mobileError: null,
      inputCallToAction: false,
      code: "",
    };
  }

  componentDidMount() {
    if (this.props.mainBusiness) {
      const { callnumber } = this.props.mainBusiness;
      if (callnumber) {
        this.props.resetVerifiedNumberSnapchat();
        this.setState({
          campaignInfo: {
            attachment: { mobile: `${callnumber}` },
            callaction: list.SnapAd[5].call_to_action_list[0],
          },
        });
      }
    }
    if (
      this.props.data &&
      this.props.data.hasOwnProperty("attachment") &&
      this.props.data.attachment !== "BLANK"
    ) {
      const mobile = this.props.data.attachment.mobile;
      this.setState({
        campaignInfo: {
          attachment: { mobile: mobile },
          callaction: this.props.data.call_to_action,
        },
        // networkString: url[0] + "://"
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
  validateMobileNo = () => {
    const { translate } = this.props.screenProps;
    const mobileError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.attachment.mobile
    );

    this.setState({
      mobileError,
    });

    if (mobileError) {
      showMessage({
        message: translate(`${"Please enter a valid number"}`),
        type: "warning",
        position: "top",
        duration: 7000,
      });
      return false;
    } else {
      return true;
    }
  };
  setWebsiteValue = (value) => {
    const campaignInfo = {
      ...this.state.campaignInfo,
      attachment: value,
    };
    this.setState({
      campaignInfo,
    });
  };
  _handleSubmission = () => {
    this.props._changeDestination(
      "AD_TO_CALL",
      this.state.campaignInfo.callaction,
      {
        mobile: this.state.campaignInfo.attachment.mobile,
      }
    );
    this.props.toggle(false);
    // this.props.navigation.navigate("AdDesign", {
    //   source: "ad_swipe_up_destination",
    //   source_action: "a_swipe_up_destination",
    // });
  };
  onSelectedCallToActionIdChange = (value) => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  closeCallToActionModal = () => {
    analytics.track(`cta_modal`, {
      source: "ad_swipe_up_destination",
      source_action: "a_toggle_cta_modal",
      visible: false,
    });
    this.setState({
      inputCallToAction: false,
    });
  };

  onSelectedCallToActionChange = (value) => {
    if (value && !isEmpty(value)) {
      analytics.track(`a_change_cta`, {
        source: "ad_swipe_up_destination",
        source_action: "a_change_cta",
        campaign_swipe_up_CTA: value,
      });
      this.setState(
        {
          campaignInfo: {
            ...this.state.campaignInfo,
            callaction: {
              label: value[0].label,
              value: value[0].value,
            },
          },
        },
        () => {
          this.closeCallToActionModal();
        }
      );
    }
  };
  getValidInfo = (stateError, validObj) => {
    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state,
    });
  };
  openCallToActionModal = () => {
    analytics.track(`cta_modal`, {
      source: "ad_swipe_up_destination",
      source_action: "a_toggle_cta_modal",
      visible: true,
    });
    this.setState({ inputCallToAction: true });
  };
  changePhoneNo = (number, country_code, numbertype, valid) => {
    console.log(
      "number, country_code, numbertype, valid",
      number,
      country_code,
      numbertype,
      valid
    );
    this.setState({
      attachment: {
        ...this.state.attachment,
        mobile: number,
      },
      mobileError: valid,
      country_code,
    });
    if (valid) {
      this.props.isNumberSnapchatVerified(number);
    }
  };
  sendOTP = () => {
    this.props.sendOTPSnapchat(this.state.campaignInfo.attachment.mobile);
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View
        style={[
          styles.safeAreaContainer,
          this.props.swipeUpDestination && { width: "110%" },
        ]}
      >
        <InputScrollView
          {...ScrollView.props}
          contentContainerStyle={[styles.scrollViewContainer]}
          showsVerticalScrollIndicator={false}
        >
          {/* <WebsiteIcon style={styles.icon} fill={"#FFF"} /> */}
          <View style={[styles.textcontainer]}>
            <Text style={styles.titletext}>{translate("Call")}</Text>
            <Text style={styles.subtext}>
              {translate("People will contact your business on call")}
            </Text>
          </View>
          <Picker
            showIcon={true}
            screenProps={this.props.screenProps}
            searchPlaceholderText={"Search Call To Action"}
            data={this.state.callactions}
            uniqueKey={"value"}
            displayKey={"label"}
            open={this.state.inputCallToAction}
            onSelectedItemsChange={this.onSelectedCallToActionIdChange}
            onSelectedItemObjectsChange={this.onSelectedCallToActionChange}
            selectedItems={[this.state.campaignInfo.callaction.value]}
            single={true}
            screenName={"Swipe up destination Call"}
            closeCategoryModal={this.closeCallToActionModal}
          />

          <ModalField
            stateName={"callToAction"}
            setModalVisible={this.openCallToActionModal}
            modal={true}
            label={"call to action"}
            valueError={this.state.callToActionError}
            getValidInfo={this.getValidInfo}
            disabled={false}
            valueText={this.state.campaignInfo.callaction.label}
            value={this.state.campaignInfo.callaction.label}
            incomplete={false}
            translate={this.props.screenProps.translate}
            icon={WindowIcon}
            isVisible={true}
            isTranslate={false}
            customStyle={styles.customModalField}
            customIconColor={globalColors.rum}
            customTextStyle={{ color: globalColors.rum }}
          />

          <View />
          <View>
            <PhoneInput
              disabled={this.props.verifyingNumber}
              phoneNum={`+${this.state.campaignInfo.attachment.mobile}`}
              screenProps={this.props.screenProps}
              height={30}
              fontSize={16}
              changeNo={this.changePhoneNo}
              // valid={valid}
            />
          </View>
          {!this.props.verifiedSnapchatNumber && !this.props.otpSend && (
            <GradientButton
              text={"Send OTP"}
              textStyle={{
                color: globalColors.rum,
              }}
              uppercase
              height={40}
              width={100}
              transparent
              style={{
                marginHorizontal: 0,
                marginVertical: 10,
                borderWidth: 1,
                borderColor: globalColors.rum,
                alignSelf: "center",
              }}
              onPressAction={this.sendOTP}
            />
          )}
          {!this.props.verifiedSnapchatNumber && this.props.otpSend && (
            <Text style={styles.warningText}>
              {translate("Enter your 6-digit verification code")}
            </Text>
          )}
          {!this.props.verifiedSnapchatNumber && this.props.otpSend && (
            <View style={{ marginVertical: 10 }}>
              <CodeField
                autoFocus
                cellCount={6}
                onChangeText={(code) => {
                  this.setState({ code });
                  if (code.length === 6) {
                    console.log("code", code);
                    this.props.verifyOTPCode(code);
                    // this._handleSentCode(code);
                  }
                }}
                textContentType="oneTimeCode"
                rootStyle={codeFieldStyle.codeFieldRoot}
                ref={this.inputRef}
                keyboardType="number-pad"
                value={this.state.code}
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[
                      codeFieldStyle.cell,
                      isFocused && codeFieldStyle.focusCell,
                    ]}
                    // onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
          )}
          {!this.props.verifiedSnapchatNumber && this.props.otpSend && (
            <Text
              onPress={this.sendOTP}
              style={[styles.warningText, { textDecorationLine: "underline" }]}
            >
              {translate("Resend Code")}
            </Text>
          )}
          {this.props.verifiedSnapchatNumber && (
            <View style={styles.bottonViewWebsite}>
              <LowerButton
                screenProps={this.props.screenProps}
                checkmark={true}
                bottom={-5}
                function={() => {
                  this._handleSubmission();
                  // if (this.validateMobileNo())
                  //   this.props.verifyDestinationUrl(
                  //     this.state.campaignInfo.attachment,
                  //     this._handleSubmission,
                  //     this.props.screenProps.translate
                  //   );
                }}
                purpleViolet
              />
            </View>
          )}
        </InputScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  storyAdAttachment: state.campaignC.storyAdAttachment,
  mainBusiness: state.account.mainBusiness,
  destinationURLValid: state.campaignC.destinationURLValid,
  loadingDestinationURLValid: state.campaignC.loadingDestinationURLValid,
  verifiedSnapchatNumber: state.campaignC.verifiedSnapchatNumber,
  verifyingNumber: state.campaignC.verifyingNumber,
  otpSend: state.campaignC.otpSend,
});

const mapDispatchToProps = (dispatch) => ({
  verifyDestinationUrl: (url, submit, translate) =>
    dispatch(actions.verifyDestinationUrl(url, submit, translate)),
  isNumberSnapchatVerified: (number) =>
    dispatch(actions.isNumberSnapchatVerified(number)),
  sendOTPSnapchat: (number) => dispatch(actions.sendOTPSnapchat(number)),
  resetVerifiedNumberSnapchat: () =>
    dispatch(actions.resetVerifiedNumberSnapchat()),
  verifyOTPCode: (code) => dispatch(actions.verifyOTPCode(code)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Call);
