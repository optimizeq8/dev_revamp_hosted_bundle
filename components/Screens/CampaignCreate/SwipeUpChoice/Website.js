import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  I18nManager
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text } from "native-base";
import { showMessage } from "react-native-flash-message";
import InputScrollView from "react-native-input-scroll-view";
import split from "lodash/split";
import isEmpty from "lodash/isEmpty";
import * as Segment from "expo-analytics-segment";
import Picker from "../../../MiniComponents/Picker";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";
import LowerButton from "../../../MiniComponents/LowerButton";
import CustomHeader from "../../../MiniComponents/Header";

//icons
import WebsiteIcon from "../../../../assets/SVGs/SwipeUps/Website";
import WindowIcon from "../../../../assets/SVGs/Window";

// Style
import styles from "./styles";
import GlobalStyles, { globalColors } from "../../../../GlobalStyles";

//Data
import list from "../../../Data/callactions.data";
import { netLoc } from "../../../Data/callactions.data";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import segmentEventTrack from "../../../segmentEventTrack";
import WebsiteField from "../../../MiniComponents/InputFieldNew/Website";
import ModalField from "../../../MiniComponents/InputFieldNew/ModalField";
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
      // networkString: netLoc[0].label,
      netLoc: netLoc,
      callactions: list.SnapAd[0].call_to_action_list,
      urlError: "",
      inputCallToAction: false
    };
  }

  componentDidMount() {
    this.props.data;
    if (
      this.props.data &&
      this.props.data.hasOwnProperty("attachment") &&
      this.props.data.attachment !== "BLANK" &&
      !this.props.data.attachment.hasOwnProperty("android_app_url")
    ) {
      const url = this.props.data.attachment.url;
      this.setState({
        campaignInfo: {
          attachment: url,
          callaction: this.props.data.call_to_action
        }
        // networkString: url[0] + "://"
      });
    } else if (
      this.props.storyAdAttachment.destination === "REMOTE_WEBPAGE" ||
      this.props.storyAdAttachment.destination === "LEAD_GENERATION"
    ) {
      const url = this.props.storyAdAttachment.attachment.url;
      this.setState({
        campaignInfo: {
          attachment: url,
          callaction: this.props.storyAdAttachment.call_to_action
        }
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
  validateUrl = () => {
    const { translate } = this.props.screenProps;
    const urlError = validateWrapper(
      "website",
      this.state.campaignInfo.attachment
    );

    this.setState({
      urlError
    });

    if (urlError) {
      const regex = /(snapchat.|instagram.|youtube.|youtu.be|facebook.|fb.me|whatsapp.|wa.me)/g;
      showMessage({
        message: translate(
          `${
            !this.state.campaignInfo.attachment.match(regex)
              ? "Please enter a valid url"
              : "Please enter a valid url that does not direct to Instagram, Facebook, WhatsApp, Youtube or any social media"
          }`
        ),
        type: "warning",
        position: "top",
        duration: 7000
      });
      return false;
    } else {
      return true;
    }
  };
  setWebsiteValue = value => {
    const campaignInfo = {
      ...this.state.campaignInfo,
      attachment: value
    };
    this.setState({
      campaignInfo
    });
  };
  _handleSubmission = () => {
    let objective = this.props.data
      ? this.props.data.objective
      : this.props.storyAdAttachment.destination === "REMOTE_WEBPAGE"
      ? this.props.storyAdAttachment.destination
      : this.props.objective;
    if (!this.validateUrl()) {
      segmentEventTrack("Error Submit Website SwipeUp", {
        campaign_website_url: this.state.campaignInfo.attachment,
        campaign_error_website_url: this.state.urlError
      });
    }
    if (this.validateUrl()) {
      this.props._changeDestination(
        // this.props.adType !== "CollectionAd"
        //   ?
        this.props.collectionAdLinkForm === 0
          ? objective !== "LEAD_GENERATION"
            ? "REMOTE_WEBPAGE"
            : "LEAD_GENERATION"
          : "COLLECTION",

        this.state.campaignInfo.callaction,
        {
          url: this.state.campaignInfo.attachment
        }
      );
      segmentEventTrack("Submitted Website SwipeUp Success", {
        campaign_website_url: this.state.campaignInfo.attachment
      });
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
      segmentEventTrack("Selected Website Call to Action", {
        campaign_call_to_action: value[0].label
      });
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
  getValidInfo = (stateError, validObj) => {
    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state
    });
  };
  openCallToActionModal = () => {
    segmentEventTrack("Button Clicked to open Call to action Modal");
    this.setState({ inputCallToAction: true }, () => {
      if (this.state.inputCallToAction) {
        Segment.screen("Call to Action Modal");
      }
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        {this.props.adType === "CollectionAd" && (
          <View style={{ paddingBottom: 10 }}>
            <CustomHeader
              screenProps={this.props.screenProps}
              closeButton={false}
              title={"Swipe Up destination"}
              segment={{
                str: "Swipe up Destination CollectionAd  Back Button"
              }}
              navigation={this.props.navigation}
            />
          </View>
        )}

        <InputScrollView
          {...ScrollView.props}
          contentContainerStyle={[
            styles.scrollViewContainer,
            {
              paddingHorizontal:
                this.props.objective === "LEAD_GENERATION" ? 26 : 10
            }
          ]}
        >
          <WebsiteIcon style={styles.icon} fill={"#FFF"} />
          <View style={[styles.textcontainer]}>
            <Text style={styles.titletext}>{translate("Website")}</Text>
            <Text style={styles.subtext}>
              {translate("The user will be taken to your website")}
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
            screenName={"Swipe up destination Website"}
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
            isVisible={this.state.inputCallToAction}
            isTranslate={false}
          />

          <WebsiteField
            stateName={"attachment"}
            screenProps={this.props.screenProps}
            website={this.state.campaignInfo.attachment}
            setWebsiteValue={this.setWebsiteValue}
            stateNameError={this.state.websitelinkError}
            // getValidInfo={this.validateUrl}
            // disabled={
            //   (this.state.editBusinessInfo &&
            //     this.props.editBusinessInfoLoading) ||
            //   this.props.savingRegister
            // }
          />

          <Text style={styles.warningText}>
            {translate(
              "Please make sure not to include social media sites such as Facebook, Instagram, Youtube, SnapChat, etc"
            )}
          </Text>
          <View />
          <View style={styles.bottonViewWebsite}>
            {this.props.swipeUpDestination && (
              <Text
                style={styles.footerText}
                onPress={() => {
                  segmentEventTrack("Clicked Change Swipe-up Destination");
                  this.props.toggleSideMenu();
                }}
              >
                {translate("Change Swipe-up Destination")}
              </Text>
            )}
            <LowerButton
              checkmark={true}
              bottom={-5}
              function={this._handleSubmission}
            />
          </View>
        </InputScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  storyAdAttachment: state.campaignC.storyAdAttachment
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Website);
