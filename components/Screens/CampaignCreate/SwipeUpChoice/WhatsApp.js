import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  BackHandler,
  ScrollView,
  Platform,
  Modal,
  Text,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import { Item, Input, Icon } from "native-base";
import { showMessage } from "react-native-flash-message";
import isEmpty from "lodash/isEmpty";
import upperCase from "lodash/upperCase";
// import { Modal } from 'react-native-paper';
import { BlurView } from "expo-blur";
import Picker from "../../../MiniComponents/Picker";
import LowerButton from "../../../MiniComponents/LowerButton";
import PhoneNoField from "../../Signup/PhoneNo/PhoneNoField";
//icons
import WhatsAppIcon from "../../../../assets/SVGs/SwipeUps/WhatsApp";
import InstagramIcon from "../../../../assets/SVGs/InstagramIcon";
import SuccessIcon from "../../../../assets/SVGs/Success";
import ErrorIcon from "../../../../assets/SVGs/Error";

// Style
import styles from "./styles";

//Data
import list from "../../../Data/callactions.data";

import * as actionCreators from "../../../../store/actions";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";

class WhatsApp extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        weburl: "",
        whatsappnumber: "",
        insta_handle: "",
        callnumber: "",
        callaction: list.SnapAd[4].call_to_action_list[0],
        googlemaplink: "",
      },
      callactions: list.SnapAd[4].call_to_action_list,
      validCallNumber: false,
      validWhatsAppNumber: false,
      insta_handleError: "",
      showChangeInstaHandle: false,
      inputCallToAction: false,
      submissionLoading: false,
    };
  }
  componentDidMount() {
    if (
      (this.props.data && this.props.data.hasOwnProperty("attachment")) ||
      //added checking for a rejected campaign so that call to action is set
      this.props.rejCampaign ||
      this.props.mainBusiness.hasOwnProperty("weburl")
    ) {
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          weburl:
            this.props.data && this.props.data.weburl
              ? this.props.data.weburl
              : this.props.mainBusiness.weburl
              ? this.props.mainBusiness.weburl
              : "",
          insta_handle:
            this.props.data && this.props.data.insta_handle
              ? this.props.data.insta_handle
              : this.props.mainBusiness.insta_handle
              ? this.props.mainBusiness.insta_handle
              : "",
          whatsappnumber:
            this.props.data && this.props.data.whatsappnumber
              ? "+" + this.props.data.whatsappnumber
              : this.props.mainBusiness.whatsappnumber
              ? "+" + this.props.mainBusiness.whatsappnumber
              : "",
          callnumber:
            this.props.data && this.props.data.callnumber
              ? "+" + this.props.data.callnumber
              : this.props.mainBusiness.callnumber
              ? "+" + this.props.mainBusiness.callnumber
              : "",
          googlemaplink:
            this.props.data && this.props.data.googlemaplink
              ? this.props.data.googlemaplink
              : this.props.mainBusiness.googlemaplink
              ? this.props.mainBusiness.googlemaplink
              : "",
          //added checking for a rejected campaign so that call to action is set
          callaction: this.props.rejCampaign
            ? this.props.rejCampaign.call_to_action
            : this.props.data &&
              this.props.data.call_to_action &&
              this.props.data.call_to_action.value !== "BLANK"
            ? this.props.data.call_to_action
            : list.SnapAd[4].call_to_action_list[0],
        },
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
    // const whatsappnumberError = validateWrapper(
    //   "mandatory",
    //   this.state.campaignInfo.whatsappnumber
    // );
    if (this.state.campaignInfo.googlemaplink.length > 0) {
      var googleMapLinkError = validateWrapper(
        "googleMapLink",
        this.state.campaignInfo.googlemaplink
      );
    }

    this.setState({
      insta_handleError,
      weburlError,
      googleMapLinkError,
    });
    if (
      insta_handleError ||
      weburlError ||
      // whatsappnumberError ||
      googleMapLinkError
    ) {
      showMessage({
        message: insta_handleError
          ? translate("Please provide an instagram handle")
          : weburlError
          ? translate("Please provide domain name")
          : // : whatsappnumberError
          // ? translate("Please provide a valid WhatsApp number")
          googleMapLinkError
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

  checkInstaAccountChange = async () => {
    // console.log("data", this.props.data);
    await this.props.verifyInstagramHandle(
      this.state.campaignInfo.insta_handle
    );
    if (
      this.props.data &&
      this.props.data.insta_handle &&
      this.props.data.insta_handle !== this.state.campaignInfo.insta_handle &&
      !this.props.errorInstaHandle &&
      this.props.selectedInstagramProducts.length > 0 &&
      //    || (this.props.mainBusiness.insta_handle &&
      //   this.props.mainBusiness.insta_handle !==
      // this.state.campaignInfo.insta_handle
      // )
      this.props.productInfoId
    ) {
      this.setState({
        showChangeInstaHandle: true,
      });
    } else {
      await this._handleSubmission();
    }
  };

  // handle submission sme growth
  _handleSubmission = async () => {
    this.setState({
      submissionLoading: true,
    });
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
        duration: 2000,
      });
    }
    let weburlAvalible =
      this.props.mainBusiness.weburl || this.props.weburlAvalible;
    const validate = this.validate();
    if (
      !weburlAvalible ||
      (this.props.errorInstaHandle && this.props.errorInstaHandleMessage) ||
      !validate
    ) {
      this.setState({
        submissionLoading: false,
      });
    }
    if (validate && weburlAvalible && !this.props.errorInstaHandle) {
      let whatsAppCampaign = {
        weburl: this.state.campaignInfo.weburl,
        whatsappnumber: this.state.campaignInfo.whatsappnumber.replace("+", ""),
        insta_handle: this.state.campaignInfo.insta_handle,
        googlemaplink: this.state.campaignInfo.googlemaplink,
        callnumber:
          this.state.campaignInfo.callnumber ||
          this.state.campaignInfo.callnumber !== ""
            ? this.state.campaignInfo.callnumber.replace("+", "")
            : this.state.campaignInfo.whatsappnumber.replace("+", ""),

        source: "SME GROWTH",
      };
      // check here for insta handle change then update the selectedItemList to []
      // if (this.props.data.insta_handle !== this.state.campaignInfo.insta_handle && this.props.productInfoId) {
      // 	//   console.log('updating to empty list');
      // 	this.props.saveWebProducts(
      // 		[],
      // 		this.props.data.campaign_id,
      // 		this.props.productInfoId,
      // 		this.props.navigation
      // 	);
      // }

      let _changeDestination = () =>
        this.props._changeDestination(
          "REMOTE_WEBPAGE",
          this.state.campaignInfo.callaction,
          {
            url: `https://${this.state.campaignInfo.weburl.replace(
              /[^0-9a-z]/gi,
              ""
            )}.optimizeapp.com`,
          },
          null,
          whatsAppCampaign
        );
      if (this.state.showChangeInstaHandle) {
        this.setState({ showChangeInstaHandle: false });
      }

      this.setState({
        submissionLoading: false,
      });
      this.props.navigation.navigate("SelectInstagramPost", {
        insta_handle: this.state.campaignInfo.insta_handle,
        _changeDestination,
      });
    }
  };
  onSelectedCallToActionChange = (value) => {
    if (value && !isEmpty(value)) {
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
  closeCallToActionModal = () => {
    this.setState({
      inputCallToAction: false,
    });
  };
  onSelectedCallToActionIdChange = (value) => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  changeWhatsAppPhoneNo = (value, countryCode, numberType, validNumber) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        whatsappnumber: validNumber ? value : "",
        validWhatsAppNumber: validNumber,
      },
    });
  };
  changeCallNumberPhoneNo = (value, countryCode, numberType, validNumber) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        callnumber: validNumber ? value : "",
        validCallNumber: validNumber,
      },
    });
  };
  changeInstaHandle = (value) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        insta_handle: value,
      },
    });
  };
  changeWebUrl = (value) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        weburl: value.replace(/[^0-9a-z]/gi, ""),
      },
    });
  };
  changeGoogleMapLocation = (value) => {
    // truncate before https: everything
    if (value.includes("https:")) {
      const link = value.substring(value.indexOf("https:") + 1);
      // console.log("link", "h" + link);
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          googlemaplink: value === "" ? "" : "h" + link,
        },
      });
    } else {
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          googlemaplink: value,
        },
      });
    }
  };

  validateUrl = () => {
    const { translate } = this.props.screenProps;
    let googleMapLinkError = null;
    if (this.state.campaignInfo.googlemaplink !== "")
      googleMapLinkError = validateWrapper(
        "googleMapLink",
        this.state.campaignInfo.googlemaplink
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
  setModalInstagramChangedVisible = (value) => {
    this.setState({
      showChangeInstaHandle: value,
    });
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={[styles.safeAreaContainer]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollViewContainer,
            styles.whatsApp,
            {
              paddingBottom: 0,
              paddingTop: 0,
            },
          ]}
        >
          <WhatsAppIcon
            width={60}
            height={60}
            fill="#fff"
            style={[styles.icon]}
          />
          <View style={[styles.textcontainer]}>
            <Text uppercase style={styles.titletext}>
              {translate("SME Growth")}
            </Text>
            <Text style={styles.subtext}>
              {translate(
                "We’ll create a mini website for your business Just fill in the info below"
              )}
            </Text>
          </View>
          <View style={[styles.whatsAppDetailContainer]}>
            {!this.props.mainBusiness.weburl && (
              <View style={styles.marginVertical}>
                <Text style={[styles.subTitle]}>
                  {translate("Pick a domain for your Website")}
                </Text>
                <View style={[styles.callToActionLabelView]}>
                  <Text uppercase style={[styles.inputLabel]}>
                    {translate("domain")}*
                  </Text>
                </View>
                <Item
                  rounded
                  style={[
                    styles.input,
                    {
                      paddingHorizontal: 0,
                      // width: "50%"
                    },
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
                    onChangeText={(value) => this.changeWebUrl(value)}
                    onBlur={() => {
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
                showIcon={true}
                screenProps={this.props.screenProps}
                searchPlaceholderText={translate("Search Call To Action")}
                data={this.state.callactions}
                uniqueKey={"value"}
                displayKey={"label"}
                open={this.state.inputCallToAction}
                onSelectedItemsChange={this.onSelectedCallToActionIdChange}
                onSelectedItemObjectsChange={this.onSelectedCallToActionChange}
                selectedItems={[this.state.campaignInfo.callaction.value]}
                single={true}
                screenName={"Swipe up destination WhatsApp"}
                closeCategoryModal={this.closeCallToActionModal}
              />
              <View style={[styles.callToActionLabelView]}>
                <Text uppercase style={[styles.inputLabel]}>
                  {translate("call to action")}*
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
              {/* <Text style={[styles.subTitle]}>WhatsApp number</Text> */}
              <Text style={[styles.subtextReach]} uppercase>
                {translate("Where would you like people to reach you?")}
              </Text>
            </View>
            <View style={styles.marginVertical}>
              <View style={[styles.callToActionLabelView]}>
                <Text uppercase style={[styles.inputLabel]}>
                  {translate("instagram")}*
                </Text>
              </View>
              <Item
                rounded
                style={[
                  styles.input,
                  {
                    paddingHorizontal: 0,
                  },
                  //   this.state.insta_handleError
                  //     ? GlobalStyles.redBorderColor
                  //     : GlobalStyles.transparentBorderColor
                ]}
              >
                <InstagramIcon
                  width={25}
                  height={25}
                  style={{ marginLeft: 15 }}
                  fill="#FFF"
                />
                <Input
                  style={styles.inputtext}
                  placeholder="Handle"
                  placeholderTextColor="#fff"
                  value={this.state.campaignInfo.insta_handle}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(value) => this.changeInstaHandle(value)}
                  onBlur={async () => {
                    this.validate();
                    await this.props.verifyInstagramHandle(
                      this.state.campaignInfo.insta_handle
                    );
                  }}
                />
                {this.props.errorInstaHandle && (
                  <ErrorIcon
                    width={25}
                    height={25}
                    style={{ marginRight: 10 }}
                    fill={"#EA514B"}
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
              <Text style={styles.instagramErrorText}>
                {this.props.errorInstaHandleMessage &&
                  translate(
                    `{{insta_handle}} ${this.props.errorInstaHandleMessage.substr(
                      this.props.errorInstaHandleMessage.indexOf(" ") + 1
                    )}`,
                    { insta_handle: this.state.campaignInfo.insta_handle }
                  )}
              </Text>
            </View>
            <View style={styles.marginVertical}>
              <View
                style={[
                  styles.callToActionLabelView,
                  {
                    backgroundColor: "rgba(0,0,0,0.15)",
                  },
                ]}
              >
                <Text
                  uppercase
                  style={[
                    styles.inputLabel,
                    {
                      fontFamily: "montserrat-bold-english",
                      marginTop: 0,
                    },
                  ]}
                >
                  {translate("whatsApp")}
                </Text>
              </View>
              <PhoneNoField
                valid={this.state.validWhatsAppNumber}
                screenProps={this.props.screenProps}
                whatsApp
                phoneNum={this.state.campaignInfo.whatsappnumber}
                changeNo={this.changeWhatsAppPhoneNo}
                invite={true}
              />
            </View>
            <View style={styles.marginVertical}>
              <View
                style={[
                  styles.callToActionLabelView,
                  {
                    backgroundColor: "rgba(0,0,0,0.15)",
                  },
                ]}
              >
                <Text uppercase style={[styles.inputLabel]}>
                  {translate("mobile")}
                </Text>
              </View>
              {/* <Text style={[styles.subTitle]}>Phone number (optional)</Text> */}
              <PhoneNoField
                valid={this.state.validCallNumber}
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
                    paddingHorizontal: 0,
                    // width: "75%"
                  },
                  //   this.state.insta_handleError
                  //     ? GlobalStyles.redBorderColor
                  //     : GlobalStyles.transparentBorderColor
                ]}
              >
                <LocationIcon
                  // width={50}
                  // height={50}
                  style={{ marginLeft: 12 }}
                  stroke={"#FFF"}
                />
                <Input
                  style={styles.inputtext}
                  placeholder={translate("Add Location URL")}
                  placeholderTextColor="#fff"
                  value={this.state.campaignInfo.googlemaplink}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(value) => this.changeGoogleMapLocation(value)}
                  onBlur={() => {
                    this.validateUrl();
                  }}
                />
              </Item>
            </View>
          </View>
          <View style={styles.bottonViewWebsite}>
            {this.state.submissionLoading ? (
              <ForwardLoading bottom={-5} />
            ) : (
              <LowerButton
                screenProps={this.props.screenProps}
                // checkmark={true}
                function={this.checkInstaAccountChange}
              />
            )}
          </View>
        </ScrollView>
        <Modal
          animationType={"fade"}
          transparent={Platform.OS === "ios"}
          dismissable
          onRequestClose={() => this.setState({ showChangeInstaHandle: false })}
          visible={this.state.showChangeInstaHandle}
        >
          <BlurView tint="dark" intensity={100} style={styles.BlurView}>
            <View style={styles.walletPaymentModalContainer}>
              <>
                {/* <WalletIcon width={80} height={80} /> */}
                {/* <Text
                  style={{
                    fontSize: 160,
                    color: "#ff9d00",
                    fontFamily: "montserrat-regular"
                  }}
                >
                  !
                </Text> */}
                <ExclamationIcon style={{ alignSelf: "center" }} />

                <Text style={styles.instagramWarningHeadingText}>
                  {upperCase(translate("Instagram Handle Changed"))}
                </Text>

                <Text style={styles.instagramWarningDescriptionText}>
                  {translate(
                    "You have changed the Instagram handle, if you continue it will reset your previous products/price selections"
                  )}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    // flex: 1,
                    width: "100%",
                    paddingTop: 60,
                  }}
                >
                  {/* <TouchableOpacity
                    onPress={() =>
                      this.setState({ showChangeInstaHandle: false })
                    }
                  >
                    <CloseCircleIcon width={53} height={53} />
                  </TouchableOpacity> */}
                  <LowerButton
                    screenProps={this.props.screenProps}
                    cross={true}
                    bottom={0}
                    function={() => this.setModalInstagramChangedVisible(false)}
                  />
                  <LowerButton
                    screenProps={this.props.screenProps}
                    function={() => {
                      let whatsAppCampaign = {
                        weburl: this.state.campaignInfo.weburl,
                        whatsappnumber: this.state.campaignInfo.whatsappnumber.replace(
                          "+",
                          ""
                        ),
                        insta_handle: this.state.campaignInfo.insta_handle,
                        callnumber:
                          this.state.campaignInfo.callnumber ||
                          this.state.campaignInfo.callnumber !== ""
                            ? this.state.campaignInfo.callnumber.replace(
                                "+",
                                ""
                              )
                            : this.state.campaignInfo.whatsappnumber.replace(
                                "+",
                                ""
                              ),
                      };
                      this.props._changeDestination(
                        "REMOTE_WEBPAGE",
                        this.state.campaignInfo.callaction,
                        {
                          url: `https://${this.state.campaignInfo.weburl.replace(
                            /[^0-9a-z]/gi,
                            ""
                          )}.optimizeapp.com`,
                        },
                        null,
                        whatsAppCampaign
                      );
                      this.props.saveWebProducts(
                        [],
                        this.props.data.campaign_id,
                        this.props.productInfoId,
                        this.props.navigation,
                        this.props.businessLogo
                      );
                      this._handleSubmission();
                    }}
                  />
                </View>
              </>
            </View>
          </BlurView>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.campaignC.data,
  weburlAvalible: state.campaignC.weburlAvalible,
  mainBusiness: state.account.mainBusiness,
  errorInstaHandle: state.campaignC.errorInstaHandle,
  errorInstaHandleMessage: state.campaignC.errorInstaHandleMessage,
  productInfoId: state.campaignC.productInfoId,
  businessLogo: state.campaignC.businessLogo,
  selectedInstagramProducts: state.campaignC.selectedInstagramProducts,
  rejCampaign: state.dashboard.rejCampaign,
});

const mapDispatchToProps = (dispatch) => ({
  verifyBusinessUrl: (weburl) =>
    dispatch(actionCreators.verifyBusinessUrl(weburl)),
  verifyInstagramHandle: (insta_handle) =>
    dispatch(actionCreators.verifyInstagramHandle(insta_handle)),
  saveWebProducts: (cartList, campaign_id, productInfoId, navigation) =>
    dispatch(
      actionCreators.saveWebProducts(
        cartList,
        campaign_id,
        productInfoId,
        navigation
      )
    ),
  getWebProducts: (campaign_id) =>
    dispatch(actionCreators.getWebProducts(campaign_id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WhatsApp);
