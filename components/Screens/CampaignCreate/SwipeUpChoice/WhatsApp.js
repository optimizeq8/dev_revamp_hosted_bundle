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
import { netLoc } from "../../../Data/callactions.data";

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
      this.props.mainBusiness.hasOwnProperty("whatsappnumber")
    ) {
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          weburl: this.props.mainBusiness.brandname.replace(/[^0-9a-z]/gi, ""),
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
    const whatsappnumberError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.whatsappnumber
    );
    this.setState({
      insta_handleError
    });
    if (insta_handleError) {
      showMessage({
        message: "Please provide an instagram handle",
        type: "warning",
        position: "top",
        duration: 7000
      });
      return false;
    } else if (whatsappnumberError) {
      showMessage({
        message: "Please provide a valid whatsapp number",
        type: "warning",
        position: "top",
        duration: 7000
      });
    } else {
      return true;
    }
  };
  _handleSubmission = () => {
    if (this.validate()) {
      let whatsAppCampaign = {
        whatsappnumber: this.state.campaignInfo.whatsappnumber,
        insta_handle: this.state.campaignInfo.insta_handle,
        callnumber:
          this.state.campaignInfo.callnumber !== ""
            ? this.state.campaignInfo.callnumber
            : this.state.campaignInfo.whatsappnumber
      };

      this.props._changeDestination(
        "REMOTE_WEBPAGE",
        this.state.campaignInfo.callaction,
        {
          url: `https://${this.props.mainBusiness.brandname.replace(
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
        // weburl: value.replace(/[^0-9a-z]/gi, "")
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
            <View style={[styles.websiteContent, { bottom: "5%" }]}>
              <WhatsAppIcon
                width={90}
                height={90}
                fill="#fff"
                style={[styles.icon]}
              />
              <View style={[styles.textcontainer]}>
                <Text style={styles.titletext}>WhatsApp Campaign</Text>
                <Text style={styles.subtext}>
                  Send users to a website containing your business's following
                  information.
                </Text>
              </View>
              <View>
                <Text style={[styles.subtext]}>Call to action</Text>
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
                  screenName={"Swipe up destination Website"}
                  closeCategoryModal={this.closeCallToActionModal}
                />
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
                  style={{ color: "#fff", fontSize: 20, left: 25 }}
                />
              </Item>
              <View style={{}}>
                <Text style={[styles.subtext, { bottom: 5 }]}>
                  WhatsApp number
                </Text>
                <PhoneNo
                  whatsApp
                  phoneNum={this.state.campaignInfo.whatsappnumber}
                  changeFunction={this.changeWhatsAppPhoneNo}
                  invite={true}
                />
              </View>
              <View style={{}}>
                <Text style={[styles.subtext, { bottom: 5 }]}>
                  Phone number (optional)
                </Text>
                <PhoneNo
                  whatsApp
                  phoneNum={this.state.campaignInfo.callnumber}
                  changeFunction={this.changeCallNumberPhoneNo}
                  invite={true}
                />
              </View>
              <Item
                rounded
                style={[
                  styles.input,
                  {
                    paddingHorizontal: 0,
                    width: "75%",
                    marginTop: 10
                  },
                  this.state.insta_handleError
                    ? GlobalStyles.redBorderColor
                    : GlobalStyles.transparentBorderColor
                ]}
              >
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
                  bottom={-1}
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
  mainBusiness: state.account.mainBusiness
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhatsApp);
