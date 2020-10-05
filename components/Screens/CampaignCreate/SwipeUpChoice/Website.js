import React, { Component } from "react";
import { connect } from "react-redux";
import { View, BackHandler, ScrollView } from "react-native";
import analytics from "@segment/analytics-react-native";
import { Text } from "native-base";
import { showMessage } from "react-native-flash-message";
import InputScrollView from "react-native-input-scroll-view";
import split from "lodash/split";
import isEmpty from "lodash/isEmpty";
import Picker from "../../../MiniComponents/Picker";
import LowerButton from "../../../MiniComponents/LowerButton";

//icons
import WindowIcon from "../../../../assets/SVGs/Window";

//redux
import * as actions from "../../../../store/actions";
// Style
import styles from "./styles";
import { globalColors } from "../../../../GlobalStyles";

//Data
import list from "../../../Data/callactions.data";
import { netLoc } from "../../../Data/callactions.data";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import WebsiteField from "../../../MiniComponents/InputFieldNew/Website";
import ModalField from "../../../MiniComponents/InputFieldNew/ModalField";
class Website extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        attachment: "",
        callaction: list.SnapAd[0].call_to_action_list[0],
      },
      callActionLabel: "",
      // networkString: netLoc[0].label,
      netLoc: netLoc,
      callactions: list.SnapAd[0].call_to_action_list,
      urlError: "",
      inputCallToAction: false,
    };
  }

  componentDidMount() {
    if (this.props.mainBusiness) {
      const { websitelink, weburl } = this.props.mainBusiness;
      if (websitelink && websitelink !== "") {
        this.setState({
          campaignInfo: {
            attachment: websitelink,
            callaction: list.SnapAd[0].call_to_action_list[0],
          },
        });
      } else if (weburl && weburl !== "") {
        this.setState({
          campaignInfo: {
            attachment: weburl.includes("https")
              ? weburl
              : `https://${weburl}.optimizeapp.com`,
            callaction: list.SnapAd[0].call_to_action_list[0],
          },
        });
      }
    }
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
          callaction: this.props.data.call_to_action,
        },
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
          callaction: this.props.storyAdAttachment.call_to_action,
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
  validateUrl = () => {
    const { translate } = this.props.screenProps;
    const urlError = validateWrapper(
      "website",
      this.state.campaignInfo.attachment
    );

    this.setState({
      urlError,
    });

    if (urlError) {
      const regex = /(snapchat.|instagram.|youtube.|youtu.be|facebook.|fb.me|whatsapp.|wa.me)/g;
      showMessage({
        message: translate(
          `${
            !this.state.campaignInfo.attachment.match(regex)
              ? "Please enter a valid URL"
              : "Please enter a valid url that does not direct to Instagram, Facebook, WhatsApp, Youtube or any social media"
          }`
        ),
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
    let objective = this.props.data
      ? this.props.data.objective
      : this.props.storyAdAttachment.destination === "REMOTE_WEBPAGE"
      ? this.props.storyAdAttachment.destination
      : this.props.objective;

    this.props._changeDestination(
      this.props.collectionAdLinkForm === 0
        ? objective !== "LEAD_GENERATION"
          ? "REMOTE_WEBPAGE"
          : "LEAD_GENERATION"
        : "COLLECTION",

      this.state.campaignInfo.callaction,
      {
        url: this.state.campaignInfo.attachment,
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
            isVisible={true}
            isTranslate={false}
            customStyle={styles.customModalField}
            customIconColor={globalColors.rum}
            customTextStyle={{ color: globalColors.rum }}
          />

          <WebsiteField
            stateName={"attachment"}
            screenProps={this.props.screenProps}
            website={this.state.campaignInfo.attachment}
            setWebsiteValue={this.setWebsiteValue}
            stateNameError={this.state.websitelinkError}
            customStyle={styles.customModalField}
            customIconColor={globalColors.rum}
            customTextStyle={{
              color: globalColors.rum,
            }}
            iconFill={globalColors.rum}
            labelColor={globalColors.rum}
            disabled={this.props.loadingDestinationURLValid}
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
                onPress={this.props.toggleSideMenu}
              >
                {translate("Change Swipe-up Destination")}
              </Text>
            )}
            <LowerButton
              screenProps={this.props.screenProps}
              checkmark={true}
              bottom={-5}
              function={() => {
                if (this.validateUrl())
                  this.props.verifyDestinationUrl(
                    this.state.campaignInfo.attachment,
                    this._handleSubmission,
                    this.props.screenProps.translate
                  );
              }}
              purpleViolet
            />
          </View>
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
});

const mapDispatchToProps = (dispatch) => ({
  verifyDestinationUrl: (url, submit, translate) =>
    dispatch(actions.verifyDestinationUrl(url, submit, translate)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Website);
